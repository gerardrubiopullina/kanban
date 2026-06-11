import { useContext, useRef, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { LanguageContext } from "../../i18n/LanguageContext";


export const NewTaskForm = ({ onClose }: { onClose: () => void }) => {

  const languageContext = useContext(LanguageContext);
  if (!languageContext) throw new Error('Language Context not found');
  const { t } = languageContext;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const characterLimit = 500;
  const remainingChars = characterLimit - description.length;
  
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
      <div className="form-panel w-[550px] rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">{t('tasks.newTask')}</h2>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                className="form-text-input w-full px-0 py-2 bg-transparent border-b-2 text-text-primary placeholder:text-text-secondary/50 text-lg outline-none transition-colors"
                placeholder={t('tasks.taskTitle')}
                required
                autoFocus
              />
            </div>
            
            <div className="relative">
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= characterLimit) {
                    setDescription(e.target.value);
                  }
                }}
                className="form-field w-full px-4 py-3 rounded-xl text-text-primary 
                  placeholder:text-text-secondary/50 outline-none min-h-[180px] resize-none 
                  text-base whitespace-pre-wrap overflow-y-scroll scrollbar-none"
                placeholder={t('tasks.description')}
                maxLength={characterLimit}
              />
              <span className={`absolute bottom-3 right-3 text-xs ${
                remainingChars <= 20 ? 'text-red-500' : 'text-text-secondary/50'
              }`}>
                {remainingChars}/{characterLimit}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="secondary-action px-6 py-2.5 text-text-secondary rounded-lg transition-colors font-medium"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="action-button px-6 py-2.5 bg-accent rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 font-medium"
            >
              {t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};