import React from 'react';

const NeuralHistoryTab = () => {
    return (
        <section className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-headline text-white mb-2">Neural History <span className="text-teal-500">Integrity Analytics</span></h2>
                <p className="text-slate-400">Longitudinal correlation of your 4-Axis wellbeing lifeflow over the last 7 days.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Combined Resilience Heatmap */}
                <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] space-y-8 glass-panel">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">7-Day Resilience Vector</h3>
                    <div className="h-64 flex items-end justify-between gap-4">
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[60%] w-full bg-teal-500/10 rounded-xl hover:bg-teal-500/40 transition-all border border-teal-500/20"></div>
                            <span className="block text-center text-[10px] font-black text-slate-600">MON</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[45%] w-full bg-teal-500/10 rounded-xl hover:bg-teal-500/40 transition-all border border-teal-500/20"></div>
                            <span className="block text-center text-[10px] font-black text-slate-600">TUE</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[80%] w-full bg-teal-500/20 rounded-xl hover:bg-teal-500/40 transition-all border border-teal-500/20"></div>
                            <span className="block text-center text-[10px] font-black text-slate-600">WED</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[30%] w-full bg-rose-500/40 rounded-xl hover:bg-rose-500/60 transition-all border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]"></div>
                            <span className="block text-center text-[10px] font-black text-slate-600 text-rose-500">THU</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[65%] w-full bg-teal-500/10 rounded-xl hover:bg-teal-500/40 transition-all border border-teal-500/20"></div>
                            <span className="block text-center text-[10px] font-black text-slate-600">FRI</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[85%] w-full bg-teal-500/30 rounded-xl hover:bg-teal-500/40 transition-all border border-teal-500/20"></div>
                            <span className="block text-center text-[10px] font-black text-slate-600">SAT</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col justify-end">
                            <div className="h-[95%] w-full bg-teal-500 rounded-xl shadow-[0_0_30px_rgba(13,148,136,0.4)]"></div>
                            <span className="block text-center text-[10px] font-black text-teal-400 tracking-widest">TODAY</span>
                        </div>
                    </div>
                </div>

                {/* Axis Breakdown */}
                <div className="space-y-6 flex flex-col h-full">
                    <div className="flex-1 bg-slate-900/40 glass-panel backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
                        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400">
                            <span className="material-symbols-outlined">bedtime</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white mb-1">Biological Axis (Sleep)</h4>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[75%]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-900/40 glass-panel backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
                        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400">
                            <span className="material-symbols-outlined">quiz</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white mb-1">Cognitive Axis (Queries)</h4>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[60%]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-900/40 glass-panel backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
                        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400">
                            <span className="material-symbols-outlined">auto_stories</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white mb-1">Reflective Axis (Journal)</h4>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[85%]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-900/40 glass-panel backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
                        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white mb-1">Conversational Axis (AI Chat)</h4>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[40%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeuralHistoryTab;
