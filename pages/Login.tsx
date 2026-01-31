
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Plane } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('t2f_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-slate-950 p-10 text-center text-white relative">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden p-2">
            <img src="/assets/logo.png" alt="Time2Fly Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Admin Portal</h2>
          <p className="text-slate-400 font-medium mt-2">Access management dashboard</p>
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
                placeholder="admin"
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
      <p className="mt-8 text-slate-400 text-sm font-medium">Use admin / admin to access demo</p>
    </div>
  );
};

export default Login;
