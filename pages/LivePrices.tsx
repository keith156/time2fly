import React from 'react';
import { TrendingUp, ArrowLeft, RefreshCcw, Plane, Hotel, Map, CheckCircle2, User, MessageCircle, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const LivePrices: React.FC = () => {
    const { liveTickets, loading, refreshData } = useData();

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
            {/* Header / Hero Section for Live Prices */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
                            <CheckCircle2 size={12} />
                            <span>Human-Verified & Always Current</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">
                            Live <span className="text-blue-600">Prices</span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed">
                            Real-time rates for flights and tours, <span className="text-slate-900 font-bold italic">backed by real people</span>. No bots, just expert human verification.
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-200/50 transition-all border border-slate-100 group self-start md:self-center">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Live Ticket List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Current Flight Rates</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Updates every few minutes</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 animate-pulse">
                                        <div className="w-2 h-2 bg-green-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
                                        Live Now
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                        <RefreshCcw className="animate-spin text-blue-500 mb-4" size={32} />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Real-time Market Data...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {liveTickets.length > 0 ? liveTickets.map((ticket, i) => (
                                            <div key={ticket.id} className="group relative bg-white border border-slate-100 hover:border-blue-200 rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                                                            <Plane size={24} className="group-hover:rotate-45 transition-transform" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-black text-slate-900 items-center flex gap-2">
                                                                {ticket.from}
                                                                <span className="text-blue-500 text-sm">→</span>
                                                                {ticket.to}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded">Economy</span>
                                                                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-50 text-blue-600 rounded">Verified</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                                                        <div className="text-right">
                                                            <div className="text-2xl font-black text-slate-900 leading-none">
                                                                UGX {ticket.price_ugx.toLocaleString()}
                                                            </div>
                                                            <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] font-black uppercase tracking-widest ${ticket.trend === 'down' ? 'text-green-500' : ticket.trend === 'up' ? 'text-red-500' : 'text-slate-400'}`}>
                                                                {ticket.trend === 'down' ? <TrendingDown size={12} /> : ticket.trend === 'up' ? <TrendingUp size={12} /> : <Minus size={12} />}
                                                                {ticket.trend === 'down' ? 'Down 4%' : ticket.trend === 'up' ? 'Peak' : 'No Change'}
                                                            </div>
                                                        </div>

                                                        <a
                                                            href={`https://wa.me/256783084521?text=Hello! I'm interested in the live price for ${ticket.from} to ${ticket.to} at UGX ${ticket.price_ugx.toLocaleString()}. I saw this on the website and would like a real person to help me finalize this!`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 group/btn"
                                                        >
                                                            <MessageCircle size={14} className="group-hover/btn:scale-110 transition-transform" />
                                                            Secure with Agent
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-20 bg-slate-50 rounded-3xl">
                                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active tickets found. Please check back later.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    onClick={() => refreshData()}
                                    className="w-full mt-10 py-5 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-3xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    Refresh Market Feed
                                    <RefreshCcw size={16} className="text-blue-500" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
                                    <User size={20} />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Our Edge</h3>
                            </div>
                            <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-3 relative z-10">Backed By Real People</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10 font-medium">
                                Unlike automated booking sites, our prices are verified by <span className="text-white">Professional Travel Agents</span> who know the market. We find the deals bots miss.
                            </p>
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">Human Negotiation Power</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">24/7 Agent Availability</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/30 border border-blue-500/30 relative overflow-hidden group">
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                                    <MessageCircle size={24} fill="white" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight">Need a custom<br />itinerary?</h3>
                                <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed">Let our real experts craft the perfect journey for you. Skip the stress and chat with us.</p>
                                <a href="https://wa.me/256783084521" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all shadow-xl active:scale-95">
                                    Talk to a Human Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivePrices;
