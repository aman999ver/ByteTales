import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

const TeacherStudents = () => {
    const students = [
        { id: 1, name: "Sneha Sing", progress: 65, status: "On Track", lastActive: "2 hours ago" },
        { id: 2, name: "Rahul Sharma", progress: 90, status: "Ahead", lastActive: "10 mins ago" },
        { id: 3, name: "Priya Patel", progress: 30, status: "Behind", lastActive: "3 days ago" },
        { id: 4, name: "Amit Kumar", progress: 45, status: "On Track", lastActive: "1 day ago" },
    ];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Student Progress 📊</h1>
                    <p className="text-slate-500">Track performance and engagement</p>
                </div>
            </header>

            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                </div>
                <button className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-2 text-slate-600">
                    <Filter size={20} /> Filter
                </button>
            </div>

            <Card className="p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                        <tr>
                            <th className="p-4 font-medium">Student Name</th>
                            <th className="p-4 font-medium w-1/3">Course Progress</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Last Active</th>
                            <th className="p-4 font-medium text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-bold text-slate-700">{s.name}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <ProgressBar value={s.progress} className="h-2 flex-1" />
                                        <span className="text-sm font-bold text-slate-600 w-10">{s.progress}%</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Badge variant={
                                        s.status === 'Ahead' ? 'green' :
                                            s.status === 'Behind' ? 'yellow' : 'blue'
                                    }>
                                        {s.status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-slate-500 text-sm">{s.lastActive}</td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default TeacherStudents;
