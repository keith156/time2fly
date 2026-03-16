import React from 'react';
import { Shield, Sparkles, Map, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const LuxurySafari: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#fafaf5]">
            <SEO
                title="Luxury Safari Experiences | Time2Fly Tours"
                description="Experience the heart of the savannah with unparalleled comfort. Stay in exclusive 5-star lodges with private trackers on our luxury safaris in Uganda and East Africa."
                keywords="luxury safari Uganda, 5-star safari lodges, private safari tours, Serengeti luxury safari, Masai Mara elite expeditions, Bwindi gorilla tracking luxury"
                url="https://time2flytnt.com/#/luxury-safari"
            />
            <div className="h-[70vh] relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1516422317582-c4a0ebd2562d?auto=format&fit=crop&q=80&w=2000"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                    alt="Luxury Safari"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-4xl text-center">
                        <span className="text-caption text-amber-500 mb-6 block">Elite Expeditions</span>
                        <h1 className="text-h1 text-white mb-8">Luxury Safari Experiences</h1>
                        <p className="text-body-lg text-white/90 max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">The wild meets the refined. Experience the heart of the savannah with unparalleled comfort.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
                    <div className="space-y-8">
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-900 text-caption">Premium Selection</div>
                            <h2 className="text-h2 text-slate-900 border-b-4 border-amber-500 w-fit pb-2">Mastering the Art of the Savannah</h2>
                            <p className="text-body-lg text-slate-600">Our luxury safaris are designed for the discerning traveler who seeks an intimate encounter with nature without compromising on style or service. Stay in exclusive lodges, enjoy gourmet dining under the stars, and let our expert trackers lead you to the most incredible wildlife moments.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <span className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-900 font-bold uppercase text-xs">
                                <Shield size={16} className="text-amber-500" /> Private Trackers
                            </span>
                            <span className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-900 font-bold uppercase text-xs">
                                <Sparkles size={16} className="text-amber-500" /> 5-Star Lodges
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=1000"
                                width={500}
                                height={625}
                                className="w-full h-full object-cover"
                                alt="Safari Detail"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <Map className="mx-auto text-amber-500" size={40} />
                            <h3 className="text-h3 text-white">Iconic Routes</h3>
                            <p className="text-body text-white/60">Pathways through the Serengeti, Masai Mara, and Bwindi.</p>
                        </div>
                        <div className="space-y-4">
                            <Clock className="mx-auto text-amber-500" size={40} />
                            <h3 className="text-h3 text-white">Perfect Timing</h3>
                            <p className="text-body text-white/60">We plan your visit to coincide with the Great Migration.</p>
                        </div>
                        <div className="space-y-4">
                            <Link to="/contact" className="h-full flex flex-col items-center justify-center p-8 bg-amber-500 hover:bg-white hover:text-slate-950 transition-all rounded-[32px] group">
                                <span className="text-h3 text-white mb-2 group-hover:text-slate-950 transition-colors">Inquire Now</span>
                                <span className="text-caption text-white/60 group-hover:text-slate-950/60 transition-colors">Custom Itineraries</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuxurySafari;

