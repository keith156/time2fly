
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Plane, Hotel, Map, Shield, Globe, Landmark, Quote, ArrowLeft, Calendar, MapPin, Clock, CreditCard, Send, Zap, Ship, GraduationCap, Car, Briefcase, ChevronDown, CheckCircle2, Compass, Share2, Search, DollarSign } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.tsx';
import { SERVICES, TESTIMONIALS, PARTNERS } from '../constants.tsx';
import { useData } from '../context/DataContext.tsx';
import { Package } from '../types.ts';

const IconMap: Record<string, any> = {
  Plane, Hotel, Map, Shield, Globe, Landmark, Zap, Ship, GraduationCap, Car, Briefcase, Clock
};

const AirlineLiverySeparator: React.FC = () => (
  <div className="w-full bg-white py-12 overflow-hidden flex items-center justify-center">
    <img
      src="/assets/office-separator.png"
      alt="Time2Fly Office Information"
      className="w-full max-w-7xl h-auto"
    />
  </div>
);

const Home: React.FC = () => {
  const { packages } = useData();
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const serviceTimer = setInterval(() => {
      setActiveServiceIdx((prev) => (prev + 1) % SERVICES.length);
    }, 5000);
    return () => clearInterval(serviceTimer);
  }, []);

  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

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

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const extendedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  const openGoogleFlights = () => {
    window.open('https://www.google.com/travel/flights', '_blank');
  };

  if (selectedPackage) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        <article className="animate-fade-in-up">
          <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
            <img src={selectedPackage.image} alt={selectedPackage.destination} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-4xl w-full text-center">
                <button onClick={() => setSelectedPackage(null)} className="mb-8 inline-flex items-center text-amber-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors group">
                  <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" /> Back to Discoveries
                </button>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(selectedPackage.rating) ? "#f59e0b" : "none"} className={i < Math.floor(selectedPackage.rating) ? "text-amber-500" : "text-white/30"} />
                  ))}
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">{selectedPackage.destination}</h1>
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
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              <div className="lg:col-span-2 space-y-16">
                <section>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-4 border-amber-500 w-fit pb-2">The Experience</h2>
                  <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10 italic">{selectedPackage.description}</p>
                  <div className="prose prose-slate prose-xl max-w-none">
                    <div className="text-slate-700 leading-relaxed font-medium space-y-8 text-lg whitespace-pre-wrap bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm">
                      <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-4">Journey Breakdown</h3>
                      {selectedPackage.itinerary || "Our travel experts are finalizing the daily breakdown for this premium package. Expect a perfect blend of adventure, culture, and relaxation."}
                    </div>
                  </div>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <Shield className="text-amber-500 mb-4 mx-auto" size={32} />
                    <h4 className="font-black uppercase tracking-tight mb-2">Secure</h4>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <CreditCard className="text-amber-500 mb-4 mx-auto" size={32} />
                    <h4 className="font-black uppercase tracking-tight mb-2">Value</h4>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <Send className="text-amber-500 mb-4 mx-auto" size={32} />
                    <h4 className="font-black uppercase tracking-tight mb-2">Expert</h4>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-slate-950 text-white rounded-[40px] p-10 shadow-2xl">
                  <div className="mb-8">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Total Package</p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-white tracking-tighter">${selectedPackage.price}</span>
                      <span className="text-slate-400 font-bold text-sm ml-2">/ p.p</span>
                    </div>
                  </div>
                  <Link to="/contact" className="block w-full text-center bg-amber-500 hover:bg-white hover:text-slate-950 text-white py-6 rounded-2xl font-black transition-all shadow-xl uppercase tracking-widest mb-6">Inquire Now</Link>
                  <button onClick={() => setSelectedPackage(null)} className="w-full text-center text-slate-500 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors">Go Back Home</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Redesigned Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/20 z-10"></div>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            preload="auto"
            poster="/assets/hero-fallback.png"
            key="/assets/bg-video.mp4"
            className="w-full h-full object-cover scale-105"
            onEnded={(e) => e.currentTarget.play()}
          >
            <source src="/assets/bg-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-20 w-full text-center pt-24 md:pt-32">
          <div className="animate-fade-in-up space-y-8">
            <h1 className="text-6xl md:text-[66px] font-black text-white leading-none tracking-tighter uppercase drop-shadow-2xl mb-8">
              DISCOVER <br />
              <span className="text-blue-600">MORE</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-100 font-light max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-90">
              Explore the world, <span className="font-medium">Travelling is knowledge</span>
            </p>

            <div className="flex flex-col items-center gap-8 pt-10">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/packages" className="group relative bg-red-600 hover:bg-amber-500 text-white px-10 py-4 rounded-full font-black transition-all duration-300 shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)] uppercase tracking-[0.2em] text-sm flex items-center overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    PLAN YOUR VOYAGE <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </Link>
                <Link to="/about" className="group bg-transparent hover:bg-white/10 text-white border border-white/30 px-10 py-4 rounded-full font-black transition-all duration-300 uppercase tracking-[0.2em] text-sm hover:border-amber-500 hover:text-amber-500 flex items-center">
                  <span className="group-hover:translate-x-1 transition-transform">OUR STORY</span>
                </Link>
              </div>

              <div className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
                <CheckCircle2 className="text-white" size={16} />
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Verified Agency</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Partners Section (Replaces Hybrid Feature) */}
      <section className="py-16 bg-[#0000ff] overflow-hidden border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">

          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Our Global Network</h2>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0000ff] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0000ff] to-transparent z-10 pointer-events-none"></div>

          <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-4">
            {extendedPartners.map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="inline-block px-4 shrink-0">
                <div className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-slate-200/60 p-3 w-[200px] h-32 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-full object-contain p-1"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* Featured Packages Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Curated Journeys</h2>
            <p className="text-slate-500 font-medium text-lg uppercase tracking-widest">Hand-picked experiences for the modern voyager</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.slice(0, 3).map((pkg) => (
              <div key={pkg.id} className="group bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 cursor-pointer" onClick={() => setSelectedPackage(pkg)}>
                <div className="relative h-72 overflow-hidden">
                  <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center text-amber-600 font-black text-xs uppercase tracking-widest shadow-lg">
                    <Star size={12} fill="#f59e0b" className="mr-1" /> {pkg.rating}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{pkg.destination}</h3>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{pkg.duration} • Premium Tour</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-50">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">${pkg.price}</span>
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] group-hover:underline">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/packages" className="inline-flex items-center bg-slate-950 hover:bg-amber-500 text-white px-10 py-4 rounded-full font-black transition-all shadow-xl uppercase tracking-widest text-xs group">
              View All Destinations <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-navy-900 relative overflow-hidden border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <SectionTitle title="Voices of Our Travellers" light={true} />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none"></div>
          <div className="flex whitespace-nowrap animate-marquee">
            {extendedTestimonials.map((t, i) => (
              <div key={`${t.id}-${i}`} className="inline-block px-4 w-[400px] shrink-0">
                <div className="bg-navy-800/50 backdrop-blur-md border border-navy-800 p-8 rounded-[40px] hover:border-amber-500 transition-all duration-300 group h-full flex flex-col shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIdx) => (<Star key={starIdx} size={16} fill={starIdx < t.rating ? "#f59e0b" : "none"} className={starIdx < t.rating ? "text-amber-500" : "text-slate-700"} />))}
                    </div>
                    <div className="text-red-600/30 group-hover:text-amber-500/30 transition-colors"><Quote size={32} /></div>
                  </div>
                  <p className="text-slate-100 font-medium italic mb-8 leading-relaxed whitespace-normal text-base">"{t.review}"</p>
                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-amber-500 object-cover shadow-lg" loading="lazy" />
                    <div>
                      <h4 className="text-white font-semibold uppercase tracking-tight text-base">{t.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Trusted by thousands of explorers since 2018</p>
        </div>
      </section>

      <AirlineLiverySeparator />

    </div>
  );
};

export default Home;
