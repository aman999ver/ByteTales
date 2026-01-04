import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Plus, Edit2, Trash2, Video, FileText, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherLessons = () => {
    const lessons = [
        { id: 1, title: "Input & Output Adventure", type: "mixed", status: "Active", students: 24, lastDate: "2024-03-10" },
        { id: 2, title: "History of Computer", type: "reading", status: "Draft", students: 0, lastDate: "2024-03-12" },
        { id: 3, title: "Logic Gates Intro", type: "quiz", status: "Active", students: 12, lastDate: "2024-03-08" },
    ];

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return <Video size={16} />;
            case 'reading': return <FileText size={16} />;
            case 'quiz': return <BrainCircuit size={16} />;
            default: return <Video size={16} />;
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Lessons 📚</h1>
                    <p className="text-slate-500">Create, edit, and assign content</p>
                </div>
                <Link to="/teacher/create-lesson">
                    <Button>
                        <Plus size={20} className="mr-2" /> New Lesson
                    </Button>
                </Link>
            </header>

            <Card className="p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                        <tr>
                            <th className="p-4 font-medium">Lesson Title</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Enrolled</th>
                            <th className="p-4 font-medium">Last Modified</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {lessons.map(lesson => (
                            <tr key={lesson.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                                            {getTypeIcon(lesson.type)}
                                        </div>
                                        <span className="font-bold text-slate-700">{lesson.title}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Badge variant={lesson.status === 'Active' ? 'green' : 'yellow'}>{lesson.status}</Badge>
                                </td>
                                <td className="p-4 text-slate-600">{lesson.students} Students</td>
                                <td className="p-4 text-slate-500 text-sm">{lesson.lastDate}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-brand-blue">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500">
                                        <Trash2 size={16} />
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

export default TeacherLessons;
