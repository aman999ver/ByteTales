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
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]);

    // New State for Quiz Feedback
    const [selectedOption, setSelectedOption] = useState(null); // Which option user clicked
    const [isCorrect, setIsCorrect] = useState(null); // True/False for feedback
    const [showNextQ, setShowNextQ] = useState(false); // Delay before next Q

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
            try {
                const res = await api.get(`/stories/quizzes/${part.quiz_id}`);
                setQuiz(res.data);
                setShowQuiz(true);
                setCurrentQIndex(0);
                setUserAnswers([]);
                setSelectedOption(null); setIsCorrect(null); setShowNextQ(false);
            } catch (err) {
                console.error("Quiz load failed", err);
                alert("Could not load quiz.");
                advance();
            }
        } else {
            advance();
        }
    };

    const advance = async () => {
        if (currentPartIndex < story.parts.length - 1) {
            setCurrentPartIndex(prev => prev + 1);
            setShowQuiz(false);
            setQuiz(null);
        } else {
            // Mark Story as Complete
            try {
                await api.post(`/stories/${id}/complete`);
            } catch (e) { console.error("Failed to mark complete", e); }

            alert("🎉 Adventure Completed! +100 XP");
            navigate('/dashboard');
        }
    };

    const handleAnswer = (optionIndex) => {
        if (selectedOption !== null) return; // Prevent double click

        const currentQ = quiz.questions[currentQIndex];
        const correct = currentQ.correct_answer === optionIndex;

        setSelectedOption(optionIndex);
        setIsCorrect(correct);

        // Prepare data for submission, but wait for user to see result
        const newAnswers = [...userAnswers, optionIndex];
        setUserAnswers(newAnswers);

        setTimeout(() => {
            if (currentQIndex < quiz.questions.length - 1) {
                setCurrentQIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                submitQuiz(newAnswers);
            }
        }, 1500); // 1.5s delay to see feedback
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

    // Helper for video embed
    const getEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("embed/")) return url;
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

    // Loading State
    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#64748b', fontFamily: "'Outfit', sans-serif" }}>
            Loading Adventure...
        </div>
    );

    // Error State
    if (!story) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#ef4444', fontFamily: "'Outfit', sans-serif" }}>
            Story not found.
        </div>
    );

    const currentPart = story && story.parts ? story.parts[currentPartIndex] : null;

    if (!currentPart) return null; // Should be handled by loading state usually

    return (
        <div className="story-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                
                .story-page {
                    height: 100vh;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    font-family: 'Outfit', sans-serif;
                    box-sizing: border-box;
                    overflow: hidden;
                }

                .content-container {
                    width: 100%;
                    max-width: 1200px;
                    height: 100%;
                    max-height: 85vh;
                    background: white;
                    border-radius: 24px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                }

                .story-header {
                    padding: 20px 30px;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-shrink: 0;
                }

                .progress-pill {
                    background: #eff6ff;
                    color: #3b82f6;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }

                .story-body {
                    padding: 0;
                    flex: 1; 
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .quiz-container {
                     padding: 30px;
                     overflow-y: auto;
                     height: 100%;
                     box-sizing: border-box;
                }

                .split-layout {
                    display: flex;
                    height: 100%;
                    width: 100%;
                }

                .video-col {
                    flex: 1.8;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000;
                    border-right: 1px solid #e2e8f0;
                    overflow: hidden;
                }

                .text-col {
                    flex: 1;
                    padding: 40px;
                    overflow-y: auto;
                    background: white;
                }

                .video-frame {
                    width: 100%;
                    position: relative;
                    aspect-ratio: 16 / 9;
                    box-shadow: none;
                    background: #000;
                    max-height: 100%;
                }
                
                .video-frame iframe {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                /* Scrollbars */
                .text-col::-webkit-scrollbar, .quiz-container::-webkit-scrollbar { width: 8px; }
                .text-col::-webkit-scrollbar-track, .quiz-container::-webkit-scrollbar-track { background: transparent; }
                .text-col::-webkit-scrollbar-thumb, .quiz-container::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .text-col::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

                .text-content {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #334155;
                    white-space: pre-wrap;
                }

                .action-footer {
                    padding: 20px 30px;
                    border-top: 1px solid #e2e8f0;
                    background: #f8fafc;
                    display: flex;
                    justify-content: flex-end;
                    flex-shrink: 0;
                }

                .primary-btn {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    color: white; border: none; padding: 14px 28px; border-radius: 12px;
                    font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
                    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
                    display: flex; align-items: center; gap: 8px;
                }
                .primary-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
                }

                /* Quiz Styles */
                .quiz-option {
                    width: 100%;
                    padding: 20px;
                    margin-bottom: 15px;
                    text-align: left;
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 1.05rem;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-weight: 500;
                    position: relative;
                }
                .quiz-option:hover {
                    border-color: #3b82f6;
                    background: #eff6ff;
                    color: #1e293b;
                    transform: translateX(5px);
                }

                .quiz-option.correct {
                    background: #dcfce7;
                    border-color: #22c55e;
                    color: #15803d;
                }
                .quiz-option.wrong {
                    background: #fee2e2;
                    border-color: #ef4444;
                    color: #b91c1c;
                }

                @media (max-width: 850px) {
                    .split-layout { flexDirection: column; overflow-y: auto; }
                    .video-col { flex: 0 0 auto; padding: 0; border-right: none; border-bottom: 1px solid #e2e8f0; }
                    .text-col { flex: 0 0 auto; padding: 20px; overflow-y: visible; }
                    .story-body { overflow-y: auto; display: block; }
                }
                
                @media (max-width: 640px) {
                    .story-page { padding: 0; height: 100dvh; }
                    .content-container { border-radius: 0; border: none; }
                }
            `}</style>

            <div className="content-container">
                {/* Header */}
                <div className="story-header">
                    <div>
                        <h2 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.8rem', fontWeight: '700' }}>{story.title}</h2>
                        <h3 style={{ margin: 0, color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>
                            {showQuiz ? 'Knowledge Check' : `Chapter ${currentPartIndex + 1}: ${currentPart.title}`}
                        </h3>
                    </div>
                </div>

                {/* Body */}
                <div className="story-body">
                    {showQuiz && quiz ? (
                        <div className="quiz-container">
                            <div style={{ marginBottom: '25px', maxWidth: '700px', margin: '0 auto' }}>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '5px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Question {currentQIndex + 1} of {quiz.questions.length}</span>
                                <h2 style={{ marginTop: '15px', color: '#0f172a', lineHeight: '1.3' }}>{quiz.questions[currentQIndex].question}</h2>
                            </div>

                            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                                {quiz.questions[currentQIndex].options.map((opt, idx) => {
                                    let btnClass = "quiz-option";
                                    if (selectedOption !== null) {
                                        // Show correct for correct, wrong for wrong
                                        if (idx === quiz.questions[currentQIndex].correct_answer) btnClass += " correct";
                                        else if (idx === selectedOption) btnClass += " wrong";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            className={btnClass}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={selectedOption !== null}
                                        >
                                            {opt}
                                            {/* Optional Icon Feedback */}
                                            {selectedOption !== null && idx === quiz.questions[currentQIndex].correct_answer && (
                                                <span style={{ float: 'right' }}>✅</span>
                                            )}
                                            {selectedOption !== null && idx === selectedOption && idx !== quiz.questions[currentQIndex].correct_answer && (
                                                <span style={{ float: 'right' }}>❌</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="split-layout">
                            {/* Left: Video */}
                            {currentPart.video_url && (
                                <div className="video-col">
                                    <div className="video-frame">
                                        <iframe
                                            src={getEmbedUrl(currentPart.video_url)}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="Story Video"
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Right: Text */}
                            <div className="text-col" style={{ flex: currentPart.video_url ? 1 : 1 }}>
                                {!currentPart.video_url && <div style={{ marginBottom: '20px', color: '#94a3b8', fontStyle: 'italic' }}>(No video for this chapter)</div>}
                                <div className="text-content">
                                    {currentPart.content}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!showQuiz && (
                    <div className="action-footer">
                        <button className="primary-btn" onClick={handleNextPart}>
                            {currentPart.quiz_id ? 'Take Quiz 📝' : 'Next Chapter →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StoryViewer;
