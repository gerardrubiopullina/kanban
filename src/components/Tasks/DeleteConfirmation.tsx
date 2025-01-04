import { useContext, useState } from 'react';
import { TasksContext } from '../../context/TasksContext';

interface DeleteConfirmationProps {
  taskId: string;
  taskTitle: string;
  onClose: () => void;
}

const DeleteConfirmation = ({ taskId, taskTitle, onClose }: DeleteConfirmationProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error('Tasks Context not found');
  
    const { deleteTask } = tasksContext;

    const handleDelete = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteTask(taskId);
            // console.log('Task deleted successfully:', taskId);
            onClose();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            console.error('Failed to delete task:', err);
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-background w-[400px] rounded-xl shadow-2xl">
                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">Delete Task</h2>
                    <p className="text-text-secondary mb-8">
                        Are you sure you want to delete "{taskTitle}"? This action cannot be undone.
                    </p>
                    {error && (
                        <p className="text-red-500 mb-4">
                            Error: {error}
                        </p>
                    )}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 text-text-secondary hover:text-text-primary transition-colors font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50"
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;