import { useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVert } from "@mui/icons-material";
import TaskOptions from "./Tasks/TaskOptions";


interface TaskCardProps {
    id: string;
    title: string;
    description?: string;
}
  
const TaskCard = ({ id, title, description }: TaskCardProps) => {

    const [showOptions, setShowOptions] = useState(false);
    const [buttonPosition, setButtonPosition] = useState<{ x: number, y: number } | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    };

    const handleOptionsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const button = buttonRef.current;
        if (button) {
            const rect = button.getBoundingClientRect();
            setButtonPosition({ x: rect.right + 5, y: rect.top });
        }
        setShowOptions(!showOptions);
    };

    //ux styling 
    const formatDescription = (text: string) => {
        return text.split('\n').map((line, i) => {
            //lists
            if (line.startsWith('- ')) {
                return (
                    <li key={i} className="ml-4">
                        {line.substring(2)}
                    </li>
                );
            }
            return <p key={i}>{line}</p>;
        });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-primary/30 rounded-lg p-4 mb-3 group hover:bg-primary/40 transition-colors cursor-grab active:cursor-grabbing"
        >
            <div className="flex justify-between items-start">
                <h4 className="text-text-primary font-medium">{title}</h4>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        ref={buttonRef}
                        className="p-1 hover:bg-primary/40 rounded"
                        onClick={handleOptionsClick}
                    >
                        <MoreVert className="h-3 w-3 text-text-secondary"/>
                    </button>
                </div>
            </div>
            {description && (
                <div className="text-text-secondary text-sm mt-2">
                    {formatDescription(description)}
                </div>
            )}
            {showOptions && (
                <TaskOptions 
                    onClose={() => setShowOptions(false)}
                    buttonPosition={buttonPosition}
                    taskId={id}
                    taskTitle={title}
                    taskDescription={description}
                />
            )}
        </div>
    );
};
  
export default TaskCard;