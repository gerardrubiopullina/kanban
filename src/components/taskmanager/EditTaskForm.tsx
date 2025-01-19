import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { LanguageContext } from "../../i18n/LanguageContext";

interface EditTaskFormProps {
    taskId: string;
    initialTitle: string;
    initialDescription?: string;
    onClose: () => void;
}

const EditTaskForm = ({ taskId, initialTitle, initialDescription = "", onClose }: EditTaskFormProps) => {
    
    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isLoading, setIsLoading] = useState(false);

    const characterLimit = 500;
    const remainingChars = characterLimit - description.length;
  
    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error('Tasks Context not found');
    const { updateTask } = tasksContext;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        setIsLoading(true);
        try {
            await updateTask(taskId, title.trim(), description.trim());
            onClose();
        } catch (error) {
            console.error('Failed to update task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
            <div className="bg-background w-[550px] rounded-xl shadow-2xl">
                <form onSubmit={handleSubmit} className="p-8">
                    <h2 className="text-2xl font-semibold text-text-primary mb-8">{t('tasks.editTask')}</h2>

                    <div className="space-y-6">
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-0 py-2 bg-transparent border-b-2 border-primary/30 text-text-primary placeholder:text-text-secondary/50 text-lg outline-none focus:border-accent transition-colors"
                                placeholder="Task title"
                                required
                            />
                        </div>
                        
                        <div className="relative">
                            <textarea
                                value={description}
                                onChange={(e) => {
                                    if (e.target.value.length <= characterLimit) {
                                        setDescription(e.target.value);
                                    }
                                }}
                                className="w-full px-4 py-3 bg-primary/10 rounded-xl text-text-primary 
                                    placeholder:text-text-secondary/50 outline-none min-h-[180px] resize-none 
                                    text-base whitespace-pre-wrap overflow-y-scroll scrollbar-none"
                                placeholder={t('tasks.description')}
                                maxLength={characterLimit}
                            />
                            <span className={`absolute bottom-2 right-2 text-xs ${
                                remainingChars <= 50 ? 'text-red-500' : 'text-text-secondary/50'
                            }`}>
                                {remainingChars}/{characterLimit}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-text-secondary hover:text-text-primary transition-colors font-medium"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !title.trim()}
                            className="px-6 py-2.5 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 font-medium"
                        >
                            {t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskForm;