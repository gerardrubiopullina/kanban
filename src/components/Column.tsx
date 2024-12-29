import { ReactNode, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Add, DeleteSweep } from "@mui/icons-material";
import NewTaskButton from "./Tasks/NewTaskButton";
import NewTaskForm from "./Tasks/NewTaskForm";

interface ColumnProps {
    title: string;
    droppableId: string;
    children?: ReactNode;
    count: number;
}

const Column = ({ title, droppableId, children, count }: ColumnProps) => {

    const [showModal, setShowModal] = useState(false);
    const { setNodeRef } = useDroppable({
        id: droppableId,
        data: {
            type: 'column'
        }
    });

    return (
        <div 
            ref={setNodeRef}
            className="bg-primary/20 w-80 h-full flex flex-col rounded-lg"
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
                        <DeleteSweep className="text-text-secondary cursor-pointer"/>
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
                            <span className="text-text-secondary/50 text-sm group-hover:text-text-secondary">Add new tasks</span>
                        </button>
                    </div>
                )}
            </div>
            {showModal && <NewTaskForm onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Column;