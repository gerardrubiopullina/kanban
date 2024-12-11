import { ReactNode } from "react";


interface ColumnProps {
    title: string;
    children?: ReactNode;
}

const Column = ({ title, children }: ColumnProps) => {
    return (
        <div className="bg-primary/20 w-80 h-[calc(100vh-12rem)] flex flex-col rounded-lg">
            <div className="px-4 py-3 border-b border-primary/30">
                <h3 className="text-text-primary font-semibold flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                    {title}
                </h3>
            </div>
            <div className="flex-1 overflow-auto px-2">
                {children}
            </div>
        </div>
    );
};

export default Column;