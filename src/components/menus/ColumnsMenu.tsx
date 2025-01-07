import { useContext } from "react";
import { Switch } from "@mui/material";
import BackButton from "./BackButton";
import { LanguageContext } from "../../i18n/LanguageContext";
import { SettingsContext } from "../../context/SettingsContext";

interface ColumnsMenuProps {
   onBack: () => void;
}

const ColumnsMenu = ({ onBack }: ColumnsMenuProps) => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { showReview, showDescriptions, error, setError, setShowDescriptions, toggleReviewColumn } = settingsContext;

    return (
        <div 
            className="absolute right-4 top-20 w-64 bg-primary/95 rounded-lg shadow-xl overflow-hidden z-50"
            onMouseLeave={() => setError(null)}
        >
            <BackButton onBack={onBack} label={t('ui.colSettings')} />
            <div className="p-2">
                <div className="w-full p-3 text-text-secondary hover:bg-primary/40 rounded-lg font-medium flex flex-col">
                    <div className="flex items-center justify-between">
                        <span>{t('ui.showReview')}</span>
                        <Switch
                            checked={showReview}
                            onChange={toggleReviewColumn}
                            size="small"
                        />
                    </div>
                    {error && (
                        <span className="text-red-500 text-xs mt-1">{t(error)}</span>
                    )}
                </div>

                <div className="w-full p-3 text-text-secondary hover:bg-primary/40 rounded-lg font-medium flex items-center justify-between transition-colors">
                    <span>{t('ui.hideDesc')}</span>
                    <Switch
                        checked={showDescriptions}
                        onChange={() => setShowDescriptions(!showDescriptions)}
                        size="small"
                    />
                </div>
            </div>
        </div>
    );
};

export default ColumnsMenu;