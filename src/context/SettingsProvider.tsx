import { ReactNode, useContext, useState, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";
import { TasksContext } from "./TasksContext";
import { TaskStatus } from "../types";

interface ThresholdSettings {
    todo: number;
    inProgress: number;
    reviewing: number;
    done: number;
}

const DEFAULT_THRESHOLDS: ThresholdSettings = {
    todo: 2,
    inProgress: 7,
    reviewing: 2,
    done: 3
};

const THRESHOLD_STORAGE_KEY = 'kanban_thresholds';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {

    const [showReview, setShowReview] = useState(true);
    const [showDescriptions, setShowDescriptions] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [thresholds, setThresholds] = useState<ThresholdSettings>(() => {
        const saved = localStorage.getItem(THRESHOLD_STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
    });

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error("Tasks Context not found");
    const { tasks } = tasksContext;

    useEffect(() => {
        localStorage.setItem(THRESHOLD_STORAGE_KEY, JSON.stringify(thresholds));
    }, [thresholds]);

    const toggleReviewColumn = () => {
        const hasReviewingTasks = tasks.some(task => task.status === 'reviewing');
        if (showReview && hasReviewingTasks) {
            setError('ui.cannotHideReviewing');
            return;
        }
        setError(null);
        setShowReview(!showReview);
    };

    const updateThreshold = (status: TaskStatus, days: number) => {
        setThresholds((prev: ThresholdSettings) => ({
            ...prev,
            [status]: days
        }));
    };

    const resetThresholds = () => {
        setThresholds(DEFAULT_THRESHOLDS);
    };

    return (
        <SettingsContext.Provider value={{
            showReview,
            showDescriptions,
            error,
            thresholds,
            setError,
            setShowDescriptions,
            toggleReviewColumn,
            updateThreshold,
            resetThresholds
        }}>
            {children}
        </SettingsContext.Provider>
    );
};