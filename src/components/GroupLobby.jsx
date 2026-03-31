import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Users, Plus, Loader2, MessageSquare, ArrowLeft } from 'lucide-react';

const defaultGroupNames = {
  happy: "🌅 Vibing & Thriving Space",
  sad: "💙 The Comfort Corner",
  depressed: "⚓ Safe Harbor Support",
  anxious: "🍃 Breathe In, Breathe Out",
  helping: "🤝 The Compassion Crew"
};

const defaultGroupDescriptions = {
  happy: "Share your joy, achievements, and good energy with others!",
  sad: "A warm place to vent, cry, or just not be alone.",
  depressed: "No pressure, just understanding people sailing the same sea.",
  anxious: "Ground yourself with others who understand the overwhelm.",
  helping: "Listen, share advice, and be a pillar for someone today."
};

export default function GroupLobby() {
  const { mood } = useParams();
  const navigate = useNavigate();
  
  const [customGroups, setCustomGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mood) return;

    const groupsRef = collection(db, 'rooms');
    const q = query(
      groupsRef,
      where('moodFilter', '==', mood),
      where('chatType', '==', 'group')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      let fetchedGroups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedGroups = fetchedGroups.filter(g => g.groupName);
      
      fetchedGroups.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      setCustomGroups(fetchedGroups);
      setLoading(false);
    });

    return () => unsub();
  }, [mood]);

  const handleJoinDefault = () => {
    const roomId = `group_${mood}_default`;
    const interactiveName = encodeURIComponent(defaultGroupNames[mood] || `${mood} General Space`);
    navigate(`/youth/chat/${roomId}?type=group&mood=${mood}&groupName=${interactiveName}`);
  };

  const handleJoinCustom = (groupId, groupName) => {
    navigate(`/youth/chat/${groupId}?type=group&mood=${mood}&groupName=${encodeURIComponent(groupName)}`);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim() || isCreating) return;

    setIsCreating(true);
    try {
      await addDoc(collection(db, 'rooms'), {
        moodFilter: mood,
        chatType: 'group',
        groupName: newGroupName.trim(),
        createdAt: serverTimestamp()
      });
      setNewGroupName('');
    } catch (err) {
      console.error("Error creating group", err);
    } finally {
      setIsCreating(false);
    }
  };

  if (!mood) return <Navigate to="/youth" />;

  return (
    <div className="font-body min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center p-6 relative overflow-x-hidden md:py-12">
      {/* Cinematic Glows */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-5xl relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-slate-900/60 backdrop-blur-xl shadow-2xl relative">
          <button onClick={() => navigate('/youth/moods')} className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold z-20">
            <ArrowLeft size={16} /> Hub
          </button>
          
          <div className="text-center mt-6">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Network Active
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-white tracking-tight capitalize">{mood} Spaces</h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">Join a verified community hub or forge your own encrypted topic space below.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Featured & Create */}
            <div className="lg:col-span-5 space-y-8">
                {/* Interactive Default Group */}
                <div 
                    className="glass-panel p-8 rounded-[2.5rem] border border-teal-500/30 bg-teal-500/5 backdrop-blur-xl hover:bg-teal-500/10 transition-all duration-300 cursor-pointer group shadow-[0_0_30px_rgba(20,184,166,0.1)] hover:shadow-[0_0_40px_rgba(20,184,166,0.2)]"
                    onClick={handleJoinDefault}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Featured Hub</span>
                    </div>
                    <h3 className="text-2xl font-headline font-black text-white mb-2">{defaultGroupNames[mood] || `${mood} Space`}</h3>
                    <p className="text-slate-400 text-sm mb-6">{defaultGroupDescriptions[mood] || "General discussion for everyone."}</p>
                    <div className="flex items-center text-teal-400 font-bold text-sm gap-2 group-hover:translate-x-2 transition-transform">
                        Establish Uplink <ArrowLeft className="rotate-180" size={16} />
                    </div>
                </div>

                {/* Create Custom Group Form */}
                <div className="glass-panel p-6 rounded-[2rem] border border-white/5 bg-slate-900/60 backdrop-blur-xl">
                    <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Plus size={16} className="text-teal-400" /> Forge New Topic
                    </h4>
                    <form className="space-y-4" onSubmit={handleCreateGroup}>
                        <input 
                            type="text" 
                            placeholder="E.g., Exam Stress, Feeling Lonely..." 
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            maxLength={40}
                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300 text-sm"
                            required
                        />
                        <button type="submit" disabled={isCreating || !newGroupName.trim()} className="w-full bg-slate-800 hover:bg-teal-500 border border-white/5 hover:border-teal-500 text-slate-300 hover:text-slate-900 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-slate-300">
                            {isCreating ? <Loader2 size={16} className="animate-spin" /> : 'Instantiate Room'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Column: Custom Groups List */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl min-h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <h3 className="text-lg font-headline font-black text-white">Active Community Nodes</h3>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Live Updates</span>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {loading ? (
                    <div className="flex items-center justify-center h-full opacity-50"><Loader2 className="animate-spin text-teal-500" size={32} /></div>
                ) : customGroups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50 py-12">
                        <MessageSquare size={48} className="text-slate-600" />
                        <p className="text-slate-400 text-sm max-w-xs">No active nodes detected. Be the first to initiate a new conversation topic.</p>
                    </div>
                ) : (
                    customGroups.map(group => (
                    <div key={group.id} onClick={() => handleJoinCustom(group.id, group.groupName)} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-white/5 hover:bg-slate-800/80 hover:border-teal-500/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-slate-900 transition-colors">
                                <Users size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{group.groupName}</h4>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black flex flex-col items-start mt-1">Public Node</span>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Link <ArrowLeft className="rotate-180" size={14} />
                        </span>
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
