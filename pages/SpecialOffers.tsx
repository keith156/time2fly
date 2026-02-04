import React, { useState } from 'react';
import { Star, Clock, MapPin, Share2, ArrowRight, Shield, CreditCard, Send, Search } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { Package } from '../types.ts';
import { Link, useNavigate } from 'react-router-dom';

const SpecialOffers: React.FC = () => {
    const { packages, loading } = useData();
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
    const navigate = useNavigate();

    const starredPackages = packages.filter(pkg => pkg.is_starred);

    const handleShare = (e: React.MouseEvent, pkg: Package) => {
        e.stopPropagation();
        const shareUrl = `${window.location.origin}${window.location.pathname}#/packages?pkg=${pkg.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopyFeedback(pkg.id);
            setTimeout(() => setCopyFeedback(null), 2000);
        });
    };

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            {/* Premium Header */}
            <div className="bg-red-600 py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center scale-150">
                    <Star size={400} fill="white" className="text-white" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-white font-black tracking-widest uppercase text-xs mb-4 block bg-white/20 w-fit mx-auto px-6 py-2 rounded-full backdrop-blur-md border border-white/20">Limited Time Access</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">Special Offers</h1>
                    <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">Hand-picked premium experiences at exclusive value.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        {starredPackages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {starredPackages.map((pkg) => (
                                    <div key={pkg.id} className="bg-white rounded-[48px] overflow-hidden border-2 border-red-100 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group flex flex-col h-full relative">
                                        {/* Hot Badge */}
                                        <div className="absolute top-6 left-6 z-20 bg-red-600 text-white px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg animate-pulse">
                                            Hot Offer
                                        </div>

                                        <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => navigate(`/packages?pkg=${pkg.id}`)}>
                                            <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                                            <div className="absolute top-6 right-6 flex space-x-2 z-20">
                                                <button onClick={(e) => handleShare(e, pkg)} className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-full text-slate-900 hover:text-red-600 shadow-xl transition-all flex items-center justify-center">
                                                    {copyFeedback === pkg.id ? <span className="text-[10px] font-black uppercase">Link</span> : <Share2 size={16} />}
                                                </button>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                                <span className="text-white font-black uppercase tracking-widest text-xs">Unlock Exclusive Perks <ArrowRight size={14} className="inline ml-2" /></span>
                                            </div>
                                        </div>

                                        <div className="p-10 flex-grow flex flex-col">
                                            <div className="flex items-center text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                                <Star size={14} fill="#dc2626" className="mr-2" />
                                                Featured Experience
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-none">{pkg.destination}</h3>
                                            <p className="text-slate-500 mb-8 line-clamp-2 font-medium text-base leading-relaxed flex-grow">
                                                {pkg.description}
                                            </p>

                                            <div className="flex flex-col gap-6 mt-auto pt-8 border-t border-slate-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-[10px] text-slate-400 block uppercase font-black tracking-[0.2em] mb-1">Value Price</span>
                                                        <div className="flex items-baseline">
                                                            <span className="text-4xl font-black text-red-600 tracking-tighter">${pkg.price}</span>
                                                            <span className="text-slate-400 text-xs font-bold ml-2 line-through">${(pkg.price * 1.2).toFixed(0)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
                                                        <Clock size={14} className="text-red-600" />
                                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">{pkg.duration}</span>
                                                    </div>
                                                </div>
                                                <Link to="/contact" className="block w-full text-center bg-red-600 hover:bg-slate-950 text-white py-5 rounded-[24px] font-black transition-all shadow-xl shadow-red-600/10 active:scale-95 uppercase tracking-widest text-xs">
                                                    Claim Special Offer
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="col-span-full text-center py-32 bg-white rounded-[60px] border border-dashed border-red-200">
                                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Star className="text-red-200" size={48} />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-300 mb-4">No Seasonal Offers Available</h3>
                                <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">Our curation team is currently finalizing our next wave of exclusive travel collections. Check back soon!</p>
                                <Link to="/packages" className="text-red-600 font-bold uppercase tracking-widest text-xs border-b-2 border-red-600 pb-1 hover:text-slate-950 hover:border-slate-950 transition-all">Explore Regular Collections</Link>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Trust Badges */}
            <div className="bg-white py-16 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex items-center gap-6">
                        <Shield size={40} className="text-red-600 shrink-0" />
                        <div>
                            <h4 className="font-black uppercase tracking-tight text-sm">Secure Booking</h4>
                            <p className="text-slate-500 text-xs font-medium">Encrypted verified reservations.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <CreditCard size={40} className="text-red-600 shrink-0" />
                        <div>
                            <h4 className="font-black uppercase tracking-tight text-sm">Flexible Payment</h4>
                            <p className="text-slate-500 text-xs font-medium">Multiple ways to confirm your seat.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Send size={40} className="text-red-600 shrink-0" />
                        <div>
                            <h4 className="font-black uppercase tracking-tight text-sm">Fast Support</h4>
                            <p className="text-slate-500 text-xs font-medium">24/7 priority concierge service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffers;
