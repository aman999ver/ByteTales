import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Plus, BookOpen, Layers, Users } from 'lucide-react';

const AdminContent = () => {
    const courses = [
        { id: 1, title: "Computer Basics", modules: 5, instructor: "Santosh", enrolled: 45 },
        { id: 2, title: "Advanced Logic", modules: 8, instructor: "Santosh", enrolled: 12 },
        { id: 3, title: "Python for Kids", modules: 10, instructor: "Pending", enrolled: 0 },
    ];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Content Management 📚</h1>
                    <p className="text-slate-500">Manage courses and curriculum</p>
                </div>
                <Button>
                    <Plus size={20} className="mr-2" /> Create Course
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <Card key={course.id} hover className="flex flex-col">
                        <div className="h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400">
                            <BookOpen size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>

                        <div className="space-y-2 mb-6 flex-1">
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <Layers size={16} /> {course.modules} Modules
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <Users size={16} /> {course.enrolled} Enrolled
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                            <div className="text-sm">
                                <span className="text-slate-400 block text-xs">Instructor</span>
                                <span className="font-bold text-slate-700">{course.instructor}</span>
                            </div>
                            <Button variant="outline" className="text-sm px-3">Manage</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminContent;
