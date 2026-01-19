import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Dashboard() {
    const [student, setStudent] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/students/me');
                setStudent(userRes.data);

                const storiesRes = await api.get('/stories');
                setStories(storiesRes.data);
            } catch (err) {
                console.error(err);
                // Redirect to login if auth fails
                // window.location.href = '/login'; 
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
            alert(`Avatar updated to ${avatar}!`);
        } catch (e) {
            console.error(e);
            alert(`Failed to update avatar: ${e.response?.data?.detail || e.message}`);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.5rem' }}>Loading your adventure... ⏳</div>;

    const AVATARS = ['🧑‍🚀', '🧙‍♂️', '🕵️‍♀️', '🥷', '🧚‍♀️'];

    return (
        <div style={{ padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>

            {/* Avatar Modal */}
            {showAvatarModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                        <h2>Choose Your Hero! 🎭</h2>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}>
                            {AVATARS.map(av => (
                                <button
                                    key={av}
                                    onClick={() => updateAvatar(av)}
                                    style={{ fontSize: '3rem', cursor: 'pointer', background: 'transparent', border: '2px solid #eee', borderRadius: '10px', padding: '10px', transition: 'transform 0.2s' }}
                                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                >
                                    {av}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowAvatarModal(false)} style={{ background: '#ff1744', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </div>
            )}

            {student && (
                <div style={{
                    background: 'linear-gradient(45deg, #673ab7, #512da8)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: windowWidth < 600 ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(103, 58, 183, 0.3)',
                    textAlign: windowWidth < 600 ? 'center' : 'left',
                    gap: windowWidth < 600 ? '15px' : '0'
                }}>
                    <div style={{ display: 'flex', flexDirection: windowWidth < 600 ? 'column' : 'row', alignItems: 'center', gap: '20px' }}>
                        <div style={{ fontSize: '3rem', background: 'white', borderRadius: '50%', padding: '5px', lineHeight: '1' }}>
                            {student.avatar || '👨‍🚀'}
                        </div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>Welcome, {student.name}!</h2>
                            <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '1rem' }}>
                                🚀 Explorer • ⭐ XP: {student.points || 0}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: windowWidth < 600 ? '10px' : '0' }}>
                        <button onClick={() => setShowAvatarModal(true)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>Change Avatar ✏️</button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }}
                            style={{ background: '#ff1744', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                            Logout 🚪
                        </button>
                    </div>
                </div>
            )}

            <h3>🗺️ Choose Your Quest</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {stories.map(story => (
                    <div key={story._id} className="card" style={{ border: 'none', borderBottom: '4px solid #00e676', transition: 'transform 0.3s', padding: '15px' }}>
                        <div style={{ height: '100px', background: '#b2ebf2', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                            🏰
                        </div>
                        <h4 style={{ fontSize: '1.1rem', margin: '0 0 5px 0' }}>{story.title}</h4>
                        <p style={{ color: '#546e7a', fontSize: '0.9rem', marginBottom: '10px', height: '40px', overflow: 'hidden' }}>{story.description}</p>
                        <Link to={`/story/${story._id}`}>
                            <button style={{ width: '100%', marginTop: '5px', background: '#00e676', borderColor: '#00c853', boxShadow: '3px 3px 0px #00c853', padding: '8px', fontSize: '0.9rem' }}>Start Adventure ▶</button>
                        </Link>
                    </div>
                ))}
                {stories.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '30px', background: 'rgba(255,255,255,0.5)', borderRadius: '15px' }}>
                        <p style={{ fontSize: '1.2rem' }}>No quests available right now! 🧙‍♂️</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
