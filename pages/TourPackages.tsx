import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, ArrowLeft, Calendar, Share2, Shield, CreditCard, Send, ChevronRight, Globe, Activity, ArrowRight, Compass } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { Package } from '../types.ts';
import { Link, useLocation } from 'react-router-dom';

const TourPackages: React.FC = () => {
  const { packages, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const location = useLocation();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handle deep linking from share URL and search parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pkgId = params.get('pkg');
    const searchParam = params.get('search');
    const categoryParam = params.get('category');

    if (pkgId && packages.length > 0) {
      const pkg = packages.find(p => p.id === pkgId);
      if (pkg) setSelectedPackage(pkg);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (categoryParam) {
      setSelectedCategory(categoryParam);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedCategory(null);
    }
  }, [location.search, packages]);

  // Scroll to top when a package is selected
  useEffect(() => {
    if (selectedPackage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPackage]);

  const handleShare = (e: React.MouseEvent, pkg: Package) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#/packages?pkg=${pkg.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyFeedback(pkg.id);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPackage) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        <article className="animate-fade-in-up">
          {/* Hero Section */}
          <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
            <img
              src={selectedPackage.image}
              alt={selectedPackage.destination}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-4xl w-full text-center">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="mb-8 inline-flex items-center text-amber-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors group"
                >
                  <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" />
                  Back to Destinations
                </button>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(selectedPackage.rating) ? "#f59e0b" : "none"} className={i < Math.floor(selectedPackage.rating) ? "text-amber-500" : "text-white/30"} />
                  ))}
                </div>
                <h1 className="font-black text-white uppercase tracking-tighter leading-none mb-6 text-5xl md:text-[66px]">
                  {selectedPackage.destination}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-sm font-black uppercase tracking-widest">
                  <span className="flex items-center bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
                    <Clock size={18} className="mr-2 text-amber-500" /> {selectedPackage.duration}
                  </span>
                  <span className="flex items-center bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
                    <MapPin size={18} className="mr-2 text-amber-500" /> Premium Tour
                  </span>
                  <button
                    onClick={(e) => handleShare(e, selectedPackage)}
                    className="flex items-center bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all text-amber-400 font-bold"
                  >
                    <Share2 size={18} className="mr-2" />
                    {copyFeedback === selectedPackage.id ? 'LINK COPIED!' : 'SHARE EXPERIENCE'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              {/* Left Column: Details & Itinerary */}
              <div className="lg:col-span-2 space-y-16">
                <section>
                  <h2 className="font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-4 border-amber-500 w-fit pb-2 text-4xl md:text-5xl">The Experience</h2>
                  <p className="text-slate-600 text-2xl font-medium leading-relaxed mb-10 italic">
                    {selectedPackage.description}
                  </p>
                  <div className="prose prose-slate prose-xl max-w-none">
                    <div className="text-slate-700 leading-relaxed font-medium space-y-8 text-lg whitespace-pre-wrap bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm">
                      <h3 className="text-slate-900 font-black uppercase tracking-widest mb-4 text-2xl md:text-3xl">Detailed Itinerary</h3>
                      {selectedPackage.itinerary || `
                        Day 1: Arrival & Welcome Dinner
                        Upon your arrival at the airport, our representative will greet you and transfer you to your premium hotel. Spend the afternoon at leisure before a gourmet welcome dinner.

                        Day 2: Cultural Immersion
                        Discover the hidden history of the city with a private guided tour. We visit iconic landmarks and secret spots known only to locals.

                        Day 3: Nature & Scenery
                        A full-day excursion into the surrounding landscapes. Experience the breathtaking vistas that make this destination world-famous.

                        Day 4: Culinary Delights
                        Today is dedicated to the local palate. A hands-on cooking class followed by visits to artisanal markets.

                        Day 5: Free Exploration
                        The day is yours. Whether you prefer shopping, museums, or simply relaxing by the water, our concierge is on hand to make arrangements.

                        Day 6: Final Sunset
                        A private boat or vehicle tour as the sun sets, followed by a celebratory farewell dinner under the stars.

                        Day 7: Departure
                        One final local breakfast before we transfer you back to the airport for your flight home.
                      `}
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <Shield className="text-amber-500 mb-4" size={32} />
                    <h4 className="font-black uppercase tracking-tight mb-2">Full Insurance</h4>
                    <p className="text-slate-500 text-sm font-medium">Comprehensive travel coverage included.</p>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <CreditCard className="text-amber-500 mb-4" size={32} />
                    <h4 className="font-black uppercase tracking-tight mb-2">Best Price</h4>
                    <p className="text-slate-500 text-sm font-medium">Guaranteed value for luxury services.</p>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <Send className="text-amber-500 mb-4" size={32} />
                    <h4 className="font-black uppercase tracking-tight mb-2">Expert Guide</h4>
                    <p className="text-slate-500 text-sm font-medium">Certified multilingual local experts.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-slate-950 text-white rounded-[40px] p-10 shadow-2xl border border-white/10">
                  <span className="text-amber-500 font-black uppercase tracking-widest text-[10px] block mb-4">Premium Package</span>
                  <div className="mb-8">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Starting From</p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-white tracking-tighter">${selectedPackage.price}</span>
                      <span className="text-slate-400 font-bold text-sm ml-2">/ Guest</span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Duration</span>
                      <span className="font-black text-amber-400">{selectedPackage.duration}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Availability</span>
                      <span className="font-black text-green-400">Available</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cancellation</span>
                      <span className="font-black text-slate-300 italic">Free until 48h</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="block w-full text-center bg-amber-500 hover:bg-white hover:text-slate-950 text-white py-6 rounded-2xl font-black transition-all shadow-xl hover:shadow-amber-500/20 uppercase tracking-widest mb-6"
                  >
                    Confirm Booking
                  </Link>
                  <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    SECURE RESERVATION BY TIME2FLY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  const getCategoryBanner = (category: string | null) => {
    const banners: Record<string, string> = {
      'Holiday Escapes': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000',
      'Romantic Retreats': 'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=2000',
      'Family Getaways': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000',
      'Business Travel': 'https://images.unsplash.com/photo-1551820836-39149021e90b?auto=format&fit=crop&q=80&w=2000',
      'Religious / Pilgrimage Travel': 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&q=80&w=2000',
      'Safari Adventures': '/assets/regal-african-safaris-gwZAmtRwxBI-unsplash.jpg',
      'fallback': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000'
    };
    return banners[category || 'fallback'] || banners['fallback'];
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="bg-slate-950 py-24 px-4 relative overflow-hidden h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img src={getCategoryBanner(selectedCategory)} className="w-full h-full object-cover transition-all duration-[2000ms]" alt="Background" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <span className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-6 block drop-shadow-lg">
            {selectedCategory || 'World Expeditions'}
          </span>
          <h1 className="font-black text-white mb-6 uppercase tracking-tighter leading-none drop-shadow-2xl text-5xl md:text-[66px]">
            {selectedCategory ? `${selectedCategory}` : 'Curated Journeys'}
          </h1>
        </div>
      </div>

      {/* Category Breakdown Section (Shown when a category IS selected) */}
      {selectedCategory && (
        <div className="bg-white py-16 lg:py-24 border-b border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 ${selectedCategory === 'Safari Adventures' || selectedCategory === 'Religious / Pilgrimage Travel' ? 'lg:grid-cols-1 gap-16' : 'lg:grid-cols-2 gap-12 lg:gap-20'} items-center`}>

              {/* Text Content */}
              <div className={`${selectedCategory === 'Safari Adventures' ? 'lg:w-2/3 mx-auto text-center' : ''}`}>
                <h2 className={`text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 ${selectedCategory === 'Safari Adventures' ? 'mx-auto' : ''}`}>{selectedCategory}</h2>
                <div className={`space-y-6 text-slate-600 font-medium leading-relaxed text-lg ${selectedCategory === 'Safari Adventures' ? 'text-justify lg:text-center' : ''}`}>
                  {selectedCategory === 'Holiday Escapes' && (
                    <>
                      <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Escape the Ordinary</p>
                      <p>Unwind, explore, and recharge with carefully designed leisure experiences tailored for relaxation and discovery. Our Holiday Escapes blend comfort, culture, and unforgettable scenery into seamless travel moments.</p>
                      <ul className="space-y-4 pt-6">
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Beach & Island Retreats – Zanzibar, Seychelles, Maldives</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">City Breaks – Dubai, London, Paris and global hubs</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Luxury Resort Stays & All-Inclusive Experiences</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Seasonal Specials – Christmas, Easter & Summer offers</span></li>
                      </ul>
                    </>
                  )}
                  {selectedCategory === 'Romantic Retreats' && (
                    <>
                      <p className="text-red-500 font-black uppercase tracking-[0.3em] text-xs mb-4">The Beginning of Forever</p>
                      <p>Celebrate love in unforgettable settings designed for intimacy, elegance, and shared experiences. Our Romantic Retreats are thoughtfully curated to create magical moments for couples at every stage of their journey together.</p>
                      <ul className="space-y-4 pt-6">
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-red-500 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Honeymoon Experiences – Exotic destinations for newlyweds</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-red-500 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Anniversary Getaways – Celebrate milestones in style</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-red-500 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Private Villa Escapes & Romantic Sunset Cruises</span></li>
                      </ul>
                    </>
                  )}
                  {selectedCategory === 'Family Getaways' && (
                    <>
                      <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs mb-4">Building a Shared Legacy</p>
                      <p>Create lasting memories with experiences designed for comfort, connection, and fun for all ages. Our Family Getaways combine relaxation, adventure, and child-friendly experiences to ensure every member of the family enjoys the journey.</p>
                      <ul className="space-y-4 pt-6">
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-400 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Family-Friendly Resorts with Kids' Activities</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-400 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Educational Trips – Culture, History & Learning</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-blue-400 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Multi-Room Packages & School Holiday Specials</span></li>
                      </ul>
                    </>
                  )}
                  {selectedCategory === 'Business Travel' && (
                    <>
                      <p className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs mb-4">Business at the Speed of Flight</p>
                      <p>Efficient, reliable, and professionally managed travel solutions designed to support your corporate goals. Our Business Travel services ensure seamless coordination, comfort, and punctuality for executives and teams on the move.</p>
                      <ul className="space-y-4 pt-6">
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-slate-900 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Flight Management – Economy, Business & First-Class</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-slate-900 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Corporate Accommodation – Executive Hotels & Apartments</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-slate-900 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Conference Travel & Visa Documentation Support</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-slate-900 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Executive Transfers – Airport Pickups & Ground Transport</span></li>
                      </ul>
                    </>
                  )}
                  {selectedCategory === 'Religious / Pilgrimage Travel' && (
                    <>
                      <p className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs mb-4">A Sacred Connection</p>
                      <p>Embark on a journey to the soul of the world. Our pilgrimage tours are handled with the deepest reverence, providing a sanctuary for faith, reflection, and community at the world's most holy sites.</p>
                      <p>We manage the earthly details with absolute care so you can focus entirely on the spiritual resonance of your journey.</p>
                      <ul className="space-y-4 pt-6">
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-indigo-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Sanctified & Reverent Lodging</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-indigo-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Theological & Historical Experts</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-indigo-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Dedicated Daily Devotional Spaces</span></li>
                      </ul>
                    </>
                  )}
                  {selectedCategory === 'Safari Adventures' && (
                    <>
                      <p className="text-green-600 font-black uppercase tracking-[0.3em] text-xs mb-4">The Earth's Primal Heartbeat</p>
                      <p>Connect with the raw beauty of the wild through expertly guided expeditions. Our Safari Adventures offer intimate wildlife encounters and luxury in the heart of nature.</p>
                      <ul className="space-y-4 pt-6">
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-green-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Big Five Safaris – Serengeti, Kruger & Murchison Falls</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-green-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Gorilla & Chimpanzee Tracking – Bwindi & Kibale forests</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-green-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Luxury Tented Camps – Bush stays with elite comfort</span></li>
                        <li className="flex items-center gap-4 group"><div className="w-10 h-[2px] bg-green-600 transition-all group-hover:w-16"></div> <span className="font-black uppercase tracking-widest text-xs">Hot Air Balloon Safaris – Sunrise views over the savannah</span></li>
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Bespoke Visuals per Category */}
              <div className="relative w-full h-full min-h-[400px]">
                {selectedCategory === 'Holiday Escapes' && (
                  <div className="relative w-full h-[500px]">
                    <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800" className="absolute top-0 right-0 w-3/4 h-[300px] object-cover rounded-[40px] shadow-2xl z-10 hover:z-30 hover:scale-105 transition-all duration-500" alt="Holiday Beach" />
                    <img src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=800" className="absolute bottom-0 left-0 w-2/3 h-[250px] object-cover rounded-[40px] border-8 border-white shadow-2xl z-20 hover:scale-105 transition-all duration-500" alt="Holiday City" />
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                  </div>
                )}

                {selectedCategory === 'Romantic Retreats' && (
                  <div className="flex gap-4 h-[500px] p-4 bg-red-50/50 rounded-full border border-red-100">
                    <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=600" className="w-1/2 h-full object-cover rounded-l-full rounded-r-3xl shadow-lg hover:w-3/5 transition-all duration-700" alt="Romantic Dinner" />
                    <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600" className="w-1/2 h-full object-cover rounded-r-full rounded-l-3xl shadow-lg hover:w-3/5 transition-all duration-700" alt="Couple on Beach" />
                  </div>
                )}

                {selectedCategory === 'Family Getaways' && (
                  <div className="relative w-full h-[500px]">
                    <div className="absolute top-0 left-10 w-48 h-56 p-3 bg-white shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
                      <img src="https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Family Safari" />
                    </div>
                    <div className="absolute top-20 right-0 w-64 h-48 p-3 bg-white shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                      <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Family Beach" />
                    </div>
                    <div className="absolute bottom-10 left-1/4 w-56 h-64 p-3 bg-white shadow-2xl transform shadow-blue-900/10 rotate-3 hover:rotate-0 transition-transform duration-300 z-30">
                      <img src="https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Family Walking" />
                    </div>
                  </div>
                )}

                {selectedCategory === 'Business Travel' && (
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
                    <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover rounded-tl-[60px] rounded-br-[20px]" alt="Corporate Plane" />
                    <div className="bg-slate-900 rounded-tr-[60px] rounded-bl-[20px] rounded-br-[20px] p-8 flex flex-col justify-center text-white">
                      <span className="text-amber-500 font-black text-4xl mb-2">15%</span>
                      <span className="text-xs uppercase tracking-widest font-bold opacity-80">Average Corporate Savings</span>
                    </div>
                    <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover rounded-bl-[60px] rounded-tr-[20px] rounded-tl-[20px] col-span-2" alt="Corporate Meeting" />
                  </div>
                )}

                {selectedCategory === 'Religious / Pilgrimage Travel' && (
                  <div className="relative w-full h-[400px] mt-8 rounded-[40px] overflow-hidden shadow-2xl group">
                    <img src="https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Religious site" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-center">
                      <p className="text-white font-black uppercase tracking-[0.4em] text-sm opacity-90 drop-shadow-lg">Journeys of the Spirit</p>
                    </div>
                  </div>
                )}

                {selectedCategory === 'Safari Adventures' && (
                  <div className="relative w-full h-[500px] mt-8">
                    <div className="absolute inset-0 flex justify-center items-center">
                      <div className="relative w-full h-full">
                        <img src="/assets/regal-african-safaris-gwZAmtRwxBI-unsplash.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] object-cover rounded-[60px] shadow-2xl z-10" alt="Safari Adventures" />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        {!selectedCategory ? (
          /* Category Cards - Shown when NO category is selected */
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-black text-slate-900 uppercase tracking-tighter mb-4 text-4xl md:text-5xl">Explore by Experience</h2>
              <p className="text-slate-500 font-medium text-lg italic">"Not just destinations, but journeys that define you."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Holiday Escapes', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800', desc: 'Where Every Moment is a Celebration' },
                { name: 'Romantic Retreats', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800', desc: 'The Masterclass of Romantic Privacy' },
                { name: 'Family Getaways', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', desc: 'Creating the Blueprint for Memories' },
                { name: 'Business Travel', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', desc: 'Business at the Speed of Flight' },
                { name: 'Religious / Pilgrimage Travel', img: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&q=80&w=800', desc: 'Sacred Connection to the Soul' },
                { name: 'Safari Adventures', img: '/assets/regal-african-safaris-gwZAmtRwxBI-unsplash.jpg', desc: 'Unveiling the Primal Majesty' }
              ].map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className="group relative h-[400px] overflow-hidden rounded-[48px] cursor-pointer shadow-xl hover:shadow-[#0000ff15] transition-all duration-700"
                >
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center">
                    <h3 className="font-black text-white uppercase tracking-tighter mb-2 transform group-hover:-translate-y-2 transition-transform duration-500 text-2xl md:text-3xl">{cat.name}</h3>
                    <p className="text-white/60 font-medium text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2">{cat.desc}</p>
                    <div className="mt-6 w-12 h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Filtered Packages View - Shown when a category IS selected */
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-[#0000ff] transition-colors"
              >
                <ArrowLeft size={16} /> View All Categories
              </button>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] block mb-1">Curation Results</span>
                <p className="text-slate-900 font-black uppercase text-sm tracking-widest">{filteredPackages.length} Destinations Found</p>
              </div>
            </div>

            <div className="space-y-32">
              {filteredPackages.map((pkg, idx) => {
                const isEven = idx % 2 === 0;
                const isThird = idx % 3 === 0;

                // Creating dynamic 'breakdown' highlights based on package info
                const highlights = [
                  { icon: <Clock size={16} />, text: `${pkg.duration} Carefully Planned` },
                  { icon: <Star size={16} />, text: `Top Rated Experience: ${pkg.rating}/5` },
                  { icon: <Shield size={16} />, text: 'Includes Premium Support' },
                  { icon: <Compass size={16} />, text: 'Tailored specifically for this category' }
                ];

                return (
                  <div key={pkg.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>

                    {/* Image Column - heavily customized based on index */}
                    <div className="w-full lg:w-1/2 relative group">
                      {/* Decorative background blob */}
                      <div className={`absolute -inset-4 bg-gradient-to-tr ${isEven ? 'from-amber-200/40 to-[#0000ff]/10' : 'from-[#0000ff]/20 to-red-200/40'} rounded-[60px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>

                      <div className={`relative w-full aspect-[4/5] overflow-hidden ${isThird ? 'rounded-[100px] rounded-br-sm' : isEven ? 'rounded-[40px]' : 'rounded-full'} border-[8px] border-white shadow-2xl`}>
                        <img
                          src={pkg.image}
                          alt={pkg.destination}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>

                        {/* Custom price tag on image */}
                        <div className={`absolute bottom-8 ${isEven ? 'left-8' : 'right-8'} bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-2xl border border-white/50`}>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Starting From</p>
                          <p className="text-3xl font-black text-slate-900 tracking-tighter">${pkg.price}</p>
                        </div>
                      </div>

                      {/* Floating accent elements */}
                      <div className={`absolute ${isEven ? '-right-6 top-1/4' : '-left-6 bottom-1/4'} w-24 h-24 bg-${isThird ? 'amber' : 'blue'}-500/10 rounded-full blur-xl mix-blend-multiply pointer-events-none`}></div>
                    </div>

                    {/* Text / Breakdown Column */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                          {pkg.category}
                        </span>
                        <div className="h-[2px] w-12 bg-slate-200"></div>
                      </div>

                      <h3 className="font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9] hover:text-[#0000ff] cursor-pointer transition-colors text-2xl md:text-3xl" onClick={() => setSelectedPackage(pkg)}>
                        {pkg.destination}
                      </h3>

                      <div className="relative pl-8 border-l-4 border-slate-100 mb-10">
                        <div className="absolute left-[-14px] top-2 w-6 h-6 bg-white rounded-full border-4 border-[#0000ff]"></div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">The Experience</h4>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed italic">
                          "{pkg.description}"
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 mb-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 relative z-10 flex items-center">
                          <Activity size={16} className="mr-2 text-[#0000ff]" /> The Breakdown
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                          {highlights.map((item, i) => (
                            <li key={i} className="flex items-start text-sm font-bold text-slate-600">
                              <span className="text-amber-500 mr-3 mt-0.5">{item.icon}</span>
                              <span className="leading-snug">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="flex-1 bg-[#0000ff] hover:bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-[#0000ff]/20 flex justify-center items-center"
                        >
                          Explore Details <ArrowRight size={16} className="ml-2" />
                        </button>
                        <Link
                          to="/contact"
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-colors text-center flex justify-center items-center"
                        >
                          Book Voyage
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPackages;

