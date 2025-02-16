
export type TaskStatus = 'todo' | 'inProgress' | 'reviewing' | 'done';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    statusUpdatedAt: string;
}