
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Plane, Lock, Music2 } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TourPackages from './pages/TourPackages';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { DataProvider } from './context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#001a33] rounded-full px-6 py-2 flex items-center justify-between shadow-2xl border border-white/10">
          <Link to="/" className="flex items-center space-x-3 shrink-0 group">
            <img
              src="/assets/logo.png"
              alt="Time2Fly Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-white font-black text-xl md:text-2xl tracking-tight">Time2Fly</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 ml-auto mr-8">
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

          <div className="hidden md:flex items-center bg-white rounded-full p-1 pl-4 shrink-0 w-48 lg:w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none focus:outline-none text-slate-400 text-sm w-full outline-none"
            />
            <button className="bg-[#001a33] text-white p-2 rounded-full hover:bg-slate-900 transition-colors">
              <span className="flex items-center justify-center">
                <Menu size={16} />
              </span>
            </button>
          </div>

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
        <div className="bg-[#001a33] rounded-3xl p-6 shadow-2xl border border-white/10 space-y-4">
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
            <div className="bg-white rounded-full p-1 pl-4 flex items-center">
              <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none text-slate-400 text-sm w-full outline-none" />
              <button className="bg-[#001a33] text-white p-2 rounded-full"><Menu size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001a33] text-white pt-20 pb-10 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <img src="/assets/logo.png" alt="Time2Fly Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
            </div>
            <p className="text-slate-400 mb-4 leading-relaxed font-medium">
              Time2Fly Tours & Travel Ltd. Locally owned independent agency registered in Uganda. Established 2018.
            </p>
            <p className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-8 italic">
              Explore the world, Travelling is knowledge
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/timetofly.ug/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:bg-blue-600 transition-all hover:-translate-y-1"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/time2fly06/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:bg-pink-600 transition-all hover:-translate-y-1"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@time2fly06" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:bg-slate-700 transition-all hover:-translate-y-1"><Music2 size={18} /></a>
              <a href="https://ug.linkedin.com/company/time2fly06" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:bg-blue-700 transition-all hover:-translate-y-1"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-500 uppercase tracking-widest text-xs">Quick Links</h3>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Time2Fly</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Our Services</Link></li>
              <li><Link to="/packages" className="hover:text-amber-400 transition-colors">Tour Packages</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Travel Journal</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-500 uppercase tracking-widest text-xs">Our Expertise</h3>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Reservations</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Wildlife Tracking</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Educational Tours</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Visa Assistance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-500 uppercase tracking-widest text-xs">Reach Us</h3>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li className="flex items-center space-x-3">
                <MapPin size={20} className="text-amber-500 flex-shrink-0" />
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span>+256 759 243 331</span>
                  <span>+256 757 717 302</span>
                  <span>+256 783 084 521</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-amber-500 flex-shrink-0" />
                <span>time2fly06@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-medium gap-4">
          <p>© {new Date().getFullYear()} Time2Fly Tours & Travel Ltd. All rights reserved.</p>
          <Link to="/login" className="flex items-center space-x-1 hover:text-amber-500 transition-colors">
            <Lock size={14} />
            <span>Admin Login</span>
          </Link>
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

  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/packages" element={<TourPackages />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
};

export default App;
