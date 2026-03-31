import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();
  
  const [youthEmail, setYouthEmail] = useState('');
  const [youthPassword, setYouthPassword] = useState('');
  
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorPassword, setMentorPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [overlayKey, setOverlayKey] = useState(null);

  const OVERLAYS = {
    mission: {
      title: "Our Mission",
      subtitle: "Bridging the Gap between Pressure and Support",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-on-surface-variant text-lg leading-relaxed">We exist to ensure that no student ever feels invisible in their struggle. YouthLink is the bridge between the academic pressure cooker and a safe, resilient mind.</p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-center">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span className="font-bold">Anonymity First Architecture</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <span className="font-bold">Verified Mentor Connectivity</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="material-symbols-outlined text-tertiary">verified</span>
                <span className="font-bold">Emotional Intelligence Core</span>
              </li>
            </ul>
          </div>
          <div className="glass-panel p-8 rounded-[3rem] border-secondary/20 bg-secondary/5">
            <h4 className="text-xl font-black mb-4">The Vision</h4>
            <p className="text-sm text-slate-400">To create a global network of private user hubs where empathy is the primary currency and wellbeing is the only metric that matters.</p>
          </div>
        </div>
      )
    },
    works: {
      title: "How it Works",
      subtitle: "The 3 Stages of the User Protocol",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <h4 className="font-black">1. Reflect</h4>
            <p className="text-xs text-slate-500">Log your emotional signatures through journaling and AI-driven check-ins.</p>
          </div>
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-secondary/10 border border-secondary/20 rounded-2xl flex items-center justify-center text-secondary mx-auto">
              <span className="material-symbols-outlined text-3xl">hub</span>
            </div>
            <h4 className="font-black">2. Connect</h4>
            <p className="text-xs text-slate-500">Engage with empathetic AI companions or secure human mentor uplinks.</p>
          </div>
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-tertiary/10 border border-tertiary/20 rounded-2xl flex items-center justify-center text-tertiary mx-auto">
              <span className="material-symbols-outlined text-3xl">trending_up</span>
            </div>
            <h4 className="font-black">3. Evolve</h4>
            <p className="text-xs text-slate-500">Visualize your resilience trends and optimize your integrity for a stable future.</p>
          </div>
        </div>
      )
    },
    resources: {
      title: "Public Resources",
      subtitle: "Tactical Mental Health Toolkits",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 glass-panel border border-white/5 rounded-3xl hover:border-primary/40 transition-all cursor-pointer">
            <h4 className="font-bold flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-primary">menu_book</span> Academic Stress Kit</h4>
            <p className="text-xs text-slate-400">Managing exam clusters and productivity burnout protocols.</p>
          </div>
          <div className="p-6 glass-panel border border-white/5 rounded-3xl hover:border-secondary/40 transition-all cursor-pointer">
            <h4 className="font-bold flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-secondary">self_improvement</span> Breathwork 2.0</h4>
            <p className="text-xs text-slate-400">Advanced 4-7-8 and Box breathing for immediate nervous system resets.</p>
          </div>
          <div className="p-6 glass-panel border border-white/5 rounded-3xl hover:border-tertiary/40 transition-all cursor-pointer">
            <h4 className="font-bold flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-tertiary">shield</span> Digital Boundaries</h4>
            <p className="text-xs text-slate-400">How to disconnect and reclaim your attention in a noise-heavy world.</p>
          </div>
          <div className="p-6 glass-panel border border-white/5 rounded-3xl hover:border-error/40 transition-all cursor-pointer">
            <h4 className="font-bold flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-error">diversity_3</span> Peer Support 101</h4>
            <p className="text-xs text-slate-400">Learn how to listen and bridge your friends to professional help.</p>
          </div>
        </div>
      )
    },
    help: {
      title: "Get Immediate Help",
      subtitle: "Global Crisis Protocols & Human Bridges",
      content: (
        <div className="p-8 glass-panel border-error/20 bg-error/5 rounded-[3rem] space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-error text-white flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-4xl font-black">emergency</span>
            </div>
            <h4 className="text-2xl font-black">Emergency Action Required?</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-background rounded-2xl space-y-2">
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Global Helpline</span>
              <p className="text-2xl font-black">988</p>
              <p className="text-[10px] text-slate-500">Suicide & Crisis Lifeline (US/Canada)</p>
            </div>
            <div className="p-6 bg-slate-background rounded-2xl space-y-2">
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Text Bridge</span>
              <p className="text-2xl font-black">HOME to 741741</p>
              <p className="text-[10px] text-slate-500">Crisis Text Line (Global)</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 text-center italic">"You are not alone. There is always a bridge back to the shore."</p>
        </div>
      )
    }
  };

  const handleLogin = async (e, role) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    const email = role === 'student' ? youthEmail : mentorEmail;
    const password = role === 'student' ? youthPassword : mentorPassword;
    const collectionName = role === 'student' ? 'students' : 'mentors';
    
    try {
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        
        // --- STRICT STORAGE PORTAL CHECK ---
        const docRef = doc(db, collectionName, userCred.user.uid);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
           // --- SILENT LEGACY MIGRATION ---
           const legacyDocRef = doc(db, 'users', userCred.user.uid);
           const legacyDocSnap = await getDoc(legacyDocRef);
           
           if (legacyDocSnap.exists()) {
               const legacyData = legacyDocSnap.data();
               const mappedRole = legacyData.role === 'mentor' ? 'mentor' : 'student';
               
               if (mappedRole === role) {
                   // Migrate their metadata silently
                   await setDoc(docRef, { ...legacyData, role: mappedRole, migratedAt: new Date().toISOString() });
               } else {
                   await auth.signOut();
                   throw new Error(`Access Denied: Your legacy profile is a ${mappedRole.toUpperCase()}. Please use the correct portal.`);
               }
           } else {
               await auth.signOut(); // Ensure they are logged out across the app
               throw new Error(`Access Denied: ${role.toUpperCase()} profile not found in this registry. Check your credentials or portal.`);
           }
        }
        
      } catch (err) {
        if (err.message.includes('Access Denied')) {
            throw err;
        }

        // If user not found, auto-create for hackathon convenience
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
            try {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, collectionName, userCred.user.uid), {
                    email,
                    role,
                    createdAt: new Date().toISOString()
                });
            } catch (createErr) {
                // If it fails because the email is in use, it means they provided the wrong password
                if (createErr.code === 'auth/email-already-in-use') {
                    throw new Error('Invalid credentials. Please verify your password.');
                }
                throw createErr;
            }
        } else {
            throw err;
        }
      }
      
      setUserRole(role);
      navigate(role === 'student' ? '/youth' : '/mentor');
      
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body text-on-background bg-background min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-[#ffb869] font-headline">YouthLink</div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => setOverlayKey('mission')} className="font-headline text-slate-300 hover:text-white transition-colors">Our Mission</button>
            <button onClick={() => setOverlayKey('works')} className="font-headline text-slate-300 hover:text-white transition-colors">How it Works</button>
            <button onClick={() => setOverlayKey('resources')} className="font-headline text-slate-300 hover:text-white transition-colors">Resources</button>
          </nav>
          <button 
            onClick={() => setOverlayKey('help')}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold tracking-tight scale-95 active:scale-90 transition-transform hover:shadow-[0_0_20px_rgba(255,184,105,0.3)]">Get Help</button>
        </div>
      </header>
      
      <main className="min-h-screen relative flex items-center justify-center pt-20 pb-12 overflow-hidden px-4">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary filter blur-[80px] opacity-15 rounded-full z-0"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary filter blur-[80px] opacity-15 rounded-full z-0"></div>
        
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          {/* Youth Form */}
          <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 flex flex-col items-center text-center justify-center space-y-8 hover:bg-white/5 transition-all duration-500 bg-[#20383f]/40 backdrop-blur-xl">
            <div className="space-y-4">
              <span className="text-secondary font-label tracking-[0.2em] uppercase text-xs font-bold">Safe Haven</span>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-on-surface">Youth Entry</h1>
              <p className="text-on-surface-variant text-lg max-w-sm mx-auto">Welcome to your private user hub. Connect, share, and find support in a space designed just for you.</p>
            </div>
            
            <form className="w-full space-y-6 max-w-sm text-left" onSubmit={(e) => handleLogin(e, 'student')}>
              <div className="space-y-2">
                <label className="text-sm font-label text-on-surface-variant ml-2">Email Directory</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">person</span>
                  </div>
                  <input 
                    value={youthEmail}
                    onChange={e => setYouthEmail(e.target.value)}
                    className="w-full bg-[#041f25] border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    placeholder="yourname@example.com" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-sm font-label text-on-surface-variant">Password</label>
                  <a className="text-xs text-primary hover:text-[#c3802e] transition-colors" href="#">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                  </div>
                  <input 
                    value={youthPassword}
                    onChange={e => setYouthPassword(e.target.value)}
                    className="w-full bg-[#041f25] border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    placeholder="••••••••••••" type="password" required />
                </div>
              </div>
              <div className="flex justify-end pt-1 pb-2">
                <button type="button"
                  onClick={() => { setYouthEmail('demo.youth@example.com'); setYouthPassword('YouthPass123!'); }}
                  className="text-xs font-bold text-slate-400 opacity-60 hover:opacity-100 hover:-translate-y-1 hover:text-[#ffb869] transition-all duration-300 tracking-wide">✨ Try DemoUser</button>
              </div>
              
              {errorMsg && youthEmail && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}

              <button disabled={loading} className="w-full bg-gradient-to-r from-primary to-[#c3802e] text-on-primary font-bold py-4 rounded-full text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3" type="submit">
                <span className="material-symbols-outlined">volunteer_activism</span>
                {loading ? 'Entering...' : 'Enter Safe Space'}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-400">
                  Don't have an account? <Link to="/signup" className="text-primary hover:text-[#ffb869] font-bold transition-colors">Sign up here</Link>
                </p>
              </div>
            </form>
          </div>
          
          {/* Mentor Form */}
          <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 flex flex-col space-y-8 hover:bg-white/5 transition-all duration-500 bg-[#20383f]/40 backdrop-blur-xl">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-primary font-label tracking-[0.2em] uppercase text-xs font-bold">Empower Others</span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-on-surface">Mentor Portal</h2>
              <p className="text-on-surface-variant text-lg">Secure access for verified mentors and support professionals.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => handleLogin(e, 'mentor')}>
              <div className="space-y-2">
                <label className="text-sm font-label text-on-surface-variant ml-2">Work Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 group-focus-within:text-secondary transition-colors">mail</span>
                  </div>
                  <input 
                    value={mentorEmail}
                    onChange={e => setMentorEmail(e.target.value)}
                    className="w-full bg-[#041f25] border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-slate-600 focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="name@organization.org" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-sm font-label text-on-surface-variant">Security Key</label>
                  <a className="text-xs text-secondary hover:text-primary transition-colors" href="#">Forgot Access?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 group-focus-within:text-secondary transition-colors">lock</span>
                  </div>
                  <input 
                    value={mentorPassword}
                    onChange={e => setMentorPassword(e.target.value)}
                    className="w-full bg-[#041f25] border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-slate-600 focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="••••••••••••" type="password" required />
                </div>
              </div>
              <div className="flex justify-end pt-1 pb-2">
                <button type="button"
                  onClick={() => { setMentorEmail('pro.mentor@youthlink.org'); setMentorPassword('MentorAccess789!'); }}
                  className="text-xs font-bold text-slate-400 opacity-60 hover:opacity-100 hover:-translate-y-1 hover:text-[#59d9db] transition-all duration-300 tracking-wide">🔒 Try DemoMentor</button>
              </div>

              {errorMsg && mentorEmail && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}

              <button disabled={loading} className="w-full border-2 border-secondary/30 hover:bg-secondary/10 text-secondary font-bold py-4 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-3" type="submit">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                {loading ? 'Authenticating...' : 'Mentor Access'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="bg-[#00161c] w-full py-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 z-10 relative">
          <p className="font-['Manrope'] text-xs tracking-wide text-slate-600">© 2026 YouthLink. A Private User Hub. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Protocol v4.0 Active</span>
          </div>
        </div>
      </footer>

      {/* Overlay Modal */}
      {overlayKey && OVERLAYS[overlayKey] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-3xl bg-background/60">
          <div className="bg-[#20383f]/40 backdrop-blur-xl w-full max-w-4xl p-10 md:p-16 rounded-[4rem] border border-white/10 relative animate-in zoom-in duration-500">
            <button onClick={() => setOverlayKey(null)} className="absolute top-8 right-8 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
              <span className="material-symbols-outlined text-slate-400">close</span>
            </button>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-black font-headline text-white">{OVERLAYS[overlayKey].title}</h2>
                <p className="text-xl text-teal-400 font-bold">{OVERLAYS[overlayKey].subtitle}</p>
              </div>
              <div className="pt-6 border-t border-white/5">
                {OVERLAYS[overlayKey].content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
