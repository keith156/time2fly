
import React from 'react';
// Added missing Link import to fix name not found errors
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.tsx';
import { SERVICES } from '../constants.tsx';
import { Plane, Hotel, Map, Shield, Globe, Landmark, ArrowRight, Clock, Award, Compass, Ship, GraduationCap, Car, Briefcase, Zap } from 'lucide-react';

const IconMap: Record<string, any> = {
  Plane, Hotel, Map, Shield, Globe, Landmark, Zap, Ship, GraduationCap, Car, Briefcase, Clock, Award, Compass
};

const Services: React.FC = () => {
  const fullServiceList = [
    "Reservations (local, regional & international)",
    "24hours emergency reservations",
    "Frequent flyer programme assistance",
    "Ticketing services",
    "Computerised airline systems",
    "Itinerary management",
    "Water rafting & Bungee jumping",
    "Gorilla & chimpanzee tracking",
    "Visa advice and assistance",
    "Holiday travel packages",
    "Charter arrangements",
    "Pre-paid ticketing",
    "Educational Tours",
    "Travel Insurance",
    "Car Hire and Hotel"
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Clouds" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <SectionTitle
            subtitle="Our Services"
            title="Innovative Travel Management"
            description="Comprehensive solutions designed for the modern explorer, ensuring hassle-free and comfortable travels anywhere in the world."
            light={true}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, idx) => {
              const Icon = IconMap[s.icon];
              return (
                <div key={s.id} className="bg-slate-50 p-10 rounded-[48px] hover:bg-amber-500 group transition-all duration-500 border border-slate-100 hover:-translate-y-4 shadow-sm hover:shadow-2xl">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-amber-500 group-hover:text-amber-500 shadow-sm">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter group-hover:text-white transition-colors">{s.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed group-hover:text-white/90 transition-colors">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive List Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tighter text-center">Comprehensive Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {fullServiceList.map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors rounded-xl">
                  <div className="w-2 h-2 bg-amber-500 rounded-full shrink-0"></div>
                  <span className="text-slate-700 font-bold uppercase tracking-tight text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link to="/contact" className="inline-flex items-center bg-slate-950 hover:bg-amber-500 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest text-sm">
                Request a Custom Quote <ArrowRight className="ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
