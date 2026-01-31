
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
      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(245,158,11,0.15)_0%,_transparent_50%)] z-10 animate-pulse"></div>
          <img
            src="https://images.unsplash.com/photo-1518107616385-ad30892d294a?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-60 scale-100 animate-[kenburns_40s_ease-in-out_infinite]"
            alt="Adventure Awaits"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 lg:pr-12">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase mb-8">
                  <Compass className="w-4 h-4 mr-3 animate-spin-slow" />
                  Independent Ugandan Experts
                </span>

                <h1 className="text-5xl md:text-[90px] font-black text-white leading-[0.95] tracking-tighter mb-8 drop-shadow-2xl">
                  IT'S <br />
                  <span className="text-amber-500">TIME 2 FLY</span>
                </h1>

                <p className="text-lg md:text-2xl text-slate-300 font-bold max-w-2xl leading-tight uppercase tracking-tight italic mb-12">
                  Explore the world, <span className="text-white border-b-4 border-amber-500">Travelling is knowledge</span>
                </p>

                {/* Added mb-24 to put significant space below the hero buttons */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-24">
                  <Link to="/packages" className="group bg-amber-500 hover:bg-white text-white hover:text-slate-950 px-12 py-6 rounded-2xl font-black transition-all shadow-2xl shadow-amber-500/30 scale-100 hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-sm flex items-center">
                    Plan Your Voyage <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                          <img src={`https://picsum.photos/seed/${i + 45}/40/40`} className="w-full h-full object-cover" alt="Traveller" />
                        </div>
                      ))}
                    </div>
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                      Trusted by <br /><span className="text-white">5k+ Explorers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4 animate-fade-in-up [animation-delay:400ms]">
              <div className="col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 bg-amber-500 rounded-2xl text-white shadow-xl shadow-amber-500/20 group-hover:rotate-12 transition-transform">
                    <Globe size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Status</p>
                    <p className="text-green-400 font-black text-xs uppercase flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
                      Open for Bookings
                    </p>
                  </div>
                </div>
                <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-2">95+ Global Destinies</h3>
                <p className="text-slate-400 text-sm font-medium italic">From the Pearl of Africa to the hidden gems of Europe.</p>
              </div>

              <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 p-6 rounded-[32px] hover:bg-amber-500/20 transition-all">
                <Clock className="text-amber-500 mb-4" size={24} />
                <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">24h Support</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Emergency Services</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[32px] hover:bg-white/10 transition-all">
                <CheckCircle2 className="text-amber-500 mb-4" size={24} />
                <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">Verified</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Licensed in Uganda</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in-up [animation-delay:1000ms]">
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-4">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/10 rounded-full relative p-1">
            <div className="w-1 h-2 bg-amber-500 rounded-full mx-auto animate-[scroll-indicator_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000" alt="Traveling" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 text-white p-8 rounded-3xl shadow-xl hidden md:block max-w-[280px] border-b-8 border-amber-500">
                <h3 className="text-3xl font-black mb-1 text-amber-500 tracking-tighter uppercase">Est. 2018</h3>
                <p className="font-bold text-sm uppercase tracking-wider text-slate-300 italic">Explore the world, Travelling is knowledge</p>
              </div>
            </div>
            <div className="pl-4 lg:pl-10">
              <SectionTitle subtitle="About Time2Fly" title="Your Independent Travel Partner" centered={false} />
              <div className="space-y-8">
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  Time2Fly Tours and Travel Limited is a locally owned independent travel agency registered under the companies act of Uganda. Incorporated in July 2018, we have dedicated ourselves to creating service excellence.
                </p>
                <p className="text-slate-600 leading-relaxed font-medium text-base">
                  Our mission is to see that our clients' programmes and schedules are customized to meet their unique travel requirements and ensure a hassle-free, well organized, enjoyable and comfortable journey anywhere in the world.
                </p>
                <Link to="/about" className="group inline-flex items-center text-amber-600 font-black text-lg uppercase tracking-widest pt-4">Discover Our Story <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections preserved... */}
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
                    <div className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col lg:flex-row h-full lg:h-[480px]">
                      <div className="w-full lg:w-[45%] h-64 lg:h-full overflow-hidden relative">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/40 to-transparent"></div>
                      </div>

                      <div className="w-full lg:w-[55%] p-10 lg:p-20 flex flex-col justify-center">
                        <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mb-10 shadow-sm">
                          {Icon && <Icon size={40} />}
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-black mb-6 text-slate-900 uppercase tracking-tighter leading-none">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed mb-10 text-base lg:text-lg font-medium max-w-xl">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-6 items-center">
                          <Link
                            to="/services"
                            className="bg-slate-950 hover:bg-amber-500 text-white font-black px-8 py-4 rounded-2xl transition-all uppercase tracking-widest text-xs flex items-center shadow-lg"
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
                  className={`h-2.5 rounded-full transition-all duration-500 ${activeServiceIdx === i ? 'w-12 bg-amber-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
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
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">{pkg.duration}</div>
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-black text-sm shadow-lg">${pkg.price}</div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={16} fill={i < Math.floor(pkg.rating) ? "#f59e0b" : "none"} className={i < Math.floor(pkg.rating) ? "text-amber-500" : "text-slate-300"} />))}
                    <span className="text-slate-400 text-sm ml-2 font-bold">{pkg.rating}</span>
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900 uppercase tracking-tight">{pkg.destination}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2 font-medium flex-grow">{pkg.description}</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setSelectedPackage(pkg)} className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-[10px]">View Itinerary</button>
                    <Link to="/contact" className="w-full block text-center bg-slate-950 hover:bg-blue-700 text-white py-4 rounded-xl font-black transition-all uppercase tracking-widest text-xs">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <span className="text-amber-500 font-black tracking-widest uppercase text-sm mb-4 block">Our Reputation</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">Voices of Our Travellers</h2>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="flex whitespace-nowrap animate-marquee">
            {extendedTestimonials.map((t, i) => (
              <div key={`${t.id}-${i}`} className="inline-block px-4 w-[400px] shrink-0">
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-[40px] hover:border-amber-500/50 transition-all duration-300 group h-full flex flex-col shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIdx) => (<Star key={starIdx} size={16} fill={starIdx < t.rating ? "#f59e0b" : "none"} className={starIdx < t.rating ? "text-amber-500" : "text-slate-700"} />))}
                    </div>
                    <div className="text-amber-500/30"><Quote size={32} /></div>
                  </div>
                  <p className="text-slate-300 font-medium italic mb-8 leading-relaxed whitespace-normal text-base">"{t.review}"</p>
                  <div className="mt-auto pt-6 border-t border-slate-800/50"><h4 className="text-white font-black uppercase tracking-tight text-base">{t.name}</h4></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Trusted by thousands of explorers since 2018</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
