import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCursorGlow } from '../../hooks/useCursorGlow';
import './dashboard.css';

import HomeTab from './HomeTab';
import ScheduleTab from './ScheduleTab';
import SleepTrackerTab from './SleepTrackerTab';
import JournalTab from './JournalTab';
import MentorUplinkTab from './MentorUplinkTab';
import CompanionAITab from './CompanionAITab';
import ProfileTab from './ProfileTab';
import SelfCheckTab from './SelfCheckTab';
import NeuralHistoryTab from './NeuralHistoryTab';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const location = useLocation();

    const handleTabSwitch = (tabName) => {
        setActiveTab(tabName);
        if (location.pathname !== '/youth' && location.pathname !== '/youth/') {
            navigate('/youth');
        }
    };

    useCursorGlow();

    const handleLogout = async () => {
        try {
            if (logout) {
                await logout();
            }
            localStorage.removeItem('chatUser');
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="font-body min-h-screen relative overflow-hidden bg-slate-background text-slate-200" style={{ backgroundColor: '#0f172a' }}>
            {/* Cinematic Glows */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-teal-500 glow-sphere rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-sky-500 glow-sphere rounded-full translate-y-1/2 -translate-x-1/4"></div>

            {/* Navigation Hub (Sidebar) */}
            <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-slate-900/80 backdrop-blur-2xl border-r border-white/5 z-[60] flex flex-col py-8 transition-all duration-500">
                <div className="px-6 mb-12 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-900 shadow-[0_0_20px_rgba(13,148,136,0.4)]">
                        <span className="material-symbols-outlined font-black">shield</span>
                    </div>
                    <span className="text-xl font-black font-headline tracking-tighter text-teal-400 hidden lg:block">User Dashboard</span>
                </div>
                
                <nav className="flex-1 px-4 space-y-2 mt-8">
                    <button onClick={() => handleTabSwitch('home')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'home' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined font-black">home</span>
                        <span className="hidden lg:block text-sm font-black uppercase tracking-widest">Home Hub</span>
                    </button>
                    <button onClick={() => handleTabSwitch('profile')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'profile' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">account_circle</span>
                        <span className="hidden lg:block text-sm">Profile Settings</span>
                    </button>
                    <div className="h-px bg-white/5 my-4 mx-4"></div>
                    <button onClick={() => handleTabSwitch('schedule')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'schedule' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">event</span>
                        <span className="hidden lg:block text-sm">Week Hub</span>
                    </button>
                    <button onClick={() => handleTabSwitch('sleep')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'sleep' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">bedtime</span>
                        <span className="hidden lg:block text-sm">Sleep Tracker</span>
                    </button>
                    <button onClick={() => handleTabSwitch('journal')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'journal' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">auto_stories</span>
                        <span className="hidden lg:block text-sm">My Journal</span>
                    </button>
                    <button onClick={() => handleTabSwitch('mentor')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'mentor' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">forum</span>
                        <span className="hidden lg:block text-sm">Message Mentor</span>
                    </button>
                    <button onClick={() => handleTabSwitch('query')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'query' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">quiz</span>
                        <span className="hidden lg:block text-sm">Self-Check</span>
                    </button>
                    <button onClick={() => handleTabSwitch('trends')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'trends' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">monitoring</span>
                        <span className="hidden lg:block text-sm">Neural History</span>
                    </button>
                    <button onClick={() => handleTabSwitch('ai-chat')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === 'ai-chat' && (location.pathname === '/youth' || location.pathname === '/youth/') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">smart_toy</span>
                        <span className="hidden lg:block text-sm">Companion AI</span>
                    </button>
                    <button onClick={() => navigate('/youth/moods')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${location.pathname.includes('/youth/moods') || location.pathname.includes('/youth/lobby') || location.pathname.includes('/youth/chat') ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
                        <span className="material-symbols-outlined">groups</span>
                        <span className="hidden lg:block text-sm">Group Chat</span>
                    </button>
                </nav>

                <div className="px-4 mt-auto">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/5 transition-all group">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="hidden lg:block text-sm font-bold">Terminate Session</span>
                    </button>
                </div>
            </aside>

            <main id="app" className="lg:ml-64 h-screen relative z-10 w-[calc(100%-5rem)] lg:w-[calc(100%-16rem)] overflow-y-auto overflow-x-hidden scroll-smooth">
                {(location.pathname === '/youth' || location.pathname === '/youth/') ? (
                    <>
                        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
                        {activeTab === 'schedule' && <ScheduleTab />}
                        {activeTab === 'sleep' && <SleepTrackerTab />}
                        {activeTab === 'journal' && <JournalTab />}
                        {activeTab === 'mentor' && <MentorUplinkTab />}
                        {activeTab === 'query' && <SelfCheckTab />}
                        {activeTab === 'trends' && <NeuralHistoryTab />}
                        {activeTab === 'ai-chat' && <CompanionAITab />}
                        {activeTab === 'profile' && <ProfileTab />}
                    </>
                ) : (
                    <Outlet />
                )}
            </main>
        </div>
    );
};

export default UserDashboard;
