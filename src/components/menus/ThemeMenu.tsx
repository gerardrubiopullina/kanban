import { useContext } from 'react';
import BackButton from './BackButton';
import { LanguageContext } from '../../i18n/LanguageContext';
import { SettingsContext } from '../../context/SettingsContext';
import { ThemeMode } from '../../types';

interface ThemeMenuProps {
    onBack: () => void;
}

const themeOptions: { value: ThemeMode; preview: string }[] = [
    {
        value: 'light',
        preview: 'bg-slate-100 border-slate-300'
    },
    {
        value: 'dark',
        preview: 'bg-neutral-950 border-neutral-600'
    }
];

const ThemeMenu = ({ onBack }: ThemeMenuProps) => {
    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) throw new Error('Settings Context not found');
    const { theme, setTheme } = settingsContext;

    const getThemeLabel = (themeMode: ThemeMode) => (
        themeMode === 'light' ? t('ui.lightTheme') : t('ui.darkTheme')
    );

    return (
        <div className="absolute right-4 top-20 w-72 bg-primary/95 rounded-lg shadow-xl overflow-hidden z-50">
            <BackButton onBack={onBack} label={t('ui.themeSettings')} />
            <div className="p-2">
                {themeOptions.map(({ value, preview }) => (
                    <button
                        key={value}
                        onClick={() => setTheme(value)}
                        className="w-full p-4 text-text-secondary hover:text-text-primary hover:bg-primary/40 rounded-lg transition-colors flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full border-2 ${preview}`} />
                            <span className="font-medium">{getThemeLabel(value)}</span>
                        </div>
                        <div className={`h-2 w-2 rounded-full transition-colors ${theme === value ? 'bg-accent' : 'bg-transparent group-hover:bg-accent/50'}`} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeMenu;
