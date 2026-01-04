import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { Play, Check, ChevronRight, RotateCcw, PartyPopper, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
// Import Videos
import part1 from '../../assets/input&output/part1.mp4';
import part2 from '../../assets/input&output/part2.mp4';
import part3 from '../../assets/input&output/part3.mp4';

const Stories = () => {
    const [step, setStep] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    const lesson = {
        title: "Input & Output Adventure 🎥",
        description: "Learn how computers work: Input, Output, and Processing!",
        steps: [
            {
                type: 'video',
                title: "Part 1: Input Devices",
                content: "Watch how we give commands to the computer using Input Devices.",
                src: part1
            },
            {
                type: 'quiz',
                title: "Checkpoint 1",
                question: "Which of these is an INPUT device?",
                options: [
                    { id: 'a', text: "Monitor (Screen)" },
                    { id: 'b', text: "Keyboard" },
                    { id: 'c', text: "Printer" }
                ],
                correctAnswer: 'b',
                explanation: "Correct! We type on the Keyboard to send Input to the computer."
            },
            {
                type: 'video',
                title: "Part 2: Output Devices",
                content: "See how the computer shows us the results using Output Devices.",
                src: part2
            },
            {
                type: 'quiz',
                title: "Checkpoint 2",
                question: "Which device is used to see OUTPUT?",
                options: [
                    { id: 'a', text: "Monitor" },
                    { id: 'b', text: "Mouse" },
                    { id: 'c', text: "Microphone" }
                ],
                correctAnswer: 'a',
                explanation: "That's right! The Monitor shows us pictures and text, which is Output."
            },
            {
                type: 'video',
                title: "Part 3: Input to Output",
                content: "Discover the magic in the middle: Processing!",
                src: part3
            },
            {
                type: 'quiz',
                title: "Checkpoint 3",
                question: "What happens BETWEEN Input and Output?",
                options: [
                    { id: 'a', text: "Sleeping" },
                    { id: 'b', text: "Processing" },
                    { id: 'c', text: "Nothing" }
                ],
                correctAnswer: 'b',
                explanation: "Excellent! The computer processes the Input to create the Output."
            }
        ]
    };

    const currentStep = lesson.steps[step];
    const isLastStep = step === lesson.steps.length - 1;

    const handleNext = () => {
        if (step < lesson.steps.length - 1) {
            setStep(step + 1);
            setQuizSelected(null);
            setQuizSubmitted(false);
        } else {
            // Handle completion
            alert("Lesson Completed! 🎉");
        }
    };

    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
    };

    const canProceed = () => {
        if (currentStep.type === 'video') return true;
        if (currentStep.type === 'quiz') return quizSubmitted && quizSelected === currentStep.correctAnswer;
        return true;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{lesson.title}</h1>
                    <p className="text-slate-500">{lesson.description}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">Adventure Progress</p>
                    <ProgressBar value={((step) / lesson.steps.length) * 100} className="w-48 h-2" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <Card className="min-h-[400px] overflow-hidden p-0 flex flex-col">
                        {currentStep.type === 'video' ? (
                            <div className="bg-black aspect-video w-full flex items-center justify-center relative group">
                                <video
                                    src={currentStep.src}
                                    controls
                                    className="w-full h-full object-contain"
                                    autoPlay={false}
                                />
                            </div>
                        ) : (
                            <div className="bg-brand-purple/10 h-64 flex items-center justify-center border-b border-purple-100">
                                <div className="text-center p-8">
                                    <span className="text-6xl mb-4 block">🤔</span>
                                    <h2 className="text-3xl font-bold text-brand-purple">Quick Quiz!</h2>
                                </div>
                            </div>
                        )}

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="mb-6">
                                <Badge variant={currentStep.type === 'video' ? 'blue' : 'purple'} className="mb-2 uppercase tracking-wide">
                                    {currentStep.type}
                                </Badge>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentStep.title}</h2>
                                {currentStep.type === 'video' && (
                                    <p className="text-lg text-slate-600">{currentStep.content}</p>
                                )}

                                {currentStep.type === 'quiz' && (
                                    <div className="mt-4 space-y-4">
                                        <p className="text-xl font-medium text-slate-800">{currentStep.question}</p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {currentStep.options.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => !quizSubmitted && setQuizSelected(opt.id)}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 text-left font-medium transition-all flex justify-between items-center",
                                                        quizSelected === opt.id
                                                            ? "border-brand-purple bg-purple-50 text-brand-purple ring-1 ring-purple-200"
                                                            : "border-slate-200 hover:border-brand-purple/40 text-slate-600",
                                                        quizSubmitted && opt.id === currentStep.correctAnswer && "bg-green-100 border-green-500 text-green-700",
                                                        quizSubmitted && quizSelected === opt.id && quizSelected !== currentStep.correctAnswer && "bg-red-50 border-red-500 text-red-700"
                                                    )}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span className="w-6 h-6 rounded-full bg-white border border-current flex items-center justify-center text-xs font-bold">
                                                            {opt.id.toUpperCase()}
                                                        </span>
                                                        {opt.text}
                                                    </span>
                                                    {quizSubmitted && opt.id === currentStep.correctAnswer && <Check size={20} />}

                                                </button>
                                            ))}
                                        </div>

                                        {quizSubmitted && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={cn(
                                                    "p-4 rounded-xl flex gap-3 text-sm font-medium",
                                                    quizSelected === currentStep.correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                )}
                                            >
                                                <AlertCircle size={20} />
                                                {quizSelected === currentStep.correctAnswer ? currentStep.explanation : "Try again!"}
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto flex justify-end">
                                {currentStep.type === 'quiz' && !quizSubmitted ? (
                                    <Button onClick={handleQuizSubmit} disabled={!quizSelected} className="px-8">
                                        Check Answer
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="px-8 py-3 text-lg"
                                    >
                                        {isLastStep ? "Finish Adventure" : "Next Step"} <ChevronRight size={20} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Stories;
