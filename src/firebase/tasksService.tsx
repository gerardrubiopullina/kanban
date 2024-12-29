import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from './config';
import { Task } from '../types';

export const tasksService = {
    async getTasks() {
        try {
            const tasksCollection = collection(db, 'tasks');
            const querySnapshot = await getDocs(tasksCollection);
            
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

    async addTask(task: Omit<Task, 'id'>) {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), {
                title: task.title,
                description: task.description,
                status: task.status
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    },

    async updateTask(taskId: string, updates: Partial<Task>) {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, updates);
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    async deleteTask(taskId: string) {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
};