import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit2, Trash2, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task }) => {
    const { deleteTask } = useTasks();

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#a1a1aa';
        }
    };

    const getStatusConfig = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return { class: 'status-completed', icon: CheckCircle2 };
            case 'in progress': return { class: 'status-progress', icon: Clock };
            default: return { class: 'status-pending', icon: AlertCircle };
        }
    };

    const statusConfig = getStatusConfig(task.status);
    const StatusIcon = statusConfig.icon;

    return (
        <div className="glass" style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
        >
            {/* Header: Priority & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: `${getPriorityColor(task.priority)}15`,
                        color: getPriorityColor(task.priority),
                        border: `1px solid ${getPriorityColor(task.priority)}30`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {task.priority}
                    </span>
                    <span className={`status-badge ${statusConfig.class}`}>
                        <StatusIcon size={12} strokeWidth={3} />
                        {task.status}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '4px', opacity: 0.7 }}>
                    <Link to={`/edit/${task.id}`} className="icon-btn" style={{
                        padding: '6px',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <Edit2 size={16} />
                    </Link>
                    <button onClick={() => deleteTask(task.id)} className="icon-btn" style={{
                        padding: '6px',
                        borderRadius: '6px',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '8px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.025em'
                }}>
                    {task.title}
                </h3>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.925rem',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {task.description}
                </p>
            </div>

            {/* Footer: Date & Link */}
            <div style={{
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                    <Calendar size={14} />
                    {task.dueDate}
                </div>
                <Link to={`/task/${task.id}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    transition: 'gap 0.2s'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.gap = '10px'}
                    onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
                >
                    View Details <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};

export default TaskCard;
