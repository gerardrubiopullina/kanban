import { useState, useEffect, useContext } from 'react';
import { Task } from '@/types';
import { LockClock } from '@mui/icons-material';
import { TasksContext } from '@/context/TasksContext';
import { LanguageContext } from '@/i18n/LanguageContext';
import { SettingsContext } from '@/context/SettingsContext';

const StagnantTasksAlerts = () => {

    const [stagnantTasks, setStagnantTasks] = useState<(Task & { daysInStatus: number })[]>([]);
  
    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error('Tasks Context not found');
    const { tasks } = tasksContext;
    
    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { thresholds } = settingsContext;

    useEffect(() => {
        const now = new Date().getTime();
        
        const stagnant = tasks
            .map(task => {
                const statusAge = task.statusUpdatedAt 
                    ? Math.floor((now - new Date(task.statusUpdatedAt).getTime()) / (1000 * 60 * 60 * 24))
                    : 0;
    
                return {
                    ...task,
                    daysInStatus: statusAge
                };
            })
            .filter(task => task.daysInStatus >= thresholds[task.status])
            .sort((a, b) => b.daysInStatus - a.daysInStatus);
    
        setStagnantTasks(stagnant);
    }, [tasks, thresholds]);

    if (stagnantTasks.length === 0) {
        console.log('No stagnant tasks found with current thresholds:', thresholds);
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500 mb-4">
                <LockClock className="h-5 w-5" />
                <h3 className="font-medium">{t('alerts.stagnantTasks')}</h3>
            </div>

            <div className="rounded-lg border border-amber-500/20 overflow-hidden">
                {stagnantTasks.map((task, index) => (
                    <div 
                        key={task.id}
                        className={`
                            flex flex-col gap-1 px-4 py-3 bg-amber-500/5
                            ${index !== stagnantTasks.length - 1 ? 'border-b border-amber-500/20' : ''}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                <span className="text-text-primary font-medium">
                                    {task.title}
                                </span>
                            </div>
                            <span className="text-sm text-amber-500 font-medium">
                                {task.daysInStatus} {t('alerts.days')}
                            </span>
                        </div>
                        <span className="text-sm text-text-secondary ml-4">
                            {t('alerts.hasBeen')} {t(`columns.${task.status}`)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StagnantTasksAlerts;