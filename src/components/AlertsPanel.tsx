import { useContext } from "react";
import { LanguageContext } from "../i18n/LanguageContext";
import { TasksContext } from "../context/TasksContext";
import { SettingsContext } from "../context/SettingsContext";
import { Notifications, NotificationsOff, Close } from "@mui/icons-material";
import StagnantTasksAlerts from "./alerts/StagnantTasksAlert";

interface AlertsPanelProps {
    onClose?: () => void;
}

const AlertsPanel = ({ onClose }: AlertsPanelProps) => {
    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error('Tasks Context not found');
    const { tasks } = tasksContext;

    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { thresholds } = settingsContext;

    const hasStagnantTasks = tasks.some(task => {
        const statusAge = task.statusUpdatedAt 
            ? Math.floor((new Date().getTime() - new Date(task.statusUpdatedAt).getTime()) / (1000 * 60 * 60 * 24))
            : 0;
        return statusAge >= thresholds[task.status];
    });
    
    return (
        <div className="h-full w-full md:border-l border-primary/30 p-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Notifications className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold text-text-primary">
                        {t('alerts.title')}
                    </h2>
                </div>
                <button 
                    onClick={onClose}
                    className="md:hidden p-1 hover:bg-primary/20 rounded-full"
                >
                    <Close className="h-5 w-5 text-text-secondary" />
                </button>
            </div>
        
            <div className="space-y-6">
                {hasStagnantTasks ? (
                    <StagnantTasksAlerts />
                ) : (
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center px-4">
                        <div className="bg-primary/20 rounded-full p-4 mb-4">
                            <NotificationsOff className="h-8 w-8 text-text-secondary/50" />
                        </div>
                        <h3 className="text-text-primary font-medium mb-2">
                            {t('alerts.noAlerts')}
                        </h3>
                        <p className="text-text-secondary text-sm">
                            {t('alerts.willAppear')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsPanel;