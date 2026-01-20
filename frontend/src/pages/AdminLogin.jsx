import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await api.post('/students/login', formData);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', 'admin');
            navigate('/admin');
        } catch (err) {
            setError('Invalid Credentials. Access Denied.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                    
                    .admin-login-wrapper {
                        height: 100vh;
                        background: #0f172a;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: 'Outfit', sans-serif;
                    }

                    .login-card {
                        background: rgba(30, 41, 59, 0.7);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 40px;
                        border-radius: 24px;
                        width: 100%;
                        max-width: 400px;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    }

                    .logo-header {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 30px;
                    }

                    .form-group {
                        margin-bottom: 20px;
                    }

                    .form-label {
                        display: block;
                        color: #94a3b8;
                        font-size: 0.9rem;
                        margin-bottom: 8px;
                        font-weight: 500;
                    }

                    .form-input {
                        width: 100%;
                        background: rgba(15, 23, 42, 0.6);
                        border: 1px solid #334155;
                        color: white;
                        padding: 12px 16px;
                        border-radius: 10px;
                        font-size: 1rem;
                        transition: all 0.2s;
                        outline: none;
                        box-sizing: border-box; /* Fix for padding overflow */
                    }

                    .form-input:focus {
                        border-color: #3b82f6;
                        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                        background: rgba(15, 23, 42, 0.8);
                    }

                    .submit-btn {
                        width: 100%;
                        padding: 14px;
                        background: linear-gradient(to right, #3b82f6, #2563eb);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        margin-top: 10px;
                        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
                    }

                    .submit-btn:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
                    }

                    .submit-btn:disabled {
                        opacity: 0.7;
                        cursor: not-allowed;
                    }

                    .error-msg {
                        background: rgba(239, 68, 68, 0.1);
                        border: 1px solid rgba(239, 68, 68, 0.2);
                        color: #f87171;
                        padding: 10px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        text-align: center;
                        font-size: 0.9rem;
                    }
                `}
            </style>

            <div className="login-card">
                <div className="logo-header">
                    <img src="/logo.png" alt="ByteTales Logo" style={{ width: '60px', height: '60px', marginBottom: '15px', filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }} />
                    <h2 style={{ margin: 0, color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>Admin Portal</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Secure Access Restricted</p>
                </div>

                {error && <div className="error-msg">⚠️ {error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Admin ID</label>
                        <input
                            className="form-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@bytetales.com"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Authenticating...' : 'Access Control Panel'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
