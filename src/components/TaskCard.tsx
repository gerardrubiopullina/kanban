import { MoreVert } from '@mui/icons-material';


interface TaskCardProps {
    title: string;
    description?: string;
}
  
const TaskCard = ({ title, description }: TaskCardProps) => {
    return (
        <div className="bg-primary/30 rounded-lg p-4 mb-3 group hover:bg-primary/40 transition-colors">
            <div className="flex justify-between items-start">
                <h4 className="text-text-primary font-medium">{title}</h4>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-primary/40 rounded">
                        <MoreVert className="h-3 w-3 text-text-secondary" />
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