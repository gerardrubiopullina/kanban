import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from './config';
import { Task } from '../types';
import { User } from 'firebase/auth';

export const tasksService = {
    async getTasks(user: User) {
        try {
            const userTasksCollection = collection(db, `users/${user.uid}/tasks`);
            const querySnapshot = await getDocs(userTasksCollection);
            
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                status: doc.data().status
            } as Task));
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
    },

    async addTask(user: User, task: Omit<Task, 'id'>) {
        try {
            const userTasksCollection = collection(db, `users/${user.uid}/tasks`);
            const docRef = await addDoc(userTasksCollection, {
                title: task.title,
                description: task.description,
                status: task.status,
                createdAt: new Date().toISOString()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    },

    async updateTask(user: User, taskId: string, updates: Partial<Task>) {
        try {
            const taskRef = doc(db, `users/${user.uid}/tasks`, taskId);
            await updateDoc(taskRef, updates);
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    async deleteTask(user:User, taskId: string) {
        try {
            const taskRef = doc(db, `users/${user.uid}/tasks`, taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
};