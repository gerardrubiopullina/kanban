import { useState, useContext } from "react";
import { Google, Logout, Settings } from "@mui/icons-material";
import { authService } from "../auth/authService";
import { AuthContext } from "../context/AuthContext";

interface AuthPopupProps {
    onClose: () => void;
}
  
export const AuthPopup = ({ onClose }: AuthPopupProps) => {
    
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await authService.googleSignIn();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
  
    return (
        <div className="absolute right-4 top-20 w-64 bg-primary/95 rounded-lg shadow-xl p-4 z-50">
            {user ? (
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="w-full p-2 text-text-secondary hover:bg-primary/40 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </button>
                    <div className="my-2 border-t border-text-primary/30"></div>
                    <button
                        onClick={() => {
                            authService.signOut();
                            onClose();
                        }}
                        className="w-full p-2 text-text-secondary hover:bg-primary/40 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Logout className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-sm font-medium text-text-secondary mb-3">Sign in with</h2>
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full p-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <Google className="h-5 w-5" />
                        Google
                    </button>
                </>
            )}
        </div>
    );
};