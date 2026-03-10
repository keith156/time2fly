import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, ArrowLeft, Calendar, Share2, Shield, CreditCard, Send, ChevronRight, Globe, Activity, ArrowRight, Compass } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { Package } from '../types.ts';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

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
        <SEO
          title={`${selectedPackage.destination} | Time2Fly Tours`}
          description={selectedPackage.description}
          url={`https://time2flytnt.com/#/packages?pkg=${selectedPackage.id}`}
          image={selectedPackage.image}
        />
        <article className="animate-fade-in-up">
          {/* Hero Section */}
          <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
            <img
              src={selectedPackage.image}
              alt={selectedPackage.destination}
              width={1600}
              height={900}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-4xl w-full text-center">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(selectedPackage.rating) ? "#f59e0b" : "none"} className={i < Math.floor(selectedPackage.rating) ? "text-amber-500" : "text-white/30"} />
                  ))}
                </div>
                <h1 className="text-h1 text-white mb-6">
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
          <div className="max-w-7xl mx-auto px-6 section-spacing">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              {/* Left Column: Details & Itinerary */}
              <div className="lg:col-span-2 space-y-16">
                <section>
                  <h2 className="text-h2 text-slate-900 mb-8 border-b-4 border-amber-500 w-fit pb-2">The Experience</h2>
                  <p className="text-body-lg text-slate-600 mb-10 italic">
                    {selectedPackage.description}
                  </p>
                  <div className="prose prose-slate prose-xl max-w-none">
                    <div className="text-slate-700 leading-relaxed font-medium space-y-8 text-lg whitespace-pre-wrap bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm">
                      <h3 className="text-h3 text-slate-900 mb-4">Detailed Itinerary</h3>
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
                    <h4 className="text-caption text-slate-900 mb-2">Full Insurance</h4>
                    <p className="text-slate-500 text-sm font-medium">Comprehensive travel coverage included.</p>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <CreditCard className="text-amber-500 mb-4" size={32} />
                    <h4 className="text-caption text-slate-900 mb-2">Best Price</h4>
                    <p className="text-slate-500 text-sm font-medium">Guaranteed value for luxury services.</p>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <Send className="text-amber-500 mb-4" size={32} />
                    <h4 className="text-caption text-slate-900 mb-2">Expert Guide</h4>
                    <p className="text-slate-500 text-sm font-medium">Certified multilingual local experts.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-slate-950 text-white rounded-[40px] p-10 shadow-2xl border border-white/10">
                  <span className="text-caption text-amber-500 block mb-4">Premium Package</span>
                  <div className="mb-8">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Starting From</p>
                    <div className="flex items-baseline">
                      <span className="text-h1 text-white">{selectedPackage.price}</span>
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
      <SEO
        title={selectedCategory ? `${selectedCategory} | Time2Fly Tours` : "Tour Packages & Adventures | Time2Fly Tours"}
        description={selectedCategory ? `Explore our curated ${selectedCategory} packages for your next adventure.` : "Browse our collection of curated tour packages, from safari adventures to romantic retreats and family getaways."}
        url={selectedCategory ? `https://time2flytnt.com/#/packages?category=${encodeURIComponent(selectedCategory)}` : "https://time2flytnt.com/#/packages"}
      />
      <div className="bg-slate-950 pt-32 section-spacing px-4 relative overflow-hidden h-auto min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img
            src={getCategoryBanner(selectedCategory)}
            width={1920}
            height={600}
            className="w-full h-full object-cover transition-all duration-[2000ms]"
            alt="Background"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <span className="text-amber-500 font-black tracking-[0.4em] uppercase text-[14px] mb-6 block drop-shadow-lg">
            {selectedCategory || 'World Expeditions'}
          </span>
          <h1 className="text-h1 text-white mb-6">
            {selectedCategory ? `${selectedCategory}` : 'Curated Journeys'}
          </h1>
        </div>
      </div>

      {/* Category Breakdown Section (Shown when a category IS selected) */}
      {selectedCategory && (
        <div className="bg-white pt-16 pb-4 md:pt-24 md:pb-6 border-b border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 ${selectedCategory === 'Safari Adventures' || selectedCategory === 'Religious / Pilgrimage Travel' ? 'lg:grid-cols-1 gap-16' : 'lg:grid-cols-2 gap-12 lg:gap-20'} items-center`}>

              {/* Text Content */}
              <div className={`${selectedCategory === 'Safari Adventures' ? 'lg:w-2/3 mx-auto text-center' : ''}`}>
                <h2 className={`text-h2 text-slate-900 mb-8 ${selectedCategory === 'Safari Adventures' ? 'mx-auto text-center' : ''}`}>{selectedCategory}</h2>
                <div className={`space-y-6 text-slate-600 font-medium leading-relaxed text-lg ${selectedCategory === 'Safari Adventures' ? 'text-justify lg:text-center' : ''}`}>
                  {selectedCategory === 'Holiday Escapes' && (
                    <>
                      <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[14px] mb-4">Escape the Ordinary</p>
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
                      <p className="text-red-500 font-black uppercase tracking-[0.3em] text-[14px] mb-4">The Beginning of Forever</p>
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
                      <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-[14px] mb-4">Building a Shared Legacy</p>
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
                      <p className="text-slate-900 font-black uppercase tracking-[0.3em] text-[14px] mb-4">Business at the Speed of Flight</p>
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
                      <p className="text-green-600 font-black uppercase tracking-[0.3em] text-[14px] mb-4">The Earth's Primal Heartbeat</p>
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
                    <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800" width={600} height={500} className="absolute top-0 right-0 w-3/4 h-[300px] object-cover rounded-[40px] shadow-2xl z-10 hover:z-30 hover:scale-105 transition-all duration-500" alt="Holiday Beach" loading="lazy" decoding="async" />
                    <img src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=800" width={530} height={400} className="absolute bottom-0 left-0 w-2/3 h-[250px] object-cover rounded-[40px] border-8 border-white shadow-2xl z-20 hover:scale-105 transition-all duration-500" alt="Holiday City" loading="lazy" decoding="async" />
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                  </div>
                )}

                {selectedCategory === 'Romantic Retreats' && (
                  <div className="flex gap-4 h-[500px] p-4 bg-red-50/50 rounded-full border border-red-100">
                    <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=600" width={300} height={500} className="w-1/2 h-full object-cover rounded-l-full rounded-r-3xl shadow-lg hover:w-3/5 transition-all duration-700" alt="Romantic Dinner" loading="lazy" decoding="async" />
                    <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600" width={300} height={500} className="w-1/2 h-full object-cover rounded-r-full rounded-l-3xl shadow-lg hover:w-3/5 transition-all duration-700" alt="Couple on Beach" loading="lazy" decoding="async" />
                  </div>
                )}

                {selectedCategory === 'Family Getaways' && (
                  <div className="relative w-full h-[500px]">
                    <div className="absolute top-0 left-10 w-48 h-56 p-3 bg-white shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
                      <img src="https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&q=80&w=400" width={400} height={500} className="w-full h-full object-cover" alt="Family Safari" loading="lazy" decoding="async" />
                    </div>
                    <div className="absolute top-20 right-0 w-64 h-48 p-3 bg-white shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                      <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600" width={400} height={400} className="w-full h-full object-cover" alt="Family Beach" loading="lazy" />
                    </div>
                    <div className="absolute bottom-10 left-1/4 w-56 h-64 p-3 bg-white shadow-2xl transform shadow-blue-900/10 rotate-3 hover:rotate-0 transition-transform duration-300 z-30">
                      <img src="https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=800" width={400} height={600} className="w-full h-full object-cover" alt="Family Walking" loading="lazy" decoding="async" />
                    </div>
                  </div>
                )}

                {selectedCategory === 'Business Travel' && (
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
                    <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600" width={300} height={300} className="w-full h-full object-cover rounded-tl-[60px] rounded-br-[20px]" alt="Corporate Plane" loading="lazy" decoding="async" />
                    <div className="bg-slate-900 rounded-tr-[60px] rounded-bl-[20px] rounded-br-[20px] p-8 flex flex-col justify-center text-white">
                      <span className="text-amber-500 font-black text-4xl mb-2">15%</span>
                      <span className="text-xs uppercase tracking-widest font-bold opacity-80">Average Corporate Savings</span>
                    </div>
                    <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=600" width={600} height={400} className="w-full h-full object-cover rounded-bl-[60px] rounded-tr-[20px] rounded-tl-[20px] col-span-2" alt="Corporate Meeting" loading="lazy" decoding="async" />
                  </div>
                )}

                {selectedCategory === 'Religious / Pilgrimage Travel' && (
                  <div className="relative w-full h-[400px] mt-8 rounded-[40px] overflow-hidden shadow-2xl group">
                    <img
                      src="https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&q=80&w=1200"
                      width={1200}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      alt="Religious site"
                      loading="lazy"
                      decoding="async"
                    />
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
                        <img
                          src="/assets/regal-african-safaris-gwZAmtRwxBI-unsplash.jpg"
                          width={1200}
                          height={500}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] object-cover rounded-[60px] shadow-2xl z-10"
                          alt="Safari Adventures"
                          loading="lazy"
                          decoding="async"
                        />
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
      <div className={`max-w-7xl mx-auto px-6 ${selectedCategory ? 'pb-24 pt-4' : 'section-spacing'}`}>
        {!selectedCategory ? (
          /* Category Cards - Shown when NO category is selected */
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-h2 text-slate-900 mb-4 uppercase tracking-tighter">Explore by Experience</h2>
              <div className="h-1 w-20 bg-red-600 mx-auto mb-6"></div>
              <p className="text-body-lg text-slate-500 italic">"Not just destinations, but journeys that define you."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                  className="group relative h-[450px] overflow-hidden rounded-[40px] cursor-pointer shadow-2xl transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,0,0,0.3)] hover:border-red-500/30 border border-transparent"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    width={400}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-x-4 bottom-4 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-2xl flex flex-col items-center text-center">
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-md">{cat.name}</h3>
                    <p className="text-[14px] font-bold text-white/70 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed mb-4">{cat.desc}</p>
                    <div className="flex items-center gap-2 text-white font-black text-[14px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      Explore Experience <ArrowRight size={14} className="text-red-500" />
                    </div>
                  </div>

                  {/* Red accent glow in corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TourPackages;

