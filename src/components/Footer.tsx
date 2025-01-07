import { GitHub, LinkedIn } from "@mui/icons-material";
import { useContext } from "react";
import { LanguageContext } from "../i18n/LanguageContext";


const Footer = () => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    return(
        <footer className="bg-primary border-t border-primary/30 h-12 shrink-0">
            <div className="h-full flex items-center justify-between px-20">
                <p className="text-sm text-text-secondary">
                    <span className="text-text-secondary/70">{t('ui.projectBy')}</span> 
                    Gerard Rubió
                </p>
                <div className="flex gap-4">
                    <a 
                        href="https://github.com/gerardrubiopullina"
                        className="text-text-secondary hover:text-text-primary transition-colors"
                        target="_blank"
                    >
                        <GitHub className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/gerard-rubi%C3%B3-pullina-a88992243/" 
                        className="text-text-secondary hover:text-text-primary transition-colors"
                        target="_blank"
                    >
                        <LinkedIn className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;