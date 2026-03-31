import React, { useState } from 'react';

const SelfCheckTab = () => {
    const [assessmentStatus, setAssessmentStatus] = useState('pending');

    if (assessmentStatus === 'completed') {
        return (
            <section className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
                <header className="border-b border-white/5 pb-10">
                    <h2 className="text-3xl font-black font-headline text-white mb-2">Self-Check <span className="text-teal-500">Query Hub</span></h2>
                    <p className="text-slate-400">Regular check-ins help us personalize your Support Bridge and Track Stress Clusters.</p>
                </header>
                <div className="max-w-4xl mx-auto">
                    <div className="glass-panel p-16 rounded-[4rem] text-center space-y-6 animate-in zoom-in bg-slate-900/40 backdrop-blur-xl border border-white/5">
                        <h3 className="text-4xl font-black text-white font-headline">Assessment Complete</h3>
                        <p className="text-slate-400">Diagnostic transmitted to Mentor Hub.</p>
                        <button onClick={() => setAssessmentStatus('pending')} className="mt-8 px-12 py-4 bg-teal-500 text-slate-900 font-black rounded-2xl hover:scale-105 transition-all">RETAKE</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-headline text-white mb-2">Self-Check <span className="text-teal-500">Query Hub</span></h2>
                <p className="text-slate-400">Regular check-ins help us personalize your Support Bridge and Track Stress Clusters.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                <div className="glass-panel p-10 rounded-[3rem] text-center space-y-8 bg-slate-900/40 backdrop-blur-xl border border-white/5">
                    <h3 className="text-3xl font-black font-headline text-white">Student Perspective</h3>
                    <p className="text-slate-400">Focusing on school pressure, peer belonging, and digital life.</p>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => setAssessmentStatus('completed')} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-teal-500/10 hover:border-teal-500/50 transition-all font-bold text-white shadow-sm">Stable & Aligned</button>
                        <button onClick={() => setAssessmentStatus('completed')} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-rose-500/10 hover:border-rose-500/50 transition-all font-bold text-white shadow-sm">High Stress Load</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SelfCheckTab;
