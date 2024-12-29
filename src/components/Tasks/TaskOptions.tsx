import { useEffect, useRef } from 'react';
import { Edit, Delete } from "@mui/icons-material";

interface TaskOptionsProps {
    onClose: () => void;
    buttonPosition: { x: number, y: number } | null;
}

const TaskOptions = ({ onClose, buttonPosition }: TaskOptionsProps) => {
    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!buttonPosition) return null;

    return (
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
                onClick={() => {
                    console.log('Edit clicked');
                    onClose();
                }}
                className="p-2 text-text-primary hover:bg-primary/30 transition-colors rounded-md"
            >
                <Edit className="h-4 w-4" />
            </button>
            <button
                onClick={() => {
                    console.log('Delete clicked');
                    onClose();
                }}
                className="p-2 text-text-primary hover:bg-primary/30 transition-colors rounded-md"
            >
                <Delete className="h-4 w-4" />
            </button>
        </div>
    );
};

export default TaskOptions;