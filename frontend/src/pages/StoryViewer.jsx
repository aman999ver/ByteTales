import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function StoryViewer() {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/stories/${id}`)
            .then(res => {
                setStory(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);



    const handleNextPart = async () => {
        const part = story.parts[currentPartIndex];
        if (part.quiz_id) {
            // Load quiz
            try {
                const res = await api.get(`/stories/quizzes/${part.quiz_id}`);
                setQuiz(res.data);
                setShowQuiz(true);
                setCurrentQIndex(0);
                setUserAnswers([]);
                setScore(0);
                setFeedback('');
            } catch (err) {
                console.error("Quiz load failed", err);
                alert("Could not load quiz.");
                advance();
            }
        } else {
            advance();
        }
    };

    const advance = () => {
        if (currentPartIndex < story.parts.length - 1) {
            setCurrentPartIndex(prev => prev + 1);
            setShowQuiz(false);
            setQuiz(null);
        } else {
            alert("🎉 Adventure Completed! +100 XP");
            navigate('/dashboard');
        }
    };

    const [userAnswers, setUserAnswers] = useState([]);

    const handleAnswer = (optionIndex) => {
        const newAnswers = [...userAnswers, optionIndex];
        setUserAnswers(newAnswers);

        if (currentQIndex < quiz.questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            // Quiz Finished - Submit to Backend
            submitQuiz(newAnswers);
        }
    };

    const submitQuiz = async (answers) => {
        try {
            const res = await api.post(`/stories/quizzes/${currentPart.quiz_id}/submit`, { answers });
            const result = res.data;
            alert(`🎉 Quiz Complete!\n\nCorrect: ${result.correct_count}/${result.total_questions}\nPoints Earned: +${result.points_awarded}`);
            advance();
        } catch (err) {
            console.error(err);
            alert("Error submitting quiz results.");
            advance();
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!story) return <div>Story not found.</div>;

    // Check for empty parts
    if (!story.parts || story.parts.length === 0) {
        return (
            <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', textAlign: 'center' }} className="card">
                <h2>{story.title}</h2>
                <p>⚠️ This story has no content yet.</p>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => navigate('/dashboard')} style={{ background: '#2196f3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                        🔙 Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const currentPart = story.parts[currentPartIndex];
    if (!currentPart) return <div>Error loading part.</div>;

    if (showQuiz && quiz) {
        // ... quiz render ...
        const question = quiz.questions[currentQIndex];
        return (
            <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }} className="card">
                <h3>Quiz Time! 🧠</h3>
                <div style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
                    Question {currentQIndex + 1} of {quiz.questions.length}
                </div>
                <div style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>{question.question}</div>

                <div style={{ display: 'grid', gap: '15px' }}>
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            style={{
                                padding: '20px',
                                textAlign: 'left',
                                fontSize: '1.1rem',
                                background: '#e3f2fd',
                                border: '2px solid #2196f3',
                                color: '#0d47a1',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                            onMouseOut={e => e.target.style.transform = 'scale(1)'}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const getEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("embed/")) return url;

        // Convert watch -> embed for display if data is "bad"
        if (url.includes("youtube.com/watch?v=")) {
            const videoId = url.split("v=")[1]?.split("&")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1]?.split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }} className="card">
            <h2>{story.title} - Part {currentPartIndex + 1}</h2>
            <h3>{currentPart.title}</h3>

            {currentPart.video_url && (
                <div style={{ margin: '20px 0', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    <iframe
                        src={getEmbedUrl(currentPart.video_url)}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Story Video"
                    ></iframe>
                </div>
            )}

            <div style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: '30px 0', whiteSpace: 'pre-wrap' }}>
                {currentPart.content}
            </div>
            <div style={{ textAlign: 'right' }}>
                <button onClick={handleNextPart}>
                    {currentPart.quiz_id ? 'Take Quiz 📝' : 'Next Part ➡️'}
                </button>
            </div>
        </div>
    );
}

export default StoryViewer;
