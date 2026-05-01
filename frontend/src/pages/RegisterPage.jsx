import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Doctor');

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration
        navigate('/app');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <div className="auth-logo-icon">
                            <Activity size={24} />
                        </div>
                        Smart Hospital
                    </div>
                    <h1 className="auth-title">Staff Registration</h1>
                    <p className="auth-subtitle">Create your hospital management account</p>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Dr. John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="e.g. staff@hospital.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Role</label>
                        <select
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option>Admin</option>
                            <option>Doctor</option>
                            <option>Nurse</option>
                            <option>Receptionist</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                        Create Account
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-gray)' }}>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
