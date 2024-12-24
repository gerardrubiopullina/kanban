import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVert } from "@mui/icons-material";

interface TaskCardProps {
    id: string;
    title: string;
    description?: string;
}
  
const TaskCard = ({ id, title, description }: TaskCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
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
                        className="p-1 hover:bg-primary/40 rounded"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreVert className="h-3 w-3 text-text-secondary"/>
                    </button>
                </div>
            </div>
            {description && (
                <p className="text-text-secondary text-sm mt-2">
                    {description}
                </p>
            )}
        </div>
    );
};
  
export default TaskCard;