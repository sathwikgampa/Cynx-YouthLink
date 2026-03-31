import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    // Basic validation
    if (!name || !age || !gender || !location || !email || !password) {
        setErrorMsg('Please fill in all fields to create your Safe Space.');
        setLoading(false);
        return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user metadata including the requested constraints
      await setDoc(doc(db, 'students', userCred.user.uid), {
          name,
          age: parseInt(age, 10),
          gender,
          location,
          email,
          role: 'student', // Defaulting signups to students/youth
          createdAt: new Date().toISOString()
      });
      
      setUserRole('student');
      navigate('/youth');
      
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body text-slate-200 bg-[#0f172a] min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-[#0f172a]/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-teal-400 font-headline">YouthLink</div>
          <button onClick={() => navigate('/login')} className="font-headline text-slate-300 hover:text-white transition-colors">Return to Login</button>
        </div>
      </header>
      
      <main className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden px-4">
        {/* Cinematic Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500 filter blur-[100px] opacity-20 rounded-full z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-sky-500 filter blur-[100px] opacity-20 rounded-full z-0 pointer-events-none"></div>
        
        <div className="max-w-xl w-full relative z-10">
          
          <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center space-y-8 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
            <div className="space-y-4 text-center">
              <span className="text-teal-400 font-label tracking-[0.2em] uppercase text-xs font-bold">New Identity</span>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-white">Create Sanctuary</h1>
              <p className="text-slate-400 text-sm md:text-base max-w-sm mx-auto">Build your secure, anonymous profile to access the global support network.</p>
            </div>
            
            <form className="w-full space-y-5" onSubmit={handleSignUp}>
              {/* Row 1: Name and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 tracking-wider uppercase ml-1">Alias / Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500 group-focus-within:text-teal-400 transition-colors text-sm">badge</span>
                      </div>
                      <input 
                        value={name} onChange={e => setName(e.target.value)}
                        className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300"
                        placeholder="Nature #123" type="text" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 tracking-wider uppercase ml-1">Age</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500 group-focus-within:text-teal-400 transition-colors text-sm">cake</span>
                      </div>
                      <input 
                        value={age} onChange={e => setAge(e.target.value)}
                        className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300"
                        placeholder="16" type="number" min="13" max="99" required />
                    </div>
                  </div>
              </div>

              {/* Row 2: Gender and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 tracking-wider uppercase ml-1">Gender</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none pointer-events-none z-10">
                        <span className="material-symbols-outlined text-slate-500 group-focus-within:text-teal-400 transition-colors text-sm">wc</span>
                      </div>
                      <select 
                        value={gender} onChange={e => setGender(e.target.value)} required
                        className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300 appearance-none cursor-pointer">
                        <option value="" disabled hidden className="text-slate-600">Select Identity</option>
                        <option value="Male" className="bg-slate-800 text-white">Male</option>
                        <option value="Female" className="bg-slate-800 text-white">Female</option>
                        <option value="Non-Binary" className="bg-slate-800 text-white">Non-Binary</option>
                        <option value="Prefer not to say" className="bg-slate-800 text-white">Prefer not to say</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500 text-sm">expand_more</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 tracking-wider uppercase ml-1">Location Network</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500 group-focus-within:text-teal-400 transition-colors text-sm">pin_drop</span>
                      </div>
                      <input 
                        value={location} onChange={e => setLocation(e.target.value)}
                        className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300"
                        placeholder="City, Region" type="text" required />
                    </div>
                  </div>
              </div>

              {/* Row 3: Email */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 tracking-wider uppercase ml-1">Secure Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 group-focus-within:text-teal-400 transition-colors text-sm">mail</span>
                  </div>
                  <input 
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300"
                    placeholder="hero@youthlink.link" type="email" required />
                </div>
              </div>

              {/* Row 4: Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 tracking-wider uppercase ml-1">Encryption Key (Password)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 group-focus-within:text-teal-400 transition-colors text-sm">lock</span>
                  </div>
                  <input 
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-300"
                    placeholder="••••••••••••" type="password" required />
                </div>
              </div>
              
              {errorMsg && <p className="text-rose-400 text-xs text-center font-bold">{errorMsg}</p>}

              <button disabled={loading} className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold py-4 rounded-2xl text-lg shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center justify-center gap-3 mt-4" type="submit">
                <span className="material-symbols-outlined font-black">shield_lock</span>
                {loading ? 'Encrypting...' : 'Initialize Sanctuary'}
              </button>
            </form>
            
            <p className="text-xs text-slate-500 text-center font-bold">
                Already have an identity? <Link to="/login" className="text-teal-400 hover:text-teal-300 underline underline-offset-4">Authenticate Here</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
