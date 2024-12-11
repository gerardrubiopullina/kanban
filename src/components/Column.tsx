import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
    title: string;
    droppableId: string;
    children?: ReactNode;
}

const Column = ({ title, droppableId, children }: ColumnProps) => {
    
    const { setNodeRef } = useDroppable({
        id: droppableId,
        data: {
            type: 'column'
        }
    });

    return (
        <div 
            ref={setNodeRef}
            className="bg-primary/20 w-80 h-[calc(100vh-12rem)] flex flex-col rounded-lg"
        >
            <div className="px-4 py-3 border-b border-primary/30">
                <h3 className="text-text-primary font-semibold flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                    {title}
                </h3>
            </div>
            <div className="flex-1 px-2">
                {children}
            </div>
        </div>
    );
};

export default Column;