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
            localStorage.setItem('role', 'student');
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
            localStorage.setItem('role', 'student');
            navigate('/dashboard');
        } catch (err) {
            setError('Face Login failed: ' + (err.response?.data?.detail || 'Not recognized'));
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f7fa', // Soft light background
            padding: '20px',
            fontFamily: "'Outfit', sans-serif"
        }}>

            {/* Monitor Stand */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                transform: 'scale(0.9)' // Slightly smaller to fit viewports
            }}>
                {/* The Monitor Head - Sleek Silver/White */}
                <div style={{
                    background: '#f0f0f0', // Silver/White Bezel
                    padding: '15px 15px 40px 15px',
                    borderRadius: '24px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.1), inset 0 0 0 2px rgba(255,255,255,0.8)',
                    width: '600px',
                    maxWidth: '100%',
                    position: 'relative',
                    border: '1px solid #d1d1d1'
                }}>

                    {/* The Screen */}
                    <div style={{
                        background: '#ffffff', // Clean white screen
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
                        minHeight: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid #eee'
                    }}>

                        {/* Fake OS Header */}
                        <div style={{
                            background: 'rgba(255,255,255,0.9)',
                            padding: '10px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#b2bec3', fontWeight: 'bold' }}>ByteOS v2.0</span>
                        </div>

                        {/* Content Container */}
                        <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <h2 style={{ fontSize: '1.8rem', color: '#2d3436', margin: '0 0 5px 0' }}>Welcome User</h2>
                                <p style={{ color: '#636e72', margin: 0 }}>Please authenticate to access system</p>
                            </div>

                            {error && (
                                <div style={{
                                    background: '#ffebee',
                                    color: '#c62828',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    textAlign: 'center',
                                    fontSize: '0.9rem'
                                }}>
                                    {error}
                                </div>
                            )}

                            {mode === 'face' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: '#000',
                                        position: 'relative'
                                    }}>
                                        <WebcamCapture onCapture={handleFaceCapture} autoCapture={true} />

                                        {/* Overlay Grid Effect */}
                                        <div style={{
                                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                            backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.05) 1px, transparent 1px)',
                                            backgroundSize: '20px 20px',
                                            pointerEvents: 'none'
                                        }}></div>
                                    </div>

                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        background: 'rgba(255,255,255,0.9)',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}>
                                        <span style={{ fontSize: '0.9rem', color: '#2d3436', fontWeight: '600' }}>Looking for you...</span>
                                        <button
                                            onClick={() => setMode('password')}
                                            style={{ border: 'none', background: 'none', color: '#0984e3', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                                        >
                                            Use Password
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handlePasswordLogin} style={{ maxWidth: '320px', margin: '0 auto', width: '100%' }}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="input-modern"
                                            autoFocus
                                        />
                                    </div>

                                    <div style={{ marginBottom: '25px' }}>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            className="input-modern"
                                        />
                                    </div>

                                    <button type="submit" className="btn-modern-primary">
                                        Login
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setMode('face')}
                                        className="btn-text"
                                        style={{ marginTop: '10px', width: '100%' }}
                                    >
                                        Back to Face ID
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                    {/* Brand Logo Bottom Bezel */}
                    <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#b2bec3',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                        ByteVision
                    </div>
                </div>

                {/* Monitor Stand Base - Sleek Aluminum */}
                <div style={{
                    width: '140px',
                    height: '90px',
                    background: 'linear-gradient(to bottom, #dcdcdc, #f0f0f0)',
                    margin: '0 auto',
                    position: 'relative',
                    top: '-5px',
                    zIndex: -1,
                    boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.1)'
                }}></div>
                <div style={{
                    width: '240px',
                    height: '15px',
                    background: '#e0e0e0',
                    margin: '0 auto',
                    borderRadius: '8px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}></div>
            </div>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
                    
                    .input-modern {
                        width: 100%;
                        padding: 14px 16px;
                        border: 2px solid #f1f2f6;
                        border-radius: 12px;
                        font-size: 1rem;
                        background: #f8f9fa;
                        transition: all 0.3s ease;
                        font-family: 'Outfit', sans-serif;
                        box-sizing: border-box;
                    }
                    .input-modern:focus {
                        outline: none;
                        border-color: #0984e3;
                        background: white;
                        box-shadow: 0 0 0 4px rgba(9, 132, 227, 0.1);
                    }

                    .btn-modern-primary {
                        width: 100%;
                        padding: 14px;
                        background: #0984e3;
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 4px 10px rgba(9, 132, 227, 0.2);
                        font-family: 'Outfit', sans-serif;
                    }
                    .btn-modern-primary:hover {
                        background: #0076d1;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 20px rgba(9, 132, 227, 0.3);
                    }

                    .btn-text {
                        background: transparent;
                        border: none;
                        color: #636e72;
                        cursor: pointer;
                        font-size: 0.9rem;
                        margin-top: 15px;
                        font-family: 'Outfit', sans-serif;
                        transition: color 0.2s;
                    }
                    .btn-text:hover {
                        color: #0984e3;
                        text-decoration: underline;
                    }

                    .scan-line-light {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 3px;
                        background: rgba(9, 132, 227, 0.6);
                        box-shadow: 0 0 15px rgba(9, 132, 227, 0.6);
                        animation: scanLight 2s infinite ease-in-out;
                    }

                    @keyframes scanLight {
                        0% { top: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }

                    @keyframes pulse {
                         0% { opacity: 0.6; }
                         50% { opacity: 1; }
                         100% { opacity: 0.6; }
                    }
                `}
            </style>
        </div>
    );
}

export default Login;
