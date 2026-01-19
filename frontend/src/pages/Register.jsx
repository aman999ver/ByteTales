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
            alert("Registration Failed!\n" + msg);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>🚀 Join the Code Crew!</h2>
            {error && <div style={{ background: '#ffcdd2', border: '3px solid #d32f2f', color: '#b71c1c', padding: '10px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>{error}</div>}

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3069/3069172.png" alt="robot" width="80" />
                        <p>Create your explorer profile!</p>
                    </div>

                    <label>👾 Your Hero Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Captain Py" />

                    <label>📧 Secret Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="agent@bytetales.com" />

                    <label>🔑 Secret Code (Password)</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="KEEP IT SAFE!" />

                    <div style={{ margin: '30px 0', textAlign: 'center', background: '#e1bee7', padding: '20px', borderRadius: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '15px', color: '#4a148c', fontWeight: 'bold' }}>📸 Face ID (Optional)</label>

                        {!faceDescriptor ? (
                            <div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Scan your face for easier login!</p>
                                <WebcamCapture onCapture={handleCapture} />
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2rem' }}>✅ Face ID Ready!</p>
                                <button type="button" onClick={() => setFaceDescriptor(null)} style={{ background: '#ff1744', padding: '5px 10px', fontSize: '0.8rem' }}>Remove & Rescan</button>
                            </div>
                        )}

                    </div>

                    <button type="submit" style={{ width: '100%', fontSize: '1rem' }}>START MISSION 🏁</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
