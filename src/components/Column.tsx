import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DeleteSweep } from "@mui/icons-material";

interface ColumnProps {
    title: string;
    droppableId: string;
    children?: ReactNode;
    count: number;
}

const Column = ({ title, droppableId, children, count }: ColumnProps) => {
    
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
                <div className="flex gap-2">
                    <span className="text-text-secondary text-sm px-2 py-1 bg-primary/30 rounded-full">
                        {count}
                    </span>
                    {droppableId == 'done' && count > 0 &&
                        <DeleteSweep className="text-text-secondary cursor-pointer"/>
                    }
                </div>
            </div>
            <div className="flex-1 p-2">
                {children}
            </div>
        </div>
    );
};

export default Column;