import React from 'react';
import { Briefcase, Globe, Shield, Zap, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const CorporateTravel: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <SEO
                title="Corporate Travel Solutions | Time2Fly Tours"
                description="Optimizing business travel for performance, cost, and efficiency. Enjoy exclusive corporate rates and 24/7 global support."
                url="https://time2flytnt.com/#/corporate-travel"
            />
            <div className="bg-slate-900 py-24 px-4 relative">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden">
                    <Briefcase size={600} className="text-white" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-caption text-blue-500 mb-4 block">Corporate Excellence</span>
                    <h1 className="text-h1 text-white mb-8">Strategic Travel Solutions</h1>
                    <p className="text-body-lg text-white/70 max-w-2xl mx-auto">Optimizing business travel for performance, cost, and efficiency.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100">
                            <h2 className="text-h2 text-slate-900 mb-6">Why Modern Businesses Choose Time2Fly</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <TrendingUp className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-caption text-slate-900 mb-1">Cost Management</h4>
                                        <p className="text-body text-slate-500">Exclusive corporate rates and transparent reporting to keep budgets in check.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Globe className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-caption text-slate-900 mb-1">Global Network</h4>
                                        <p className="text-body text-slate-500">Access to 24/7 support across all time zones and preferred airline status.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Shield className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-caption text-slate-900 mb-1">Duty of Care</h4>
                                        <p className="text-body text-slate-500">Real-time alerts and comprehensive insurance for employee peace of mind.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h3 className="text-h3 text-slate-900 mb-8">Elevating Business Travel Beyond Boundaries</h3>
                        <p className="text-body-lg text-slate-600 mb-10 italic">"We don't just book flights; we manage your company's most valuable asset—your people's time."</p>
                        <ul className="grid grid-cols-2 gap-6 mb-10">
                            <li className="flex items-center gap-3 text-caption text-slate-900"><Zap size={16} className="text-blue-600" /> Fast Booking</li>
                            <li className="flex items-center gap-3 text-caption text-slate-900"><Users size={16} className="text-blue-600" /> Group Travel</li>
                            <li className="flex items-center gap-3 text-caption text-slate-900"><Shield size={16} className="text-blue-600" /> VIP Concierge</li>
                            <li className="flex items-center gap-3 text-caption text-slate-900"><Globe size={16} className="text-blue-600" /> Multi-City</li>
                        </ul>
                        <Link to="/contact" className="block w-fit bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all">Request Corporate Profile</Link>
                    </div>
                </div>

                <div className="text-center py-20 bg-blue-600 rounded-[60px] text-white">
                    <h3 className="text-h3 text-white mb-4">Ready to Optimize Your Travel?</h3>
                    <p className="text-body-lg text-white/80 mb-10 max-w-xl mx-auto">Join 50+ leading organizations who trust Time2Fly for their corporate missions.</p>
                    <div className="flex justify-center gap-8">
                        <div className="text-center">
                            <div className="text-h1 text-white mb-1">98%</div>
                            <div className="text-caption text-white/60">Satisfaction</div>
                        </div>
                        <div className="text-center border-l border-white/20 pl-8">
                            <div className="text-h1 text-white mb-1">15%</div>
                            <div className="text-caption text-white/60">Avg. Savings</div>
                        </div>
                        <div className="text-center border-l border-white/20 pl-8">
                            <div className="text-h1 text-white mb-1">24/7</div>
                            <div className="text-caption text-white/60">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateTravel;

