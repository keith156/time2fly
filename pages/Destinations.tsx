import React from 'react';
import { MapPin, Globe, ArrowRight, Compass } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import SectionTitle from '../components/SectionTitle.tsx';
import { useNavigate } from 'react-router-dom';

const Destinations: React.FC = () => {
    const { destinations, loading } = useData();
    const navigate = useNavigate();

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            {/* Hero Header */}
            <div className="bg-slate-950 py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                        alt="Destinations Background"
                    />
                    <div className="absolute inset-0 bg-slate-950/65" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-amber-500 font-black tracking-widest uppercase text-xs mb-4 block">World Horizons</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">Our Destinations</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {destinations.map((dest) => (
                            <div
                                key={dest.id}
                                className="bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group flex flex-col h-full cursor-pointer"
                                onClick={() => navigate(`/destinations/${dest.id}`)}
                            >
                                <div className="relative h-96 overflow-hidden">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-10 left-10">
                                        <div className="flex items-center text-amber-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                                            <MapPin size={16} className="mr-2" />
                                            Explore
                                        </div>
                                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{dest.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* Featured Insight Section */}
            <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <SectionTitle title="Exclusive Horizons" />
                        <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10">
                            Each destination we offer is hand-picked for its unique cultural value and natural beauty. From the misty mountains of Uganda to the shimmering skyscrapers of Dubai, we ensure every trip is a masterpiece.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
                                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform"><Globe size={28} /></div>
                                <div>
                                    <h4 className="font-black uppercase tracking-tight">Global Network</h4>
                                    <p className="text-slate-500 text-sm font-medium">Partners across 40+ countries.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Travel Insight" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Destinations;
