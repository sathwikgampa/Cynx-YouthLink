import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileTab = () => {
    const { currentUser } = useAuth();
    const username = currentUser?.email?.split('@')[0] || "Nature #2124";

    return (
        <section id="tab-profile" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-headline text-white mb-2">Profile <span className="text-teal-500">Identity Matrix</span></h2>
                <p className="text-slate-400">Manage your user identity. Your age determines your psychometric group.</p>
            </header>

            <div className="max-w-xl mx-auto glass-panel p-10 rounded-[3rem] border border-white/5 space-y-10">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-32 h-32 rounded-full border-4 border-teal-500/30 p-2">
                        <img id="profile-avatar-display" src={`https://ui-avatars.com/api/?name=${username.replace(' ', '+')}&background=0d9488&color=fff&rounded=true`} className="w-full h-full rounded-full" alt="Avatar" />
                    </div>
                    <h3 id="profile-name-display" className="text-3xl font-black text-white">{username}</h3>
                    <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest px-4 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">Active User</span>
                </div>

                <form id="profile-form" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Display Name</label>
                        <input id="profile-name-input" type="text" defaultValue={username} className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-5 text-white focus:ring-4 focus:ring-teal-500/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Email Address</label>
                        <input id="profile-email-input" type="email" defaultValue={currentUser?.email || ""} disabled className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-5 text-white focus:ring-4 focus:ring-teal-500/20 transition-all opacity-50 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Age</label>
                        <input id="profile-age-input" type="number" className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-5 text-white focus:ring-4 focus:ring-teal-500/20 transition-all" placeholder="Enter age for personalized assessments" />
                    </div>
                    <button type="submit" className="w-full py-4 bg-teal-500 text-slate-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl mt-4">
                        SAVE IDENTITY
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ProfileTab;
