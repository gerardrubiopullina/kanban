import { ReactNode, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { Language } from "./types";
import { translations } from "./translations";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    
    const [language, setLanguage] = useState<Language>('en');
  
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