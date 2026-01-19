import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebcamCapture from '../components/WebcamCapture';
import api from '../api';

function Login() {
    const [mode, setMode] = useState('face'); // Default to 'face'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await api.post('/students/login', formData);
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.detail || err.message));
        }
    };

    const handleFaceCapture = async (descriptor) => {
        if (!descriptor) return;
        try {
            // Send JSON payload
            const response = await api.post('/students/face-login', { encoding: descriptor });
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Face Login failed: ' + (err.response?.data?.detail || 'Not recognized'));
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Welcome Back! 👋</h2>

            {error && <div style={{ background: '#ffcdd2', border: '3px solid #d32f2f', color: '#b71c1c', padding: '10px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>{error}</div>}

            <div className="card" style={{ textAlign: 'center' }}>
                {mode === 'face' ? (
                    <>
                        <h3 style={{ marginBottom: '15px' }}>Scan Face to Login 📸</h3>
                        <p style={{ marginBottom: '20px', color: '#666' }}>Center your face in the frame</p>
                        <WebcamCapture onCapture={handleFaceCapture} />

                        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>Camera not working?</p>
                            <button
                                onClick={() => setMode('password')}
                                style={{
                                    background: 'transparent',
                                    border: '2px solid #ddd',
                                    color: '#555',
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                🔑 Login with Password
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <form onSubmit={handlePasswordLogin} style={{ textAlign: 'left' }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <span style={{ fontSize: '3rem' }}>🧙‍♂️</span>
                                <h3>Password Login</h3>
                            </div>
                            <label>📧 Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

                            <label>🔑 Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

                            <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Enter Citadel 🏰</button>
                        </form>

                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button
                                onClick={() => setMode('face')}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#2196f3',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                🔙 Back to Face Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
