import { useState } from "react";
import { authService } from "../auth/authService";

interface AuthPopupProps {
    onClose: () => void;
}
  
export const AuthPopup = ({ onClose }: AuthPopupProps) => {

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
        <div className="absolute right-4 top-20 w-80 bg-primary/95 rounded-lg shadow-xl p-6 z-50">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Sign In</h2>
            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full p-2 bg-accent text-primary rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50"
            >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Continue with Google
            </button>
            <button 
                onClick={onClose}
                className="mt-4 text-text-secondary text-sm w-full text-center"
            >
                Cancel
            </button>
        </div>
    );
};