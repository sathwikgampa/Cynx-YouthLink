import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { Send, LogOut, Loader2, ShieldAlert, ArrowLeft } from 'lucide-react';
import { evaluateMessageWithAI } from '../utils/safetyFilter';

export default function ChatRoom({ user }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCreator = searchParams.get('isCreator') === 'true';
  const chatType = searchParams.get('type');
  const mood = searchParams.get('mood');
  const groupName = searchParams.get('groupName');
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [moderationError, setModerationError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen to room document to check if status becomes active (for 1-on-1 waiting)
    const roomUnsub = onSnapshot(doc(db, 'rooms', roomId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setRoomData({ id: docSnapshot.id, ...data });
        setLoading(false);
        
        // If the creator cancelled this room, boot the other person if they somehow joined
        if (data.status === 'cancelled') {
           navigate('/youth');
        }
      } else {
        // Fallback if room doc not loaded yet but we have params
        setRoomData({ chatType, moodFilter: mood });
        setLoading(false);
      }
    });

    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const msgsUnsub = onSnapshot(q, (snapshot) => {
      // We process all messages, but only SHOW today's messages per your request.
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      
      const msgs = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        // If createdAt is null, it's a local write, so ALWAYS show it immediately!
        if (!data.createdAt || data.createdAt.toMillis() >= startOfToday) {
          msgs.push({ id: doc.id, ...data });
        }
      });
      setMessages(msgs);
    });

    return () => {
      roomUnsub();
      msgsUnsub();
    };
  }, [roomId, navigate, chatType, mood]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    setModerationError(null);

    try {
      // Evaluate everything using the Global Content Safety Filter
      const evaluation = await evaluateMessageWithAI(newMessage);

      if (!evaluation.isSafe) {
        setModerationError({
          category: evaluation.category, // e.g., 'EXPLICIT' or 'PERSONAL'
          summary: evaluation.summary    // e.g., 'The user is sharing a phone number.'
        });
        setIsSending(false);
        return;
      }

      // Safe to send!
      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        text: evaluation.text || newMessage,
        senderId: user.id,
        senderName: user.name,
        createdAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (err) {
      console.error("Error sending message", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleLeave = async () => {
    navigate('/youth/moods');
  };

  return (
    <div className="font-body h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Cinematic Glows */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-5xl h-full relative z-10 glass-panel border border-white/5 bg-slate-900/60 backdrop-blur-xl shadow-2xl flex flex-col rounded-[2.5rem] overflow-hidden">
        
        {/* Header */}
        <header className="px-6 md:px-8 py-6 border-b border-white/5 bg-slate-900/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={handleLeave} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-500/10 text-slate-400 hover:text-teal-400 transition-colors flex items-center justify-center border border-white/5">
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h2 className="text-xl md:text-2xl font-headline font-black text-white capitalize">{roomData?.groupName || groupName || `${mood || ''} Space`}</h2>
                    <p className="text-[10px] md:text-xs text-slate-400 font-bold tracking-widest uppercase">Operating as <span className="text-teal-400">{user.name}</span></p>
                </div>
            </div>
            <button className="hidden md:flex px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors flex items-center gap-2 text-sm font-bold border border-rose-500/20" onClick={handleLeave}>
                <LogOut size={16} /> Disconnect
            </button>
        </header>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar flex flex-col">
          {messages.length === 0 && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center opacity-50 space-y-2 text-center py-20">
              <span className="material-symbols-outlined text-4xl text-slate-500">forum</span>
              <p className="text-sm font-bold text-slate-400">No messages today yet.</p>
              <p className="text-xs text-slate-500">Be the first to say hello!</p>
            </div>
          )}
          {messages.map((msg, index) => {
            const isMine = msg.senderId === user.id;
            const showName = !isMine && (index === 0 || messages[index - 1].senderId !== msg.senderId);
            
            let timeString = 'Sending...';
            if (msg.createdAt) {
              timeString = new Date(msg.createdAt.toMillis()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            return (
              <div key={msg.id} className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isMine ? 'self-end items-end' : 'self-start items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                {showName && <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 ml-1">{msg.senderName}</span>}
                <div className={`relative group px-5 py-3.5 rounded-3xl ${isMine ? 'bg-teal-500 text-slate-900 rounded-tr-sm shadow-[0_5_20px_rgba(20,184,166,0.15)]' : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-sm'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[9px] font-black tracking-widest text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{timeString}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Unified Input */}
        <div className="p-4 md:p-6 bg-slate-900/80 border-t border-white/5 backdrop-blur-xl">
          {moderationError && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 animate-in fade-in">
              <ShieldAlert size={18} className="text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="text-xs font-black uppercase tracking-widest text-rose-500">Blocked ({moderationError.category}):</strong>
                <p className="text-xs text-rose-400/80">{moderationError.summary}</p>
              </div>
              <button className="text-rose-500 hover:text-rose-400" onClick={() => setModerationError(null)}>×</button>
            </div>
          )}
          <form className="flex items-center gap-4 relative" onSubmit={handleSend}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-800/50 border border-white/5 rounded-full py-4 pl-6 pr-16 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300 shadow-inner"
            />
            <button type="submit" disabled={!newMessage.trim() || isSending} className="absolute right-2 top-2 bottom-2 aspect-square bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:hover:bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-1" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
