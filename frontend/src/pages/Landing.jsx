import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { User, BookOpen, Shield, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Landing = () => {
    const roles = [
        {
            id: 'student',
            title: "Student",
            description: "Join the adventure! Learn coding with stories and games.",
            icon: GraduationCap,
            color: "blue",
            path: "/student"
        },
        {
            id: 'teacher',
            title: "Teacher",
            description: "Manage your class, create lessons, and track progress.",
            icon: BookOpen,
            color: "purple",
            path: "/teacher"
        },
        {
            id: 'admin',
            title: "Admin",
            description: "Oversee the platform, users, and curriculum content.",
            icon: Shield,
            color: "green",
            path: "/admin"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <img src={logo} alt="ByteTales Logo" className="w-16 h-16 object-contain animate-bounce" />
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                        ByteTales
                    </h1>
                </div>
                <p className="text-xl text-slate-500 max-w-lg mx-auto">
                    The interactive computer science learning platform for the next generation of creative coders.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                {roles.map(role => (
                    <Link key={role.id} to={role.path} className="group">
                        <Card hover className="h-full flex flex-col items-center text-center p-8 border-2 border-transparent hover:border-brand-blue/20 transition-all">
                            <div className={`w-20 h-20 rounded-3xl bg-${role.color}-50 text-${role.color}-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <role.icon size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">{role.title}</h2>
                            <p className="text-slate-500 mb-6 flex-1">{role.description}</p>

                            <div className={`flex items-center gap-2 font-bold text-brand-${role.color} group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100`}>
                                Enter Portal <ArrowRight size={20} />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <footer className="mt-16 text-slate-400 text-sm">
                © 2026 ByteTales SAS Tech Group G
            </footer>
        </div>
    );
};

export default Landing;
