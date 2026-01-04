import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { Play, Star, Trophy, Clock, Code, ArrowRight, Monitor, History, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const chapters = [
        {
            id: 1,
            title: "Input & Output",
            description: "Learn how computers take commands and talk back!",
            icon: Monitor,
            color: "blue",
            link: "/student/stories",
            status: "Start"
        },
        {
            id: 2,
            title: "History of Computer",
            description: "From giant room-sized machines to the phone in your pocket.",
            icon: History,
            color: "purple",
            link: "#",
            status: "Locked"
        },
        {
            id: 3,
            title: "Logic Gates (AND/OR)",
            description: "How computers make decisions with 1s and 0s.",
            icon: Binary,
            color: "green",
            link: "#",
            status: "Locked"
        }
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Learning Path 🚀</h1>
                    <p className="text-slate-500 mt-2">Pick a chapter to start your adventure!</p>
                </div>
                <div className="flex gap-4">
                    <Card className="py-2 px-4 flex items-center gap-2 !rounded-full">
                        <Trophy className="text-brand-yellow" size={20} />
                        <span className="font-bold text-slate-700">Level 5</span>
                    </Card>
                </div>
            </header>

            {/* Chapter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                    <motion.div variants={item} key={chapter.id}>
                        <Card hover className="h-full flex flex-col group cursor-pointer relative overflow-hidden">
                            {/* Color Accent */}
                            <div className={`absolute top-0 left-0 w-full h-2 bg-brand-${chapter.color}`}></div>

                            <div className="mb-6 flex justify-between items-start">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${chapter.color}-50 text-brand-${chapter.color}`}>
                                    <chapter.icon size={32} />
                                </div>
                                {chapter.status === 'Locked' && (
                                    <Badge variant="gray" className="bg-slate-100 text-slate-400">Locked</Badge>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                                {chapter.title}
                            </h3>
                            <p className="text-slate-500 mb-6 flex-1">
                                {chapter.description}
                            </p>

                            <div className="flex gap-4 pt-2">
                                <Link to="/student/stories">
                                    <Button className="pl-6 pr-8 text-lg py-4 shadow-lg shadow-blue-500/20">
                                        <Play size={20} fill="currentColor" />
                                        Start Mission
                                    </Button>
                                </Link>
                                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
