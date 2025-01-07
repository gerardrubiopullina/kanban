import { useEffect, useRef, useState } from 'react';
import { Edit, Delete } from "@mui/icons-material";

import DeleteConfirmation from './DeleteConfirmation';
import EditTaskForm from './EditTaskForm';

interface TaskOptionsProps {
    onClose: () => void;
    buttonPosition: { x: number, y: number } | null;
    taskId: string;
    taskTitle: string;
    taskDescription?: string;
}

const TaskOptions = ({ 
    onClose, 
    buttonPosition,
    taskId,
    taskTitle,
    taskDescription
}: TaskOptionsProps) => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const optionsRef = useRef<HTMLDivElement>(null);
    const deleteDialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //don't close if clicking inside options menu or delete confirmation
            if (
                (optionsRef.current && optionsRef.current.contains(event.target as Node)) ||
                (deleteDialogRef.current && deleteDialogRef.current.contains(event.target as Node))
            ) {
                return;
            }
            onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!buttonPosition) return null;

    if (showEditForm) {
        return (
            <EditTaskForm
                taskId={taskId}
                initialTitle={taskTitle}
                initialDescription={taskDescription}
                onClose={() => {
                    setShowEditForm(false);
                    onClose();
                }}
            />
        );
    }

    return (
        <>
        <div 
            ref={optionsRef}
            style={{
                position: 'fixed',
                left: `${buttonPosition.x + 15}px`,
                top: `${buttonPosition.y - 10}px`,
            }}
            className="flex flex-col p-1 gap-1 bg-background rounded-lg 
                shadow-xl overflow-hidden z-50 border border-primary/30"
            >
            <button
                onClick={() => setShowEditForm(true)}
                className="p-2 text-text-primary hover:bg-primary/30 transition-colors rounded-md"
            >
                <Edit className="h-4 w-4" />
            </button>
            <button
                onClick={() => setShowDeleteDialog(true)}
                className="p-2 text-text-primary hover:bg-primary/30 transition-colors rounded-md"
            >
                <Delete className="h-4 w-4" />
            </button>
        </div>

        {
            showDeleteDialog && (
                <div ref={deleteDialogRef}>
                    <DeleteConfirmation
                        taskId={taskId}
                        taskTitle={taskTitle}
                        onClose={() => {
                            setShowDeleteDialog(false);
                            onClose();
                        }}
                    />
                </div>
            )
        }
        </>
    );
};

export default TaskOptions;