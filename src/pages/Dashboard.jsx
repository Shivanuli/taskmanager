import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { tasks } = useTasks();

    return (
        <div className="page-container">
            <header style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
                    My <span className="gradient-text">Tasks</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Manage your projects and track your progress efficiently.
                </p>
            </header>

            {tasks.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    background: 'var(--glass-bg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px dashed var(--glass-border)'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>No tasks found</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Get started by creating your first task.</p>
                    <Link to="/create" className="btn-primary">
                        <Plus size={20} /> Create Task
                    </Link>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '24px'
                }}>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
