import { ReactNode, useContext, useState } from "react";
import { SettingsContext } from "./SettingsContext";
import { TasksContext } from "./TasksContext";


export const SettingsProvider = ({ children }: { children: ReactNode }) => {

    const [showReview, setShowReview] = useState(true);
    const [showDescriptions, setShowDescriptions] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error("Tasks Context not found");
    const { tasks } = tasksContext;

    const toggleReviewColumn = () => {
        const hasReviewingTasks = tasks.some(task => task.status === 'reviewing');
        if (showReview && hasReviewingTasks) {
            setError('ui.cannotHideReviewing');
            return;
        }
        setError(null);
        setShowReview(!showReview);
    };

    return (
        <SettingsContext.Provider value={{
            showReview,
            showDescriptions,
            error,
            setError,
            setShowDescriptions,
            toggleReviewColumn
        }}>
            {children}
        </SettingsContext.Provider>
    );
};