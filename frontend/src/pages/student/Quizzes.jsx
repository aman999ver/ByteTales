import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { Check, X, AlertCircle, ChevronRight, Trophy, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const Quizzes = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Computer Fundamentals Questions
    const questions = [
        {
            id: 1,
            text: "Which of these is an INPUT device?",
            visual: "⌨️",
            options: [
                { id: 'a', text: "Keyboard", icon: "⌨️" },
                { id: 'b', text: "Monitor", icon: "🖥️" },
                { id: 'c', text: "Printer", icon: "🖨️" },
                { id: 'd', text: "Speaker", icon: "🔊" },
            ],
            correctAnswer: 'a',
            explanation: "A Keyboard sends information TO the computer, so it's an Input device!"
        },
        {
            id: 2,
            text: "Which device shows you what the computer is doing?",
            visual: "🖥️",
            options: [
                { id: 'a', text: "Mouse", icon: "🖱️" },
                { id: 'b', text: "Scanner", icon: "📠" },
                { id: 'c', text: "Monitor", icon: "🖥️" },
                { id: 'd', text: "Microphone", icon: "🎤" },
            ],
            correctAnswer: 'c',
            explanation: "The Monitor (screen) OUTPUTS pictures and text for you to see."
        },
        {
            id: 3,
            text: "Who is known as the 'Father of the Computer'?",
            visual: "👴",
            options: [
                { id: 'a', text: "Charles Babbage", icon: "🎩" },
                { id: 'b', text: "Steve Jobs", icon: "📱" },
                { id: 'c', text: "Bill Gates", icon: "💻" },
                { id: 'd', text: "Albert Einstein", icon: "⚛️" },
            ],
            correctAnswer: 'a',
            explanation: "Charles Babbage designed the first mechanical computer called the Analytical Engine!"
        },
        {
            id: 4,
            text: "What was the name of the first general-purpose electronic computer?",
            visual: "🏭",
            options: [
                { id: 'a', text: "iPhone", icon: "📱" },
                { id: 'b', text: "ENIAC", icon: "🏢" },
                { id: 'c', text: "PlayStation", icon: "🎮" },
                { id: 'd', text: "Laptop", icon: "💻" },
            ],
            correctAnswer: 'b',
            explanation: "ENIAC was huge! It filled an entire room and used lots of electricity."
        },
        {
            id: 5,
            text: "Which part of the computer is like its 'Brain'?",
            visual: "🧠",
            options: [
                { id: 'a', text: "Mouse", icon: "🖱️" },
                { id: 'b', text: "CPU", icon: "🧠" },
                { id: 'c', text: "Keyboard", icon: "⌨️" },
                { id: 'd', text: "Webcam", icon: "📷" },
            ],
            correctAnswer: 'b',
            explanation: "The CPU (Central Processing Unit) does all the thinking and calculations!"
        }
    ];

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (optionId) => {
        if (!isSubmitted) {
            setSelectedAnswer(optionId);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        const percentage = (score / questions.length) * 100;
        return (
            <div className="max-w-2xl mx-auto py-8">
                <Card className="text-center p-12 space-y-8">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 bg-brand-yellow rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl"
                    >
                        <Trophy size={64} className="text-white" />
                    </motion.div>

                    <h2 className="text-4xl font-bold text-slate-800">Quiz Completed! 🌟</h2>

                    <div className="space-y-2">
                        <p className="text-slate-500 text-lg">You scored</p>
                        <div className="text-6xl font-bold text-brand-blue">
                            {score} <span className="text-3xl text-slate-400">/ {questions.length}</span>
                        </div>
                    </div>

                    <p className="text-xl text-slate-700">
                        {percentage === 100 ? "Amazing! You're a Computer Genius! 🏆" :
                            percentage >= 60 ? "Great job! Keep learning! 🚀" :
                                "Nice try! Give it another go! 💪"}
                    </p>

                    <Button onClick={restartQuiz} className="px-8 py-4 text-lg mt-8">
                        <RefreshCcw className="mr-2" size={20} /> Play Again
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card className="border-t-8 border-t-brand-purple min-h-[600px] flex flex-col">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-slate-500 mb-2 font-bold uppercase tracking-wider">
                        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                        <span>Score: {score}</span>
                    </div>
                    <ProgressBar value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Question */}
                        <div className="mb-8 text-center bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
                            <span className="text-4xl mb-4 block">{currentQuestion.visual}</span>
                            <h2 className="text-2xl font-bold text-slate-800">{currentQuestion.text}</h2>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.id)}
                                    className={cn(
                                        "p-4 rounded-xl border-2 text-left transition-all relative hover:scale-[1.02] active:scale-[0.98]",
                                        selectedAnswer === option.id
                                            ? "border-brand-blue bg-blue-50 ring-2 ring-brand-blue/20"
                                            : "border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50",
                                        isSubmitted && option.id === currentQuestion.correctAnswer && "border-green-500 bg-green-50",
                                        isSubmitted && selectedAnswer === option.id && selectedAnswer !== currentQuestion.correctAnswer && "border-red-500 bg-red-50",
                                        isSubmitted && "cursor-default hover:scale-100"
                                    )}
                                    disabled={isSubmitted}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{option.icon}</span>
                                        <span className="font-bold text-slate-700 text-lg">{option.text}</span>
                                    </div>
                                    {isSubmitted && option.id === currentQuestion.correctAnswer && (
                                        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-green-600">
                                            <Check size={24} strokeWidth={3} />
                                        </div>
                                    )}
                                    {isSubmitted && selectedAnswer === option.id && selectedAnswer !== currentQuestion.correctAnswer && (
                                        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500">
                                            <X size={24} strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Feedback Area */}
                        <div className="mt-auto">
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "p-4 rounded-xl mb-6 flex gap-4 items-start border-l-4 shadow-sm",
                                        selectedAnswer === currentQuestion.correctAnswer
                                            ? "bg-green-50 text-green-800 border-green-500"
                                            : "bg-red-50 text-red-800 border-red-500"
                                    )}
                                >
                                    <AlertCircle className="shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="font-bold text-lg mb-1">
                                            {selectedAnswer === currentQuestion.correctAnswer ? "Correct! 🎉" : "Oops! Not quite..."}
                                        </p>
                                        <p className="text-base">{currentQuestion.explanation}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Action Button */}
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                {!isSubmitted ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!selectedAnswer}
                                        className="w-full md:w-auto px-10 py-3 text-lg"
                                    >
                                        Check Answer
                                    </Button>
                                ) : (
                                    <Button onClick={handleNext} className="w-full md:w-auto px-10 py-3 text-lg">
                                        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"} <ChevronRight size={20} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Card>
        </div>
    );
};

export default Quizzes;
