import { useContext, useState } from 'react';
import { Language, ViewColumn } from "@mui/icons-material";
import LanguageMenu from './LanguageMenu';
import { LanguageContext } from '../i18n/LanguageContext';

interface OptionsMenuProps {
    onClose: () => void;
}

const OptionsMenu = ({ onClose }: OptionsMenuProps) => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    if (showLanguageMenu) {
        return <LanguageMenu onBack={() => setShowLanguageMenu(false)} />;
    }

    return (
        <div className="absolute right-4 top-20 w-64 bg-primary/95 rounded-lg shadow-xl p-4 z-50">
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => setShowLanguageMenu(true)}
                    className="w-full p-3 text-text-secondary hover:bg-primary/40 rounded-lg font-medium flex items-center justify-between transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Language className="h-5 w-5" />
                        <span>{t('common.language')}</span>
                    </div>
                    <span className="text-sm text-text-secondary/50">English</span>
                </button>
                
                <button
                    onClick={onClose}
                    className="w-full p-3 text-text-secondary hover:bg-primary/40 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <ViewColumn className="h-5 w-5" />
                    <span>{t('common.columns')}</span>
                </button>
            </div>
        </div>
    );
};

export default OptionsMenu;