import React from 'react';
import { TrendingUp, ArrowLeft, RefreshCcw, Plane, CheckCircle2, User, MessageCircle, TrendingDown, Minus } from 'lucide-react';
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
                            <span>Verified Prices & Real-Time Data</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">
                            Live Flight <span className="text-blue-600">Rates</span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed">
                            Check today's real-time flight prices from Entebbe, backed by our professional travel experts.
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-slate-200/50 transition-all border border-slate-100 group self-start md:self-center">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Live Ticket List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-4 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10 px-2 sm:px-0">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Market Overview</h2>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                                        Live Feed
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                        <RefreshCcw className="animate-spin text-blue-500 mb-4" size={32} />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Market Rates...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {liveTickets.length > 0 ? liveTickets.map((ticket) => (
                                            <div key={ticket.id} className="group bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-10 transition-all hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10">
                                                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">

                                                    {/* Destination Logic */}
                                                    <div className="flex-grow min-w-0">
                                                        <div className="flex items-start gap-4 sm:gap-6">
                                                            <div className="hidden sm:flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                                                                <Plane size={28} className="rotate-0 group-hover:rotate-12 transition-transform duration-500" />
                                                            </div>
                                                            <div className="min-w-0 flex-grow">
                                                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
                                                                    <div className="flex flex-col min-w-0 flex-shrink">
                                                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Origin</span>
                                                                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter truncate">{ticket.from}</h3>
                                                                    </div>
                                                                    <div className="hidden sm:flex items-center gap-3 px-4 text-slate-200">
                                                                        <div className="w-8 h-[2px] bg-current rounded-full"></div>
                                                                        <TrendingUp size={14} className="text-blue-500/50" />
                                                                        <div className="w-8 h-[2px] bg-current rounded-full"></div>
                                                                    </div>
                                                                    <div className="flex flex-col min-w-0 flex-shrink">
                                                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Destination</span>
                                                                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter truncate">{ticket.to}</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-wrap items-center gap-3">
                                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1.5 bg-slate-100 rounded-lg">Economy Class</span>
                                                                    <span className="flex items-center gap-1.5 text-blue-600 font-black text-[9px] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                                                        <CheckCircle2 size={12} />
                                                                        Market Verified
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Pricing Section */}
                                                    <div className="flex flex-col sm:flex-row items-center gap-8 xl:pl-8 xl:border-l-2 xl:border-slate-50">
                                                        <div className="text-center sm:text-right w-full sm:w-auto min-w-fit">
                                                            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5">Estimated Fare</div>
                                                            <div className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight tabular-nums flex items-center justify-center sm:justify-end gap-1.5">
                                                                {ticket.price_usd_min && ticket.price_usd_max ? (
                                                                    <>
                                                                        <span className="text-blue-600">$</span>
                                                                        <span>{ticket.price_usd_min}</span>
                                                                        <span className="text-slate-300 mx-1 text-2xl">-</span>
                                                                        <span className="text-blue-600">$</span>
                                                                        <span>{ticket.price_usd_max}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span className="text-blue-600">$</span>
                                                                        {Math.round(ticket.price_ugx / 3800)}
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${ticket.trend === 'down' ? 'bg-green-50 text-green-600 border-green-100' :
                                                                    ticket.trend === 'up' ? 'bg-red-50 text-red-500 border-red-100' :
                                                                        'bg-slate-50 text-slate-400 border-slate-100'
                                                                }`}>
                                                                {ticket.trend === 'down' ? <TrendingDown size={14} /> : ticket.trend === 'up' ? <TrendingUp size={14} /> : <Minus size={14} />}
                                                                {ticket.trend === 'down' ? 'Best Deal' : ticket.trend === 'up' ? 'Peak Season' : 'Stable Feed'}
                                                            </div>
                                                        </div>

                                                        <a
                                                            href={`https://wa.me/256783084521?text=Hello! I'm interested in the live price for ${ticket.from}-${ticket.to} at around $${ticket.price_usd_min ?? Math.round(ticket.price_ugx / 3800)}. I saw this on the website and would like to finalize my booking with an agent!`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-blue-600/20 active:scale-95 whitespace-nowrap"
                                                        >
                                                            Confirm Price
                                                            <RefreshCcw size={16} />
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
                                    className="w-full mt-10 py-5 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-3xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
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
                                <h3 className="text-xl font-bold uppercase tracking-tight">Expert Advisory</h3>
                            </div>
                            <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-3 relative z-10">Backed By Real People</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10 font-medium">
                                Our prices are verified by professional travel agents who find the best deals manually.
                            </p>
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">Manual Negotiation</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden group">
                            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 relative z-10">Custom Itinerary?</h3>
                            <p className="text-white/80 text-sm font-medium mb-8 relative z-10">Let our experts craft the perfect journey for you.</p>
                            <a href="https://wa.me/256783084521" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-5 bg-white text-blue-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:shadow-xl transition-all active:scale-95 relative z-10">
                                Talk to an Expert
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LivePrices;
