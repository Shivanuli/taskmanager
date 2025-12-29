import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import TaskDetails from './pages/TaskDetails';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <TaskProvider>
            <div className="app">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1a1a23',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                    }}
                />
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/create" element={<CreateTask />} />
                        <Route path="/edit/:id" element={<EditTask />} />
                        <Route path="/task/:id" element={<TaskDetails />} />
                    </Routes>
                </main>
            </div>
        </TaskProvider>
    );
}

export default App;
