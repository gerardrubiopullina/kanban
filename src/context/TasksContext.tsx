import { createContext } from "react";
import { Task, TaskStatus } from "../types";

interface TasksContextType {
    tasks: Task[];
    addTask: (title: string, description?: string) => void;
    moveTask: (taskId: string, newStatus: TaskStatus) => void;
    reorderTasks: (taskId: string, newStatus: TaskStatus, newIndex: number) => void;
    updateTask: (taskId: string, title: string, description?: string) => void;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);