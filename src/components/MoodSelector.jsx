import { useNavigate } from 'react-router-dom';
import { Smile, Frown, CloudRain, Wind, HeartHandshake, ArrowLeft } from 'lucide-react';

const moods = [
  { id: 'sad', label: 'Sad', icon: Frown, color: '#4299e1' },
  { id: 'depressed', label: 'Depressed', icon: CloudRain, color: '#718096' },
  { id: 'anxious', label: 'Anxious', icon: Wind, color: '#ed8936' },
  { id: 'helping', label: 'Looking to Help', icon: HeartHandshake, color: '#eb4a4a' }
];

export default function MoodSelector() {
  const navigate = useNavigate();

  const handleMoodSelect = (moodId) => {
    navigate(`/youth/lobby/${moodId}`);
  };

  return (
    <div className="font-body min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10 glass-panel p-10 md:p-14 rounded-[3rem] border border-white/5 bg-slate-900/60 backdrop-blur-xl shadow-2xl text-center">
        <button onClick={() => navigate('/youth')} className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold z-20">
            <ArrowLeft size={16} /> Back to Hub
        </button>
        <span className="inline-block mt-8 mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Safe Space Check-In
        </span>
        <h2 className="text-3xl md:text-4xl font-headline font-black text-white mb-4 tracking-tight">How are you feeling right now?</h2>
        <p className="text-slate-400 mb-10 text-sm md:text-base">Select a mood signature to find an anonymous community space.</p>
        
        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:-translate-y-1 hover:border-teal-500/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ color: mood.color, boxShadow: `0 0 20px ${mood.color}40` }}>
                    <Icon size={28} />
                </div>
                <span className="font-bold text-sm text-slate-300 group-hover:text-white">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
