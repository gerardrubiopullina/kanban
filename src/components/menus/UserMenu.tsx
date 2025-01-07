import { useContext, useState } from "react";
import { authService } from "../../auth/authService";
import { Login, Logout } from "@mui/icons-material";
import { AuthPopup } from "./AuthPopup";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../i18n/LanguageContext";


export const UserMenu = () => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const { user } = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);
  
    return (
        <div className="flex items-center gap-4">
            {user ? (
                <div className="flex items-center gap-3">
                    <img 
                        src={user.photoURL || '/default-avatar.png'} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 text-text-primary">{user.displayName}</span>
                    <button 
                        onClick={() => authService.signOut()}
                        className="p-2 hover:bg-primary/40 rounded-full"
                    >
                        <Logout className="h-5 w-5 text-text-secondary" />
                    </button>
                </div>
            ) : (
                <>
                    <span className="text-white">{t('common.login')}</span>
                    <button 
                        onClick={() => setShowPopup(true)}
                        className="p-2 hover:bg-primary/40 rounded-full"
                    >
                        <Login className="h-5 w-5 text-text-secondary" />
                    </button>
                </>
            )}
            {showPopup && !user && <AuthPopup onClose={() => setShowPopup(false)} />}
        </div>
    );
};