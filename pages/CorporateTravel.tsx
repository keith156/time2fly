import React from 'react';
import { Briefcase, Globe, Shield, Zap, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CorporateTravel: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="bg-slate-900 py-24 px-4 relative">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden">
                    <Briefcase size={600} className="text-white" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-blue-500 font-black tracking-widest uppercase text-xs mb-4 block">Corporate Excellence</span>
                    <h1 className="font-black text-white mb-8 uppercase tracking-tighter leading-none text-5xl md:text-7xl">Strategic Travel Solutions</h1>
                    <p className="text-white/70 text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">Optimizing business travel for performance, cost, and efficiency.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100">
                            <h2 className="font-black text-slate-900 uppercase tracking-tighter mb-6 text-4xl md:text-5xl">Why Modern Businesses Choose Time2Fly</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <TrendingUp className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1 tracking-tight">Cost Management</h4>
                                        <p className="text-slate-500 text-xs font-medium">Exclusive corporate rates and transparent reporting to keep budgets in check.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Globe className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1 tracking-tight">Global Network</h4>
                                        <p className="text-slate-500 text-xs font-medium">Access to 24/7 support across all time zones and preferred airline status.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Shield className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1 tracking-tight">Duty of Care</h4>
                                        <p className="text-slate-500 text-xs font-medium">Real-time alerts and comprehensive insurance for employee peace of mind.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h3 className="font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight text-2xl md:text-3xl">Elevating Business Travel Beyond Boundaries</h3>
                        <p className="text-slate-600 font-medium leading-relaxed mb-10 italic text-lg">"We don't just book flights; we manage your company's most valuable asset—your people's time."</p>
                        <ul className="grid grid-cols-2 gap-6 mb-10">
                            <li className="flex items-center gap-3 text-slate-900 font-bold uppercase text-[10px] tracking-widest"><Zap size={16} className="text-blue-600" /> Fast Booking</li>
                            <li className="flex items-center gap-3 text-slate-900 font-bold uppercase text-[10px] tracking-widest"><Users size={16} className="text-blue-600" /> Group Travel</li>
                            <li className="flex items-center gap-3 text-slate-900 font-bold uppercase text-[10px] tracking-widest"><Shield size={16} className="text-blue-600" /> VIP Concierge</li>
                            <li className="flex items-center gap-3 text-slate-900 font-bold uppercase text-[10px] tracking-widest"><Globe size={16} className="text-blue-600" /> Multi-City</li>
                        </ul>
                        <Link to="/contact" className="block w-fit bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all">Request Corporate Profile</Link>
                    </div>
                </div>

                <div className="text-center py-20 bg-blue-600 rounded-[60px] text-white">
                    <h3 className="font-black uppercase tracking-tighter mb-4 text-2xl md:text-3xl">Ready to Optimize Your Travel?</h3>
                    <p className="text-white/80 font-medium uppercase tracking-widest text-sm mb-10 max-w-xl mx-auto">Join 50+ leading organizations who trust Time2Fly for their corporate missions.</p>
                    <div className="flex justify-center gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-black mb-1">98%</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Satisfaction</div>
                        </div>
                        <div className="text-center border-l border-white/20 pl-8">
                            <div className="text-4xl font-black mb-1">15%</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg. Savings</div>
                        </div>
                        <div className="text-center border-l border-white/20 pl-8">
                            <div className="text-4xl font-black mb-1">24/7</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateTravel;
