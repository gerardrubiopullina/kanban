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
            task.id === taskId 
                ? { ...task, status: newStatus }
                : task
        ));
    };

    const reorderTasks = (taskId: number, newStatus: TaskStatus, newIndex: number) => {
        const taskToMove = tasks.find(t => t.id === taskId);
        if (!taskToMove) return;

        const newTasks = tasks.filter(t => t.id !== taskId);
        const targetStatusTasks = newTasks.filter(t => t.status === newStatus);
        
        taskToMove.status = newStatus;
        targetStatusTasks.splice(newIndex, 0, taskToMove);
        
        setTasks([
            ...newTasks.filter(t => t.status !== newStatus),
            ...targetStatusTasks
        ]);
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, moveTask, reorderTasks }}>
            {children}
        </TasksContext.Provider>
    );
}