import { ReactNode, useContext, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Add, DeleteSweep } from "@mui/icons-material";

import { TasksContext } from "../context/TasksContext";

import NewTaskButton from "./Tasks/NewTaskButton";
import NewTaskForm from "./Tasks/NewTaskForm";
import DeleteConfirmation from "./Tasks/DeleteConfirmation";
import { LanguageContext } from "../i18n/LanguageContext";

interface ColumnProps {
    title: string;
    droppableId: string;
    children?: ReactNode;
    count: number;
}

const Column = ({ title, droppableId, children, count }: ColumnProps) => {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) throw new Error('Language Context not found');
    const { t } = languageContext;
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { setNodeRef, isOver } = useDroppable({
        id: droppableId,
        data: {
            type: 'column'
        }
    });

    const tasksContext = useContext(TasksContext);
    if (!tasksContext) throw new Error('Tasks Context not found');
    const { deleteCompletedTasks } = tasksContext;

    const handleDeleteCompleted = async () => {
        try {
            await deleteCompletedTasks();
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error('Failed to delete completed tasks:', error);
        }
    };

    return (
        <div 
            ref={setNodeRef}
            className={`bg-primary/20 w-80 h-full flex flex-col rounded-lg transition-colors
                ${isOver ? 'bg-primary/30' : ''}`}
        >
            <div className="px-4 py-3 border-b border-primary/30 flex justify-between items-center">
                <h3 className="text-text-primary font-semibold flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                    {title}
                </h3>
                <div className="flex items-center gap-3">
                    {droppableId === 'todo' && count > 0 && <NewTaskButton />}
                    <span className="text-text-secondary text-sm px-2 py-1 bg-primary/30 rounded-full min-w-[28px] text-center">
                        {count}
                    </span>
                    {droppableId === 'done' && count > 0 &&
                        <button
                            onClick={() => setShowDeleteConfirmation(true)}
                            className="text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <DeleteSweep/>
                        </button>
                    }
                </div>
            </div>
            <div className="flex-1 p-2 overflow-y-auto scrollbar-thin 
                scrollbar-track-transparent scrollbar-thumb-text-secondary/20"
            >
                {children}
                {droppableId === 'todo' && count === 0 && (
                    <div className="h-full flex items-center justify-center">
                        <button 
                            onClick={() => setShowModal(true)}
                            className="flex flex-col items-center gap-2 p-6 rounded-xl hover:bg-primary/20 transition-colors group"
                        >
                            <Add className="h-10 w-10 text-text-secondary/30 group-hover:text-text-secondary/50" />
                            <span className="text-text-secondary/50 text-sm group-hover:text-text-secondary">{t('tasks.addNewTasks')}</span>
                        </button>
                    </div>
                )}
            </div>

            {showModal && <NewTaskForm onClose={() => setShowModal(false)} />}

            {showDeleteConfirmation && (
                <DeleteConfirmation
                    taskId="completed"
                    taskTitle="all completed tasks"
                    onClose={() => setShowDeleteConfirmation(false)}
                    customDeleteHandler={handleDeleteCompleted}
                />
            )}
        </div>
    );
};

export default Column;