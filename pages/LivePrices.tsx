import React from 'react';
import { TrendingUp, ArrowLeft, RefreshCcw, Plane, CheckCircle2, User, MessageCircle, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const LivePrices: React.FC = () => {
    const { liveTickets, loading, refreshData } = useData();

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 font-sans selection:bg-blue-100">
            {/* Header / Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 bg-blue-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm">
                            <CheckCircle2 size={14} className="text-blue-500" />
                            <span>Human-Verified Market Data</span>
                        </div>
                        <h1 className="font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-4 text-5xl md:text-7xl">
                            Live Flight <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">Rates</span>
                        </h1>
                        <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                            Direct from Entebbe. Real-time market prices verified by our professional travel agents.
                        </p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-slate-200/50 transition-all border border-slate-100 group shrink-0">
                        <ArrowLeft size={16} className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
                        Back Home
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col xl:flex-row gap-8">

                    {/* Table Container */}
                    <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h2 className="font-black text-slate-900 uppercase tracking-tighter text-xl">
                                Active Market Rates
                            </h2>
                            <button
                                onClick={() => refreshData()}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95 disabled:opacity-50"
                            >
                                <RefreshCcw size={14} className={`${loading ? 'animate-spin text-blue-500' : ''}`} />
                                <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Refresh'}</span>
                            </button>
                        </div>

                        <div className="w-full">
                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto w-full">
                                <table className="w-full text-left border-collapse min-w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100/80">
                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-[20%]">Departure</th>
                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-[5%] block text-center"></th>
                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-[20%]">Destination</th>
                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-[20%]">Trend</th>
                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right w-[20%]">Est. Price (USD)</th>
                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right w-[15%]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="py-20 text-center">
                                                    <RefreshCcw className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
                                                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Loading incoming rates...</p>
                                                </td>
                                            </tr>
                                        ) : liveTickets.length > 0 ? (
                                            liveTickets.map((ticket) => (
                                                <tr key={ticket.id} className="group hover:bg-blue-50/30 transition-colors">
                                                    <td className="py-5 px-6 font-black text-slate-800 tracking-tight uppercase break-words">{ticket.from}</td>
                                                    <td className="py-5 px-0 text-center text-slate-300 group-hover:text-blue-400 transition-colors">
                                                        <Plane size={16} className="rotate-45 ml-2" />
                                                    </td>
                                                    <td className="py-5 px-6 font-black text-slate-800 tracking-tight uppercase break-words">{ticket.to}</td>
                                                    <td className="py-5 px-6">
                                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${ticket.trend === 'down' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                                ticket.trend === 'up' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                                    'bg-slate-100 text-slate-600 border border-slate-200'
                                                            }`}>
                                                            {ticket.trend === 'down' ? <TrendingDown size={14} /> : ticket.trend === 'up' ? <TrendingUp size={14} /> : <Minus size={14} />}
                                                            <span>{ticket.trend === 'down' ? 'Best' : ticket.trend === 'up' ? 'Peak' : 'Stable'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-6 text-right font-black text-xl tracking-tighter text-slate-900">
                                                        ${ticket.price_usd_min && ticket.price_usd_max ? `${ticket.price_usd_min} - ${ticket.price_usd_max}` : Math.round(ticket.price_ugx / 3800)}
                                                    </td>
                                                    <td className="py-5 px-6 text-right">
                                                        <a
                                                            href={`https://wa.me/256783084521?text=Hello! I'm interested in the live flight price for ${ticket.from}-${ticket.to}${ticket.price_usd_min ? ` at around $${ticket.price_usd_min}` : ''}. I saw this on the website and would like to help finalize my booking!`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-block whitespace-nowrap px-4 py-2 bg-[#0000ff] hover:bg-slate-900 text-white rounded-lg font-black uppercase tracking-widest text-[10px] transition-all shadow-md shadow-blue-500/20 active:scale-95"
                                                        >
                                                            Confirm
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="py-20 text-center">
                                                    <Plane className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No active routes at the moment.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile / Tablet Card View */}
                            <div className="block lg:hidden divide-y divide-slate-100">
                                {loading ? (
                                    <div className="py-20 text-center">
                                        <RefreshCcw className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
                                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Loading incoming rates...</p>
                                    </div>
                                ) : liveTickets.length > 0 ? (
                                    liveTickets.map((ticket) => (
                                        <div key={ticket.id} className="p-5 flex flex-col gap-4 bg-white hover:bg-blue-50/30 transition-colors">
                                            {/* Route Header */}
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] mb-1">From</p>
                                                    <h3 className="font-black text-slate-900 tracking-tight uppercase text-lg sm:text-xl break-words leading-tight">{ticket.from}</h3>
                                                </div>
                                                <div className="flex flex-col items-center justify-center px-2">
                                                    <Plane size={20} className="rotate-45 text-blue-400" />
                                                </div>
                                                <div className="flex-1 text-right">
                                                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] mb-1">To</p>
                                                    <h3 className="font-black text-slate-900 tracking-tight uppercase text-lg sm:text-xl break-words leading-tight">{ticket.to}</h3>
                                                </div>
                                            </div>

                                            {/* Details & Actions */}
                                            <div className="flex items-end justify-between mt-2 pt-4 border-t border-slate-100/60">
                                                <div className="flex flex-col gap-2">
                                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest self-start ${ticket.trend === 'down' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                            ticket.trend === 'up' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                                'bg-slate-100 text-slate-600 border border-slate-200'
                                                        }`}>
                                                        {ticket.trend === 'down' ? <TrendingDown size={14} /> : ticket.trend === 'up' ? <TrendingUp size={14} /> : <Minus size={14} />}
                                                        <span>{ticket.trend === 'down' ? 'Best' : ticket.trend === 'up' ? 'Peak' : 'Stable'}</span>
                                                    </div>
                                                    <div className="font-black text-2xl tracking-tighter text-slate-900">
                                                        ${ticket.price_usd_min && ticket.price_usd_max ? `${ticket.price_usd_min} - ${ticket.price_usd_max}` : Math.round(ticket.price_ugx / 3800)}
                                                    </div>
                                                </div>

                                                <a
                                                    href={`https://wa.me/256783084521?text=Hello! I'm interested in the live flight price for ${ticket.from}-${ticket.to}${ticket.price_usd_min ? ` at around $${ticket.price_usd_min}` : ''}. I saw this on the website and would like to help finalize my booking!`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center h-10 px-6 bg-[#0000ff] hover:bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-md shadow-blue-500/20 active:scale-95"
                                                >
                                                    Confirm
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center">
                                        <Plane className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No active routes at the moment.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Side Info Panel */}
                    <div className="xl:w-[320px] shrink-0 space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <User className="text-blue-400 mb-4" size={28} />
                                <h3 className="font-black uppercase tracking-tighter text-2xl mb-4">Our Edge</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                    Verified by <span className="text-white font-bold">real travel agents</span>. We find deals that automated bots completely miss.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-400 shrink-0" size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Human Negotiation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-blue-400 shrink-0" size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">24/7 Availability</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <MessageCircle size={24} className="mb-4 text-white/90" />
                                <h3 className="font-black uppercase tracking-tighter text-xl mb-3">Custom Booking?</h3>
                                <p className="text-blue-100 text-xs font-medium mb-6">Let our experts craft the perfect journey, stress-free.</p>
                                <a
                                    href="https://wa.me/256783084521"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full py-3 bg-white text-blue-700 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors"
                                >
                                    Talk to Us
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
