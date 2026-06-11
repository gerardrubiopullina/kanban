import { useContext } from 'react';
import { HourglassBottom } from '@mui/icons-material';
import { LanguageContext } from '@/i18n/LanguageContext';
import { StagnantTask } from '@/hooks/useStagnantTasks';

interface StagnantTasksAlertsProps {
    tasks: StagnantTask[];
}

const criticalLimit = (task: StagnantTask) =>
    Math.max(task.threshold * 2, task.threshold + 3);

const isCritical = (task: StagnantTask) =>
    task.daysInStatus >= criticalLimit(task);

const StagnantTasksAlerts = ({ tasks }: StagnantTasksAlertsProps) => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    if (tasks.length === 0) return null;

    return (
        <div>
            <h3 className="px-1 mb-3 text-sm text-text-secondary">
                {t('alerts.stagnantTasks')}
            </h3>

            <div className="space-y-1">
                {tasks.map((task, index) => {
                    const critical = isCritical(task);
                    return (
                        <div
                            key={task.id}
                            className="alert-row flex items-start gap-3 px-2 py-3 rounded-lg"
                            style={{ animationDelay: `${Math.min(index, 6) * 50}ms` }}
                        >
                            <div className={`rounded-full p-2 shrink-0 ${
                                critical ? 'alert-row-icon-critical' : 'alert-row-icon'
                            }`}>
                                <HourglassBottom className="!h-4 !w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-text-primary font-medium text-sm leading-snug break-words">
                                    {task.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 text-xs text-text-secondary/70">
                                    <span>{t('alerts.hasBeen')}</span>
                                    <span className="alert-status-chip font-medium px-1.5 py-0.5 rounded">
                                        {t(`columns.${task.status}`)}
                                    </span>
                                    <span>·</span>
                                    <span className={critical
                                        ? 'alert-days-critical font-semibold'
                                        : 'text-text-secondary font-medium'
                                    }>
                                        {task.daysInStatus} {t('alerts.days')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StagnantTasksAlerts;
