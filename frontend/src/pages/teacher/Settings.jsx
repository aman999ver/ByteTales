import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { User, Bell, Lock, Globe } from 'lucide-react';

const TeacherSettings = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Settings ⚙️</h1>
                <p className="text-slate-500">Manage your profile and preferences</p>
            </header>

            <Card>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <User size={20} className="text-brand-blue" /> Profile Information
                </h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input type="text" defaultValue="Santosh" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input type="text" defaultValue="" className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input type="email" defaultValue="santosh@bytetales.com" className="w-full p-2 border rounded-lg" />
                    </div>
                    <Button>Save Changes</Button>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-brand-purple" /> Notifications
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                        <span>Student Activity</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                        <span>New Enrollments</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TeacherSettings;
