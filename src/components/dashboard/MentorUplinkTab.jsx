import React from 'react';

const MentorUplinkTab = () => {
    return (
        <section id="tab-mentor" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-headline text-white mb-2">Message Mentor <span className="text-teal-500">Secure Protocol</span></h2>
                <p className="text-slate-400">Direct, anonymous bridge to professional support volunteers.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
                {/* Status Sidebar */}
                <div className="lg:col-span-4 space-y-8 h-full">
                    <div className="glass-panel p-8 rounded-[2.5rem] bg-teal-500/5 border border-teal-500/20">
                        <span className="text-[10px] font-black uppercase text-teal-400 tracking-[0.4em] mb-4 block">Connection Status</span>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                                    <span className="material-symbols-outlined">badge</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-slate-900 animate-pulse"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Arjun Sharma</h4>
                                <p className="text-[10px] text-teal-500 font-black uppercase tracking-widest">NGO Lead • Active Bridge</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-widest">Bridging Progress</p>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[65%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Resource Library Mini */}
                    <div className="glass-panel p-8 rounded-[2.5rem] h-full">
                        <h3 className="font-bold mb-6 text-white">Support Tools</h3>
                        <div className="space-y-4">
                            <button className="w-full flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-teal-500/40 transition-all group text-left">
                                <span className="material-symbols-outlined text-teal-500">self_improvement</span>
                                <span className="text-sm font-bold text-white">Breathing Prot. 4-7-8</span>
                            </button>
                            <button className="w-full flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-teal-500/40 transition-all group text-left">
                                <span className="material-symbols-outlined text-teal-500">menu_book</span>
                                <span className="text-sm font-bold text-white">Stress Recon Guide</span>
                            </button>
                            <button className="w-full flex gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all group text-left text-red-500">
                                <span className="material-symbols-outlined">call</span>
                                <span className="text-sm font-bold">24/7 Crisis Hotline</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat Interface (WhatsApp-Style) */}
                <div className="lg:col-span-8 glass-panel rounded-[3rem] flex flex-col overflow-hidden border border-white/5 shadow-2xl relative">
                    <header className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                                <span className="material-symbols-outlined">support</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-white">Anonymous Support Uplink</h3>
                                <p className="text-[10px] text-teal-500 font-bold tracking-widest">END-TO-END ENCRYPTED CHANNEL</p>
                            </div>
                        </div>
                        <button className="p-2 text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_vert</span></button>
                    </header>
                    
                    <div id="support-chat-container" className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-slate-900/50">
                        {/* Received Message */}
                        <div className="flex gap-4 max-w-[80%] animate-in zoom-in slide-in-from-left duration-300">
                            <div className="bg-slate-800 p-5 rounded-[2rem] rounded-tl-none shadow-xl">
                                <p className="text-sm text-slate-300 leading-relaxed">Hello Nature #2124. I’m revieweing the stress signatures you logged today. It looks like you have a high-pressure zone upcoming. How are you processing that academic load?</p>
                                <span className="text-[10px] text-slate-600 block mt-3 font-bold">14:42</span>
                            </div>
                        </div>
                        {/* Sent Message */}
                        <div className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto animate-in zoom-in slide-in-from-right duration-300">
                            <div className="bg-teal-500 p-5 rounded-[2rem] rounded-tr-none shadow-xl">
                                <p className="text-sm text-slate-900 font-medium leading-relaxed">It feels a bit heavy honestly. The Data Structures exam is weighing on my sleep quality, but I’m trying to follow the blue light protocol.</p>
                                <span className="text-[10px] text-slate-900/50 block mt-3 font-black">14:45</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-white/5 border-t border-white/5">
                        <form id="mentor-chat-form" className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" autoComplete="off" className="w-full bg-slate-900/50 border-none rounded-2xl py-5 pl-6 pr-24 text-sm focus:ring-4 focus:ring-teal-500/20 transition-all placeholder:text-slate-700 text-white" placeholder="Type a message anonymously..." />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                                <button type="button" className="p-2 text-slate-500 hover:text-teal-400"><span className="material-symbols-outlined">attach_file</span></button>
                                <button type="submit" className="p-3 bg-teal-500 text-slate-900 rounded-xl hover:scale-105 active:scale-95 transition-all"><span className="material-symbols-outlined font-black">send</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorUplinkTab;
