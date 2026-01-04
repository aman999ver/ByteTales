import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import { User, Mail, Award, Zap, BookOpen, Clock, Camera } from 'lucide-react';

const Profile = () => {
    const user = {
        name: "Sneha Sing",
        email: "sneha@bytetales.com",
        role: "Student",
        level: 5,
        xp: 2450,
        nextLevelXp: 3000,
        joined: "January 2024"
    };

    const badges = [
        { id: 1, name: "First Code", icon: "🚀", color: "blue" },
        { id: 2, name: "Quiz Master", icon: "🧠", color: "purple" },
        { id: 3, name: "Story Teller", icon: "📚", color: "green" },
        { id: 4, name: "Bug Hunter", icon: "🐛", color: "yellow" }
    ];

    const recentActivity = [
        { id: 1, action: "Completed Input & Output Adventure", time: "2 hours ago", xp: "+50 XP" },
        { id: 2, action: "Scored 100% on Logic Quiz", time: "1 day ago", xp: "+100 XP" },
        { id: 3, action: "Started History of Computer", time: "2 days ago", xp: "+10 XP" }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Profile 👤</h1>
                <p className="text-slate-500">Your coding journey stats and achievements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: ID Card */}
                <div className="space-y-6">
                    <Card className="text-center p-8 flex flex-col items-center">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center text-4xl overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" alt="Avatar" className="w-full h-full" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-brand-blue text-white rounded-full hover:bg-blue-600 transition-colors shadow-md">
                                <Camera size={16} />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                        <Badge variant="blue" className="mt-2 mb-4">{user.role}</Badge>

                        <div className="w-full text-left space-y-3 mt-4 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Mail size={18} />
                                <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <Clock size={18} />
                                <span className="text-sm">Joined {user.joined}</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full mt-6">Edit Profile</Button>
                    </Card>

                    <Card className="bg-gradient-to-br from-brand-purple to-purple-600 text-white border-0">
                        <div className="flex items-center gap-3 mb-2 opacity-90">
                            <Zap size={20} />
                            <span className="font-bold">Current Level</span>
                        </div>
                        <div className="text-4xl font-bold mb-4">{user.level}</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm opacity-90">
                                <span>{user.xp} XP</span>
                                <span>{user.nextLevelXp} XP</span>
                            </div>
                            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white/90 rounded-full"
                                    style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Stats & Badges */}
                <div className="md:col-span-2 space-y-6">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">12</div>
                                <div className="text-sm text-slate-500">Lessons Finished</div>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                                <Award size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">4</div>
                                <div className="text-sm text-slate-500">Badges Earned</div>
                            </div>
                        </Card>
                    </div>

                    {/* Badges */}
                    <Card>
                        <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                            <Award className="text-brand-yellow" /> Badges Collection
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {badges.map(badge => (
                                <div key={badge.id} className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                    <div className="text-4xl mb-2">{badge.icon}</div>
                                    <span className="font-medium text-slate-700 text-center text-sm">{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                                        <div>
                                            <p className="font-medium text-slate-800">{activity.action}</p>
                                            <p className="text-xs text-slate-400">{activity.time}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-brand-green bg-green-50 px-2 py-1 rounded-lg">
                                        {activity.xp}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default Profile;
