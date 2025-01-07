import { useState, useContext, useEffect, useRef } from "react";
import { Person } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../i18n/LanguageContext";
import { AuthPopup } from "./menus/AuthPopup";

const Header = () => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const { user } = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showPopup && 
                popupRef.current && 
                buttonRef.current && 
                !popupRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showPopup]);

    return (
        <header className="bg-primary shadow-lg relative">
            <div className="px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">K</span>
                    </div>
                    <h1 className="text-xl font-semibold text-text-primary">{t('ui.title')}</h1>
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3 px-4 py-1.5 bg-accent/10 rounded-full">
                            <span className="text-accent text-sm font-medium">
                                {user.email}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <button 
                                onClick={() => setShowPopup(true)}
                                className="px-3 py-1 text-text-secondary hover:text-accent transition-colors"
                            >
                                <span className="text-sm">Login to save your tasks</span>
                            </button>
                        </div>
                    )}
                    <button 
                        ref={buttonRef}
                        onClick={() => setShowPopup(!showPopup)}
                        className="p-2 rounded-full hover:bg-primary/40"
                    >
                        <Person className="h-5 w-5 text-accent hover:text-accent/80 transition-colors" />
                    </button>
                </div>
            </div>
            {showPopup && (
                <div ref={popupRef}>
                    <AuthPopup onClose={() => setShowPopup(false)} />
                </div>
            )}
        </header>
    );
};

export default Header;