import { ReactNode, useEffect, useState } from "react";
import { Task, TaskStatus } from "../types";
import { TasksContext } from "./TasksContext";
import { tasksService } from "../firebase/tasksService";

export function TasksProvider({ children }: { children: ReactNode }) {
    
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await tasksService.getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };

        loadTasks();
    }, []);

    const addTask = async(title: string, description?: string) => {
        const newTask = {
            title,
            description,
            status: 'todo' as TaskStatus
        };

        try {
            const id = await tasksService.addTask(newTask);
            setTasks(prev => [...prev, { ...newTask, id }]);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const moveTask = async(taskId: string, newStatus: TaskStatus) => {
        try {
            await tasksService.updateTask(taskId, { status: newStatus });
            setTasks(tasks.map(task =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            ));
        } catch (error) {
            console.error('Failed to move task:', error);
        }
    };

    const reorderTasks = async(taskId: string, newStatus: TaskStatus, newIndex: number) => {
        const taskToMove = tasks.find(t => t.id === taskId);
        if (!taskToMove) return;

        try {
            await tasksService.updateTask(taskId, { status: newStatus });
            
            const newTasks = tasks.filter(t => t.id !== taskId);
            const targetStatusTasks = newTasks.filter(t => t.status === newStatus);
            
            taskToMove.status = newStatus;
            targetStatusTasks.splice(newIndex, 0, taskToMove);
            
            setTasks([
                ...newTasks.filter(t => t.status !== newStatus),
                ...targetStatusTasks
            ]);
        } catch (error) {
            console.error('Failed to reorder task:', error);
        }
    };

    const updateTask = async(taskId: string, title: string, description?: string) => {
        try {
            await tasksService.updateTask(taskId, {title, description});
            setTasks(tasks.map(task =>
                task.id === taskId
                    ? {...task, title, description}
                    : task
            ));
        } catch (error) {
            console.log('Failed to update task:', error);
        }
    }

    const deleteTask = async(taskId: string) => {
        try {
            await tasksService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task:', error)
            throw error;
        }
    }

    const deleteCompletedTasks = async() => {
        try {
            const completedTasks = tasks.filter(task => task.status === 'done');
            await Promise.all(completedTasks.map(task => tasksService.deleteTask(task.id)));
            setTasks(tasks.filter(task => task.status !== 'done'));
        } catch (error) {
            console.error('Failed to delete completed tasks:', error);
            throw error;
        }
    }

    return (
        <TasksContext.Provider 
            value={{ 
                tasks, 
                addTask, 
                moveTask, 
                reorderTasks,
                updateTask,
                deleteTask,
                deleteCompletedTasks
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}