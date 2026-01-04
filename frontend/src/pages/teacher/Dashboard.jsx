import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Users, BookOpen, Plus, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
    const students = [
        { id: 1, name: "Alice Sharma", progress: 85, lastActive: "2 mins ago", status: "Online" },
        { id: 2, name: "Bob Chen", progress: 42, lastActive: "1 day ago", status: "Offline" },
        { id: 3, name: "Charlie Kim", progress: 90, lastActive: "5 mins ago", status: "Online" },
        { id: 4, name: "Daisy Miller", progress: 12, lastActive: "3 days ago", status: "Offline" },
    ];

    const modules = [
        { title: "Input & Output Adventure", lessons: 3, students: 24, status: "Active" },
        { title: "Loops & Iterations", lessons: 8, students: 18, status: "Draft" },
    ];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard 🍎</h1>
                    <p className="text-slate-500">Manage your classes and content</p>
                </div>
                <Link to="/teacher/create-lesson">
                    <Button className="pl-4 pr-6">
                        <Plus size={20} /> Create Lesson
                    </Button>
                </Link>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-brand-blue">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">124</h3>
                            <p className="text-slate-500">Total Students</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 rounded-xl text-brand-purple">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">12</h3>
                            <p className="text-slate-500">Active Modules</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Progress Table */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Student Progress</h3>
                        <Button variant="ghost" className="text-sm">View All</Button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm">
                            <tr>
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Progress</th>
                                <th className="p-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students.map(s => (
                                <tr key={s.id} className="hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-700">{s.name}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-blue" style={{ width: `${s.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{s.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={s.status === 'Online' ? 'green' : 'gray'} className={s.status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}>
                                            {s.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* Modules List */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Course Modules</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {modules.map((m, idx) => (
                            <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{m.title}</h4>
                                        <p className="text-sm text-slate-500">{m.lessons} Lessons • {m.students} Students</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={m.status === 'Active' ? 'green' : 'yellow'}>{m.status}</Badge>
                                    <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TeacherDashboard;
