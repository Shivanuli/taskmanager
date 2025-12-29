import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { ArrowLeft, Calendar, Flag, CheckCircle2, Edit2, Trash2 } from 'lucide-react';

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTask, deleteTask } = useTasks();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const foundTask = getTask(id);
        if (foundTask) {
            setTask(foundTask);
        } else {
            navigate('/');
        }
    }, [id, getTask, navigate]);

    if (!task) return null;

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id);
            navigate('/');
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#a1a1aa';
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '800px' }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '24px',
                    fontSize: '0.9rem'
                }}
            >
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                padding: '6px 16px',
                                borderRadius: '20px',
                                background: `${getPriorityColor(task.priority)}20`,
                                color: getPriorityColor(task.priority),
                                border: `1px solid ${getPriorityColor(task.priority)}40`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <Flag size={14} /> {task.priority} Priority
                            </span>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                padding: '6px 16px',
                                borderRadius: '20px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                color: '#8b5cf6',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <CheckCircle2 size={14} /> {task.status}
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: '1.2' }}>{task.title}</h1>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to={`/edit/${task.id}`} className="btn-secondary" style={{ padding: '10px 16px' }}>
                            <Edit2 size={18} />
                        </Link>
                        <button onClick={handleDelete} className="btn-secondary" style={{ padding: '10px 16px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '32px',
                    border: '1px solid var(--glass-border)'
                }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Description</h3>
                    <p style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>{task.description}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    <Calendar size={20} />
                    <span>Due Date: <strong style={{ color: 'var(--text-primary)' }}>{task.dueDate}</strong></span>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
