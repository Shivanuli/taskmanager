import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { Save, X, Calendar as CalendarIcon } from 'lucide-react';
import DatePicker from "react-datepicker";

const CreateTask = () => {
    const navigate = useNavigate();
    const { addTask } = useTasks();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(formData);
        navigate('/');
    };

    return (
        <div className="page-container" style={{ maxWidth: '800px' }}>
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '32px', fontWeight: 700 }}>
                    Create <span className="gradient-text">New Task</span>
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Task Title</label>
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="e.g., Redesign Homepage"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Description</label>
                        <textarea
                            required
                            className="input-field"
                            rows="4"
                            placeholder="Describe the task details..."
                            style={{ resize: 'vertical', fontFamily: 'inherit' }}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Priority</label>
                            <select
                                className="input-field"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Due Date</label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={formData.dueDate ? new Date(formData.dueDate) : null}
                                    onChange={(date) => setFormData({ ...formData, dueDate: date ? date.toISOString().split('T')[0] : '' })}
                                    dateFormat="yyyy-MM-dd"
                                    className="custom-datepicker-input"
                                    placeholderText="Select due date"
                                    required
                                    minDate={new Date()}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                                <CalendarIcon
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-secondary)',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                        <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                            <Save size={20} /> Save Task
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate('/')}
                            style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <X size={20} /> Cancel
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateTask;
