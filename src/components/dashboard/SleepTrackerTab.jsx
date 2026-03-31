import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const SleepTrackerTab = () => {
    const { currentUser } = useAuth();
    const [isResting, setIsResting] = useState(false);
    const [restStartTime, setRestStartTime] = useState(null);
    const [lastSleepDisplay, setLastSleepDisplay] = useState('0h 0m');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!currentUser) return;
        const q = query(
            collection(db, 'sleepLogs'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const latest = snapshot.docs[0].data();
                if (latest.durationMinutes) {
                    const hrs = Math.floor(latest.durationMinutes / 60);
                    const mins = latest.durationMinutes % 60;
                    setLastSleepDisplay(`${hrs}h ${mins}m`);
                }
            }
        });

        return () => unsubscribe();
    }, [currentUser]);

    const toggleSleep = async () => {
        if (!currentUser) return;
        
        if (isResting) {
            // End session
            setIsSaving(true);
            const durationMs = Date.now() - restStartTime;
            const durationMinutes = Math.max(1, Math.floor(durationMs / 60000));
            
            try {
                await addDoc(collection(db, 'sleepLogs'), {
                    userId: currentUser.uid,
                    durationMinutes,
                    createdAt: serverTimestamp()
                });
            } catch (error) {
                console.error("Error saving sleep log", error);
            }
            setIsResting(false);
            setRestStartTime(null);
            setIsSaving(false);
        } else {
            // Start session
            setIsResting(true);
            setRestStartTime(Date.now());
        }
    };

    return (
        <section id="tab-sleep" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-headline text-white mb-2">Sleep Tracker <span className="text-teal-500">Recovery Analytics</span></h2>
                <p className="text-slate-400">Longitudinal rest data retrieved from your encrypted local storage.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* SLEEP CONTROLLER (ACTIVE LOGGING) */}
                <div className={`glass-panel p-10 rounded-[3rem] border-2 ${isResting ? 'border-amber-500/40 bg-amber-500/5' : 'border-teal-500/20 bg-teal-500/5'} col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center text-center space-y-8 group transition-all hover:border-teal-500/40`}>
                    <div className={`w-24 h-24 ${isResting ? 'bg-amber-500/10 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'bg-teal-500/10 text-teal-400'} rounded-full flex items-center justify-center transition-all`}>
                        <span className="material-symbols-outlined text-5xl">bedtime</span>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-3xl font-black font-headline text-white">{isResting ? 'Resting...' : 'Ready to Recharge?'}</h3>
                        {!isResting && <p className="text-slate-400 text-sm max-w-[200px] mx-auto leading-relaxed">Going dark allows your biometric data to refocus on deep recovery cycles.</p>}
                    </div>

                    {isResting && (
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.4em]">Resting Since</span>
                            <p className="text-2xl font-black text-white">{new Date(restStartTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                    )}

                    <button disabled={isSaving} onClick={toggleSleep} className={`w-full py-5 ${isResting ? 'bg-amber-500' : 'bg-teal-500'} text-slate-900 font-black rounded-3xl text-xl shadow-[0_0_40px_rgba(13,148,136,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50`}>
                        {isResting ? 'WAKE UP' : 'GOING DARK'}
                    </button>

                    {!isResting && (
                        <div className="w-full p-6 bg-black/20 rounded-2xl border border-white/5 space-y-1">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Last Session</span>
                            <p className="text-xl font-black text-teal-400">{lastSleepDisplay}</p>
                        </div>
                    )}
                </div>

                {/* Sleep Debt Meter */}
                <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8 w-full text-left">Sleep Debt Meter</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="552.92" strokeDashoffset="110.58" className="text-teal-500 drop-shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-white">8/8</span>
                            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mt-1">GOAL REACHED</p>
                        </div>
                    </div>
                    <p className="mt-10 text-xs text-slate-400 leading-relaxed italic">"You have fully cleared your sleep debt. Cognitive levels at 100%."</p>
                </div>

                {/* Sleep History Graph */}
                <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col justify-between">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">7-Day Rest History</h3>
                    <div className="flex items-end justify-between h-48 gap-3">
                        <div className="w-full bg-teal-500/10 rounded-t-lg h-[40%] hover:bg-teal-500/40 transition-all cursor-pointer"></div>
                        <div className="w-full bg-teal-500/20 rounded-t-lg h-[60%] hover:bg-teal-500/40 transition-all cursor-pointer"></div>
                        <div className="w-full bg-teal-500/60 rounded-t-lg h-[90%] hover:bg-teal-500/40 transition-all cursor-pointer"></div>
                        <div className="w-full bg-teal-500/30 rounded-t-lg h-[50%] hover:bg-teal-500/40 transition-all cursor-pointer"></div>
                        <div className="w-full bg-teal-500/20 rounded-t-lg h-[45%] hover:bg-teal-500/40 transition-all cursor-pointer"></div>
                        <div className="w-full bg-teal-500/50 rounded-t-lg h-[75%] hover:bg-teal-500/40 transition-all cursor-pointer"></div>
                        <div className="w-full bg-teal-500 rounded-t-lg h-[100%] shadow-[0_0_15px_rgba(20,184,166,0.4)]"></div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[10px] font-bold text-slate-600">MON</span>
                        <span className="text-[10px] font-bold text-slate-600">TUE</span>
                        <span className="text-[10px] font-bold text-slate-600">WED</span>
                        <span className="text-[10px] font-bold text-slate-600">THU</span>
                        <span className="text-[10px] font-bold text-slate-600">FRI</span>
                        <span className="text-[10px] font-bold text-slate-600">SAT</span>
                        <span className="text-[10px] font-bold text-teal-400">TODAY</span>
                    </div>
                </div>

                {/* Contextual Insight Card */}
                <div className="glass-panel p-8 rounded-[2.5rem] bg-teal-500/5 border border-teal-500/20 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full"></div>
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
                            <span className="material-symbols-outlined text-3xl">lightbulb</span>
                        </div>
                        <h4 className="text-xl font-bold font-headline text-white mb-4">Strategic Insight</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            "You have a <span className="text-teal-400 font-bold">Data Structures</span> exam tomorrow. Science suggests 7+ hours of sleep will improve your recall by <span className="text-teal-400 font-bold">20%</span>."
                        </p>
                    </div>
                    <div className="mt-8 p-4 bg-black/20 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Impact Projection</p>
                        <p className="text-xs font-bold text-teal-400">Projected Performance: Optimized</p>
                    </div>
                </div>

                {/* Hygiene Tips (Rotating at bottom) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start hover:border-teal-500/20 transition-all">
                        <span className="material-symbols-outlined text-teal-500">no_photography</span>
                        <div>
                            <h5 className="text-xs font-bold uppercase mb-1 text-white">Blue Light Protocol</h5>
                            <p className="text-xs text-slate-500">No blue light 30 mins before bed to protect your Melatonin spikes.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start hover:border-teal-500/20 transition-all">
                        <span className="material-symbols-outlined text-teal-500">thermostat</span>
                        <div>
                            <h5 className="text-xs font-bold uppercase mb-1 text-white">Thermal Optimum</h5>
                            <p className="text-xs text-slate-500">Keep your room at 18&deg;C. High temperatures disrupt deep sleep cycles.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start hover:border-teal-500/20 transition-all">
                        <span className="material-symbols-outlined text-teal-500">headphones</span>
                        <div>
                            <h5 className="text-xs font-bold uppercase mb-1 text-white">Acoustic Shield</h5>
                            <p className="text-xs text-slate-500">Use brown noise soundscapes to block sudden nocturnal environmental sounds.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SleepTrackerTab;
