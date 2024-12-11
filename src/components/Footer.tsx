import { GitHub, LinkedIn } from "@mui/icons-material";


const Footer = () => (
    <footer className="bg-primary border-t border-primary/30 h-12 shrink-0">
        <div className="h-full flex items-center justify-between px-20">
            <p className="text-sm text-text-secondary">
                <span className="text-text-secondary/70">Kanban board Project by</span> 
                Gerard Rubió
            </p>
            <div className="flex gap-4">
                <a href="https://github.com" className="text-text-secondary hover:text-text-primary transition-colors">
                    <GitHub className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" className="text-text-secondary hover:text-text-primary transition-colors">
                    <LinkedIn className="w-5 h-5" />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;