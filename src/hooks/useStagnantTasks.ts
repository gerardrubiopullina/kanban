import { useContext, useEffect, useMemo, useState } from 'react';
import { Task } from '@/types';
import { TasksContext } from '@/context/TasksContext';
import { SettingsContext } from '@/context/SettingsContext';

export type StagnantTask = Task & { daysInStatus: number; threshold: number };

const DAY_MS = 1000 * 60 * 60 * 24;
const REFRESH_INTERVAL_MS = 1000 * 60; // re-check every minute so alerts appear without user interaction

export const useStagnantTasks = (): StagnantTask[] => {
    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error('Tasks Context not found');
    const { tasks } = tasksContext;

    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { thresholds } = settingsContext;

    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, []);

    return useMemo(() => {
        return tasks
            .map(task => {
                const daysInStatus = task.statusUpdatedAt
                    ? Math.floor((now - new Date(task.statusUpdatedAt).getTime()) / DAY_MS)
                    : 0;
                return { ...task, daysInStatus, threshold: thresholds[task.status] };
            })
            .filter(task => task.daysInStatus >= thresholds[task.status])
            .sort((a, b) => b.daysInStatus - a.daysInStatus);
    }, [tasks, thresholds, now]);
};
