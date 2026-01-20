import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-wrapper">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                    
                    .home-wrapper {
                        font-family: 'Outfit', sans-serif;
                        background: #0f172a;
                        min-height: 100vh;
                        width: 100%;
                        color: #ffffff;
                        display: flex;
                        flex-direction: column;
                        overflow-x: hidden;
                    }

                    /* Utility & Layout Classes */
                    .nav-bar {
                        padding: 20px 40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                    }

                    .hero-section {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 60px 40px;
                        max-width: 1200px;
                        margin: 0 auto;
                        width: 100%;
                        gap: 60px;
                    }

                    .hero-content {
                        flex: 1;
                        max-width: 550px;
                    }

                    .hero-visual {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        position: relative;
                    }

                    .features-footer {
                        background: #1e293b;
                        padding: 60px 20px;
                    }

                    .features-grid {
                        max-width: 1000px;
                        margin: 0 auto;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 30px;
                    }

                    .hero-title {
                        font-size: 3rem;
                        line-height: 1.1;
                        font-weight: 700;
                        margin-bottom: 20px;
                        color: white;
                    }
                    
                    .btn-group {
                        display: flex;
                        gap: 15px;
                    }
                    


                    /* Visual Card */
                    .visual-card {
                        background: rgba(30, 41, 59, 0.8);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 20px;
                        padding: 30px;
                        width: 380px;
                        position: relative;
                        z-index: 1;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    }

                    /* Animations */
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-float { animation: float 6s ease-in-out infinite; }
                    .animate-fade { animation: fadeIn 0.8s ease-out forwards; }

                    /* Button Styles */
                    .btn-pro {
                        background: #3b82f6; color: white; border: none; padding: 14px 32px;
                        border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer;
                        transition: all 0.2s; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
                    }
                    .btn-pro:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4); }

                    .btn-outline-pro {
                        background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3);
                        padding: 14px 32px; border-radius: 8px; font-weight: 500; font-size: 1rem; cursor: pointer; transition: all 0.2s;
                    }
                    .btn-outline-pro:hover { border-color: white; background: rgba(255,255,255,0.05); }

                    .feature-card {
                        background: rgba(30, 41, 59, 0.5); padding: 24px; border-radius: 12px;
                        border: 1px solid rgba(255,255,255,0.1); transition: transform 0.2s, background 0.2s;
                    }
                    .feature-card:hover { transform: translateY(-5px); background: rgba(30, 41, 59, 0.8); border-color: rgba(59, 130, 246, 0.5); }

                    /* MOBILE RESPONSIVENESS */
                    @media (max-width: 900px) {
                        .nav-bar { padding: 15px 20px; }
                        
                        .hero-section {
                            flex-direction: column;
                            padding: 40px 20px;
                            gap: 50px;
                            text-align: center;
                            justify-content: center;
                            align-items: center;
                        }

                        .hero-content {
                            max-width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }

                        .hero-content p {
                            text-align: center;
                            max-width: 90%; /* Prevent edge-to-edge text */
                        }

                        .hero-title {
                            font-size: 2rem; /* Smaller font on mobile */
                            text-align: center;
                        }

                        .btn-group {
                            justify-content: center;
                            width: 100%;
                        }
                        
                        .btn-pro, .btn-outline-pro {
                            flex: 1; /* Stretch buttons on very small screens if needed, or just keep them centered */
                            padding: 14px 24px;
                        }



                        .hero-visual {
                            width: 100%;
                            height: auto;
                        }

                        .visual-card {
                            width: 100%; /* Full width card */
                            max-width: 380px;
                        }

                        .features-grid {
                            grid-template-columns: 1fr; /* Stack cards */
                            gap: 20px;
                        }
                    }
                `}
            </style>

            {/* Navbar */}
            <nav className="nav-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
                    <img src="/logo.png" alt="ByteTales Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))' }} />
                    <span style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ByteTales</span>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/login" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem', padding: '10px' }}>Log In</Link>
                    <Link to="/register" style={{ background: 'white', color: '#0f172a', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sign Up</Link>
                </div>
            </nav >

            {/* Hero Section */}
            < div className="hero-section" >

                {/* Left Content */}
                < div className="hero-content animate-fade" >
                    <div style={{ color: '#60a5fa', fontWeight: '600', fontSize: '0.9rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Education Reimagined
                    </div>
                    <h1 className="hero-title">
                        Master CS with <br />
                        <span style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Interactive Stories</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '35px' }}>
                        Engage your students with a curriculum that blends Computer Science with immersive storytelling. Built for focus, designed for results.
                    </p>
                    <div className="btn-group">
                        <Link to="/register">
                            <button className="btn-pro">Register</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn-outline-pro">Login</button>
                        </Link>
                    </div>


                </div >

                {/* Right Visual */}
                < div className="hero-visual animate-float" >
                    {/* Abstract Decorative Circle */}
                    < div style={{ position: 'absolute', width: '100%', height: '100%', background: '#3b82f6', opacity: '0.1', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0, maxWidth: '400px', maxHeight: '400px' }
                    }></div >

                    {/* Main Card visual */}
                    < div className="visual-card" >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>🚀</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Module 1: The Beginning</div>
                        </div>

                        <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                            <div style={{ width: '60%', height: '10px', background: '#1e293b', borderRadius: '5px', marginBottom: '10px' }}></div>
                            <div style={{ width: '80%', height: '10px', background: '#1e293b', borderRadius: '5px' }}></div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <div style={{ flex: 1, height: '8px', background: '#22c55e', borderRadius: '4px' }}></div>
                            <div style={{ flex: 1, height: '8px', background: '#22c55e', borderRadius: '4px' }}></div>
                            <div style={{ flex: 1, height: '8px', background: '#334155', borderRadius: '4px' }}></div>
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>66% Complete</div>
                    </div >
                </div >
            </div >

            {/* Features Footer */}
            < div className="features-footer" >
                <div className="features-grid">
                    <div className="feature-card">
                        <div style={{ fontSize: '1.5rem', marginBottom: '15px' }}>🧠</div>
                        <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Logic Building</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>Step-by-step puzzles designed to enhance computational thinking.</p>
                    </div>
                    <div className="feature-card">
                        <div style={{ fontSize: '1.5rem', marginBottom: '15px' }}>⚡</div>
                        <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Instant Practice</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>Browser-based coding environment with zero setup required.</p>
                    </div>
                    <div className="feature-card">
                        <div style={{ fontSize: '1.5rem', marginBottom: '15px' }}>🎯</div>
                        <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Student Growth</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>Detailed analytics to track progress and mastery of concepts.</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b', fontSize: '0.85rem' }}>
                    Designed by SAS Tech Group G &copy; 2026
                </div>
            </div >

        </div >
    );
}

export default Home;
