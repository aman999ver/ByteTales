import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', email); // OAuth2 expects 'username'
            formData.append('password', password);

            const response = await api.post('/students/login', formData);
            localStorage.setItem('token', response.data.access_token);

            // Check if user is actually admin (We will implement this check)
            // For now, let's assume they are and go to admin dashboard
            navigate('/admin');
        } catch (err) {
            setError('Invalid Admin Credentials');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2c3e50' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', width: '350px' }}>
                <h2 style={{ textAlign: 'center', color: '#e74c3c' }}>🛡️ Admin Portal</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Admin ID</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ width: '100%', padding: '12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
                    >
                        Access Control
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
