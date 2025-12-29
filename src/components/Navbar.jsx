import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '16px 24px',
            marginBottom: '32px',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div className="page-container" style={{ padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        background: 'var(--accent-gradient)',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex'
                    }}>
                        <CheckSquare color="white" size={24} />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                        Task<span className="gradient-text">Flow</span>
                    </h1>
                </Link>

                <div style={{ display: 'flex', gap: '24px' }}>
                    <Link to="/" style={{
                        color: isActive('/') ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'color 0.2s'
                    }}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link to="/create" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                        <PlusCircle size={18} />
                        New Task
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
