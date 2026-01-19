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
        // Initial Fetch
        fetchStories();
        fetchStudents();
    }, []);

    const fetchStories = async () => {
        try {
            const res = await api.get('/stories');
            // Safety check
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
            console.error("Need admin auth for students", e);
            // Don't block UI, just empty list
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

        // 1. Handle iframe code
        if (input.includes("<iframe")) {
            const srcMatch = input.match(/src="([^"]+)"/);
            return srcMatch ? srcMatch[1] : input;
        }

        // 2. Handle standard YouTube URL (watch?v=)
        if (input.includes("youtube.com/watch?v=")) {
            const videoId = input.split("v=")[1]?.split("&")[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : input;
        }

        // 3. Handle short YouTube URL (youtu.be/)
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
                // Update
                res = await api.put(`/stories/${selectedStory._id}/parts/${editingPartIndex}`, payload);
                alert("Part Updated! ✅");
                setEditingPartIndex(null);
            } else {
                // Create
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
            const res = await api.post('/stories/quizzes', {
                story_part_id: "manual",
                questions: currentQuestions
            });
            setCreatedQuizId(res.data._id);
            setCurrentQuestions([]);
            alert(`Quiz Created! ID: ${res.data._id}`);
        } catch (e) { alert("Quiz save failed"); }
    };

    // --- Render ---
    // Safety Wrap: If anything above throws, React will try to render. But logical errors inside render are common.
    // We use ? everywhere.

    // --- Render ---
    const isMobile = windowWidth < 768;

    return (
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#2c3e50', padding: '15px', borderRadius: '10px', color: 'white', gap: isMobile ? '15px' : '0' }}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '20px', width: isMobile ? '100%' : 'auto' }}>
                    <h1 style={{ margin: 0, fontSize: isMobile ? '1.5rem' : '2rem', color: '#ecf0f1' }}>🛡️ Admin</h1>
                    <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', maxWidth: '100%', paddingBottom: '5px' }}>
                        <button onClick={() => setActiveTab('stories')} style={tabStyle(activeTab === 'stories')}>📖 Stories</button>
                        <button onClick={() => setActiveTab('students')} style={tabStyle(activeTab === 'students')}>🎓 Students</button>
                        <button onClick={() => setActiveTab('quizzes')} style={tabStyle(activeTab === 'quizzes')}>❓ Quizzes</button>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-end' }}>
                    <button onClick={() => navigate('/')} style={{ background: '#34495e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>🏠 Home</button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/admin/login';
                        }}
                        style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Logout 🚪
                    </button>
                </div>
            </div>

            {error && <div style={{ padding: '10px', background: 'red', color: 'white', marginBottom: '10px' }}>{error}</div>}

            {/* STORIES TAB */}
            {activeTab === 'stories' && (
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', flex: 1 }}>
                    {/* List */}
                    <div style={{ flex: 1, order: isMobile ? 2 : 1 }}>
                        <div className="card">
                            <h3>Create New Story</h3>
                            <form onSubmit={createStory} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ padding: '8px' }} />
                                <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" required style={{ padding: '8px' }} />
                                <button type="submit" style={btnStyle('#4ECDC4')}>Create</button>
                            </form>
                        </div>
                        <h3>Library ({stories?.length || 0})</h3>
                        {Array.isArray(stories) && stories.map(s => (
                            <div key={s._id} onClick={() => { setSelectedStory(s); if (isMobile) window.scrollTo(0, 400); }} style={{ ...itemStyle, border: selectedStory?._id === s._id ? '2px solid #4ECDC4' : '1px solid #ddd' }}>
                                <strong>{s.title}</strong>
                                <small style={{ display: 'block', color: '#666' }}>{s.parts?.length || 0} parts</small>
                                <button onClick={(e) => deleteStory(s._id, e)} style={{ ...btnStyle('red'), position: 'absolute', right: '10px', top: '10px', padding: '5px 10px' }}>🗑️</button>
                            </div>
                        ))}
                    </div>

                    {/* Editor */}
                    <div style={{ flex: 2, padding: isMobile ? 0 : '0 20px', borderLeft: isMobile ? 'none' : '2px solid #eee', order: isMobile ? 1 : 2 }}>
                        {selectedStory ? (
                            <>
                                <h2>Editing: {selectedStory.title}</h2>
                                <div className="card" style={{ background: editingPartIndex !== null ? '#fff3e0' : '#f9f9f9', border: editingPartIndex !== null ? '2px solid orange' : 'none' }}>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{editingPartIndex !== null ? `✍️ Edit Part ${editingPartIndex + 1}` : '➕ Add Part'}</h3>
                                        {editingPartIndex !== null && <button type="button" onClick={cancelEdit} style={{ fontSize: '0.8rem', padding: '5px', cursor: 'pointer' }}>❌ Cancel</button>}
                                    </div>

                                    <form onSubmit={handlePartSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <input value={partTitle} onChange={e => setPartTitle(e.target.value)} placeholder="Part Title" required style={{ padding: '8px' }} />
                                        <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="Video URL" style={{ padding: '8px' }} />
                                        <input value={quizIdForPart} onChange={e => setQuizIdForPart(e.target.value)} placeholder="Quiz ID (Optional)" style={{ padding: '8px' }} />
                                        <textarea value={partContent} onChange={e => setPartContent(e.target.value)} placeholder="Content..." required style={{ padding: '8px', height: '100px' }} />

                                        <button type="submit" style={btnStyle(editingPartIndex !== null ? '#ff9800' : '#2196f3')}>
                                            {editingPartIndex !== null ? '💾 Update' : '➕ Add'}
                                        </button>
                                    </form>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    {selectedStory.parts?.map((p, i) => (
                                        <div key={i} className="card" style={{ position: 'relative', marginBottom: '10px' }}>
                                            <h4>Part {i + 1}: {p.title}</h4>
                                            <div style={{ marginBottom: '5px' }}>
                                                {p.video_url && <span style={{ fontSize: '0.8rem', background: 'red', color: 'white', padding: '2px 5px', borderRadius: '4px', marginRight: '5px' }}>🎬 Video</span>}
                                                {p.quiz_id && <span style={{ fontSize: '0.8rem', background: 'orange', color: 'white', padding: '2px 5px', borderRadius: '4px' }}>📝 Quiz</span>}
                                            </div>
                                            <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '5px' }}>{p.content?.substring(0, 50)}...</p>
                                            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                                                <button onClick={() => startEditingPart(i)} style={{ ...btnStyle('#ff9800'), padding: '5px', marginRight: '5px' }}>✏️</button>
                                                <button onClick={() => deletePart(i)} style={{ ...btnStyle('red'), padding: '5px' }}>🗑️</button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!selectedStory.parts || selectedStory.parts.length === 0) && <p style={{ color: '#999' }}>No parts. Add one! 👆</p>}
                                </div>
                            </>
                        ) : <div style={{ textAlign: 'center', color: '#999', marginTop: '50px', padding: '20px', background: '#f0f0f0', borderRadius: '10px' }}>Select a story below to edit ⬇️</div>}
                    </div>
                </div>
            )}

            {/* STUDENTS TAB */}
            {activeTab === 'students' && (
                <div style={{ flex: 1, overflowX: 'auto' }}>
                    <div className="card" style={{ minWidth: '600px' }}>
                        <h3>🎓 Student Progress</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                                    <th style={{ padding: '10px' }}>Name</th>
                                    <th style={{ padding: '10px' }}>Email</th>
                                    <th style={{ padding: '10px' }}>XP</th>
                                    <th style={{ padding: '10px' }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(students) && students.map(std => (
                                    <tr key={std._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>{std.name}</td>
                                        <td style={{ padding: '10px' }}>{std.email}</td>
                                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#2ecc71' }}>{std.points || 0}</td>
                                        <td style={{ padding: '10px' }}>{std.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* QUIZ CREATOR TAB */}
            {activeTab === 'quizzes' && (
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                    <div className="card" style={{ flex: 1 }}>
                        <h3>1. Design a Quiz</h3>
                        <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
                            <label>Question:</label>
                            <input value={quizQuestion} onChange={e => setQuizQuestion(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                <input value={opt1} onChange={e => setOpt1(e.target.value)} placeholder="Option 1" style={{ padding: '8px' }} />
                                <input value={opt2} onChange={e => setOpt2(e.target.value)} placeholder="Option 2" style={{ padding: '8px' }} />
                                <input value={opt3} onChange={e => setOpt3(e.target.value)} placeholder="Option 3" style={{ padding: '8px' }} />
                                <select value={correctIdx} onChange={e => setCorrectIdx(e.target.value)} style={{ padding: '8px' }}>
                                    <option value={0}>Correct: Option 1</option>
                                    <option value={1}>Correct: Option 2</option>
                                    <option value={2}>Correct: Option 3</option>
                                </select>
                            </div>
                            <button onClick={addQuestionToBuffer} style={btnStyle('#ff9800', '100%')}>Add Question</button>
                        </div>

                        <h4>Questions: {currentQuestions.length}</h4>
                        <ul>
                            {currentQuestions.map((q, i) => (
                                <li key={i}>{q.question}</li>
                            ))}
                        </ul>
                        {currentQuestions.length > 0 && (
                            <button onClick={saveQuiz} style={btnStyle('#2196f3', '100%')}>💾 Save Quiz</button>
                        )}
                    </div>

                    <div className="card" style={{ flex: 1, background: '#e3f2fd' }}>
                        <h3>2. Use Quiz ID</h3>
                        <p>Copy ID & paste in Story Part:</p>
                        {createdQuizId && (
                            <div style={{ padding: '20px', background: 'white', borderRadius: '10px', textAlign: 'center', overflowWrap: 'anywhere' }}>
                                <code style={{ fontSize: '1.2rem', display: 'block', margin: '10px' }}>{createdQuizId}</code>
                                <small>Copied!</small>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Helpers
const tabStyle = (active) => ({
    padding: '10px 20px',
    border: 'none',
    background: active ? '#4ECDC4' : 'transparent',
    color: active ? 'white' : '#ecf0f1', // Light grey for inactive
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: '0.3s'
});

const btnStyle = (bg, width = 'auto') => ({
    padding: '10px 15px',
    background: bg,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: width
});

const itemStyle = {
    padding: '15px',
    background: 'white',
    borderRadius: '10px',
    marginBottom: '10px',
    position: 'relative',
    cursor: 'pointer'
};

export default Admin;
