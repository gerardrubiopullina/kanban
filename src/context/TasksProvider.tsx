import { ReactNode, useContext, useEffect, useState } from "react";
import { Task, TaskStatus } from "../types";
import { TasksContext } from "./TasksContext";
import { tasksService } from "../firebase/tasksService";
import { AuthContext } from "./AuthContext";


const LOCALSTORAGE_KEY = 'kanban_tasks';

export function TasksProvider({ children }: { children: ReactNode }) {
    
    const { user } = useContext(AuthContext);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadTasks = async () => {
        setIsLoading(true);
        try {
            if (user) {
                const fetchedTasks = await tasksService.getTasks(user);
                setTasks(fetchedTasks);
            } else {
                const savedTasks = localStorage.getItem(LOCALSTORAGE_KEY);
                if (savedTasks) {
                    setTasks(JSON.parse(savedTasks));
                }
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const saveTasks = (updatedTasks: Task[]) => {
        if (!user) {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedTasks));
        }
    };

    const getNextLocalId = () => {
        const maxId = tasks.reduce((max, task) => {
            const numId = parseInt(task.id.replace('local_', ''));
            return numId > max ? numId : max;
        }, 0);
        return `local_${maxId + 1}`;
    };

    const addTask = async(title: string, description?: string) => {
        const newTask = {
            title,
            description,
            status: 'todo' as TaskStatus
        };

        try {
            if (user) {
                const id = await tasksService.addTask(user, newTask);
                setTasks(prev => [...prev, { ...newTask, id }]);
            } else {
                const id = getNextLocalId();
                const taskWithId = { ...newTask, id };
                const updatedTasks = [...tasks, taskWithId];
                setTasks(updatedTasks);
                saveTasks(updatedTasks);
            }
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const moveTask = async(taskId: string, newStatus: TaskStatus) => {
        try {
            if (user) {
                await tasksService.updateTask(user, taskId, { status: newStatus });
            }
            const updatedTasks = tasks.map(task =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            );
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to move task:', error);
        }
    };

    const reorderTasks = async(taskId: string, newStatus: TaskStatus, newIndex: number) => {
        const taskToMove = tasks.find(t => t.id === taskId);
        if (!taskToMove) return;

        try {
            if (user) {
                await tasksService.updateTask(user, taskId, { status: newStatus });
            }
            
            const newTasks = tasks.filter(t => t.id !== taskId);
            const targetStatusTasks = newTasks.filter(t => t.status === newStatus);
            
            taskToMove.status = newStatus;
            targetStatusTasks.splice(newIndex, 0, taskToMove);
            
            const updatedTasks = [
                ...newTasks.filter(t => t.status !== newStatus),
                ...targetStatusTasks
            ];
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to reorder task:', error);
        }
    };

    const updateTask = async(taskId: string, title: string, description?: string) => {
        try {
            if (user) {
                await tasksService.updateTask(user, taskId, { title, description });
            }
            const updatedTasks = tasks.map(task =>
                task.id === taskId
                    ? { ...task, title, description }
                    : task
            );
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } catch (error) {
            console.log('Failed to update task:', error);
        }
    }

    const deleteTask = async(taskId: string) => {
        try {
            if (user) {
                await tasksService.deleteTask(user, taskId);
            }
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to delete task:', error)
            throw error;
        }
    }

    const deleteCompletedTasks = async() => {
        try {
            const completedTasks = tasks.filter(task => task.status === 'done');
            if (user) {
                await Promise.all(completedTasks.map(task => tasksService.deleteTask(user, task.id)));
            }
            const updatedTasks = tasks.filter(task => task.status !== 'done');
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to delete completed tasks:', error);
            throw error;
        }
    }

    return (
        <TasksContext.Provider 
            value={{ 
                tasks: isLoading ? [] : tasks,
                isLoading, 
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