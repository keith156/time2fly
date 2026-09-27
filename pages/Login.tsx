
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { supabase } from '../context/DataContext.tsx';

// Precomputed SHA-256 hashes for fallback authentication
const USER_HASH = 'db03d157fdc7f5358055c5c83f9801452dfaaeb1aefca740445d5ef833ee463b';
const PASS_HASH = '9ea63a2aaedbc835cf190c1f5d6ff736341f9d6db6c72808e06385d34208a0df';

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Attempt Supabase Auth if configured with an email address
      if (username.includes('@')) {
        const { data, error: sbError } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        });

        if (!sbError && data.session) {
          localStorage.setItem('t2f_admin_auth', 'true');
          navigate('/admin');
          return;
        }
      }

      // 2. Hash-based fallback check (no plaintext passwords in JS bundle)
      const uHash = await hashString(username.trim());
      const pHash = await hashString(password.trim());

      if (uHash === USER_HASH && pHash === PASS_HASH) {
        localStorage.setItem('t2f_admin_auth', 'true');
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-slate-950 p-10 text-center text-white relative">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden p-2">
            <img src="/assets/logo.png" alt="Time2Fly Logo" width={80} height={80} className="w-full h-full object-contain" loading="eager" decoding="async" />
          </div>
          <h2 className="text-h2 text-white">Admin Portal</h2>
          <p className="text-body text-slate-400 mt-2">Access management dashboard</p>
        </div>

        <form className="p-10 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 font-medium"
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-slate-950 text-white font-black py-5 rounded-xl transition-all shadow-xl hover:shadow-amber-500/20 uppercase tracking-widest mt-4">
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
