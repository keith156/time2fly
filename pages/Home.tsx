
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Plane, Hotel, Map, Shield, Globe, Landmark, Quote, ArrowLeft, Calendar, MapPin, Clock, CreditCard, Send, Zap, Ship, GraduationCap, Car, Briefcase, ChevronDown, CheckCircle2, Compass } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.tsx';
import { SERVICES, TESTIMONIALS } from '../constants.tsx';
import { useData } from '../context/DataContext.tsx';
import { Package } from '../types.ts';

const IconMap: Record<string, any> = {
  Plane, Hotel, Map, Shield, Globe, Landmark, Zap, Ship, GraduationCap, Car, Briefcase, Clock
};

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

  useEffect(() => {
    if (selectedPackage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPackage]);

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  if (selectedPackage) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        <article className="animate-fade-in-up">
          <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
            <img src={selectedPackage.image} alt={selectedPackage.destination} className="w-full h-full object-cover" />
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
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#002244]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#002244]/80 via-[#002244]/40 to-[#002244] z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1518107616385-ad30892d294a?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-50"
            alt="Adventure Awaits"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-20 w-full text-center">
          <div className="animate-fade-in-up space-y-8">
            <h1 className="text-6xl md:text-[66px] font-black text-white leading-none tracking-tighter uppercase drop-shadow-2xl mb-8">
              IT'S <br />
              <span className="text-red-600">TIME2FLY</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-100 font-light max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-90">
              Explore the world, <span className="border-b-2 border-red-600 pb-1 font-medium">Travelling is knowledge</span>
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

      {/* Services/About Hybrid Feature */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#002244]/5 p-10 rounded-[40px] border border-[#002244]/10 hover:shadow-2xl transition-all group">
              <Globe className="text-red-600 mb-4 group-hover:text-amber-500 transition-colors" size={24} />
              <h4 className="text-[#002244] font-black text-sm uppercase tracking-tight mb-2">95+ Global Destinies</h4>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Across 5 Continents</p>
            </div>

            <div className="bg-[#002244]/5 p-10 rounded-[40px] border border-[#002244]/10 hover:shadow-2xl transition-all group">
              <Compass className="text-[#002244] mb-4 group-hover:text-amber-500 transition-colors" size={24} />
              <h4 className="text-[#002244] font-black text-sm uppercase tracking-tight mb-2">Expert Guides</h4>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Local Knowledge</p>
            </div>

            <div className="bg-[#002244]/5 p-10 rounded-[40px] border border-[#002244]/10 hover:shadow-2xl transition-all group">
              <Shield className="text-red-600 mb-4 group-hover:text-amber-500 transition-colors" size={24} />
              <h4 className="text-[#002244] font-black text-sm uppercase tracking-tight mb-2">Secure Bookings</h4>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Peace of Mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Slider Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Our Services" title="Innovative Travel Management" description="Explore our diverse range of services, from emergency reservations to adventurous Gorilla tracking." />

          <div className="relative group overflow-hidden py-10">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeServiceIdx * 100}%)` }}
            >
              {SERVICES.map((service) => {
                const Icon = IconMap[service.icon];
                return (
                  <div key={service.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col lg:flex-row h-full lg:h-[480px] group/card">
                      <div className="w-full lg:w-[45%] h-64 lg:h-full overflow-hidden relative">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#002244]/40 to-transparent"></div>
                      </div>

                      <div className="w-full lg:w-[55%] p-10 lg:p-20 flex flex-col justify-center">
                        <div className="w-20 h-20 bg-slate-50 text-slate-900 group-hover/card:bg-amber-500 group-hover/card:text-white rounded-3xl flex items-center justify-center mb-10 shadow-sm transition-colors duration-300">
                          {Icon && <Icon size={40} />}
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-black mb-6 text-[#002244] uppercase tracking-tighter leading-none">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed mb-10 text-base lg:text-lg font-medium max-w-xl">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-6 items-center">
                          <Link
                            to="/services"
                            className="bg-[#002244] hover:bg-amber-500 text-white font-black px-8 py-4 rounded-2xl transition-all uppercase tracking-widest text-xs flex items-center shadow-lg"
                          >
                            Explore Service <ArrowRight size={16} className="ml-2" />
                          </Link>
                          <Link to="/contact" className="text-slate-400 hover:text-amber-500 font-bold uppercase tracking-widest text-[10px] transition-colors">
                            Request Quote
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-12 space-x-3">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveServiceIdx(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${activeServiceIdx === i ? 'w-12 bg-red-600' : 'w-2.5 bg-slate-300 hover:bg-amber-500'}`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>

            <div className="hidden lg:block">
              <button
                onClick={() => setActiveServiceIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-5 rounded-full shadow-2xl text-slate-400 hover:text-amber-500 transition-all border border-slate-100 hover:scale-110"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={() => setActiveServiceIdx((prev) => (prev + 1) % SERVICES.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-5 rounded-full shadow-2xl text-slate-400 hover:text-amber-500 transition-all border border-slate-100 hover:scale-110"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle subtitle="Popular Tours" title="Featured Destinations" centered={false} />
            <Link to="/packages" className="bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-900 px-8 py-4 rounded-full font-black transition-all mb-6 md:mb-12 uppercase tracking-widest text-sm shadow-sm">View All Packages</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full">
                <div className="relative h-72 overflow-hidden">
                  <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#002244]/80 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">{pkg.duration}</div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-black text-sm shadow-lg">${pkg.price}</div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={16} fill={i < Math.floor(pkg.rating) ? "#f59e0b" : "none"} className={i < Math.floor(pkg.rating) ? "text-amber-500" : "text-slate-300"} />))}
                    <span className="text-slate-400 text-sm ml-2 font-bold">{pkg.rating}</span>
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[#002244] uppercase tracking-tight">{pkg.destination}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2 font-medium flex-grow">{pkg.description}</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setSelectedPackage(pkg)} className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-[10px]">View Itinerary</button>
                    <Link to="/contact" className="w-full block text-center bg-[#002244] hover:bg-amber-500 text-white py-4 rounded-xl font-black transition-all uppercase tracking-widest text-xs shadow-xl">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#001a33] relative overflow-hidden border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <SectionTitle subtitle="Our Reputation" title="Voices of Our Travellers" light={true} />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#001a33] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#001a33] to-transparent z-10 pointer-events-none"></div>
          <div className="flex whitespace-nowrap animate-marquee">
            {extendedTestimonials.map((t, i) => (
              <div key={`${t.id}-${i}`} className="inline-block px-4 w-[400px] shrink-0">
                <div className="bg-[#002244]/50 backdrop-blur-md border border-[#002244] p-8 rounded-[40px] hover:border-amber-500 transition-all duration-300 group h-full flex flex-col shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIdx) => (<Star key={starIdx} size={16} fill={starIdx < t.rating ? "#f59e0b" : "none"} className={starIdx < t.rating ? "text-amber-500" : "text-slate-700"} />))}
                    </div>
                    <div className="text-red-600/30 group-hover:text-amber-500/30 transition-colors"><Quote size={32} /></div>
                  </div>
                  <p className="text-slate-100 font-medium italic mb-8 leading-relaxed whitespace-normal text-base">"{t.review}"</p>
                  <div className="mt-auto pt-6 border-t border-white/10"><h4 className="text-white font-black uppercase tracking-tight text-base">{t.name}</h4></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Trusted by thousands of explorers since 2018</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
