import { ArrowBack } from "@mui/icons-material";
import { Flag } from "react-beauty-flags";


interface LanguageMenuProps {
   onBack: () => void;
}

const LanguageMenu = ({ onBack }: LanguageMenuProps) => {
   return (
       <div className="absolute right-4 top-20 w-72 bg-primary rounded-lg shadow-xl overflow-hidden z-50">
           <div className="bg-primary border-b border-primary/30">
               <button
                   onClick={onBack}
                   className="w-full p-4 text-text-secondary hover:text-text-primary flex items-center gap-3 transition-colors group"
               >
                   <ArrowBack className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                   <span className="font-medium">Language Settings</span>
               </button>
           </div>

           <div className="p-2">
               <button className="w-full p-4 text-text-primary hover:bg-primary/40 rounded-lg transition-colors flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                       <Flag code="Us" className="w-6 h-6 rounded" />
                       <span className="font-medium">English</span>
                   </div>
                   <div className="flex items-center gap-2">
                       <span className="text-sm text-text-secondary">Default</span>
                       <div className="h-2 w-2 bg-accent rounded-full group-hover:scale-125 transition-transform"/>
                   </div>
               </button>
               
               <button className="w-full p-4 text-text-secondary hover:bg-primary/40 rounded-lg transition-colors flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                       <Flag code="Es" className="w-6 h-6 rounded" />
                       <span className="font-medium">Español</span>
                   </div>
                   <div className="h-2 w-2 bg-transparent rounded-full group-hover:bg-accent/50 transition-colors"/>
               </button>
           </div>
       </div>
   );
};

export default LanguageMenu;