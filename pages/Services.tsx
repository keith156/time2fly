
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Map, Globe, GraduationCap, Hotel, Calendar,
  Plane, Shield, FileCheck, BookOpen,
  ArrowRight, CheckCircle, ChevronRight, Star
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'tours',
    label: 'Tours',
    tagline: 'Curated Experiences',
    headline: 'Explore the World,\nYour Way',
    description:
      'From gorilla tracking in Bwindi to cultural city breaks — our tour specialists craft unforgettable journeys tailored to every traveller.',
    accentColor: '#e63946',       // red
    gradientFrom: '#0a0a2e',
    gradientTo: '#0000ff18',
    glowColor: 'rgba(230,57,70,0.2)',
    blueGlow: 'rgba(0,0,255,0.12)',
    bgImage:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=2000',
    services: [
      {
        icon: <Map size={28} />,
        title: 'Tour Packages',
        subtitle: 'Guided & Self-Drive',
        description:
          'Handpicked multi-day tours across Africa and beyond. Safari, cultural, and adventure packages for every budget.',
        perks: ['Expert local guides', 'All-inclusive options', 'Group & private tours'],
      },
      {
        icon: <Globe size={28} />,
        title: 'Holiday Packages',
        subtitle: 'Beach, City & Retreat',
        description:
          'Escape to paradise with our curated holiday bundles — flights, hotels, and activities all in one seamless package.',
        perks: ['Flight + hotel combos', 'Family-friendly options', 'Honeymoon specials'],
      },
      {
        icon: <GraduationCap size={28} />,
        title: 'Educational Tours',
        subtitle: 'Learn While You Travel',
        description:
          'Enriching study tours for schools, universities, and corporate teams — combining education with real-world exploration.',
        perks: ['School & university groups', 'Cultural immersion', 'Certified itineraries'],
      },
      {
        icon: <Hotel size={28} />,
        title: 'Hotel Reservations',
        subtitle: 'Comfort Guaranteed',
        description:
          'Access to thousands of hotels worldwide — from budget lodges to 5-star luxury resorts, all at competitive rates.',
        perks: ['Best rate guarantee', 'Instant confirmation', 'Loyalty perks'],
      },
      {
        icon: <Calendar size={28} />,
        title: 'Itinerary Management',
        subtitle: 'Seamless Planning',
        description:
          'We build detailed, day-by-day travel plans so you can focus on the experience, not the logistics.',
        perks: ['Custom day-by-day plans', 'Real-time adjustments', '24/7 support'],
      },
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    tagline: 'Seamless Logistics',
    headline: 'Every Detail,\nHandled for You',
    description:
      'From booking your first flight to securing your visa — our travel experts handle every logistical detail so your journey is stress-free.',
    accentColor: '#f4a261',       // amber/orange
    gradientFrom: '#0a0a2e',
    gradientTo: '#0000ff18',
    glowColor: 'rgba(244,162,97,0.2)',
    blueGlow: 'rgba(0,0,255,0.15)',
    bgImage:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000',
    services: [
      {
        icon: <Plane size={28} />,
        title: 'Reservations & Ticketing',
        subtitle: 'Local, Regional & International',
        description:
          'Instant flight reservations and ticketing across all major airlines — domestic, regional, and international routes.',
        perks: ['All major airlines', '24hr emergency bookings', 'Frequent flyer assistance'],
      },
      {
        icon: <Globe size={28} />,
        title: 'Flight Booking',
        subtitle: 'Best Fares, Every Time',
        description:
          'We search across hundreds of airlines to find you the best available fares, with flexible date options and seat selection.',
        perks: ['Fare comparison', 'Flexible rebooking', 'Business & economy'],
      },
      {
        icon: <Shield size={28} />,
        title: 'Travel Insurance',
        subtitle: 'Travel with Confidence',
        description:
          'Comprehensive travel insurance plans covering medical emergencies, trip cancellations, lost luggage, and more.',
        perks: ['Medical coverage', 'Trip cancellation', 'Lost baggage protection'],
      },
      {
        icon: <FileCheck size={28} />,
        title: 'Visa & Passport Assistance',
        subtitle: 'Hassle-Free Documentation',
        description:
          'Expert guidance on visa applications, passport renewals, and all travel documentation requirements for any destination.',
        perks: ['Visa application support', 'Passport renewals', 'Document verification'],
      },
    ],
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

const ServiceCard: React.FC<{
  service: (typeof categories)[0]['services'][0];
  accent: string;
  index: number;
}> = ({ service, accent, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 80}ms`,
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      className={`group relative bg-white/5 backdrop-blur-sm border rounded-[32px] p-8 flex flex-col gap-5 overflow-hidden transition-all duration-700 hover:bg-white/10 hover:scale-[1.02] hover:shadow-2xl cursor-default
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px -20px ${accent}` }}
      />

      {/* Number */}
      <span
        className="absolute top-6 right-7 text-[11px] font-black tracking-widest opacity-20 group-hover:opacity-60 transition-opacity"
        style={{ color: accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${accent}22`, color: accent }}
      >
        {service.icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{ color: accent }}>
          {service.subtitle}
        </p>
        <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-3">
          {service.title}
        </h3>
        <p className="text-slate-400 text-sm font-medium leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Perks */}
      <ul className="space-y-2 pt-4" style={{ borderTop: '1px solid rgba(0,0,255,0.2)' }}>
        {service.perks.map((perk, i) => (
          <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wide">
            <CheckCircle size={13} style={{ color: accent }} className="shrink-0" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tours' | 'travel'>('tours');
  const cat = categories.find(c => c.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* ── Hero / Tab Switcher ─────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-0">

        {/* Animated background image — fades between tabs */}
        {categories.map(c => (
          <div
            key={c.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeTab === c.id ? 1 : 0 }}
          >
            <img
              src={c.bgImage}
              alt={c.label}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, #00008b99 0%, ${c.gradientFrom}cc 40%, #0000ff11 70%, #0a0a0f 100%)`,
              }}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span
            className="inline-block text-[10px] font-black uppercase tracking-[0.4em] mb-6 px-4 py-2 rounded-full border"
            style={{ color: cat.accentColor, borderColor: `${cat.accentColor}44`, background: `${cat.accentColor}11` }}
          >
            {cat.tagline}
          </span>

          <h1
            key={activeTab}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 whitespace-pre-line animate-fade-in-up"
          >
            {cat.headline}
          </h1>

          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            {cat.description}
          </p>

          {/* Tab Pills */}
          <div className="inline-flex backdrop-blur-md rounded-full p-1.5 gap-1" style={{ background: 'rgba(0,0,255,0.12)', border: '1px solid rgba(0,0,255,0.3)' }}>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id as 'tours' | 'travel')}
                className="relative px-10 py-3 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300"
                style={
                  activeTab === c.id
                    ? { background: c.accentColor, color: '#fff', boxShadow: `0 0 30px -5px ${c.accentColor}` }
                    : { color: 'rgba(255,255,255,0.6)' }
                }
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 mt-12 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────────── */}
      <section
        className="py-24 relative"
        style={{ background: 'linear-gradient(to bottom, #0a0a0f, #00001a, #0a0a0f)' }}
      >
        {/* Blue ambient base */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,0,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,0,255,0.06) 0%, transparent 60%)' }} />
        {/* Accent ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: cat.glowColor, opacity: 0.35 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Category label strip */}
          <div className="flex items-center gap-4 mb-14">
            <div className="h-px flex-1 bg-white/10" />
            <span
              className="text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full border"
              style={{ color: cat.accentColor, borderColor: `${cat.accentColor}44`, background: `${cat.accentColor}11` }}
            >
              {cat.label} Services
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Cards */}
          <div
            key={activeTab}
            className={`grid gap-6 ${cat.services.length === 5
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2'
              }`}
          >
            {cat.services.map((svc, i) => (
              <ServiceCard
                key={svc.title}
                service={svc}
                accent={cat.accentColor}
                index={i}
              />
            ))}

            {/* CTA Card */}
            <div
              className="relative rounded-[32px] p-8 flex flex-col justify-between overflow-hidden group cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${cat.accentColor}22, ${cat.accentColor}44)`, border: `1px solid ${cat.accentColor}44` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${cat.accentColor}33, ${cat.accentColor}66)` }}
              />
              <div className="relative z-10">
                <Star size={32} style={{ color: cat.accentColor }} className="mb-6" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-3">
                  Need a Custom Solution?
                </h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  Our experts will craft a bespoke package tailored exactly to your needs and budget.
                </p>
              </div>
              <Link
                to="/contact"
                className="relative z-10 mt-8 inline-flex items-center gap-3 font-black uppercase tracking-widest text-xs text-white group-hover:gap-5 transition-all"
              >
                Talk to an Expert <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Switch Category Banner ──────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(0,0,255,0.2)', background: 'rgba(0,0,255,0.04)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          {(() => {
            const other = categories.find(c => c.id !== activeTab)!;
            return (
              <>
                <p className="font-bold uppercase tracking-widest text-xs mb-6" style={{ color: 'rgba(0,0,255,0.6)' }}>
                  Also explore our {other.label} services
                </p>
                <button
                  onClick={() => setActiveTab(other.id as 'tours' | 'travel')}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm text-white transition-all"
                  style={{ border: '1px solid rgba(0,0,255,0.35)', background: 'rgba(0,0,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,255,0.18)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,255,0.08)')}
                >
                  View {other.label} Services <ChevronRight size={16} />
                </button>
              </>
            );
          })()}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ borderTop: '1px solid rgba(0,0,255,0.2)' }}>
        {/* Blue + red dual glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(230,57,70,0.1) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-4 block">
            Ready to Travel?
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Let's Plan Your <span className="text-red-600">Perfect Trip</span>
          </h2>
          <p className="text-slate-400 font-medium text-lg mb-10 leading-relaxed">
            Whether it's a weekend getaway or a month-long expedition — our team is ready to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-amber-500 text-white font-black px-10 py-5 rounded-full transition-all shadow-xl shadow-red-900/30 uppercase tracking-widest text-sm"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black px-10 py-5 rounded-full transition-all uppercase tracking-widest text-sm"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
