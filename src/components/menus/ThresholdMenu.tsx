import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { LanguageContext } from '../../i18n/LanguageContext';
import { TaskStatus } from '../../types';
import BackButton from './BackButton';
import { Add, Remove, Refresh } from '@mui/icons-material';

interface ThresholdMenuProps {
    onBack: () => void;
}

const ThresholdMenu = ({ onBack }: ThresholdMenuProps) => {
    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { thresholds, updateThreshold, resetThresholds } = settingsContext;

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const handleDecrement = (status: TaskStatus) => {
        if (thresholds[status] > 0) {
            updateThreshold(status, thresholds[status] - 1);
        }
    };

    const handleIncrement = (status: TaskStatus) => {
        if (thresholds[status] < 30) {
            updateThreshold(status, thresholds[status] + 1);
        }
    };

    return (
        <div className="absolute right-4 top-20 w-80 bg-primary/95 rounded-lg shadow-xl overflow-hidden z-50">
            <BackButton onBack={onBack} label={t('ui.thresholdSettings')} />
            
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-text-primary">
                        {t('ui.stagnantTasksSettings')}
                    </h3>
                    <button
                        onClick={resetThresholds}
                        className="p-2 text-text-secondary hover:text-text-primary rounded-full transition-colors"
                        title={t('ui.resetThresholds')}
                    >
                        <Refresh className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-5">
                    {(Object.keys(thresholds) as TaskStatus[]).map((status) => (
                        <div key={status} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-text-primary">
                                    {t(`columns.${status}`)}
                                </label>
                            </div>
                            <div className="flex items-center h-12 rounded-lg bg-primary/10 overflow-hidden">
                                <button
                                    onClick={() => handleDecrement(status)}
                                    className="h-full px-4 text-text-secondary hover:text-text-primary hover:bg-primary/20 
                                        transition-colors flex items-center"
                                    disabled={thresholds[status] === 0}
                                >
                                    <Remove className="h-5 w-5" />
                                </button>
                                
                                <div className="flex-1 flex items-center justify-center gap-2">
                                    <span className="text-lg font-medium text-text-primary">
                                        {thresholds[status]}
                                    </span>
                                    <span className="text-sm text-text-secondary">
                                        {t('alerts.days')}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleIncrement(status)}
                                    className="h-full px-4 text-text-secondary hover:text-text-primary hover:bg-primary/20 
                                        transition-colors flex items-center"
                                    disabled={thresholds[status] === 30}
                                >
                                    <Add className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThresholdMenu;