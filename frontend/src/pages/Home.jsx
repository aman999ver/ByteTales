import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{
            fontFamily: "'Outfit', sans-serif",
            background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)', // Clean professional light gradient
            minHeight: '100vh',
            color: '#2d3436',
            overflowX: 'hidden'
        }}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
                    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                    .animate-slide { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                    
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.7);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.8);
                        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
                        border-radius: 24px;
                    }

                    .btn-primary {
                        background: #0984e3;
                        color: white;
                        box-shadow: 0 10px 20px rgba(9, 132, 227, 0.3);
                    }
                    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 25px rgba(9, 132, 227, 0.4); }

                    .btn-outline {
                        background: transparent;
                        color: #2d3436;
                        border: 2px solid #dfe6e9;
                    }
                    .btn-outline:hover {
                        border-color: #2d3436;
                        background: rgba(0,0,0,0.02);
                    }
                `}
            </style>

            {/* Hero Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '90vh',
                textAlign: 'center',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative background blobs */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: '#e0c3fc', filter: 'blur(150px)', opacity: '0.4', zIndex: '0', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: '#8ec5fc', filter: 'blur(150px)', opacity: '0.4', zIndex: '0', borderRadius: '50%' }}></div>

                <div className="glass-panel animate-slide" style={{ padding: '60px 40px', maxWidth: '900px', width: '100%', zIndex: '1' }}>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        fontWeight: '600',
                        margin: '0 0 15px 0',
                        color: '#2d3436',
                        letterSpacing: '-1px'
                    }}>
                        ByteTales
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#636e72',
                        maxWidth: '600px',
                        margin: '0 auto 40px auto',
                        lineHeight: '1.6',
                        fontWeight: '300'
                    }}>
                        The professional platform for mastering Computer Science.
                        <br />
                        Interactive. Intelligent. <span style={{ color: '#0984e3', fontWeight: '600' }}>Impactful.</span>
                    </p>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/register">
                            <button className="btn-primary" style={{
                                padding: '16px 40px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                Start Free Trial
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="btn-outline" style={{
                                padding: '16px 40px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                Member Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Minimal Section */}
            <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <SimpleCard title="Interactive Learning" desc="Engage with code directly within stories." />
                    <SimpleCard title="Professional Design" desc="Distraction-free environment for focus." />
                    <SimpleCard title="Progress Tracking" desc="Detailed analytics of your learning curve." />
                </div>
            </div>

            {/* Professional Team Section */}
            <div style={{ padding: '100px 20px', textAlign: 'center', background: 'white' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '60px', fontWeight: '300', color: '#2d3436' }}>
                    Developed by <span style={{ fontWeight: '600' }}>SAS Tech Group G</span>
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '60px',
                    flexWrap: 'wrap',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <ProMember name="Aman Verma" role="Lead Developer" />
                    <ProMember name="Santosh Yadav" role="Backend Architect" />
                    <ProMember name="Sneha Singh" role="UI/UX Specialist" />
                </div>
            </div>

            {/* Minimal Footer */}
            <div style={{ padding: '40px', textAlign: 'center', color: '#b2bec3', fontSize: '0.9rem', borderTop: '1px solid #f1f2f6' }}>
                <p>&copy; 2026 ByteTales Inc. All rights reserved.</p>
            </div>
        </div>
    );
}

const SimpleCard = ({ title, desc }) => (
    <div style={{ padding: '30px', borderLeft: '3px solid #0984e3', background: 'white', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2d3436' }}>{title}</h3>
        <p style={{ margin: 0, color: '#636e72', lineHeight: '1.5' }}>{desc}</p>
    </div>
);

const ProMember = ({ name, role }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{
            width: '80px',
            height: '80px',
            background: '#dfe6e9',
            borderRadius: '50%',
            margin: '0 auto 15px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#636e72'
        }}>
            {name.charAt(0)}
        </div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#2d3436' }}>{name}</h4>
        <span style={{ fontSize: '0.9rem', color: '#0984e3', textTransform: 'uppercase', letterSpacing: '1px' }}>{role}</span>
    </div>
);

export default Home;
