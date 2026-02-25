import React from 'react';
import { TrendingUp, ArrowLeft, RefreshCcw, Plane, CheckCircle2, User, MessageCircle, TrendingDown, Minus, Route, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const LivePrices: React.FC = () => {
    const { liveTickets, loading, refreshData } = useData();

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 font-sans selection:bg-blue-100">
            {/* Header / Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 bg-blue-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm">
                            <CheckCircle2 size={14} className="text-blue-500" />
                            <span>Human-Verified Market Data</span>
                        </div>
                        <h1 className="font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-6 text-6xl md:text-8xl">
                            Live Flight <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">Rates</span>
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Skip the bots. Real-time market prices from Entebbe, negotiated and verified by our professional travel agents.
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl border border-slate-100 group shrink-0">
                        <ArrowLeft size={18} className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                    {/* Live Ticket List */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <h2 className="font-black text-slate-900 uppercase tracking-tighter text-2xl md:text-3xl flex items-center gap-3">
                                <Route className="text-blue-600" size={28} />
                                Active Routes
                            </h2>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200 shadow-sm animate-pulse">
                                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                Live Now
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
                                <RefreshCcw className="animate-spin text-blue-500 mb-6" size={40} />
                                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Syncing Market Data...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {liveTickets.length > 0 ? liveTickets.map((ticket) => (
                                    <div key={ticket.id} className="group relative flex flex-col sm:flex-row bg-white rounded-[2rem] border border-slate-200/60 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 overflow-hidden">

                                        {/* Main Flight Info */}
                                        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    <Plane size={12} className="rotate-45" />
                                                    Economy Class
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    Best Match
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                {/* From */}
                                                <div className="w-[40%]">
                                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Departure</p>
                                                    <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none break-words">{ticket.from}</h3>
                                                </div>

                                                {/* Divider / Plane */}
                                                <div className="flex-1 flex flex-col items-center justify-center relative px-2">
                                                    <div className="w-full border-t-2 border-dashed border-slate-300 absolute top-1/2 -translate-y-1/2"></div>
                                                    <div className="relative z-10 bg-white px-3 text-blue-300 group-hover:text-blue-500 transition-colors">
                                                        <Plane className="w-8 h-8 rotate-45" />
                                                    </div>
                                                </div>

                                                {/* To */}
                                                <div className="w-[40%] text-right">
                                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Destination</p>
                                                    <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none break-words">{ticket.to}</h3>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Boarding Pass Divider */}
                                        <div className="relative bg-white flex items-center justify-center group-hover:border-blue-200 transition-colors">
                                            <div className="hidden sm:block w-px h-full border-l-2 border-dashed border-slate-200 group-hover:border-blue-200 transition-colors"></div>
                                            <div className="sm:hidden w-full h-px border-t-2 border-dashed border-slate-200 group-hover:border-blue-200 transition-colors"></div>

                                            {/* Cutouts for desktop */}
                                            <div className="hidden sm:block absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f8fafc] rounded-full shadow-inner border-b border-slate-200 group-hover:border-blue-200 transition-colors z-10"></div>
                                            <div className="hidden sm:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f8fafc] rounded-full shadow-inner border-t border-slate-200 group-hover:border-blue-200 transition-colors z-10"></div>

                                            {/* Cutouts for mobile */}
                                            <div className="sm:hidden absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f8fafc] rounded-full shadow-inner border-r border-slate-200 group-hover:border-blue-200 transition-colors z-10"></div>
                                            <div className="sm:hidden absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f8fafc] rounded-full shadow-inner border-l border-slate-200 group-hover:border-blue-200 transition-colors z-10"></div>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="p-6 sm:p-8 sm:w-[280px] bg-slate-50/50 flex flex-col justify-center items-center text-center">
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Estimated Live Fare</p>

                                            <div className="flex justify-center items-start text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4">
                                                <span className="text-blue-600 text-2xl mt-1 mr-1">$</span>
                                                {ticket.price_usd_min && ticket.price_usd_max ? (
                                                    <span className="whitespace-nowrap">
                                                        {ticket.price_usd_min}<span className="text-slate-300 font-light mx-1">-</span>{ticket.price_usd_max}
                                                    </span>
                                                ) : (
                                                    <span>{Math.round(ticket.price_ugx / 3800)}</span>
                                                )}
                                            </div>

                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 ${ticket.trend === 'down' ? 'bg-green-100 text-green-700' :
                                                    ticket.trend === 'up' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-200 text-slate-600'
                                                }`}>
                                                {ticket.trend === 'down' ? <TrendingDown size={14} /> : ticket.trend === 'up' ? <TrendingUp size={14} /> : <Minus size={14} />}
                                                {ticket.trend === 'down' ? 'Best Price' : ticket.trend === 'up' ? 'Peak Rates' : 'Stable Price'}
                                            </div>

                                            <a
                                                href={`https://wa.me/256783084521?text=Hello! I'm interested in the live flight price for ${ticket.from}-${ticket.to} at around $${ticket.price_usd_min ?? Math.round(ticket.price_ugx / 3800)}. I saw this on the website and would like to help finalize my booking!`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-slate-900 hover:to-slate-800 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <span>Confirm Price</span>
                                                <RefreshCcw size={14} />
                                            </a>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                                        <Plane className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No active tickets found. Please check back later.</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => refreshData()}
                                    className="w-full mt-6 py-5 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm hover:shadow-md"
                                >
                                    Refresh Market Feed
                                    <RefreshCcw size={16} className="text-blue-600" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-8 mt-12 lg:mt-0">
                        {/* "Our Edge" Card */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                                        <User className="text-blue-400" size={24} />
                                    </div>
                                    <h3 className="font-black uppercase tracking-tighter text-3xl">Our Edge</h3>
                                </div>

                                <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black uppercase tracking-widest text-[10px] rounded-lg mb-4">
                                    Backed By Real People
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                                    Unlike automated booking sites, our prices are verified by <span className="text-white font-bold">Professional Travel Agents</span> who know the market intimately. We find the hidden deals bots completely miss.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="bg-green-500/20 p-2 rounded-xl">
                                            <CheckCircle2 className="text-green-400" size={20} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-100">Human Negotiation Power</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="bg-blue-500/20 p-2 rounded-xl">
                                            <CheckCircle2 className="text-blue-400" size={20} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-100">24/7 Agent Availability</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Custom Itinerary Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40 border border-blue-500/30">
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-8">
                                    <MessageCircle size={28} className="text-white" fill="currentColor" />
                                </div>

                                <h3 className="font-black uppercase tracking-tighter text-3xl md:text-4xl leading-[1.1] mb-6">
                                    Need a custom<br />itinerary?
                                </h3>

                                <p className="text-blue-100/80 text-sm font-medium leading-relaxed mb-10">
                                    Let our real experts craft the perfect journey for you. Skip the stress, avoid the hidden fees, and chat with us directly to get started.
                                </p>

                                <a
                                    href="https://wa.me/256783084521"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full py-5 bg-white hover:bg-slate-50 text-blue-700 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-900/20 transition-all active:scale-95 group"
                                >
                                    <span>Talk to a Human Now</span>
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
