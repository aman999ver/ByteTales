import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Dashboard() {
    const [student, setStudent] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/students/me');
                setStudent(userRes.data);

                const storiesRes = await api.get('/stories');
                setStories(storiesRes.data);
            } catch (err) {
                console.error(err);
                // navigate('/login'); 
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateAvatar = async (avatar) => {
        try {
            const res = await api.put('/students/me', { avatar });
            setStudent(res.data);
            setShowAvatarModal(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", color: '#636e72' }}>
            Loading Dashboard...
        </div>
    );

    const AVATARS = ['👨‍💻', '👩‍💻', '🚀', '⚡', '🎓', '🧠'];

    return (
        <div className="dashboard-wrapper">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                    
                    .dashboard-wrapper {
                        min-height: 100vh;
                        background: #f8fafc; /* Slate 50 */
                        font-family: 'Outfit', sans-serif;
                        padding-bottom: 40px;
                    }

                    /* Navbar */
                    .nav-header {
                        background: #0f172a;
                        padding: 15px 40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: sticky;
                        top: 0;
                        z-index: 100;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                    }

                    .logo-section {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    .user-section {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }

                    .user-info {
                        text-align: right;
                        display: flex;
                        flex-direction: column;
                    }

                    /* Stats Grid */
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                        gap: 20px;
                        margin-bottom: 40px;
                    }

                    .stat-card {
                        background: white;
                        padding: 24px;
                        border-radius: 16px;
                        border: 1px solid #e2e8f0;
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .stat-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                    }

                    .stat-icon {
                        width: 48px;
                        height: 48px;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                    }

                    /* Modules Grid */
                    .modules-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                        gap: 30px;
                    }

                    .module-card {
                        background: white;
                        border-radius: 16px;
                        overflow: hidden;
                        border: 1px solid #e2e8f0;
                        transition: all 0.3s ease;
                    }
                    .module-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                        border-color: #3b82f6;
                    }

                    .module-icon-area {
                        height: 160px;
                        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 4rem;
                        color: #94a3b8;
                        transition: 0.3s;
                    }
                    .module-card:hover .module-icon-area {
                        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                        color: #3b82f6;
                    }

                    .start-btn {
                        width: 100%;
                        padding: 12px;
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        color: #475569;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        display: flex; align-items: center; justify-content: center; gap: 8px;
                    }
                    .module-card:hover .start-btn {
                        background: #3b82f6;
                        color: white;
                        border-color: #3b82f6;
                    }

                    /* Modal */
                    .modal-overlay {
                        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                        background: rgba(15, 23, 42, 0.4);
                        backdrop-filter: blur(4px);
                        display: flex; align-items: center; justify-content: center;
                        z-index: 1000;
                    }
                    .modal-content {
                        background: white; padding: 30px; borderRadius: 20px;
                        text-align: center; max-width: 400px; width: 90%;
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    }

                    /* Mobile */
                    @media (max-width: 768px) {
                        .nav-header { padding: 15px 20px; }
                        .user-info { display: none; }
                    }
                `}
            </style>

            {/* Navbar */}
            <nav className="nav-header">
                <div className="logo-section">
                    <img src="/logo.png" alt="ByteTales" style={{ width: '35px', height: '35px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))' }} />
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>ByteTales</span>
                </div>

                {student && (
                    <div className="user-section">
                        <div className="user-info">
                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#e2e8f0' }}>{student.name}</span>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Level {Math.floor((student.points || 0) / 100) + 1} Scholar</span>
                        </div>
                        <div onClick={() => setShowAvatarModal(true)} style={{ position: 'relative', cursor: 'pointer' }}>
                            <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', border: '2px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                {student.avatar || '👤'}
                            </div>
                            <div style={{ position: 'absolute', bottom: -2, right: -2, width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', border: '2px solid white' }}></div>
                        </div>
                        <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', transition: '0.2s', color: 'white' }} title="Logout">
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Welcome */}
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                        Welcome back, {student?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Ready to continue your coding adventure?</p>
                </div>

                {/* Stats */}
                {student && (
                    <div className="stats-grid">
                        <StatCard label="Total XP" value={student.points || 0} icon="⭐" color="#f59e0b" bg="#fffbeb" />
                        <StatCard label="Stories Read" value={student.completed_stories?.length || 0} icon="📚" color="#3b82f6" bg="#eff6ff" />
                        <StatCard label="Quizzes Passed" value={student.completed_quizzes?.length || 0} icon="🏆" color="#10b981" bg="#ecfdf5" />
                        <StatCard label="Current Streak" value={`${student.streak_days || 0} ${student.streak_days === 1 ? 'Day' : 'Days'}`} icon="🔥" color="#ef4444" bg="#fef2f2" />
                    </div>
                )}

                {/* Modules */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '4px', height: '24px', background: '#3b82f6', borderRadius: '2px' }}></span>
                    Learning Modules
                </h2>

                <div className="modules-grid">
                    {stories.map(story => (
                        <div key={story._id} className="module-card">
                            <div className="module-icon-area">
                                💻
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#3b82f6', background: '#eff6ff', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Module</span>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>~10 Mins</span>
                                </div>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '600', color: '#0f172a' }}>{story.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '24px', height: '45px', overflow: 'hidden' }}>
                                    {story.description || 'Master this computer science concept through interactive storytelling.'}
                                </p>
                                <Link to={`/story/${story._id}`} style={{ textDecoration: 'none' }}>
                                    <button className="start-btn">
                                        Start Learning <span>→</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Avatar Modal */}
            {showAvatarModal && (
                <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontWeight: '700' }}>Choose Your Avatar</h3>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '25px' }}>
                            {AVATARS.map(av => (
                                <button
                                    key={av}
                                    onClick={() => updateAvatar(av)}
                                    style={{
                                        fontSize: '2.5rem',
                                        cursor: 'pointer',
                                        background: student.avatar === av ? '#eff6ff' : '#f8fafc',
                                        border: student.avatar === av ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                        borderRadius: '16px',
                                        padding: '15px',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {av}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowAvatarModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500' }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const StatCard = ({ label, value, icon, color, bg }) => (
    <div className="stat-card">
        <div className="stat-icon" style={{ background: bg, color: color }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>{label}</div>
        </div>
    </div>
);

export default Dashboard;
