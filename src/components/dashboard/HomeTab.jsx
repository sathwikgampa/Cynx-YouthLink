import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTilt } from '../../hooks/useTilt';

const HomeTab = ({ setActiveTab }) => {
    const { currentUser } = useAuth();
    
    // Setup tilt references
    const statusTiltRef = useTilt();
    const missionTiltRef = useTilt();
    const integrityTiltRef = useTilt();
    const motivationTiltRef = useTilt();

    const username = currentUser?.email?.split('@')[0] || "Nature #2124";

    return (
        <section id="tab-home" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-teal-500/5 border border-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">
                        <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
                        On-Device Encryption Active
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white">
                        Welcome, <span className="text-teal-400">{username}</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                        Cynx-YouthLink Dashboard: "Since joining, your average sleep has increased by <span className="text-teal-400 font-bold">15%</span>."
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Status Orbs Group */}
                <div ref={statusTiltRef} className="tilt-element glass-panel border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-teal-500/20 transition-all">
                    <header className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-teal-400">monitoring</span>
                        <h3 className="font-bold tracking-tight text-white">Active Pulse</h3>
                    </header>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Anonymity Shield</span>
                            <span className="text-xs font-black text-teal-400">100% SECURE</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 w-full animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Mentor Connection</span>
                            <span className="text-xs font-black text-teal-400">LIVE BRIDGE</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 w-[84%]"></div>
                        </div>
                    </div>
                </div>

                {/* Daily Horizon Quick View */}
                <div ref={missionTiltRef} className="tilt-element glass-panel border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all cursor-pointer" onClick={() => setActiveTab('schedule')}>
                    <h3 className="font-bold mb-4 text-white">Upcoming Mission</h3>
                    <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20">
                        <p className="text-xs font-black text-teal-400 uppercase mb-2">STARTS IN 1 WEEK</p>
                        <h4 className="text-lg font-bold text-white">Mathematics 101</h4>
                        <p className="text-sm text-slate-400 mt-1">Physics Lab Floor 2</p>
                    </div>
                </div>

                {/* AI WELLBEING INTEGRITY SCORE */}
                <div ref={integrityTiltRef} className="tilt-element glass-panel border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-teal-500/20 transition-all bg-teal-500/5 col-span-1 md:col-span-2 lg:col-span-1">
                    <header className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                                <span className="material-symbols-outlined text-2xl">neurology</span>
                            </div>
                            <h3 className="font-bold tracking-tight text-white">Integrity Score</h3>
                        </div>
                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20 animate-pulse">Analyzing...</span>
                    </header>
                    
                    <div className="space-y-6">
                        <div className="p-5 bg-black/20 rounded-2xl border border-white/5">
                            <p className="text-sm text-slate-300 leading-relaxed font-bold italic">"Syncing Sleep & Self-Check data streams..."</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Wellness Probability</span>
                            <span className="text-xs font-black text-teal-400">--%</span>
                        </div>
                    </div>
                </div>

                {/* Motivation Orb */}
                <div ref={motivationTiltRef} className="tilt-element glass-panel border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center col-span-1 md:col-span-2 lg:col-span-3 lg:w-1/3 mx-auto">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 animate-pulse">
                        <span className="material-symbols-outlined text-3xl">sparkles</span>
                    </div>
                    <p className="text-sm italic text-slate-300">"One small positive thought in the morning can change your entire day."</p>
                </div>
            </div>
        </section>
    );
};

export default HomeTab;
