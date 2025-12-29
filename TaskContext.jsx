import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tasksCollectionRef = collection(db, "tasks");

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getDocs(tasksCollectionRef);
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setError(null);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            if (err.code === 'permission-denied' || err.code === 'unavailable') {
                setError("Please configure your Firebase credentials in src/firebase.js");
            } else {
                setError("Failed to load tasks. Check console for details.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const newTask = { ...task, status: 'Pending', createdAt: new Date() };
            const docRef = await addDoc(tasksCollectionRef, newTask);
            setTasks([...tasks, { ...newTask, id: docRef.id }]);
            toast.success('Task added successfully!');
        } catch (err) {
            console.error("Error adding task:", err);
            setError("Failed to add task.");
            toast.error('Failed to add task.');
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            await updateDoc(taskDoc, updatedTask);
            setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedTask } : t));
            toast.success('Task updated successfully!');
        } catch (err) {
            console.error("Error updating task:", err);
            setError("Failed to update task.");
            toast.error('Failed to update task.');
        }
    };

    const deleteTask = async (id) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            await deleteDoc(taskDoc);
            setTasks(tasks.filter(t => t.id !== id));
            toast.success('Task deleted successfully!');
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("Failed to delete task.");
            toast.error('Failed to delete task.');
        }
    };

    const getTask = (id) => {
        return tasks.find(t => t.id === id);
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask, getTask }}>
            {children}
        </TaskContext.Provider>
    );
};
