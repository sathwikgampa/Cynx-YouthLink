import React from 'react';
import { useTilt } from '../../hooks/useTilt';

const ScheduleTab = () => {
    const countdownTiltRef = useTilt();
    const heatmapTiltRef = useTilt();

    return (
        <section id="tab-schedule" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-headline text-white mb-2">Week Hub <span className="text-teal-500">Mission Control</span></h2>
                <p className="text-slate-400">Visualizing high-pressure zones across your academic week.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Countdown */}
                <div ref={countdownTiltRef} className="tilt-element lg:col-span-12 glass-panel p-10 rounded-[3rem] border border-teal-500/20 flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-teal-500">Highest Priority Deadline</span>
                        <h3 className="text-4xl md:text-5xl font-black font-headline text-white">Data Structures Exam</h3>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="text-center">
                            <span id="mission-countdown" className="text-4xl md:text-7xl font-black text-teal-400">04:12:00</span>
                            <p className="text-[10px] font-black uppercase text-slate-500 mt-2">Mission T-Minus</p>
                        </div>
                    </div>
                </div>

                {/* Heatmap */}
                <div ref={heatmapTiltRef} className="tilt-element lg:col-span-5 glass-panel p-8 rounded-[2.5rem]">
                    <h3 className="font-bold mb-6 flex items-center gap-2 text-white">
                        <span className="material-symbols-outlined text-red-500">local_fire_department</span>
                        Intensity Heatmap
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                        {/* MON */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">M</span>
                            <div className="aspect-square bg-teal-500/20 rounded-lg"></div>
                        </div>
                        {/* TUE */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">T</span>
                            <div className="aspect-square bg-teal-500/40 rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.2)]"></div>
                        </div>
                        {/* WED */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">W</span>
                            <div className="aspect-square bg-red-500/40 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse"></div>
                        </div>
                        {/* THU */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">T</span>
                            <div className="aspect-square bg-red-500/60 rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.4)]"></div>
                        </div>
                        {/* FRI */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">F</span>
                            <div className="aspect-square bg-teal-500/10 rounded-lg"></div>
                        </div>
                        {/* SAT */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">S</span>
                            <div className="aspect-square border border-white/5 rounded-lg opacity-20"></div>
                        </div>
                        {/* SUN */}
                        <div className="space-y-2 text-center">
                            <span className="text-[10px] font-black text-slate-600">S</span>
                            <div className="aspect-square border border-white/5 rounded-lg opacity-20"></div>
                        </div>
                    </div>
                    <p className="mt-6 text-xs text-slate-500 leading-relaxed italic">
                        Warning: High pressure clusters detected in midweek. Prepare for recovery period on Friday.
                    </p>
                </div>

                {/* Schedule List with Red-Flags */}
                <div className="lg:col-span-7 glass-panel p-8 rounded-[2.5rem]">
                    <h3 className="font-bold mb-6 text-white">Today's Schedule</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-teal-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                                    <span className="material-symbols-outlined">description</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Physics Assignment</h4>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">DEADLINE 16:00</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-black text-slate-500">READY?</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-teal-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Mental Logic Workshop</h4>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">TOMORROW 09:00</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-black text-slate-500">OPTIMIZED</span>
                                <span className="material-symbols-outlined text-teal-500 text-sm">check_circle</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 border-l-4 border-l-red-500">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-black italic">!</div>
                                <div>
                                    <h4 className="text-sm font-bold text-red-500">Mental Health Review Required</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">POST-EXAM FEEDBACK PENDING</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-black hover:bg-red-500 hover:text-white transition-all">REVIEW TRENDS</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleTab;
