import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MentorDashboard() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // -- State Definitions --
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isInterventionOpen, setIsInterventionOpen] = useState(false);
    const [isResourceOpen, setIsResourceOpen] = useState(false);
    const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);
    const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
    const [deepDiveTitle, setDeepDiveTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [interventionSearchTerm, setInterventionSearchTerm] = useState('');

    // -- Helper Functions --
    const handleLogout = () => {
        navigate('/');
    };

    const openDeepDive = (title) => {
        setDeepDiveTitle(title);
        setIsDeepDiveOpen(true);
    };

    const closeDeepDive = () => {
        setIsDeepDiveOpen(false);
    };

    const notify = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const reviewCase = (id) => {
        setInterventionSearchTerm(id);
        setIsInterventionOpen(true);
    };

    const deployModule = (moduleName) => {
        notify(`Deploying ${moduleName} to active user...`);
    };

    const executeIntervention = (action) => {
        notify(`Executing Intervention: ${action}`);
        setIsInterventionOpen(false);
    };

    const handleChatInput = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        notify('Message sent (Demo UI)');
    };

    // Smooth scroll helper
    const scrollToId = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="overflow-x-hidden min-h-screen bg-[#00161c]">

            {/* TopAppBar Shell */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-[#0e141b]/80 backdrop-blur-md z-50 shadow-[0_24px_40px_rgba(221,227,237,0.06)]">
                <div className="flex items-center gap-8">
                    <span className="text-xl font-bold tracking-tight text-[#44d8f1] font-headline">Mentor Portal</span>
                    <nav className="hidden md:flex gap-6 items-center">
                        <a onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); openDeepDive('Overview'); }} className="text-[#44d8f1] border-b-2 border-[#44d8f1] pb-1 font-medium text-sm transition-all duration-200 cursor-pointer">Dashboard</a>
                        <a onClick={() => { scrollToId('triage-section'); openDeepDive('Early Warning'); }} className="text-[#dde3ed]/70 hover:text-[#dde3ed] font-medium text-sm transition-all duration-200 cursor-pointer">Triage</a>
                        <a onClick={() => { scrollToId('ngo-hub-section'); openDeepDive('NGO Hub'); }} className="text-[#dde3ed]/70 hover:text-[#dde3ed] font-medium text-sm transition-all duration-200 cursor-pointer">Network</a>
                        <a onClick={() => { scrollToId('resource-section'); openDeepDive('Tools'); }} className="text-[#dde3ed]/70 hover:text-[#dde3ed] font-medium text-sm transition-all duration-200 cursor-pointer">Resources</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => notify('Recent Activity: 0 New Notifications')} className="p-2 text-[#dde3ed]/70 hover:bg-[#252a32] rounded-lg transition-colors duration-200">
                        <span className="material-symbols-outlined shrink-0" data-icon="notifications">notifications</span>
                    </button>
                    <button onClick={() => notify('Mentor Privacy Settings Synchronized: End-to-End Encryption Active')} className="p-2 text-[#dde3ed]/70 hover:bg-[#252a32] rounded-lg transition-colors duration-200">
                        <span className="material-symbols-outlined shrink-0" data-icon="settings">settings</span>
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 text-[#dde3ed]/70 hover:bg-[#252a32] rounded-lg transition-colors duration-200">
                            <span className="material-symbols-outlined text-2xl shrink-0">account_circle</span>
                        </button>
                        {/* Glassmorphic Mentor Dropdown */}
                        <div id="profile-dropdown" className={`${isProfileOpen ? 'block' : 'hidden'} absolute right-0 mt-4 w-72 glass-panel border border-primary/20 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] p-6 z-50`}>
                            <div className="flex items-center gap-4 mb-5 border-b border-outline-variant/30 pb-5">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/30">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#dde3ed] text-base font-headline">Arjun Sharma</h3>
                                    <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-1">NGO Lead</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="material-symbols-outlined text-outline text-lg">mail</span>
                                    <span className="text-[#dde3ed]/90 font-medium">arjun.m@youthlink.org</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="material-symbols-outlined text-outline text-lg">cake</span>
                                    <span className="text-[#dde3ed]/90 font-medium">Age: 34</span>
                                </div>
                                <div className="flex justify-center mt-4 border-t border-outline-variant/30 pt-4">
                                    <button onClick={handleLogout} className="text-xs text-error hover:text-[#ffdad6] font-bold tracking-widest uppercase transition-colors">Sign Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="flex min-h-screen pt-16 pb-20 lg:pb-0">
                {/* SideNavBar Shell */}
                <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] w-64 fixed left-0 bg-[#0e141b] py-8 px-4 tonal-nesting bg-[#161c23]">
                    <div className="mb-8 px-4">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-primary-container text-lg" data-icon="shield">shield</span>
                            </div>
                            <span className="text-[#44d8f1] font-black italic text-lg font-headline">Mentor</span>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium tracking-wider uppercase pl-11">Youth Mentorship</p>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2">
                        <a onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); openDeepDive('Overview'); }} className="flex items-center gap-3 px-4 py-3 text-[#44d8f1] font-bold bg-[#44d8f1]/10 rounded-r-full translate-x-1 duration-200 cursor-pointer">
                            <span className="material-symbols-outlined shrink-0" data-icon="dashboard">dashboard</span>
                            <span className="font-label">Overview</span>
                        </a>
                        <a onClick={(e) => { e.preventDefault(); scrollToId('triage-section'); openDeepDive('Early Warning'); }} className="flex items-center gap-3 px-4 py-3 text-[#dde3ed]/60 hover:text-[#dde3ed] hover:bg-[#252a32] rounded-lg transition-all duration-200 cursor-pointer">
                            <span className="material-symbols-outlined shrink-0" data-icon="emergency_home">emergency_home</span>
                            <span className="font-label">Early Warning</span>
                        </a>
                        <a onClick={(e) => { e.preventDefault(); scrollToId('message-container'); openDeepDive('Messages'); }} className="flex items-center gap-3 px-4 py-3 text-[#dde3ed]/60 hover:text-[#dde3ed] hover:bg-[#252a32] rounded-lg transition-all duration-200 cursor-pointer">
                            <span className="material-symbols-outlined shrink-0" data-icon="chat_bubble">chat_bubble</span>
                            <span className="font-label">Messages</span>
                        </a>
                        <a onClick={(e) => { e.preventDefault(); scrollToId('ngo-hub-section'); openDeepDive('NGO Hub'); }} className="flex items-center gap-3 px-4 py-3 text-[#dde3ed]/60 hover:text-[#dde3ed] hover:bg-[#252a32] rounded-lg transition-all duration-200 cursor-pointer">
                            <span className="material-symbols-outlined shrink-0" data-icon="analytics">analytics</span>
                            <span className="font-label">NGO Hub</span>
                        </a>
                        <a onClick={(e) => { e.preventDefault(); scrollToId('resource-section'); openDeepDive('Tools'); }} className="flex items-center gap-3 px-4 py-3 text-[#dde3ed]/60 hover:text-[#dde3ed] hover:bg-[#252a32] rounded-lg transition-all duration-200 cursor-pointer">
                            <span className="material-symbols-outlined shrink-0" data-icon="category">category</span>
                            <span className="font-label">Tools</span>
                        </a>
                    </nav>
                    <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-outline-variant/15">
                        <button onClick={() => { setInterventionSearchTerm(''); setIsInterventionOpen(true); }} className="w-full bg-primary text-on-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(68,216,241,0.2)]">
                            <span className="material-symbols-outlined shrink-0" data-icon="add">add</span>
                            <span>New Intervention</span>
                        </button>
                        <a className="flex items-center gap-3 px-4 py-2 text-[#dde3ed]/60 hover:text-[#dde3ed] transition-colors cursor-pointer" onClick={() => notify('Loading Support Documentation...')}>
                            <span className="material-symbols-outlined text-sm shrink-0" data-icon="help">help</span>
                            <span className="text-sm font-label">Help Center</span>
                        </a>
                        <button className="flex items-center gap-3 px-4 py-2 text-[#dde3ed]/60 hover:text-error transition-colors w-full" onClick={handleLogout}>
                            <span className="material-symbols-outlined text-sm shrink-0" data-icon="logout">logout</span>
                            <span className="text-sm font-label">Logout</span>
                        </button>
                    </div>
                </aside>
                
                {/* Main Content Canvas */}
                <main className="flex-1 lg:ml-64 p-6 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-2">Mentor Control</h1>
                        <p className="text-on-surface-variant font-body">Welcome back. There are <span className="text-tertiary font-bold underline decoration-tertiary/30 underline-offset-4">2 urgent cases</span> requiring your attention in Triage.</p>
                    </header>
                    
                    <div className="bento-grid">
                        {/* Early Warning Triage Section */}
                        <section id="triage-section" className="tilt-element col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/5">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-tertiary shrink-0" data-icon="warning" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                    <h2 className="text-xl font-bold font-headline">Early Warning Triage</h2>
                                </div>
                                <span className="text-xs font-bold tracking-widest text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full whitespace-nowrap">LIVE FEED</span>
                            </div>
                            <div className="space-y-4">
                                {/* Case 1 */}
                                <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-surface-container-high rounded-xl transition-all duration-300 hover:ring-1 hover:ring-tertiary/30">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-full shrink-0 bg-tertiary/10 flex items-center justify-center relative">
                                            <span className="material-symbols-outlined text-tertiary" data-icon="person">person</span>
                                            <div className="absolute inset-0 rounded-full border border-tertiary/50 animate-pulse"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-on-surface font-headline">Anonymous User #8824</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="w-2 h-2 rounded-full bg-error"></span>
                                                <p className="text-sm text-error font-medium">Severe Anxiety Spikes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => reviewCase('#8824')} className="w-full md:w-auto px-6 py-2.5 bg-error/10 text-error border border-error/20 rounded-lg text-sm font-bold hover:bg-error hover:text-on-error transition-all duration-200 shrink-0">
                                        Review Data
                                    </button>
                                </div>
                                {/* Case 2 */}
                                <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-surface-container-high rounded-xl transition-all duration-300 hover:ring-1 hover:ring-tertiary/30">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-full shrink-0 bg-tertiary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-tertiary" data-icon="person">person</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-on-surface font-headline">Anonymous User #9211</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                                                <p className="text-sm text-tertiary font-medium">Depressive Isolation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => reviewCase('#9211')} className="w-full md:w-auto px-6 py-2.5 bg-error/10 text-error border border-error/20 rounded-lg text-sm font-bold hover:bg-error hover:text-on-error transition-all duration-200 shrink-0">
                                        Review Data
                                    </button>
                                </div>

                                {/* AI ASSESSMENT FEED (LIVE) */}
                                <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-primary/5 rounded-xl border border-primary/20 animate-pulse transition-all duration-300 hover:ring-1 hover:ring-primary/40">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-full shrink-0 bg-primary/10 flex items-center justify-center border border-primary/30">
                                            <span className="material-symbols-outlined text-primary" data-icon="robot_2">robot_2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white font-headline">Nature #2124 (Live AI Stream)</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]"></span>
                                                <p className="text-xs text-teal-400 font-black uppercase tracking-widest">Self-Check: Critical Stress detected</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button onClick={() => reviewCase('Nature #2124')} className="flex-1 shrink-0 md:flex-none px-6 py-2.5 bg-primary text-slate-900 border border-primary rounded-lg text-sm font-black hover:scale-105 transition-all">
                                            Deploy Support
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        {/* NGO Visibility Hub */}
                        <section id="ngo-hub-section" className="tilt-element col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl p-6 border border-outline-variant/5">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-secondary shrink-0" data-icon="analytics">analytics</span>
                                <h2 className="text-xl font-bold font-headline">NGO Visibility Hub</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-surface-container-high p-4 rounded-xl">
                                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Total Mentorships</p>
                                    <span className="text-2xl font-bold text-primary font-headline">18</span>
                                </div>
                                <div className="bg-surface-container-high p-4 rounded-xl">
                                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Impact Resolution</p>
                                    <span className="text-2xl font-bold text-secondary font-headline">84%</span>
                                </div>
                            </div>
                            <div className="relative bg-surface-container-high p-6 rounded-xl overflow-hidden">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-on-surface">Wellbeing Growth</p>
                                        <p className="text-xs text-secondary">+12% Monthly Growth</p>
                                    </div>
                                    <span className="text-xs text-on-surface-variant">Last 30 Days</span>
                                </div>
                                {/* Mockup Graph */}
                                <div className="h-24 flex items-end gap-1">
                                    <div className="flex-1 bg-secondary/10 h-1/3 rounded-t-sm"></div>
                                    <div className="flex-1 bg-secondary/10 h-2/5 rounded-t-sm"></div>
                                    <div className="flex-1 bg-secondary/20 h-1/2 rounded-t-sm"></div>
                                    <div className="flex-1 bg-secondary/30 h-3/5 rounded-t-sm"></div>
                                    <div className="flex-1 bg-secondary/40 h-2/3 rounded-t-sm"></div>
                                    <div className="flex-1 bg-secondary/60 h-4/5 rounded-t-sm"></div>
                                    <div className="flex-1 bg-secondary h-full rounded-t-sm shadow-[0_0_15px_rgba(113,215,205,0.4)]"></div>
                                </div>
                            </div>
                        </section>
                        
                        {/* 1-1 Networking Workspace (Chat) */}
                        <section className="tilt-element col-span-12 lg:col-span-8 h-[500px] flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/5">
                            <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-high/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full shrink-0 bg-primary/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-xl">chat</span>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-on-surface font-headline">Conversation Workspace</h2>
                                        <p className="text-xs text-secondary">Youth User #4412 • Active Now</p>
                                    </div>
                                </div>
                                <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">
                                    <span className="material-symbols-outlined shrink-0">more_vert</span>
                                </button>
                            </div>
                            <div id="message-container" className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                                {/* Message Received */}
                                <div className="flex gap-4 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 mt-1 flex items-center justify-center text-on-surface-variant/50">
                                        <span className="material-symbols-outlined text-xl">person</span>
                                    </div>
                                    <div className="bg-surface-container-high p-4 rounded-2xl rounded-tl-none">
                                        <p className="text-sm leading-relaxed text-on-surface-variant">I’ve been feeling really overwhelmed lately with exams and everything else going on. It feels like I can't catch my breath most mornings.</p>
                                        <span className="text-[10px] text-on-surface-variant/50 mt-2 block">10:42 AM</span>
                                    </div>
                                </div>
                                {/* Message Sent */}
                                <div className="flex gap-4 max-w-[85%] ml-auto flex-row-reverse">
                                    <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tr-none">
                                        <p className="text-sm leading-relaxed text-on-surface">That sounds incredibly difficult, and it's completely valid to feel that way. Thank you for sharing that with me. Have you had a chance to try the grounding exercise we discussed last week?</p>
                                        <span className="text-[10px] text-primary/70 mt-2 block text-right">10:45 AM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-surface-container-high/30">
                                <div className="relative">
                                    <input id="chat-input" onKeyDown={handleChatInput} className="w-full bg-surface-container-highest border-none rounded-xl py-4 pl-5 pr-24 text-sm focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-on-surface-variant/40" placeholder="Type an empathetic response..." type="text" />
                                    <div className="absolute right-2 top-2 flex items-center gap-1">
                                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined shrink-0" data-icon="attach_file">attach_file</span>
                                        </button>
                                        <button onClick={sendMessage} className="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary-container transition-all shadow-lg shadow-primary/10">
                                            <span className="material-symbols-outlined shrink-0" data-icon="send">send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        {/* Resource Deployment Section */}
                        <section id="resource-section" className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-6 border border-outline-variant/5">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary shrink-0" data-icon="inventory_2">inventory_2</span>
                                <h2 className="text-xl font-bold font-headline">Resources</h2>
                            </div>
                            <div className="space-y-4">
                                {/* Resource 1 */}
                                <div className="bg-surface-container-high p-5 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-lg shrink-0 bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined" data-icon="self_improvement">self_improvement</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-on-surface">Grounding Exercises</h4>
                                            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">4-7-8 Breathing and 5-4-3-2-1 technique audio guide.</p>
                                        </div>
                                    </div>
                                    <button onClick={() => deployModule('Grounding Exercises')} className="w-full py-2 bg-surface-container-highest text-primary font-bold text-xs rounded-lg hover:bg-primary hover:text-on-primary transition-all">
                                        DEPLOY MODULE
                                    </button>
                                </div>
                                {/* Resource 2 */}
                                <div className="bg-surface-container-high p-5 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-lg shrink-0 bg-secondary/10 flex items-center justify-center text-secondary">
                                            <span className="material-symbols-outlined" data-icon="edit_note">edit_note</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-on-surface">Interactive Journal</h4>
                                            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Structured prompt for emotional processing and venting.</p>
                                        </div>
                                    </div>
                                    <button onClick={() => deployModule('Interactive Journal')} className="w-full py-2 bg-surface-container-highest text-secondary font-bold text-xs rounded-lg hover:bg-secondary hover:text-on-secondary transition-all">
                                        DEPLOY MODULE
                                    </button>
                                </div>
                                <button onClick={() => setIsResourceOpen(true)} className="w-full py-3 border border-dashed border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all text-sm rounded-xl">
                                    + Browse Full Library
                                </button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Extra Resource Modal */}
            <div id="resource-modal" className={`${isResourceOpen ? 'flex' : 'hidden'} fixed inset-0 z-[100] items-center justify-center px-4`}>
                <div className="absolute inset-0 bg-[#0e141b]/95 backdrop-blur-xl" onClick={() => setIsResourceOpen(false)}></div>
                <div className="relative w-full max-w-3xl glass-panel border border-primary/20 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(68,216,241,0.1)] animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
                    <button onClick={() => setIsResourceOpen(false)} className="absolute top-6 right-6 p-4 text-on-surface-variant/40 hover:text-primary transition-all">
                        <span className="material-symbols-outlined shrink-0">close</span>
                    </button>
                    <header className="mb-10">
                        <h2 className="text-3xl font-extrabold font-headline mb-2 text-[#dde3ed]">Resource Library</h2>
                        <p className="text-on-surface-variant">Global repository of youth-friendly digital wellbeing modules.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/40 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl shrink-0 bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                                    <span className="material-symbols-outlined">bedtime</span>
                                </div>
                                <h4 className="font-bold text-lg text-on-surface leading-tight">Sleep Hygiene Guide</h4>
                                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Interactive checklist and behavioral schedule to improve adolescent rest patterns.</p>
                            </div>
                            <button onClick={() => deployModule('Sleep Hygiene Guide')} className="mt-6 w-full py-3 bg-surface-container-highest text-primary font-bold text-xs rounded-xl hover:bg-primary hover:text-on-primary transition-all tracking-widest uppercase">DEPLOY MODULE</button>
                        </div>
                        <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 hover:border-secondary/40 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl shrink-0 bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                                    <span className="material-symbols-outlined">spa</span>
                                </div>
                                <h4 className="font-bold text-lg text-on-surface leading-tight">Mindfulness Soundscape</h4>
                                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Curated 10-minute spatial audio experience focusing on detachment and grounding.</p>
                            </div>
                            <button onClick={() => deployModule('Mindfulness Soundscape')} className="mt-6 w-full py-3 bg-surface-container-highest text-secondary font-bold text-xs rounded-xl hover:bg-secondary hover:text-on-secondary transition-all tracking-widest uppercase">DEPLOY MODULE</button>
                        </div>
                        <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/40 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl shrink-0 bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <span className="material-symbols-outlined">favorite</span>
                                </div>
                                <h4 className="font-bold text-lg text-on-surface leading-tight">Positive Affirmation Deck</h4>
                                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Daily-rotating series of affirming prompts designed to combat self-criticism.</p>
                            </div>
                            <button onClick={() => deployModule('Affirmation Deck')} className="mt-6 w-full py-3 bg-surface-container-highest text-primary font-bold text-xs rounded-xl hover:bg-primary hover:text-on-primary transition-all tracking-widest uppercase">DEPLOY MODULE</button>
                        </div>
                        <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 hover:border-[#ff8b67]/40 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl shrink-0 bg-[#ff8b67]/10 flex items-center justify-center text-[#ff8b67] mb-4">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <h4 className="font-bold text-lg text-on-surface leading-tight">Academic Stress Toolkit</h4>
                                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Strategies for handling high-pressure exam periods and task prioritization.</p>
                            </div>
                            <button onClick={() => deployModule('Academic Stress Toolkit')} className="mt-6 w-full py-3 bg-surface-container-highest text-[#ff8b67] font-bold text-xs rounded-xl hover:bg-[#ff8b67] hover:text-[#3a0a00] transition-all tracking-widest uppercase">DEPLOY MODULE</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mentor SOP Guidebook Modal */}
            <div id="guidebook-modal" className={`${isGuidebookOpen ? 'flex' : 'hidden'} fixed inset-0 z-[120] items-center justify-center px-6`}>
                <div className="absolute inset-0 bg-[#0e141b]/95 backdrop-blur-2xl" onClick={() => setIsGuidebookOpen(false)}></div>
                <div className="relative w-full max-w-2xl glass-panel border border-primary/20 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(68,216,241,0.1)] overflow-y-auto max-h-[85vh]">
                    <button onClick={() => setIsGuidebookOpen(false)} className="absolute top-8 right-8 p-3 text-on-surface-variant/30 hover:text-primary transition-all">
                        <span className="material-symbols-outlined shrink-0">close</span>
                    </button>
                    <header className="mb-10 flex items-center gap-4 border-b border-outline-variant/10 pb-6">
                        <div className="w-12 h-12 rounded-xl shrink-0 bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">menu_book</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold font-headline text-[#dde3ed]">Mentor SOP Guidebook</h2>
                            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-black">Standard Operating Procedures</p>
                        </div>
                    </header>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h4 className="text-primary font-bold text-sm tracking-wide">01. THE ANONYMITY PROTOCOL</h4>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Safety is built on trust. Never request Personally Identifiable Information (PII) from youth. Refer to the active user only by their unique ID (e.g., #8824).</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-primary font-bold text-sm tracking-wide">02. EMPATHETIC ENGAGEMENT</h4>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Prioritize active listening. Use open-ended questions like "How does that feel specifically?" to allow the user to explore their emotional landscape at their own pace.</p>
                        </div>
                        <div className="space-y-2 border-l-2 border-error/40 pl-6 py-2 bg-error/5 rounded-r-xl">
                            <h4 className="text-error font-bold text-sm tracking-wide">03. CRISIS ESCALATION</h4>
                            <p className="text-on-surface-variant text-sm leading-relaxed font-medium italic">Detection of self-harm markers or imminent danger requires immediate escalation. Use the "Red Flag" button in the conversation hub to alert an NGO Lead instantly.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-primary font-bold text-sm tracking-wide">04. RESOURCE DEPLOYMENT</h4>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Only push digital assets (Sleep Guides, Breathing Tools) when relevant to the current conversation. Quality over quantity ensures resources are not dismissed as spam.</p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center border-t border-outline-variant/10 pt-8">
                        <p className="text-[10px] text-on-surface-variant/40 text-center tracking-[0.3em] font-black italic uppercase">Probative Digital Mentorship Framework • Established 2026</p>
                    </div>
                </div>
            </div>

            {/* BottomNavBar Shell (Mobile) */}
            <nav className="lg:hidden fixed bottom-0 w-full z-50 flex justify-around items-center p-3 pb-safe bg-[#0e141b]/90 backdrop-blur-xl border-t border-[#dde3ed]/15 shadow-2xl">
                <a onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); openDeepDive('Overview'); }} className="flex flex-col items-center justify-center bg-[#44d8f1]/20 text-[#44d8f1] rounded-xl px-4 py-1 scale-90 duration-200 cursor-pointer">
                    <span className="material-symbols-outlined shrink-0" data-icon="home" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    <span className="text-[10px] font-label mt-0.5">Home</span>
                </a>
                <a onClick={() => { scrollToId('triage-section'); openDeepDive('Early Warning'); }} className="flex flex-col items-center justify-center text-[#dde3ed]/50 hover:text-[#44d8f1] cursor-pointer">
                    <span className="material-symbols-outlined shrink-0" data-icon="warning">warning</span>
                    <span className="text-[10px] font-label mt-0.5">Triage</span>
                </a>
                <a onClick={() => { scrollToId('message-container'); openDeepDive('Messages'); }} className="flex flex-col items-center justify-center text-[#dde3ed]/50 hover:text-[#44d8f1] cursor-pointer">
                    <span className="material-symbols-outlined shrink-0" data-icon="mail">mail</span>
                    <span className="text-[10px] font-label mt-0.5">Chat</span>
                </a>
                <a onClick={() => { scrollToId('resource-section'); openDeepDive('Tools'); }} className="flex flex-col items-center justify-center text-[#dde3ed]/50 hover:text-[#44d8f1] cursor-pointer">
                    <span className="material-symbols-outlined shrink-0" data-icon="inventory_2">inventory_2</span>
                    <span className="text-[10px] font-label mt-0.5">Resources</span>
                </a>
            </nav>

            {/* New Intervention Modal */}
            <div id="intervention-modal" className={`${isInterventionOpen ? 'flex' : 'hidden'} fixed inset-0 z-[100] items-center justify-center px-4`}>
                <div className="absolute inset-0 bg-[#0e141b]/90 backdrop-blur-md" onClick={() => setIsInterventionOpen(false)}></div>

                <div className="relative w-full max-w-2xl glass-panel border border-primary/20 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(68,216,241,0.15)] animate-in fade-in zoom-in duration-300">
                    <button onClick={() => setIsInterventionOpen(false)} className="absolute top-6 right-6 p-2 text-on-surface-variant/40 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined shrink-0">close</span>
                    </button>

                    <header className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shrink-0 bg-primary/10 text-primary mb-4 border border-primary/20 animate-pulse">
                            <span className="material-symbols-outlined text-3xl">add_moderator</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold font-headline mb-2">New Intervention</h2>
                        <p className="text-on-surface-variant text-sm">Initiate priority outreach for at-risk adolescents.</p>
                    </header>

                    {/* Search Bar */}
                    <div className="relative mb-12">
                        <input type="text" value={interventionSearchTerm} onChange={(e) => setInterventionSearchTerm(e.target.value)} placeholder="Search by Anonymous User ID (e.g. #8824)" className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-2xl py-5 pl-14 pr-6 text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all placeholder:text-on-surface-variant/30" />
                        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 shrink-0">search</span>
                    </div>

                    {/* Action Orbs Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <button onClick={() => executeIntervention('Assign Support Plan')} className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-surface-container-low hover:bg-primary/5 border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-full bg-surface-container-high shrink-0 group-hover:bg-primary/20 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-all duration-300 shadow-xl mb-4">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface transition-colors">Assign Support Plan</span>
                        </button>
                        <button onClick={() => executeIntervention('Direct Message')} className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-surface-container-low hover:bg-primary/5 border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-full bg-surface-container-high shrink-0 group-hover:bg-primary/20 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-all duration-300 shadow-xl mb-4">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface transition-colors">Direct Message</span>
                        </button>
                        <button onClick={() => executeIntervention('Send Resource')} className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-surface-container-low hover:bg-primary/5 border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-full bg-surface-container-high shrink-0 group-hover:bg-primary/20 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-all duration-300 shadow-xl mb-4">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface transition-colors">Send Resource</span>
                        </button>
                    </section>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-[0.3em] font-medium animate-bounce pointer-events-none">Select an Uplink Action</p>
                    </div>
                </div>
            </div>

            {/* Global Action Feedback (Toast) */}
            {toastMessage && (
                <div id="toast-container" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 pointer-events-none animate-in fade-in slide-in-from-bottom-5">
                    <div className="bg-surface-container-highest border border-outline-variant/30 text-on-surface px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-lg shrink-0">info</span>
                        {toastMessage}
                    </div>
                </div>
            )}

            {/* Feature Deep-Dive Modal */}
            <div id="deep-dive-modal" className={`${isDeepDiveOpen ? 'flex' : 'hidden'} fixed inset-0 z-[110] items-center justify-center px-6`}>
                <div className="absolute inset-0 bg-[#0e141b]/80 backdrop-blur-2xl" onClick={closeDeepDive}></div>

                <div className="relative w-full max-w-2xl glass-panel border border-primary/40 rounded-[3rem] p-12 shadow-[0_0_100px_rgba(68,216,241,0.1)] animate-in zoom-in duration-500 overflow-hidden group">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-700"></div>

                    <button onClick={closeDeepDive} className="absolute top-8 right-8 p-3 text-on-surface-variant/30 hover:text-primary hover:rotate-90 transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl shrink-0">close</span>
                    </button>

                    <div className="text-center">
                        <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 border border-primary/20 shadow-[0_0_30px_rgba(68,216,241,0.1)]">
                            <span className="material-symbols-outlined text-4xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                        </div>

                        <h4 className="text-[10px] text-primary uppercase tracking-[0.4em] font-black mb-3">Feature Insight</h4>
                        <h2 className="text-3xl md:text-4xl font-extrabold font-headline mb-6 text-[#dde3ed]">{deepDiveTitle || 'Deep-Dive Explorer'}</h2>

                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-8"></div>

                        <p className="text-on-surface-variant text-lg leading-relaxed font-body max-w-lg mx-auto">
                            Exploring the operational architecture of the support ecosystem.
                        </p>

                        <div className="mt-12 flex justify-center gap-4">
                            <div className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] text-primary/70 font-bold tracking-widest uppercase animate-bounce" style={{ animationDelay: "0.1s" }}>AI Analysis</div>
                            <div className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] text-primary/70 font-bold tracking-widest uppercase animate-bounce" style={{ animationDelay: "0.3s" }}>Encrypted</div>
                            <div className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] text-primary/70 font-bold tracking-widest uppercase animate-bounce" style={{ animationDelay: "0.5s" }}>Social Impact</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
