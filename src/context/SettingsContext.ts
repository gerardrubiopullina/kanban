import { createContext } from "react";


interface SettingsContextType {
    showReview: boolean;
    showDescriptions: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    setShowDescriptions: (show: boolean) => void;
    toggleReviewColumn: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);