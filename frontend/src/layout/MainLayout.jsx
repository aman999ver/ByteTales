import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ role = 'student' }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Sidebar role={role} />
            <main className="ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
