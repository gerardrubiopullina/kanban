import { createContext } from "react";
import { TaskStatus, ThemeMode } from "../types";

interface ThresholdSettings {
    todo: number;
    inProgress: number;
    reviewing: number;
    done: number;
}

interface SettingsContextType {
    showReview: boolean;
    showDescriptions: boolean;
    error: string | null;
    thresholds: ThresholdSettings;
    theme: ThemeMode;
    setError: (error: string | null) => void;
    setShowDescriptions: (show: boolean) => void;
    setTheme: (theme: ThemeMode) => void;
    toggleReviewColumn: () => void;
    updateThreshold: (status: TaskStatus, days: number) => void;
    resetThresholds: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);