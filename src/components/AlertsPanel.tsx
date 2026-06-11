import { useContext } from "react";
import { LanguageContext } from "../i18n/LanguageContext";
import { Notifications, Close, TaskAlt } from "@mui/icons-material";
import { useStagnantTasks } from "../hooks/useStagnantTasks";
import StagnantTasksAlerts from "./alerts/StagnantTasksAlert";

interface AlertsPanelProps {
    onClose?: () => void;
}

const AlertsPanel = ({ onClose }: AlertsPanelProps) => {
    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const stagnantTasks = useStagnantTasks();
    const hasAlerts = stagnantTasks.length > 0;

    return (
        <div className="h-full w-full md:border-l border-primary/30 p-4 md:py-8 flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Notifications className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold text-text-primary">
                        {t('alerts.title')}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-text-secondary text-sm px-2 py-1 bg-primary/30 rounded-full min-w-[28px] text-center">
                        {stagnantTasks.length}
                    </span>
                    <button
                        onClick={onClose}
                        className="md:hidden menu-icon-button p-1 rounded transition-colors"
                        aria-label="Close alerts panel"
                    >
                        <Close className="h-5 w-5 text-text-secondary" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-text-secondary/20">
                {hasAlerts ? (
                    <StagnantTasksAlerts tasks={stagnantTasks} />
                ) : (
                    <div className="alerts-empty-state h-full flex flex-col items-center justify-center text-center px-6 pb-12">
                        <div className="empty-alerts-icon rounded-full p-5 mb-5">
                            <TaskAlt className="!h-9 !w-9" />
                        </div>
                        <h3 className="text-text-primary font-medium mb-1.5">
                            {t('alerts.noAlerts')}
                        </h3>
                        <p className="text-text-secondary/70 text-sm leading-relaxed max-w-[240px]">
                            {t('alerts.willAppear')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsPanel;
