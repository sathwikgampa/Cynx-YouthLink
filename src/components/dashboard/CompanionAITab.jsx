import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CompanionAITab = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello. I am your protected space to vent. I process everything fully on-device to give you objective insights without judgment. What's on your mind today?" }
    ]);
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isThinking) return;

        const userText = inputText.trim();
        setInputText('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsThinking(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBw1pckeOXSWZAZju4cgmLGdFhmMdg8Gu8";
            if (!apiKey) throw new Error("Missing API Key");

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const historyText = messages.map(m => `${m.role === 'ai' ? 'AI' : 'User'}: ${m.text}`).join('\n');
            const prompt = `You are an empathetic, objective, and supportive AI companion for a youth mental health app called Cynx-YouthLink.
Keep responses concise, reassuring, and helpful. Do not give medical advice.
Conversation history:
${historyText}
User: ${userText}
AI:`;

            const result = await model.generateContent(prompt);
            const aiResponse = result.response.text().trim();

            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        } catch (error) {
            console.error("AI Generation Error", error);
            setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my neural core right now. Please try again in a moment." }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleTerminate = () => {
        setMessages([{ role: 'ai', text: "Memory wiped. I am ready to start a new session whenever you are." }]);
    };

    return (
        <section id="tab-ai-chat" className="p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-500">
            <div className="glass-panel flex flex-col rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl h-[700px] mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 px-10 pt-8 gap-4 bg-white/5">
                    <div>
                        <h2 className="text-xl font-black font-headline text-white mb-1">Companion AI <span className="text-teal-500">Emotional Core</span></h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                            <span id="ai-chat-status" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Resonating: STABLE</span>
                        </div>
                    </div>
                    <button onClick={handleTerminate} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-500 hover:text-white transition-all">TERMINATE MEMORY</button>
                </div>

                <div id="ai-chat-history" className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide bg-slate-900/50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 max-w-[80%] animate-in zoom-in duration-300 ${msg.role === 'user' ? 'ml-auto flex-row-reverse slide-in-from-right' : 'slide-in-from-left'}`}>
                            <div className={`p-5 rounded-[2rem] shadow-xl ${msg.role === 'user' ? 'bg-teal-500 rounded-tr-none' : 'bg-slate-800 rounded-tl-none'}`}>
                                <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-slate-900 font-medium' : 'text-slate-300'}`}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {isThinking && (
                    <div id="ai-typing-indicator" className="px-10 pb-6">
                        <div className="flex gap-4 animate-pulse">
                            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                                <span className="material-symbols-outlined text-sm">smart_toy</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl text-xs text-slate-500 italic">Thinking...</div>
                        </div>
                    </div>
                )}

                <form id="ai-chat-form" className="p-8 bg-black/50 border-t border-white/5" onSubmit={handleSend}>
                    <div className="relative flex gap-4">
                        <input 
                            type="text" 
                            name="ai-chat-input"
                            autoComplete="off" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-1 bg-slate-900 border border-white/10 rounded-3xl py-6 px-8 text-white focus:ring-4 focus:ring-teal-500/20 transition-all placeholder:text-slate-700" 
                            placeholder="Type a reflection or question..." 
                        />
                        <button type="submit" disabled={isThinking || !inputText.trim()} className="w-16 h-16 bg-teal-500 text-slate-900 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(13,148,136,0.3)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                            <span className="material-symbols-outlined font-black">send</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CompanionAITab;
