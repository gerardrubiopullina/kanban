import { ReactNode, useState } from "react";
import { Task, TaskStatus } from "../types";
import { TasksContext } from "./TasksContext";


export function TasksProvider({ children }: { children: ReactNode }) {
    
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: "Implement User Authentication", description: "Set up Firebase auth", status: "todo" },
        { id: 2, title: "Design System Documentation", description: "Create docs for components", status: "todo" },
        { id: 3, title: "API Integration", description: "Connect frontend with backend", status: "inProgress" },
    ]);

    const addTask = (title: string, description?: string) => {
        const newId = Math.max(0, ...tasks.map(t => t.id)) + 1;
        setTasks([...tasks, { id: newId, title, description, status: 'todo' }]);
    };

    const moveTask = (taskId: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, moveTask }}>
            {children}
        </TasksContext.Provider>
    );
}