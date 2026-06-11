import { useContext, useState } from 'react';

import { Language, Palette, ViewColumn, Timer } from "@mui/icons-material";
import { LanguageContext } from '../../i18n/LanguageContext';
import { SettingsContext } from '../../context/SettingsContext';

import LanguageMenu from './LanguageMenu';
import ColumnsMenu from './ColumnsMenu';
import ThresholdMenu from './ThresholdMenu';
import ThemeMenu from './ThemeMenu';
import BackButton from './BackButton';

interface OptionsMenuProps {
    onClose: () => void;
    returnToAuth: () => void;
}

const OptionsMenu = ({ returnToAuth }: OptionsMenuProps) => {
    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t, language } = languageContext;

    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { theme } = settingsContext;

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showColumnsMenu, setShowColumnsMenu] = useState(false);
    const [showThresholdMenu, setShowThresholdMenu] = useState(false);
    const [showThemeMenu, setShowThemeMenu] = useState(false);

    const getLanguageDisplay = (lang: string) => {
        switch(lang) {
            case 'en':
                return 'English';
            case 'es':
                return 'Español';
            default:
                return 'English';
        }
    };

    const getThemeDisplay = () => (
        theme === 'light' ? t('ui.lightTheme') : t('ui.darkTheme')
    );

    if (showLanguageMenu) {
        return <LanguageMenu onBack={() => setShowLanguageMenu(false)} />;
    }

    if (showColumnsMenu) {
        return <ColumnsMenu onBack={() => setShowColumnsMenu(false)} />;
    }

    if (showThresholdMenu) {
        return <ThresholdMenu onBack={() => setShowThresholdMenu(false)} />;
    }

    if (showThemeMenu) {
        return <ThemeMenu onBack={() => setShowThemeMenu(false)} />;
    }

    return (
        <div className="absolute right-4 top-20 w-64 bg-primary/95 rounded-lg shadow-xl overflow-hidden z-50">
            <BackButton onBack={returnToAuth} label={t('common.settings')} />
            <div className="p-2">
                <button
                    onClick={() => setShowLanguageMenu(true)}
                    className="w-full p-3 text-text-secondary hover:text-text-primary hover:bg-primary/40 rounded-lg font-medium flex items-center justify-between transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Language className="h-5 w-5" />
                        <span>{t('common.language')}</span>
                    </div>
                    <span className="text-sm text-text-secondary/50">{getLanguageDisplay(language)}</span>
                </button>

                <button
                    onClick={() => setShowThemeMenu(true)}
                    className="w-full p-3 text-text-secondary hover:text-text-primary hover:bg-primary/40 rounded-lg font-medium flex items-center justify-between transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        <span>{t('common.theme')}</span>
                    </div>
                    <span className="text-sm text-text-secondary/50">{getThemeDisplay()}</span>
                </button>
                
                <button
                    onClick={() => setShowColumnsMenu(true)}
                    className="w-full p-3 text-text-secondary hover:text-text-primary hover:bg-primary/40 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <ViewColumn className="h-5 w-5" />
                    <span>{t('common.columns')}</span>
                </button>

                <button
                    onClick={() => setShowThresholdMenu(true)}
                    className="w-full p-3 text-text-secondary hover:text-text-primary hover:bg-primary/40 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Timer className="h-5 w-5" />
                    <span>{t('ui.stagnantSettings')}</span>
                </button>
            </div>
        </div>
    );
};

export default OptionsMenu;