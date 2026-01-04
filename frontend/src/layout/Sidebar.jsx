import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BrainCircuit, Users, Settings, Code, Shield, LogOut, X } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/logo.png';

const Sidebar = ({ role = 'student', isOpen, onClose }) => {
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
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div className={cn(
                "w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="ByteTales Logo" className="w-10 h-10 object-contain" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                            ByteTales
                        </span>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                    {currentMenu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose} // Auto-close on mobile when link clicked
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

                <div className="p-4 border-t border-slate-100 space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">
                            {currentUser.initials}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{role}</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors justify-center border border-red-100">
                        <LogOut size={20} />
                        Logout
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
