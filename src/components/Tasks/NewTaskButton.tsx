import { Add } from "@mui/icons-material";
import NewTaskForm from "./NewTaskForm";
import { useContext, useState } from "react";
import { LanguageContext } from "../../i18n/LanguageContext";


const NewTaskButton = () => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;
    
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 px-2 py-0.5 text-accent hover:bg-accent/10 rounded-md transition-colors text-sm font-medium"
            >
                <Add className="h-3.5 w-3.5" />
                {t('common.new')}
            </button>
            {showModal && <NewTaskForm onClose={() => setShowModal(false)} />}
        </>
    );
};
  
export default NewTaskButton;