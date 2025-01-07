import { useContext, useRef, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { LanguageContext } from "../../i18n/LanguageContext";


const NewTaskForm = ({ onClose }: { onClose: () => void }) => {

  const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  
  const tasksContext = useContext(TasksContext);
  if (!tasksContext) throw new Error('Tasks Context not found');
  
  const { addTask } = tasksContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      await addTask(title.trim(), description.trim());
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      descriptionRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-background w-[550px] rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">{t('tasks.newTask')}</h2>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                className="w-full px-0 py-2 bg-transparent border-b-2 border-primary/30 text-text-primary placeholder:text-text-secondary/50 text-lg outline-none focus:border-accent transition-colors"
                placeholder={t('tasks.taskTitle')}
                required
                autoFocus
              />
            </div>
            
            <div>
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-primary/10 rounded-xl text-text-primary placeholder:text-text-secondary/50 outline-none min-h-[180px] resize-none text-base whitespace-pre-wrap"
                placeholder={t('tasks.description')}
              />
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
              {t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;