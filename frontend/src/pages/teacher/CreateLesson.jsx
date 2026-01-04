import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Save, Plus, Image, Video, Type } from 'lucide-react';
import { cn } from '../../lib/utils';

const CreateLesson = () => {
    const [activeTab, setActiveTab] = useState('story');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Create New Lesson 📝</h1>
                    <p className="text-slate-500">Design an interactive path for your students</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost">Cancel</Button>
                    <Button>
                        <Save size={18} className="mr-2" /> Save Draft
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <Card className="p-4 space-y-2">
                        <h3 className="font-bold text-slate-700 mb-2">Lesson Structure</h3>
                        {['Concept Intro', 'Story Video', 'Visual Logic', 'Quiz'].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-slate-600">
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold border border-slate-200">
                                    {idx + 1}
                                </div>
                                <span className={idx === 0 ? "font-bold text-brand-blue" : ""}>{step}</span>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2 border-dashed">
                            <Plus size={16} /> Add Step
                        </Button>
                    </Card>
                </div>

                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Lesson Title</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    placeholder="e.g. The Loop Adventure"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue h-24 resize-none"
                                    placeholder="What will students learn?"
                                />
                            </div>

                            <div className="border-t border-slate-100 pt-4">
                                <h3 className="font-bold text-slate-800 mb-4">Content Builder</h3>

                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                            <Video size={24} />
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                                            <Image size={24} />
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                                            <Type size={24} />
                                        </div>
                                    </div>
                                    <p className="font-medium">Drag conceptual blocks here</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateLesson;
