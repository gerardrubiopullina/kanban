import { useContext, useState } from 'react';
import { Language, ViewColumn } from "@mui/icons-material";
import LanguageMenu from './LanguageMenu';
import ColumnsMenu from './ColumnsMenu';
import BackButton from './BackButton';
import { LanguageContext } from '../../i18n/LanguageContext';


interface OptionsMenuProps {
    onClose: () => void;
    returnToAuth: () => void;
}

const OptionsMenu = ({ returnToAuth }: OptionsMenuProps) => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showColumnsMenu, setShowColumnsMenu] = useState(false);

    if (showLanguageMenu) {
        return <LanguageMenu onBack={() => setShowLanguageMenu(false)} />;
    }

    if (showColumnsMenu) {
        return <ColumnsMenu onBack={() => setShowColumnsMenu(false)} />;
    }

    return (
        <div className="absolute right-4 top-20 w-64 bg-primary/95 rounded-lg shadow-xl overflow-hidden z-50">
            <BackButton onBack={returnToAuth} label={t('common.settings')} />
            <div className="p-2">
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
                    onClick={() => setShowColumnsMenu(true)}
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