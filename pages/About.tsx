
import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle.tsx';
import { Shield, Target, Award, Users, Plane, Globe, Compass, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Added React.FC type to handle the 'key' prop correctly when this component is used in a map
const AnimatedStat: React.FC<{ value: number, label: string, icon: React.ReactNode, suffix: string }> = ({ value, label, icon, suffix }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasAnimated, value]);

  return (
    <div ref={elementRef} className="text-center group">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-red-600 shadow-sm border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h4 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
        {count}{suffix}
      </h4>
      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{label}</p>
    </div>
  );
};

const About: React.FC = () => {
  const stats = [
    { label: 'Flights Booked', value: 15, suffix: 'k+', icon: <Plane size={24} /> },
    { label: 'Destinations', value: 95, suffix: '+', icon: <Globe size={24} /> },
    { label: 'Happy Travelers', value: 30, suffix: 'k+', icon: <Heart size={24} /> },
    { label: 'Years of Trust', value: 6, suffix: '+', icon: <Award size={24} /> },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center pt-24 md:pt-32 overflow-hidden bg-navy-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800/80 to-transparent z-10"></div>
          <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-40 scale-105" alt="Travel Hero" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="text-red-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Established July 2018 — Uganda</span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-4 md:mb-6 tracking-tighter">WE ARE <br /><span className="text-red-600">TIME2FLY</span></h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-xl mb-6 md:mb-8 italic">"Explore the world, Travelling is knowledge"</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/packages" className="bg-red-600 hover:bg-amber-500 text-white font-black px-8 py-4 rounded-full transition-all shadow-2xl hover:shadow-amber-500/30 uppercase tracking-widest text-xs">View Our Tours</Link>
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-red-500"><Compass className="animate-spin-slow" size={20} /></div>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">Navigating your <br /> next adventure</span>
                </div>
              </div>
            </div>
            <div className="relative mt-12 lg:mt-0">
              <div className="relative z-10 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl">
                <img src="/assets/director.jpg" className="w-full aspect-[4/5] object-cover" alt="Director" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-56 bg-red-600 p-6 rounded-[30px] shadow-2xl transform -rotate-3">
                <h3 className="text-white font-black text-xl tracking-tighter mb-1">24/7</h3>
                <p className="text-red-100 font-bold uppercase tracking-widest text-[9px]">Customized Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Description */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&q=80&w=800" className="rounded-[30px] w-full h-64 object-cover mt-8 shadow-xl hover:scale-105 transition-transform duration-500" alt="Culture" />
                <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800" className="rounded-[30px] w-full h-64 object-cover shadow-xl hover:scale-105 transition-transform duration-500" alt="Nature" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle subtitle="About Us" title="Locally Owned & Independent" centered={false} />
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-6 border-l-4 border-red-600 pl-6 py-1">
                Time2Fly Tours and Travel Limited is a locally owned independent travel agency registered under the companies act of Uganda, incorporated in July 2018.
              </p>
              <div className="space-y-4 text-slate-500 font-medium leading-relaxed text-base">
                <p>
                  We are a dedicated team focused on redefining travel management in the East African region and beyond. Since our inception, we have built a reputation for excellence, reliability, and unparalleled local expertise.
                </p>
                <p>
                  As an independent agency, we have the flexibility to offer truly unbiased advice and the most competitive rates, ensuring that every dollar you spend on your travel yields maximum value and unforgettable memories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300 group-hover:scale-110 transform">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-black text-navy-800 mb-4 uppercase tracking-tighter">Our Vision</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                To be the most innovative travel management company throughout the region, while creating a culture of service excellence and distinction.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-navy-800 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300 group-hover:scale-110 transform">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-black text-navy-800 mb-4 uppercase tracking-tighter">Our Mission</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Our mission is to see that our clients' programmes and schedules are customized to meet their unique travel requirements and ensure a hassle-free, well organized, enjoyable & comfortable travels wherever, and anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Stats - Updated with Counting Animation */}
      <section className="py-10 md:py-16 bg-white relative overflow-hidden border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-16 bg-navy-800 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 z-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="CTA" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-8 md:py-10">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-none">Your Journey <br /> <span className="text-red-500">Starts Today</span></h2>
            <p className="text-slate-400 text-base font-medium max-w-xl mx-auto mb-8 italic uppercase tracking-widest">Explore the world, Travelling is knowledge</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-red-600 hover:bg-amber-500 text-white font-black px-10 py-4 rounded-full transition-all shadow-xl uppercase tracking-widest text-xs">Get Expert Advice</Link>
              <Link to="/packages" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-black transition-all uppercase tracking-widest text-xs">Browse Packages</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
