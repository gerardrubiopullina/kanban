import { ReactNode, useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { Language } from "./types";
import { translations } from "./translations";


const LANGUAGE_KEY = 'kanban_language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
        return (savedLanguage as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem(LANGUAGE_KEY, language);
    }, [language]);
  
    const t = (key: string) => {
        const keys = key.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result = translations[language] as Record<string, any>;
        
        for (const k of keys) {
            if (!result?.[k]) return key;
            result = result[k];
        }
        
        return String(result);
    };
  
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};