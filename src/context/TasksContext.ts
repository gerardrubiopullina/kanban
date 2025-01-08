import { createContext } from "react";
import { Task, TaskStatus } from "../types";

interface TasksContextType {
    tasks: Task[];
    isLoading: boolean;
    addTask: (title: string, description?: string) => void;
    moveTask: (taskId: string, newStatus: TaskStatus) => void;
    reorderTasks: (taskId: string, newStatus: TaskStatus, newIndex: number) => void;
    updateTask: (taskId: string, title: string, description?: string) => void;
    deleteTask: (taskId: string) => Promise<void>;
    deleteCompletedTasks: () => Promise<void>;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);