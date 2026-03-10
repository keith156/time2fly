
import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronRight, Star, Globe, Shield, Compass, Plane, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Lock, Music2, VolumeX, Volume2, Search, RefreshCcw, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';
const About = React.lazy(() => import('./pages/About'));
const TourPackages = React.lazy(() => import('./pages/TourPackages'));
const Services = React.lazy(() => import('./pages/Services'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const Destinations = React.lazy(() => import('./pages/Destinations'));
const SpecialOffers = React.lazy(() => import('./pages/SpecialOffers'));
const DestinationDetail = React.lazy(() => import('./pages/DestinationDetail'));
const LivePrices = React.lazy(() => import('./pages/LivePrices'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const BestDestinations = React.lazy(() => import('./pages/BestDestinations'));
const LuxurySafari = React.lazy(() => import('./pages/LuxurySafari'));
const CorporateTravel = React.lazy(() => import('./pages/CorporateTravel'));

import ErrorBoundary from './components/ErrorBoundary.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';
import { DataProvider, useData } from './context/DataContext';


// Type definition for Google Analytics gtag function
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    {
      name: 'Flight Prices',
      path: '#',
      children: [
        { name: 'View Flight Prices', path: '/live-prices' },
        { name: 'Book Flight', path: '/', scroll: 'flight-search' },
      ]
    },
    {
      name: 'Flights & Deals',
      path: '#',
      children: [
        { name: 'Destinations', path: '/destinations' },
        { name: 'Special Offers', path: '/special-offers' },
      ]
    },
    {
      name: 'Adventures',
      path: '#',
      children: [
        { name: 'All Adventures', path: '/packages', desc: 'Explore our full collection' },
        { name: '🏖️ Holiday Escapes', path: '/packages?category=Holiday Escapes', desc: 'Unwind and explore' },
        { name: '💖 Romantic Retreats', path: '/packages?category=Romantic Retreats', desc: 'Celebrate love' },
        { name: '👨‍👩‍👧‍👦 Family Getaways', path: '/packages?category=Family Getaways', desc: 'Memories for all ages' },
        { name: '💼 Business Travel', path: '/packages?category=Business Travel', desc: 'Efficient global mobility' },
        { name: '🐘 Safari Adventures', path: '/packages?category=Safari Adventures', desc: 'Into the wild heart' },
      ]
    },
    { name: 'Blog', path: '/blog' },
    {
      name: 'Contact',
      path: '#',
      children: [
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
  ];

  // Prefetching is now handled naturally by the browser or can be explicitly added if needed,
  // but removing the manual static prefetch function as it was redundant with lazy loading.
  const prefetchPage = (path: string) => {
    // Dynamic import to trigger prefetch
    switch (path) {
      case '/destinations': import('./pages/Destinations'); break;
      case '/packages': import('./pages/TourPackages'); break;
      case '/special-offers': import('./pages/SpecialOffers'); break;
      case '/services': import('./pages/Services'); break;
      case '/about': import('./pages/About'); break;
      case '/blog': import('./pages/Blog'); break;
      case '/contact': import('./pages/Contact'); break;
      case '/privacy-policy': import('./pages/PrivacyPolicy'); break;
      case '/best-destinations': import('./pages/BestDestinations'); break;
      case '/luxury-safari': import('./pages/LuxurySafari'); break;
      case '/corporate-travel': import('./pages/CorporateTravel'); break;
    }
  };

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
            <div className="flex flex-col">
              <div className="flex items-baseline leading-none drop-shadow-[-2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                <span className="text-[#0000ff] font-black text-xl md:text-2xl tracking-[0.05em] uppercase">TIME</span>
                <span className="text-red-500 font-black text-2xl md:text-3xl tracking-[0.05em]">2</span>
                <span className="text-[#f7c9ab] font-black text-xl md:text-2xl tracking-[0.05em] uppercase">FLY</span>
              </div>
              <span className="text-white text-[9px] uppercase tracking-[0.3em] font-bold mt-0.5 opacity-90">Tours and Travel</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 ml-auto min-w-0">
            <audio ref={audioRef as any} src="/assets/bg-audio.mpeg" loop className="hidden" />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 shrink-0"
              title={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-pulse" />}
            </button>
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.children ? (
                    <div className="flex items-center gap-1 text-white font-medium text-sm hover:text-white/80 transition-colors cursor-pointer py-2">
                      <span className="uppercase tracking-widest text-[11px] font-bold">{link.name}</span>
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 min-w-[200px] overflow-hidden">
                          {link.children.map((child: any) => (
                            child.scroll ? (
                              <button
                                key={child.name}
                                onClick={() => {
                                  if (location.pathname !== '/') {
                                    navigate('/');
                                    setTimeout(() => document.getElementById(child.scroll)?.scrollIntoView({ behavior: 'smooth' }), 500);
                                  } else {
                                    document.getElementById(child.scroll)?.scrollIntoView({ behavior: 'smooth' });
                                  }
                                  setIsOpen(false);
                                }}
                                className="block w-full text-left px-6 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all"
                              >
                                <span className="text-xs font-bold uppercase tracking-widest block">{child.name}</span>
                                {child.desc && <span className="text-[9px] text-slate-400 font-medium block truncate lowercase tracking-tight mt-0.5">{child.desc}</span>}
                              </button>
                            ) : (
                              <Link
                                key={child.name}
                                to={child.path}
                                onMouseEnter={() => prefetchPage(child.path)}
                                className="block px-6 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all"
                              >
                                <span className="text-xs font-bold uppercase tracking-widest block">{child.name}</span>
                                {child.desc && <span className="text-[9px] text-slate-400 font-medium block truncate lowercase tracking-tight mt-0.5">{child.desc}</span>}
                              </Link>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onMouseEnter={() => prefetchPage(link.path)}
                      className="text-white font-bold text-[11px] hover:text-white/80 transition-colors whitespace-nowrap uppercase tracking-widest py-2 block"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Compact inline search pill - always visible, never overflows */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-white rounded-full pl-3 pr-1 py-1 gap-2 shrink-0 border border-white/20"
            >
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400 text-xs w-20 lg:w-28 outline-none"
              />
              <button
                type="submit"
                className="font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors shrink-0 text-white hover:opacity-80"
                style={{ backgroundColor: '#0000ff' }}
              >
                GO
              </button>
            </form>

            <div className="lg:hidden flex items-center shrink-0">
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
          <div className="bg-red-600 rounded-3xl p-6 shadow-2xl border border-white/10 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name} className="space-y-2">
                {link.children ? (
                  <div className="space-y-2">
                    <div className="text-white/40 font-bold text-[10px] uppercase tracking-[0.2em] pt-4">{link.name}</div>
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-white font-bold text-lg hover:text-amber-400 transition-colors pl-4 border-l-2 border-white/10"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-white font-bold text-lg border-b border-white/10 pb-2 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
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
    <footer className="bg-[#000033] text-white section-spacing border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-4 px-4 text-center">
          <h3 className="font-bold mb-4 text-amber-500 uppercase tracking-widest text-xs max-w-2xl leading-relaxed">
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
              <span>info@time2flytnt.com</span>
            </div>
          </div>
        </div>

        {/* Social Media - Centered Row */}
        <div className="flex justify-center flex-wrap gap-4 mb-4">
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

        <div className="pt-6 border-t border-blue-700 flex flex-col items-center justify-center text-center text-white/50 text-sm font-medium gap-4">
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



const App: React.FC = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  // Fires a GA4 pageview on every route change
  const RouteTracker = () => {
    const location = useLocation();
    useEffect(() => {
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-FBJ3BGE9E0', {
          page_path: location.pathname + location.search,
          page_title: document.title
        });
      }
    }, [location]);
    return null;
  };

  return (
    <HelmetProvider>
      <DataProvider>
        <ErrorBoundary>
          <HashRouter>
            <ScrollToTop />
            <RouteTracker />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">

                <React.Suspense fallback={
                  <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/packages" element={<TourPackages />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/destinations/:id" element={<DestinationDetail />} />
                    <Route path="/special-offers" element={<SpecialOffers />} />
                    <Route path="/live-prices" element={<LivePrices />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin"
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/best-destinations" element={<BestDestinations />} />
                    <Route path="/luxury-safari" element={<LuxurySafari />} />
                    <Route path="/corporate-travel" element={<CorporateTravel />} />
                  </Routes>
                </React.Suspense>

              </main>
              <WhatsAppButton />
              <Footer />
            </div>
          </HashRouter>
        </ErrorBoundary>
      </DataProvider>
    </HelmetProvider>
  );
};

export default App;
