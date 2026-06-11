
export type TaskStatus = 'todo' | 'inProgress' | 'reviewing' | 'done';
export type ThemeMode = 'light' | 'dark';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    statusUpdatedAt: string;
}