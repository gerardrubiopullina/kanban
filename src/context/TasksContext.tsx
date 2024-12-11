import { createContext } from "react";
import { Task, TaskStatus } from "../types";


interface TasksContextType {
    tasks: Task[];
    addTask: (title: string, description?: string) => void;
    moveTask: (taskId: number, newStatus: TaskStatus) => void;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

