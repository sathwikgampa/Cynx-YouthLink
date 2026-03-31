import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentSchedule = () => {
  const tasks = [
    { time: '09:00 AM', label: 'Mathematics 101', status: 'Completed' },
    { time: '11:15 AM', label: 'Physics Lab', status: 'Upcoming' },
    { time: '02:00 PM', label: 'Student Mentorship Hub', status: 'Upcoming' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-teal-500/20 rounded-[2rem] p-6 shadow-2xl hover:border-teal-500/40 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full"></div>
      <header className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
          <span className="material-symbols-outlined text-2xl font-light">calendar_today</span>
        </div>
        <h3 className="text-xl font-bold font-['Manrope'] text-slate-100">Daily Horizon</h3>
      </header>
      <div className="space-y-4">
        {tasks.map((task, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-800/20 border border-white/5 group-hover:border-teal-500/10 transition-all">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-500/70">{task.time}</span>
              <div className="w-px h-8 bg-teal-500/20 my-1"></div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-200">{task.label}</h4>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${task.status === 'Completed' ? 'text-teal-400' : 'text-slate-500'}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SleepTracker = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-teal-500/20 rounded-[2rem] p-6 shadow-2xl hover:border-teal-500/40 transition-all group">
      <header className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
          <span className="material-symbols-outlined text-2xl font-light">bedtime</span>
        </div>
        <h3 className="text-xl font-bold font-['Manrope'] text-slate-100">Rest Metric</h3>
      </header>
      <div className="relative flex flex-col items-center justify-center h-48">
        {/* Anti-Gravity Ring */}
        <div className="absolute inset-0 border-4 border-teal-500/5 rounded-full"></div>
        <div className="absolute inset-2 border-2 border-teal-500/10 border-t-teal-500 rounded-full animate-spin duration-[10s]"></div>
        <div className="text-center z-10">
          <span className="text-4xl font-black font-['Manrope'] text-teal-400">7.2</span>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 mt-1">Hours Logged</p>
        </div>
        {/* Dynamic Data Blobs */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-teal-500/40 animate-pulse"></div>
        <div className="absolute bottom-4 right-10 w-3 h-3 rounded-full bg-teal-500/20 animate-ping"></div>
      </div>
      <div className="mt-8 flex justify-between px-2">
        <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase font-black">Quality</p>
            <span className="text-sm font-bold text-teal-400">Deep</span>
        </div>
        <div className="text-center border-x border-white/5 px-8">
            <p className="text-[10px] text-slate-500 uppercase font-black">Cycles</p>
            <span className="text-sm font-bold text-teal-400">5 Prot.</span>
        </div>
        <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase font-black">REM</p>
            <span className="text-sm font-bold text-teal-400">1.8h</span>
        </div>
      </div>
    </div>
  );
};

const JournalAI = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-teal-500/20 rounded-[3rem] p-8 shadow-2xl hover:border-teal-500/40 transition-all col-span-1 md:col-span-2 lg:col-span-1 border-t-teal-500/40 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600/10 flex items-center justify-center text-teal-500 border border-teal-500/20">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>self_improvement</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black font-['Manrope'] text-slate-100 tracking-tight">Emotional Vent</h3>
                    <p className="text-xs text-teal-500/70 font-bold uppercase tracking-widest">Encrypted Uplink Active</p>
                </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-teal-500/5 border border-teal-500/10 hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-teal-500/80 uppercase tracking-widest">AI Syncing...</span>
            </div>
        </header>
        
        <div className="relative group">
            <textarea 
                className="w-full h-48 bg-slate-800/10 border border-white/5 rounded-3xl p-6 text-slate-300 placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/40 focus:border-transparent transition-all scrollbar-hide resize-none font-body leading-relaxed"
                placeholder="How are you feeling, truly? Share your perspective anonymously..."
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-3 bg-slate-900 hover:bg-teal-500 text-teal-500 hover:text-white rounded-2xl transition-all shadow-xl group/btn">
                    <span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">send</span>
                </button>
            </div>
        </div>
        <p className="mt-6 text-[10px] text-center text-slate-600 uppercase tracking-[0.3em] font-black italic">100% Client-Side Privacy • Nature Perspective Engaged</p>
    </div>
  );
};



const HomeTab = ({ currentUser, navigate }) => (
    <div className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-sm">shield</span>
            Safe Haven Active
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-['Manrope'] tracking-tighter text-slate-50">
            Welcome, <span className="text-teal-400">{currentUser?.email?.split('@')[0] || "Nature #2124"}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Your anonymous digital sanctuary. Tracking your wellbeing markers in real-time, encrypted for your safety.
          </p>
        </div>
        <div className="flex gap-4">
            <button 
              onClick={() => navigate('/moods')}
              className="px-6 py-3 rounded-2xl bg-teal-500 text-slate-900 font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(13,148,136,0.3)]">Get Support</button>
            <button className="px-6 py-3 rounded-2xl bg-slate-800 border border-white/5 text-slate-200 font-bold text-sm hover:bg-slate-700 transition-all">Emergency SOP</button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StudentSchedule />
        <SleepTracker />
        <JournalAI />
      </div>

      <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
              <span className="text-2xl font-black tracking-tighter text-teal-500 font-['Manrope']">YouthLink</span>
              <div className="w-px h-6 bg-white/10 hidden md:block"></div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-black italic">A Digital Sanctuary</p>
          </div>
          <div className="flex gap-8 text-[10px] text-slate-600 font-black uppercase tracking-widest">
              <span className="hover:text-teal-500 transition-colors cursor-pointer">Privacy Privacy</span>
              <span className="hover:text-teal-500 transition-colors cursor-pointer">Safe Terms</span>
              <span className="hover:text-teal-500 transition-colors cursor-pointer">2026 Archive</span>
          </div>
      </footer>
    </div>
);

const SelfCheckTab = () => {
    const [assessmentStatus, setAssessmentStatus] = useState('pending');

    if (assessmentStatus === 'completed') {
        return (
            <div className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
                <header className="border-b border-white/5 pb-10">
                    <h2 className="text-3xl font-black font-['Manrope'] text-white mb-2">Self-Check <span className="text-teal-500">Query Hub</span></h2>
                    <p className="text-slate-400">Regular check-ins help us personalize your Support Bridge and Track Stress Clusters.</p>
                </header>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-16 rounded-[4rem] text-center space-y-6 animate-in zoom-in">
                        <h3 className="text-4xl font-black text-white">Assessment Complete</h3>
                        <p className="text-slate-400">Diagnostic transmitted to Mentor Hub.</p>
                        <button onClick={() => setAssessmentStatus('pending')} className="mt-8 px-12 py-4 bg-teal-500 text-slate-900 font-black rounded-2xl hover:scale-105 transition-all">RETAKE</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-['Manrope'] text-white mb-2">Self-Check <span className="text-teal-500">Query Hub</span></h2>
                <p className="text-slate-400">Regular check-ins help us personalize your Support Bridge and Track Stress Clusters.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] text-center space-y-8">
                    <h3 className="text-3xl font-black font-['Manrope'] text-white">Student Perspective</h3>
                    <p className="text-slate-400">Focusing on school pressure, peer belonging, and digital life.</p>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => setAssessmentStatus('completed')} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-teal-500/10 hover:border-teal-500/50 transition-all font-bold text-white shadow-sm">Stable & Aligned</button>
                        <button onClick={() => setAssessmentStatus('completed')} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-rose-500/10 hover:border-rose-500/50 transition-all font-bold text-white shadow-sm">High Stress Load</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NeuralHistoryTab = () => {
    return (
        <div className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <header className="border-b border-white/5 pb-10">
                <h2 className="text-3xl font-black font-['Manrope'] text-white mb-2">Neural History <span className="text-teal-500">Integrity Analytics</span></h2>
                <p className="text-slate-400">Longitudinal correlation of your 4-Axis wellbeing lifeflow over the last 7 days.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Combined Resilience Heatmap */}
                <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] space-y-8">
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
                    <div className="flex-1 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
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
                    <div className="flex-1 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
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
                    <div className="flex-1 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
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
                    <div className="flex-1 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/5 hover:border-teal-500/20 transition-all">
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
        </div>
    );
};

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();

    const tabs = [
        { id: 'home', icon: 'home', label: 'Home Hub' },
        { id: 'query', icon: 'quiz', label: 'Self-Check' },
        { id: 'trends', icon: 'monitoring', label: 'Neural History' }
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-[#0f172a]/80 backdrop-blur-2xl border-r border-white/5 z-[60] flex flex-col py-8 transition-all duration-500">
            <div className="px-6 mb-12 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-900 shadow-[0_0_20px_rgba(13,148,136,0.4)] shrink-0">
                    <span className="material-symbols-outlined font-black">shield</span>
                </div>
                <span className="text-xl font-black font-['Manrope'] tracking-tighter text-teal-400 hidden lg:block">YouthLink</span>
            </div>
            
            <nav className="flex-1 px-4 space-y-2 mt-8">
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${
                                isActive 
                                    ? 'bg-teal-500 text-slate-900 border border-teal-500/20 shadow-[0_0_20px_rgba(13,148,136,0.2)] font-bold' 
                                    : 'text-slate-400 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? 'font-black' : ''}`}>{tab.icon}</span>
                            <span className={`hidden lg:block text-sm ${isActive ? 'uppercase tracking-widest' : ''}`}>{tab.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="px-4 mt-auto">
                <button 
                    onClick={() => navigate('/')} 
                    className="w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-500/5 transition-all group border border-transparent"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <span className="hidden lg:block text-sm font-bold">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
};

const UserDashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('home');

    const renderTab = () => {
        switch (activeTab) {
            case 'home':
                return <HomeTab currentUser={currentUser} navigate={navigate} />;
            case 'query':
                return <SelfCheckTab />;
            case 'trends':
                return <NeuralHistoryTab />;
            default:
                return <HomeTab currentUser={currentUser} navigate={navigate} />;
        }
    };

    return (
        <div className="font-['Inter'] min-h-screen relative overflow-hidden bg-[#0f172a] text-slate-200">
            {/* Cinematic Glows */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main id="app" className="lg:ml-64 h-screen relative z-10 w-full lg:w-[calc(100%-16rem)] overflow-y-auto overflow-x-hidden scroll-smooth">
                {renderTab()}
            </main>
        </div>
    );
};

export default UserDashboard;
