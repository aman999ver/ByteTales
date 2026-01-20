import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebcamCapture from '../components/WebcamCapture';
import api from '../api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [faceDescriptor, setFaceDescriptor] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCapture = (descriptor, imageSrc) => {
        setFaceDescriptor(descriptor);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare JSON Payload
        const payload = {
            name: name,
            email: email,
            password: password,
            face_encoding: faceDescriptor // Can be null, backend handles it
        };

        try {
            const response = await api.post('/students/register', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            console.error("Full Error:", err);
            let msg = "Registration Failed";

            if (err.response && err.response.data && err.response.data.detail) {
                const detail = err.response.data.detail;
                if (Array.isArray(detail)) {
                    // Handle Pydantic validation errors (array of objects)
                    msg = detail.map(d => `${d.loc[1] || 'Field'}: ${d.msg}`).join('\n');
                } else {
                    msg = String(detail);
                }
            } else if (err.message) {
                msg = err.message;
            }

            setError(msg);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f7fa',
            padding: '20px',
            fontFamily: "'Outfit', sans-serif"
        }}>

            {/* Monitor Stand */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                transform: 'scale(0.95)'
            }}>
                {/* Monitor Head */}
                <div style={{
                    background: '#f0f0f0',
                    padding: '15px 15px 40px 15px',
                    borderRadius: '24px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.1), inset 0 0 0 2px rgba(255,255,255,0.8)',
                    width: '700px', // Wider for form
                    maxWidth: '100%',
                    position: 'relative',
                    border: '1px solid #d1d1d1'
                }}>

                    {/* Screen */}
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
                        height: '500px', // Fixed height
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid #eee'
                    }}>

                        {/* Fake OS Header */}
                        <div style={{
                            background: 'rgba(255,255,255,0.95)',
                            padding: '8px 15px', // Reduced padding
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #f0f0f0',
                            zIndex: 10,
                            flexShrink: 0
                        }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#b2bec3', fontWeight: 'bold' }}>System Registration</span>
                        </div>

                        {/* Content Container - No Scroll */}
                        <div style={{
                            padding: '20px 25px', // Reduced padding
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                                <h2 style={{ fontSize: '1.4rem', color: '#2d3436', margin: '0 0 2px 0' }}>Join ByteTales</h2>
                                <p style={{ color: '#636e72', margin: 0, fontSize: '0.85rem' }}>Create your designer account</p>
                            </div>

                            {error && (
                                <div style={{
                                    background: '#ffebee',
                                    color: '#c62828',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    marginBottom: '10px',
                                    textAlign: 'center',
                                    fontSize: '0.8rem'
                                }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', alignItems: 'start', height: '100%' }}>

                                {/* Left Column: Inputs */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', justifyContent: 'center' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#636e72', marginBottom: '4px' }}>Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                            placeholder="John Doe"
                                            className="input-modern"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#636e72', marginBottom: '4px' }}>Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="john@example.com"
                                            className="input-modern"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#636e72', marginBottom: '4px' }}>Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            placeholder="Create a strong password"
                                            className="input-modern"
                                        />
                                    </div>

                                    <button type="submit" className="btn-modern-primary" style={{ marginTop: '5px' }}>
                                        Complete Registration
                                    </button>
                                </div>

                                {/* Right Column: Face ID */}
                                <div style={{
                                    background: '#f8f9fa',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '1px solid #e0e0e0',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#2d3436', marginBottom: '10px' }}>
                                        Setup Face Unlock <span style={{ color: '#b2bec3', fontWeight: 'normal' }}>(Optional)</span>
                                    </label>

                                    {!faceDescriptor ? (
                                        <div style={{ borderRadius: '10px', overflow: 'hidden', border: '2px dashed #d1d1d1', background: 'white', position: 'relative', flex: 1, maxHeight: '200px', display: 'flex', alignItems: 'center' }}>
                                            <WebcamCapture onCapture={handleCapture} autoCapture={false} />
                                        </div>
                                    ) : (
                                        <div style={{ padding: '20px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ width: '50px', height: '50px', background: '#d4edda', color: '#155724', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
                                                ✓
                                            </div>
                                            <h4 style={{ margin: '0 0 5px 0', color: '#2d3436', fontSize: '1rem' }}>Face Captured!</h4>
                                            <p style={{ margin: '0 0 15px 0', fontSize: '0.8rem', color: '#636e72' }}>Biometric ready.</p>

                                            <button
                                                type="button"
                                                onClick={() => setFaceDescriptor(null)}
                                                className="btn-outline-sm"
                                            >
                                                Retake
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Branding */}
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

                {/* Base */}
                <div style={{
                    width: '180px',
                    height: '90px',
                    background: 'linear-gradient(to bottom, #dcdcdc, #f0f0f0)',
                    margin: '0 auto',
                    position: 'relative',
                    top: '-5px',
                    zIndex: -1,
                    boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.1)'
                }}></div>
                <div style={{
                    width: '280px',
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
                        padding: 12px 14px;
                        border: 2px solid #f1f2f6;
                        border-radius: 10px;
                        font-size: 0.95rem;
                        background: white;
                        transition: all 0.3s ease;
                        font-family: 'Outfit', sans-serif;
                        box-sizing: border-box;
                    }
                    .input-modern:focus {
                        outline: none;
                        border-color: #0984e3;
                        box-shadow: 0 0 0 4px rgba(9, 132, 227, 0.1);
                    }

                    .btn-modern-primary {
                        width: 100%;
                        padding: 12px;
                        background: #0984e3;
                        color: white;
                        border: none;
                        border-radius: 10px;
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

                    .btn-outline-sm {
                        background: white;
                        border: 1px solid #dfe6e9;
                        padding: 8px 16px;
                        border-radius: 20px;
                        color: #636e72;
                        cursor: pointer;
                        font-size: 0.85rem;
                        transition: all 0.2s;
                        font-family: 'Outfit', sans-serif;
                    }
                    .btn-outline-sm:hover {
                        border-color: #b2bec3;
                        background: #f8f9fa;
                        color: #2d3436;
                    }

                    @media (max-width: 800px) {
                        form { grid-template-columns: 1fr !important; }
                    }
                `}
            </style>
        </div>
    );
}

export default Register;
