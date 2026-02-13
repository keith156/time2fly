
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronRight, Star, Globe, Shield, Compass, Plane, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Lock, Music2, VolumeX, Volume2, Search, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const TourPackages = React.lazy(() => import('./pages/TourPackages'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const Destinations = React.lazy(() => import('./pages/Destinations'));
const SpecialOffers = React.lazy(() => import('./pages/SpecialOffers'));
const DestinationDetail = React.lazy(() => import('./pages/DestinationDetail'));

import ErrorBoundary from './components/ErrorBoundary.tsx';
import { DataProvider, useData } from './context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Auto-play music on load
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      }
      // Remove the event listeners once the first interaction happens
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (!isMuted) {
        audioRef.current.play().catch(err => console.log("Initial audio play blocked:", err));
      } else {
        audioRef.current.pause();
      }
    }

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Special offers', path: '/special-offers' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-600 rounded-full px-6 py-2 flex items-center justify-between shadow-2xl border border-white/10">
          <Link to="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
              <img
                src="/assets/logo.png"
                alt="Time2Fly Logo"
                className="w-full h-full object-contain scale-[1.4] transition-transform duration-300 group-hover:scale-[1.5]"
              />
            </div>
            <span className="text-white font-black text-xl md:text-2xl tracking-tight">Time2Fly</span>
          </Link>

          <div className="flex items-center space-x-4 ml-auto">
            <audio ref={audioRef as any} src="/assets/WhatsApp Audio 2026-02-02 at 17.04.32.mpeg" loop className="hidden" />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
              title={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
            </button>
            <div className="hidden lg:flex items-center space-x-6 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white font-medium text-sm hover:text-white/80 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-full p-1 pl-4 shrink-0 w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-slate-400 text-sm w-full outline-none"
              />
              <button
                type="submit"
                className="bg-navy-800 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <span className="flex items-center justify-center">
                  <Search size={16} />
                </span>
              </button>
            </form>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full px-4 pt-2 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="bg-red-600 rounded-3xl p-6 shadow-2xl border border-white/10 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-white font-medium text-lg border-b border-white/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <form onSubmit={handleSearch} className="bg-white rounded-full p-1 pl-4 flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-slate-400 text-sm w-full outline-none"
                />
                <button type="submit" className="bg-navy-800 text-white p-2 rounded-full">
                  <Search size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const { lastUpdated, refreshData, loading } = useData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <footer className="bg-[#0000ff] text-white py-8 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8 px-4 text-center">
          <h3 className="font-bold mb-6 text-amber-500 uppercase tracking-widest text-xs max-w-2xl leading-relaxed">
            For inquiries, support, or additional details, our team is happy to assist you. please Get In Touch With Us
          </h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-white font-medium">
            <div className="flex items-center space-x-3">
              <MapPin size={18} className="text-amber-500 flex-shrink-0" />
              <span>Kampala, Uganda</span>
            </div>
            <div className="flex items-start md:items-center space-x-3">
              <Phone size={18} className="text-amber-500 flex-shrink-0 mt-1 md:mt-0" />
              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <span className="whitespace-nowrap">+256 759 243 331</span>
                <span className="text-white/20 hidden md:block">|</span>
                <span className="whitespace-nowrap">+256 783 084 521</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-amber-500 flex-shrink-0" />
              <span>t2f.reservations@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Social Media - Centered Row */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <a href="https://www.facebook.com/timetofly.ug/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-blue-600 transition-all hover:-translate-y-1 text-white border border-white/10" title="Facebook"><Facebook size={20} /></a>
          <a href="https://x.com/time2fly06/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-black transition-all hover:-translate-y-1 text-white border border-white/10" title="X (Twitter)"><Twitter size={20} /></a>
          <a href="https://www.instagram.com/time2fly06/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-pink-600 transition-all hover:-translate-y-1 text-white border border-white/10" title="Instagram"><Instagram size={20} /></a>
          <a href="https://ug.linkedin.com/company/time2fly06" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-blue-700 transition-all hover:-translate-y-1 text-white border border-white/10" title="LinkedIn"><Linkedin size={20} /></a>
          <a href="https://medium.com/@time2fly06" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-black transition-all hover:-translate-y-1 text-white border border-white/10" title="Medium">
            {/* Medium Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
          <a href="https://www.tripadvisor.com/Profile/Time2Fly5" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-green-500 transition-all hover:-translate-y-1 text-white border border-white/10" title="TripAdvisor">
            <img src="/assets/tripadvisor-icon.png" alt="TripAdvisor" className="w-5 h-5 object-contain invert" />
          </a>
          <a href="https://www.tiktok.com/@time2fly06" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-black transition-all hover:-translate-y-1 text-white border border-white/10" title="TikTok"><Music2 size={20} /></a>
        </div>

        <div className="pt-8 border-t border-blue-700 flex flex-col items-center justify-center text-center text-white/50 text-sm font-medium gap-4">
          <p className="text-white">© 2026 Time2Fly Tours & Travel Ltd. All rights reserved.</p>
          <Link to="/login" className="flex items-center space-x-1 opacity-20 hover:opacity-100 transition-opacity">
            <Lock size={14} />
            <span>Admin Login</span>
          </Link>
          {lastUpdated && (
            <div className="flex items-center space-x-2 text-[10px] uppercase font-black tracking-widest text-slate-600">
              <span>Last Synced: {new Date(lastUpdated).toLocaleTimeString()}</span>
              <button
                onClick={handleManualRefresh}
                className={`p-1 hover:text-amber-500 transition-all ${loading || isRefreshing ? 'animate-spin text-amber-500' : ''}`}
                title="Force Refresh Data"
                disabled={loading || isRefreshing}
              >
                <RefreshCcw size={10} />
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('t2f_admin_auth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

import ConnectionStatus from './components/ConnectionStatus';

const App: React.FC = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <DataProvider>
      <ErrorBoundary>
        <HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <ConnectionStatus />
            <main className="flex-grow">
              <React.Suspense fallback={
                <div className="h-screen flex items-center justify-center bg-white">
                  <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/packages" element={<TourPackages />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/destinations" element={<React.Suspense fallback={<div className="pt-24 min-h-screen bg-slate-50"></div>}><Destinations /></React.Suspense>} />
                  <Route path="/destinations/:id" element={<React.Suspense fallback={<div className="pt-24 min-h-screen bg-slate-50"></div>}><DestinationDetail /></React.Suspense>} />
                  <Route path="/special-offers" element={<React.Suspense fallback={<div className="pt-24 min-h-screen bg-slate-50"></div>}><SpecialOffers /></React.Suspense>} />
                  <Route path="/login" element={<React.Suspense fallback={null}><Login /></React.Suspense>} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
            <a
              href="https://wa.me/256783084521"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
              title="Chat on WhatsApp"
            >
              <div className="flex items-center space-x-2">
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm whitespace-nowrap">Chat with us</span>
                <MessageCircle size={28} />
              </div>
            </a>
          </div>
        </HashRouter>
      </ErrorBoundary>
    </DataProvider>
  );
};

export default App;
