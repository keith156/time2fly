import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, Search, ArrowLeft, Calendar, Share2, Shield, CreditCard, Send } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { Package } from '../types.ts';
import { Link } from 'react-router-dom';

const TourPackages: React.FC = () => {
  const { packages, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Scroll to top when a package is selected
  useEffect(() => {
    if (selectedPackage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPackage]);

  const filteredPackages = packages.filter(pkg =>
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              loading="lazy"
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
                <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                  {selectedPackage.destination}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-sm font-black uppercase tracking-widest">
                  <span className="flex items-center bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
                    <Clock size={18} className="mr-2 text-amber-500" /> {selectedPackage.duration}
                  </span>
                  <span className="flex items-center bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
                    <MapPin size={18} className="mr-2 text-amber-500" /> Premium Tour
                  </span>
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
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-4 border-amber-500 w-fit pb-2">The Experience</h2>
                  <p className="text-slate-600 text-2xl font-medium leading-relaxed mb-10 italic">
                    {selectedPackage.description}
                  </p>
                  <div className="prose prose-slate prose-xl max-w-none">
                    <div className="text-slate-700 leading-relaxed font-medium space-y-8 text-lg whitespace-pre-wrap bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm">
                      <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-4">Detailed Itinerary</h3>
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

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="bg-slate-950 py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Background" loading="lazy" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-amber-500 font-black tracking-widest uppercase text-xs mb-4 block">World Expeditions</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">Curated Journeys</h1>
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={24} />
            <input
              type="text"
              placeholder="Search your next horizon..."
              className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xl transition-all placeholder:text-white/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group flex flex-col h-full">
              <div
                className="relative h-80 overflow-hidden cursor-pointer"
                onClick={() => setSelectedPackage(pkg)}
              >
                <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur-md px-6 py-2 rounded-full flex items-center text-white font-black text-[10px] uppercase tracking-widest shadow-xl">
                  {pkg.duration}
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center text-amber-600 font-black text-sm shadow-xl">
                  <Star size={14} fill="#f59e0b" className="mr-1.5" />
                  {pkg.rating}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <span className="text-white font-black uppercase tracking-widest text-xs flex items-center">
                    View Experience <ArrowLeft size={14} className="ml-2 rotate-180" />
                  </span>
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  <MapPin size={14} className="mr-2" />
                  Exclusive Selection
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-none">{pkg.destination}</h3>
                <p className="text-slate-500 mb-8 line-clamp-2 font-medium text-base leading-relaxed flex-grow">
                  {pkg.description}
                </p>
                <div className="flex flex-col gap-6 mt-auto pt-8 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-black tracking-[0.2em] mb-1">Package Price</span>
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">${pkg.price}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="text-amber-600 font-black text-[10px] uppercase tracking-widest hover:text-slate-950 transition-colors border-b-2 border-amber-500/30 pb-1"
                    >
                      View Itinerary
                    </button>
                  </div>
                  <Link to="/contact" className="block w-full text-center bg-slate-950 hover:bg-amber-500 text-white py-5 rounded-[24px] font-black transition-all shadow-xl shadow-slate-950/10 active:scale-95 uppercase tracking-widest text-xs">
                    Book This Voyage
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filteredPackages.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-400 text-2xl font-black uppercase tracking-tighter mb-4">No horizons found</p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-amber-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPackages;