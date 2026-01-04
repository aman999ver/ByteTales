import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BrainCircuit, Users, Settings, Code, Shield } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/logo.png';

const Sidebar = ({ role = 'student' }) => {
    const menus = {
        student: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/student' },
            { name: 'Story Lessons', icon: BookOpen, path: '/student/stories' },
            { name: 'Quiz Arena', icon: BrainCircuit, path: '/student/quizzes' },
            { name: 'My Profile', icon: Users, path: '/student/profile' },
        ],
        teacher: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher' },
            { name: 'Manage Lessons', icon: BookOpen, path: '/teacher/lessons' },
            { name: 'Student Progress', icon: Users, path: '/teacher/students' },
            { name: 'Settings', icon: Settings, path: '/teacher/settings' },
        ],
        admin: [
            { name: 'Overview', icon: Shield, path: '/admin' },
            { name: 'Users', icon: Users, path: '/admin/users' },
            { name: 'Content', icon: Code, path: '/admin/content' },
        ]
    };

    const currentMenu = menus[role] || menus.student;

    const userNames = {
        student: { name: "Sneha Sing", initials: "SS" },
        teacher: { name: "Santosh", initials: "S" },
        admin: { name: "Admin", initials: "AD" }
    };
    const currentUser = userNames[role] || { name: "User", initials: "U" };

    return (
        <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
            <div className="p-6 flex items-center gap-3">
                <img src={logo} alt="ByteTales Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                    ByteTales
                </span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {currentMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/student' || item.path === '/teacher' || item.path === '/admin'}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                            isActive
                                ? "bg-brand-blue text-white shadow-md shadow-blue-200"
                                : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
                        )}
                    >
                        <item.icon size={20} />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">
                        {currentUser.initials}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
