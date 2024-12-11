
export type TaskStatus = 'todo' | 'inProgress' | 'reviewing' | 'done';

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
}