import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Users, Shield, TrendingUp, BarChart, MoreHorizontal } from 'lucide-react';

const AdminDashboard = () => {
    const users = [
        { id: 1, name: "Maria Garcia", role: "Teacher", status: "Active", joined: "2 days ago" },
        { id: 2, name: "Alex Chen", role: "Student", status: "Active", joined: "5 hours ago" },
        { id: 3, name: "Sam Wilson", role: "Student", status: "Inactive", joined: "1 week ago" },
        { id: 4, name: "Sarah Smith", role: "Admin", status: "Active", joined: "1 month ago" },
    ];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel ⚙️</h1>
                    <p className="text-slate-500">Platform overview and management</p>
                </div>
                <Button variant="outline">Download Report</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-slate-900 text-white border-slate-800">
                    <div className="mb-4 opacity-50"><Users size={24} /></div>
                    <h3 className="text-3xl font-bold">1,240</h3>
                    <p className="text-slate-400">Total Users</p>
                </Card>
                <Card>
                    <div className="mb-4 text-green-500"><TrendingUp size={24} /></div>
                    <h3 className="text-3xl font-bold text-slate-800">+12%</h3>
                    <p className="text-slate-500">Growth this month</p>
                </Card>
                <Card>
                    <div className="mb-4 text-brand-blue"><Shield size={24} /></div>
                    <h3 className="text-3xl font-bold text-slate-800">5</h3>
                    <p className="text-slate-500">Admin Staff</p>
                </Card>
                <Card>
                    <div className="mb-4 text-brand-purple"><BarChart size={24} /></div>
                    <h3 className="text-3xl font-bold text-slate-800">85%</h3>
                    <p className="text-slate-500">Engagement Rate</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Recent Users</h3>
                        <Button variant="ghost" className="text-sm">Manage All</Button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm">
                            <tr>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Joined</th>
                                <th className="p-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-700">{u.name}</td>
                                    <td className="p-4">
                                        <Badge variant="light" className="border border-slate-200">{u.role}</Badge>
                                    </td>
                                    <td className="p-4">
                                        <div className={`flex items-center gap-2 text-sm font-medium ${u.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}>
                                            <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                            {u.status}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">{u.joined}</td>
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

                <Card>
                    <h3 className="font-bold text-lg mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-green-700">All Systems Operational</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                            <p className="text-green-600 text-sm">Last check: 1 min ago</p>
                        </div>

                        <div className="space-y-3 pt-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Database Usage</span>
                                <span className="font-medium">45%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-blue w-[45%]"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Storage</span>
                                <span className="font-medium">23%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-purple w-[23%]"></div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
