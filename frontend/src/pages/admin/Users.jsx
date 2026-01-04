import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Plus, User, Search, MoreHorizontal } from 'lucide-react';

const AdminUsers = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);

    const users = [
        { id: 1, name: "Sneha Sing", role: "Student", email: "sneha@student.com", status: "Active" },
        { id: 2, name: "Santosh", role: "Teacher", email: "santosh@teacher.com", status: "Active" },
        { id: 3, name: "Rahul", role: "Student", email: "rahul@student.com", status: "Inactive" },
    ];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">User Management 👥</h1>
                    <p className="text-slate-500">Create and manage accounts</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} className="mr-2" /> Add User
                </Button>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                {['all', 'teacher', 'student'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-4 font-medium capitalize transition-colors ${activeTab === tab
                                ? 'text-brand-blue border-b-2 border-brand-blue'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab === 'all' ? 'All Users' : tab + 's'}
                    </button>
                ))}
            </div>

            <Card className="p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.filter(u => activeTab === 'all' || u.role.toLowerCase() === activeTab).map(u => (
                            <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 flex items-center gap-3 font-bold text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User size={16} />
                                    </div>
                                    {u.name}
                                </td>
                                <td className="p-4">
                                    <Badge variant={u.role === 'Teacher' ? 'purple' : 'blue'}>{u.role}</Badge>
                                </td>
                                <td className="p-4 text-slate-600">{u.email}</td>
                                <td className="p-4">
                                    <span className={`text-sm font-bold ${u.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}>
                                        {u.status}
                                    </span>
                                </td>
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

            {/* Simple Modal Triggered by State */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md space-y-4">
                        <h2 className="text-xl font-bold">Create New User</h2>

                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="e.g. John Doe" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <select className="w-full p-2 border rounded-lg">
                                <option>Student</option>
                                <option>Teacher</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" className="w-full p-2 border rounded-lg" placeholder="email@example.com" />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button onClick={() => setShowModal(false)}>Create Account</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
