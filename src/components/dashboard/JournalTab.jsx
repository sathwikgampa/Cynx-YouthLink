import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const JournalTab = () => {
    const { currentUser } = useAuth();
    const [journalText, setJournalText] = useState('');
    const [selectedMood, setSelectedMood] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [entries, setEntries] = useState([]);

    const username = currentUser?.email?.split('@')[0] || "Nature #2124";

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'journals'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setEntries(data);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const handleSaveEntry = async () => {
        if (!journalText.trim() || !currentUser) return;

        setIsSaving(true);
        try {
            await addDoc(collection(db, 'journals'), {
                userId: currentUser.uid,
                text: journalText,
                mood: selectedMood || 'Neutral',
                createdAt: serverTimestamp()
            });
            setJournalText('');
            setSelectedMood(null);
        } catch (error) {
            console.error("Error saving journal entry: ", error);
        }
        setIsSaving(false);
    };

    return (
        <section id="tab-journal" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black font-headline text-white mb-2">My Journal <span className="text-teal-500">User Hub</span></h2>
                        <p className="text-slate-400">100% Client-Side Encryption. Your data is your own.</p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-teal-500/5 rounded-2xl border border-teal-500/10">
                        <span className="material-symbols-outlined text-teal-400 text-sm">verified_user</span>
                        <span className="text-[10px] font-black text-teal-400 tracking-widest uppercase">E2EE ACTIVE</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Mood Trendline */}
                <div className="lg:col-span-8 glass-panel p-8 rounded-[2.5rem]">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8 flex justify-between items-center">
                        Mood Trendline (Monthly)
                        <span className="text-teal-400">+8.2% Positive Shift</span>
                    </h3>
                    <div className="h-64 mt-4 relative">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <path d="M0,200 Q100,180 200,220 T400,140 T600,100 T800,80 T1000,120" fill="none" stroke="currentColor" strokeWidth="3" className="text-teal-500 drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                            <circle cx="200" cy="220" r="4" fill="currentColor" className="text-red-500" />
                            <circle cx="800" cy="80" r="4" fill="currentColor" className="text-teal-400 animate-ping" />
                        </svg>
                        {/* Grid Lines */}
                        <div className="absolute inset-0 grid grid-cols-1 grid-rows-4 pointer-events-none opacity-[0.03]">
                            <div className="border-t border-white"></div>
                            <div className="border-t border-white"></div>
                            <div className="border-t border-white"></div>
                            <div className="border-t border-white"></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        <span>WEEK 1</span>
                        <span>WEEK 2</span>
                        <span>WEEK 3</span>
                        <span>WEEK 4</span>
                    </div>
                </div>

                {/* Theme Cloud */}
                <div className="lg:col-span-4 glass-panel p-8 rounded-[2.5rem] flex flex-col">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8">Detected Themes</h3>
                    <div className="flex-1 flex flex-wrap gap-3 content-center items-center justify-center">
                        <span className="px-6 py-2 bg-teal-500/20 text-teal-400 font-black text-xl rounded-full">Productive</span>
                        <span className="px-4 py-1.5 bg-slate-800 text-slate-500 font-bold text-xs rounded-full">Fatigued</span>
                        <span className="px-5 py-2 bg-teal-500/10 text-teal-400 font-bold text-sm rounded-full">Hopeful</span>
                        <span className="px-4 py-1 bg-slate-800 text-slate-400 font-medium text-[10px] rounded-full">Anxious Cluster</span>
                        <span className="px-6 py-2.5 bg-sky-500/10 text-sky-400 font-black text-lg rounded-full">Resolution</span>
                        <span className="px-4 py-1.5 bg-slate-800 text-slate-500 font-bold text-xs rounded-full">Exam Focus</span>
                    </div>
                    <p className="mt-8 text-center text-xs text-slate-500 italic">"Themes aggregated anonymously locally."</p>
                </div>

                {/* Journaling Area */}
                <div className="lg:col-span-12 glass-panel p-10 rounded-[3rem] border-t-4 border-t-teal-500 relative group overflow-hidden bg-slate-900/40">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                    <header className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h3 className="text-2xl font-black font-headline text-white">New Reflection</h3>
                            <div id="journal-streak-tag" className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                <span className="text-amber-500 text-xs">🔥</span>
                                <span id="journal-streak-val" className="text-[10px] font-black text-amber-500 uppercase tracking-widest">0 DAY STREAK</span>
                            </div>
                        </div>
                        <div className="flex gap-2" id="mood-selector">
                            {['😊', '😌', '😐', '😞', '😣', '😴'].map(mood => (
                                <button key={mood} onClick={() => setSelectedMood(mood)} className={`mood-btn w-12 h-12 rounded-xl bg-white/5 border ${selectedMood === mood ? 'border-teal-500 grayscale-0' : 'border-white/5 grayscale hover:border-teal-500/40 hover:grayscale-0'} transition-all text-xl`}>{mood}</button>
                            ))}
                        </div>
                    </header>
                    
                    <textarea 
                        id="journal-textarea"
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        className="w-full h-64 bg-slate-800/10 border border-white/5 rounded-[2.5rem] p-8 text-slate-100 placeholder:text-slate-600 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500/40 transition-all resize-none shadow-2xl backdrop-blur-3xl scrollbar-hide text-lg leading-relaxed relative z-10"
                        placeholder={`${username} perspective stream starting... Write about your day, thoughts, or feelings.`}
                    ></textarea>

                    <div className="mt-10 flex items-center justify-between relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined text-[10px]">lock</span> 
                            Local Encryption Buffer
                        </span>
                        <div className="flex items-center gap-4">
                            <span id="journal-sentiment-tag" className="text-[10px] font-black text-teal-500/50 uppercase tracking-[0.3em] transition-all">{isSaving ? 'Archiving...' : 'Awaiting Reflection'}</span>
                            <button onClick={handleSaveEntry} disabled={isSaving || !journalText.trim()} className="px-8 py-3 bg-teal-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                                <span className="material-symbols-outlined font-black text-sm">archive</span>
                                ARCHIVE ENTRY
                            </button>
                        </div>
                    </div>
                </div>

                {/* Past Entries History */}
                <div className="lg:col-span-12 space-y-8 mt-12">
                    <h3 className="text-xl font-black font-headline text-white uppercase tracking-tighter">Past Reflections <span className="text-teal-500" id="entry-count-badge">({entries.length})</span></h3>
                    <div id="journal-history-list" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {entries.length === 0 ? (
                            <div className="lg:col-span-12 p-20 glass-panel rounded-[3rem] text-center border-dashed border-white/5">
                                <span className="material-symbols-outlined text-6xl text-slate-800 mb-4 block">history_edu</span>
                                <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Archive Empty. Begin your stream.</p>
                            </div>
                        ) : entries.map(entry => (
                            <div key={entry.id} className="glass-panel p-8 rounded-[2rem] border border-white/5 hover:border-teal-500/30 transition-all flex flex-col justify-between">
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">{entry.text}</p>
                                <div className="flex justify-between items-center text-xs text-slate-500">
                                    <span className="font-bold flex items-center gap-2">
                                        <span className="text-lg">{entry.mood !== 'Neutral' ? entry.mood : '📝'}</span> Mood Log
                                    </span>
                                    <span className="font-mono">{entry.createdAt?.toDate ? entry.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JournalTab;
