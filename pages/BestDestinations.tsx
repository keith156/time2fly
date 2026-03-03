import React from 'react';
import { Star, MapPin, Globe, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestDestinations: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="bg-blue-900 py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Best Destinations" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-caption text-amber-500 mb-4 block">Explorer's Guide 2026</span>
                    <h1 className="text-h1 text-white mb-8">Best World Destinations</h1>
                    <p className="text-body-lg text-white/80 max-w-2xl mx-auto">Discover the top-rated travel spots of the year, curated by our global experts.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-h2 text-slate-900 mb-8">Uncover Hidden Gems</h2>
                        <p className="text-body-lg text-slate-600 mb-8">From the serene beaches of the Maldives to the rugged peaks of the Swiss Alps, our curated list covers the most sought-after experiences for every type of traveler. Whether you're seeking adventure, luxury, or cultural immersion, these destinations offer something truly special.</p>
                        <Link to="/packages" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all">Explore Tour Adventures</Link>
                    </div>
                    <div className="rounded-[40px] overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80&w=1000" alt="Destination View" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                        <Star className="text-amber-500 mb-6" size={32} />
                        <h3 className="text-h3 text-slate-900 mb-4">Top Rated</h3>
                        <p className="text-body text-slate-500">Destinations with the highest traveler satisfation and premium services.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                        <Compass className="text-blue-500 mb-6" size={32} />
                        <h3 className="text-h3 text-slate-900 mb-4">Unique Culture</h3>
                        <p className="text-body text-slate-500">Immersive experiences into local traditions, food, and history.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                        <Globe className="text-green-500 mb-6" size={32} />
                        <h3 className="text-h3 text-slate-900 mb-4">Sustainable Travel</h3>
                        <p className="text-body text-slate-500">Eco-friendly destinations focusing on conservation and local impact.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestDestinations;

