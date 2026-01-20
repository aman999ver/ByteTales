import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('stories'); // stories | students | quizzes
    const [stories, setStories] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    // Story Editors
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [selectedStory, setSelectedStory] = useState(null);
    const [partTitle, setPartTitle] = useState('');
    const [partContent, setPartContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [quizIdForPart, setQuizIdForPart] = useState('');

    const [editingPartIndex, setEditingPartIndex] = useState(null);

    // Quiz Creator
    const [quizQuestion, setQuizQuestion] = useState('');
    const [opt1, setOpt1] = useState('');
    const [opt2, setOpt2] = useState('');
    const [opt3, setOpt3] = useState('');
    const [correctIdx, setCorrectIdx] = useState(0);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [createdQuizId, setCreatedQuizId] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchStories();
        fetchStudents();
    }, []);

    const fetchStories = async () => {
        try {
            const res = await api.get('/stories');
            setStories(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error(e);
            setError("Failed to load stories.");
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await api.get('/students');
            setStudents(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error(e);
            setStudents([]);
        }
    };

    // --- Story Functions ---
    const createStory = async (e) => {
        e.preventDefault();
        try {
            await api.post('/stories', { title, description: desc });
            setTitle(''); setDesc('');
            fetchStories();
        } catch (e) { alert("Failed to create story"); }
    };

    const deleteStory = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Delete this story?")) return;
        try {
            await api.delete(`/stories/${id}`);
            fetchStories();
            if (selectedStory && selectedStory._id === id) setSelectedStory(null);
        } catch (e) { alert("Delete failed"); }
    };

    const cleanVideoUrl = (input) => {
        if (!input) return "";
        if (typeof input !== 'string') return "";
        if (input.includes("<iframe")) {
            const srcMatch = input.match(/src="([^"]+)"/);
            return srcMatch ? srcMatch[1] : input;
        }
        if (input.includes("youtube.com/watch?v=")) {
            const videoId = input.split("v=")[1]?.split("&")[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : input;
        }
        if (input.includes("youtu.be/")) {
            const videoId = input.split("youtu.be/")[1]?.split("?")[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : input;
        }
        return input;
    };

    const handlePartSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStory) return;

        const finalVideoUrl = cleanVideoUrl(videoUrl);
        const payload = {
            title: partTitle,
            content: partContent,
            video_url: finalVideoUrl,
            quiz_id: quizIdForPart || null
        };

        try {
            let res;
            if (editingPartIndex !== null) {
                res = await api.put(`/stories/${selectedStory._id}/parts/${editingPartIndex}`, payload);
                alert("Part Updated! ✅");
                setEditingPartIndex(null);
            } else {
                res = await api.put(`/stories/${selectedStory._id}/parts`, payload);
                alert("Part Added! ➕");
            }
            setSelectedStory(res.data);
            setPartTitle(''); setPartContent(''); setVideoUrl(''); setQuizIdForPart('');
            fetchStories();
        } catch (e) {
            console.error(e);
            alert(`Error: ${e.response?.data?.detail || e.message}`);
        }
    };

    const startEditingPart = (index) => {
        if (!selectedStory || !selectedStory.parts) return;
        const p = selectedStory.parts[index];
        if (!p) return;
        setPartTitle(p.title || '');
        setPartContent(p.content || '');
        setVideoUrl(p.video_url || "");
        setQuizIdForPart(p.quiz_id || "");
        setEditingPartIndex(index);
    };

    const cancelEdit = () => {
        setPartTitle(''); setPartContent(''); setVideoUrl(''); setQuizIdForPart('');
        setEditingPartIndex(null);
    };

    const deletePart = async (index) => {
        if (!window.confirm("Delete this part?")) return;
        try {
            const res = await api.delete(`/stories/${selectedStory._id}/parts/${index}`);
            setSelectedStory(res.data);
            fetchStories();
            if (editingPartIndex === index) cancelEdit();
        } catch (e) { alert("Failed to delete part"); }
    };

    // --- Quiz Functions ---
    const addQuestionToBuffer = () => {
        if (!quizQuestion || !opt1 || !opt2) return alert("Fill question and at least 2 options");
        const newQ = {
            question: quizQuestion,
            options: [opt1, opt2, opt3].filter(o => o),
            correct_answer: parseInt(correctIdx)
        };
        setCurrentQuestions([...currentQuestions, newQ]);
        setQuizQuestion(''); setOpt1(''); setOpt2(''); setOpt3('');
    };

    const saveQuiz = async () => {
        if (currentQuestions.length === 0) return alert("Add at least one question");
        try {
            const res = await api.post('/stories/quizzes', { story_part_id: "manual", questions: currentQuestions });
            setCreatedQuizId(res.data._id);
            setCurrentQuestions([]);
            alert(`Quiz Created! ID: ${res.data._id}`);
        } catch (e) { alert("Quiz save failed"); }
    };

    const isMobile = windowWidth < 768;

    return (
        <div className="admin-wrapper">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                    
                    .admin-wrapper {
                        min-height: 100vh;
                        background: #f1f5f9;
                        font-family: 'Outfit', sans-serif;
                        display: flex;
                        flex-direction: column;
                    }

                    /* Header */
                    .admin-header {
                        background: #0f172a;
                        color: white;
                        padding: 15px 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: sticky;
                        top: 0;
                        z-index: 50;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }

                    .admin-nav {
                        display: flex;
                        gap: 10px;
                        background: rgba(255,255,255,0.1);
                        padding: 5px;
                        border-radius: 8px;
                    }

                    .nav-btn {
                        background: transparent;
                        border: none;
                        color: #94a3b8;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.2s;
                    }
                    .nav-btn.active {
                        background: #3b82f6;
                        color: white;
                    }
                    .nav-btn:hover:not(.active) {
                        color: white;
                        background: rgba(255,255,255,0.05);
                    }

                    /* Content */
                    .admin-content {
                        padding: 30px;
                        max-width: 1400px;
                        margin: 0 auto;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    .section-card {
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        border: 1px solid #e2e8f0;
                        padding: 24px;
                        margin-bottom: 24px;
                    }

                    .form-input {
                        width: 100%;
                        padding: 10px 12px;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        font-size: 0.95rem;
                        background: #f8fafc;
                        transition: 0.2s;
                        outline: none;
                        box-sizing: border-box;
                        margin-bottom: 10px;
                    }
                    .form-input:focus {
                        border-color: #3b82f6;
                        background: white;
                        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                    }

                    .primary-btn {
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: 0.2s;
                    }
                    .primary-btn:hover { background: #2563eb; }

                    .danger-btn {
                        background: #ef4444; color: white; border: none; padding: 6px 12px;
                        border-radius: 6px; cursor: pointer; transition: 0.2s; font-size: 0.85rem;
                    }
                    .danger-btn:hover { background: #dc2626; }

                    .edit-btn {
                        background: #f59e0b; color: white; border: none; padding: 6px 12px;
                        border-radius: 6px; cursor: pointer; transition: 0.2s; font-size: 0.85rem; margin-right: 5px;
                    }
                    .edit-btn:hover { background: #d97706; }

                    /* List Items */
                    .list-item {
                        padding: 15px;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        margin-bottom: 10px;
                        background: white;
                        cursor: pointer;
                        transition: 0.2s;
                        position: relative;
                    }
                    .list-item:hover { border-color: #3b82f6; background: #eff6ff; }
                    .list-item.selected { border-color: #3b82f6; background: #eff6ff; ring: 2px solid rgba(59, 130, 246, 0.5); }

                    /* Table */
                    .data-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .data-table th {
                        text-align: left;
                        padding: 12px 16px;
                        background: #f1f5f9;
                        border-bottom: 2px solid #e2e8f0;
                        color: #475569;
                        font-weight: 600;
                    }
                    .data-table td {
                        padding: 12px 16px;
                        border-bottom: 1px solid #e2e8f0;
                        color: #334155;
                    }
                    .data-table tr:hover { background: #f8fafc; }

                    @media (max-width: 768px) {
                        .admin-header { flex-direction: column; gap: 15px; padding: 15px; }
                        .admin-nav { width: 100%; justify-content: space-between; overflow-x: auto; }
                        .admin-content { padding: 15px; }
                        .flex-responsive { flex-direction: column !important; }
                    }
                `}
            </style>

            <header className="admin-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: '30px', height: '30px' }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Admin Console</span>
                </div>

                <nav className="admin-nav">
                    <button className={`nav-btn ${activeTab === 'stories' ? 'active' : ''}`} onClick={() => setActiveTab('stories')}>Stories</button>
                    <button className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students</button>
                    <button className={`nav-btn ${activeTab === 'quizzes' ? 'active' : ''}`} onClick={() => setActiveTab('quizzes')}>Quizzes</button>
                </nav>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Home</button>
                    <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/admin/login'; }} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
                </div>
            </header>

            <main className="admin-content">
                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fecaca' }}>{error}</div>}

                {/* STORIES TAB */}
                {activeTab === 'stories' && (
                    <div style={{ display: 'flex', gap: '25px', flexDirection: isMobile ? 'column' : 'row' }} className="flex-responsive">
                        {/* Sidebar: List & Create */}
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <div className="section-card">
                                <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Create Story</h3>
                                <form onSubmit={createStory}>
                                    <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Story Title" required />
                                    <input className="form-input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Short Description" required />
                                    <button type="submit" className="primary-btn" style={{ width: '100%' }}>Create New Story</button>
                                </form>
                            </div>

                            <div className="section-card">
                                <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Library ({stories?.length})</h3>
                                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                    {stories.map(s => (
                                        <div key={s._id} className={`list-item ${selectedStory?._id === s._id ? 'selected' : ''}`} onClick={() => setSelectedStory(s)}>
                                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{s.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{s.parts?.length || 0} chapters</div>
                                            <button onClick={(e) => deleteStory(s._id, e)} className="danger-btn" style={{ position: 'absolute', right: '10px', top: '10px' }}>Delete</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main: Editor */}
                        <div style={{ flex: 2 }}>
                            {selectedStory ? (
                                <>
                                    <div className="section-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                            <h2 style={{ margin: 0, color: '#0f172a' }}>Editing: {selectedStory.title}</h2>
                                            {editingPartIndex !== null && <button onClick={cancelEdit} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Cancel Edit</button>}
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ margin: '0 0 15px 0', color: '#334155' }}>{editingPartIndex !== null ? 'Update Chapter' : 'Add New Chapter'}</h4>
                                            <form onSubmit={handlePartSubmit}>
                                                <input className="form-input" value={partTitle} onChange={e => setPartTitle(e.target.value)} placeholder="Chapter Title" required />
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <input className="form-input" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="Video URL (YouTube)" />
                                                    <input className="form-input" value={quizIdForPart} onChange={e => setQuizIdForPart(e.target.value)} placeholder="Quiz ID (Optional)" />
                                                </div>
                                                <textarea className="form-input" value={partContent} onChange={e => setPartContent(e.target.value)} placeholder="Story content..." required style={{ height: '150px', resize: 'vertical' }} />
                                                <button type="submit" className="primary-btn">{editingPartIndex !== null ? 'Save Changes' : 'Add Chapter'}</button>
                                            </form>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {selectedStory.parts?.map((p, i) => (
                                            <div key={i} className="section-card" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>Part {i + 1}: {p.title}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{p.content?.substring(0, 60)}...</div>
                                                    <div style={{ marginTop: '5px' }}>
                                                        {p.video_url && <span style={{ fontSize: '0.75rem', background: '#fee2e2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', marginRight: '5px' }}>Video</span>}
                                                        {p.quiz_id && <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px' }}>Quiz</span>}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <button onClick={() => startEditingPart(i)} className="edit-btn">Edit</button>
                                                    <button onClick={() => deletePart(i)} className="danger-btn">Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', border: '2px dashed #cbd5e1', borderRadius: '12px', color: '#94a3b8' }}>
                                    Select a story to manage chapters
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* STUDENTS TAB */}
                {activeTab === 'students' && (
                    <div className="section-card" style={{ overflowX: 'auto' }}>
                        <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Registered Students</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Email Address</th>
                                    <th>Total XP</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(std => (
                                    <tr key={std._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '30px', height: '30px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{std.avatar || '👤'}</div>
                                                {std.name}
                                            </div>
                                        </td>
                                        <td>{std.email}</td>
                                        <td><span style={{ fontWeight: '700', color: '#10b981' }}>{std.points || 0} XP</span></td>
                                        <td><span style={{ padding: '4px 8px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', fontWeight: '600' }}>Active</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* QUIZZES TAB */}
                {activeTab === 'quizzes' && (
                    <div style={{ display: 'flex', gap: '25px', flexDirection: isMobile ? 'column' : 'row' }} className="flex-responsive">
                        <div className="section-card" style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 15px 0' }}>Quiz Creator</h3>
                            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '5px' }}>Question Text</label>
                                <input className="form-input" value={quizQuestion} onChange={e => setQuizQuestion(e.target.value)} placeholder="e.g. What is a variable?" />

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                                    <input className="form-input" value={opt1} onChange={e => setOpt1(e.target.value)} placeholder="Option A" />
                                    <input className="form-input" value={opt2} onChange={e => setOpt2(e.target.value)} placeholder="Option B" />
                                    <input className="form-input" value={opt3} onChange={e => setOpt3(e.target.value)} placeholder="Option C" />
                                    <select className="form-input" value={correctIdx} onChange={e => setCorrectIdx(e.target.value)}>
                                        <option value={0}>Correct: Option A</option>
                                        <option value={1}>Correct: Option B</option>
                                        <option value={2}>Correct: Option C</option>
                                    </select>
                                </div>
                                <button onClick={addQuestionToBuffer} className="primary-btn" style={{ width: '100%', marginTop: '10px', background: '#f59e0b' }}>Add to Quiz</button>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <h4>Current Questions ({currentQuestions.length})</h4>
                                <ul style={{ paddingLeft: '20px', color: '#475569' }}>
                                    {currentQuestions.map((q, i) => (
                                        <li key={i} style={{ marginBottom: '5px' }}>{q.question}</li>
                                    ))}
                                </ul>
                                {currentQuestions.length > 0 && <button onClick={saveQuiz} className="primary-btn" style={{ width: '100%' }}>Save Final Quiz</button>}
                            </div>
                        </div>

                        <div className="section-card" style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 15px 0' }}>Generated Quiz Details</h3>
                            {createdQuizId ? (
                                <div style={{ textAlign: 'center', padding: '40px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
                                    <h4 style={{ margin: 0, color: '#166534' }}>Quiz Created Successfully!</h4>
                                    <p style={{ color: '#15803d' }}>Copy this ID to attach it to a Story Chapter:</p>
                                    <code style={{ display: 'block', padding: '15px', background: 'white', border: '2px solid #86efac', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: '#166534', margin: '20px 0' }}>
                                        {createdQuizId}
                                    </code>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
                                    Create and save a quiz to generate an ID here.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Admin;
