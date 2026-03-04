import React from 'react';
import { ArrowLeft, RefreshCcw, Plane, CheckCircle2, User, MessageCircle, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

/* ─────────────────────────────────────────────────────────────────────────────
   Ticket Card – matches the provided mockup exactly
   Desktop  : one wide row  [ photo | from/to/dates | divider | airline | divider | price | confirm ]
   Mobile   : two rows      [ photo | from/to/dates ] + [ price | confirm ]
───────────────────────────────────────────────────────────────────────────── */
const TicketCard: React.FC<{ ticket: ReturnType<typeof useData>['liveTickets'][0] }> = ({ ticket }) => {
    const priceStr = ticket.price_usd_min && ticket.price_usd_max
        ? `$${ticket.price_usd_min} - $${ticket.price_usd_max}`
        : `$${Math.round((ticket.price_ugx ?? 0) / 3800)}`;

    const whatsappUrl = `https://wa.me/256783084521?text=Hello! I'm interested in the live flight price for ${ticket.from}-${ticket.to}${ticket.price_usd_min ? ` at around $${ticket.price_usd_min}` : ''}. I saw this on the website and would like to help finalize my booking!`;

    const TrendIcon = ticket.trend === 'down'
        ? <TrendingDown size={14} className="text-emerald-400" />
        : ticket.trend === 'up'
            ? <TrendingUp size={14} className="text-rose-400" />
            : <div className="w-2 h-2 rounded-full bg-slate-400" />;

    const trendText = ticket.trend === 'down' ? 'Price Drooping' : ticket.trend === 'up' ? 'Price Rising' : 'Stable Price';
    const trendBg = ticket.trend === 'down' ? 'bg-emerald-500/10' : ticket.trend === 'up' ? 'bg-rose-500/10' : 'bg-slate-500/10';
    const trendColor = ticket.trend === 'down' ? 'text-emerald-400' : ticket.trend === 'up' ? 'text-rose-400' : 'text-slate-400';
    const isAvailable = ticket.is_available !== false;

    return (
        <div className={`ticket-card rounded-2xl shadow-xl overflow-hidden border border-blue-900/40 mb-5 transition-all ${!isAvailable ? 'opacity-70 grayscale-[0.3]' : ''}`}>

            {/* ── Desktop layout ──────────────────────────────────────────────── */}
            <div className="hidden md:flex items-stretch min-h-[110px] bg-[#08155e]">

                {/* City photo – fixed w */}
                <div className="flex items-center justify-center w-[100px] shrink-0 py-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400/30 shadow-lg">
                        {ticket.city_image
                            ? <img src={ticket.city_image} alt={ticket.to} className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-blue-800/60 flex items-center justify-center text-blue-300">
                                <Plane size={28} className="rotate-45" />
                            </div>
                        }
                    </div>
                </div>

                {/* From / To / Dates – fixed w */}
                <div className="flex flex-col justify-center py-4 pr-4 w-[210px] shrink-0">
                    <p className="text-blue-300 text-[11px] font-semibold tracking-wide">From {ticket.from}</p>
                    <h3 className="text-white font-extrabold text-2xl leading-tight tracking-tight">{ticket.to}</h3>
                    {ticket.dates && (
                        <p className="text-blue-200 text-[12px] font-medium mt-0.5">{ticket.dates}</p>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px bg-white/20 my-4 shrink-0" />

                {/* Airline – fixed w */}
                <div className="flex flex-col justify-center px-6 w-[200px] shrink-0">
                    <p className="text-white font-bold text-base leading-snug">{ticket.airline || 'Airline'}</p>
                    <p className="text-blue-200 text-[12px]">Round Trip</p>
                    <p className="text-blue-200 text-[12px]">Economy. 1Px</p>
                </div>

                {/* Divider */}
                <div className="w-px bg-white/20 my-4 shrink-0" />

                {/* Price Range – fixed w */}
                <div className="flex flex-col justify-center px-6 w-[230px] shrink-0">
                    <p className="text-white font-bold text-sm">Target Price</p>
                    {isAvailable ? (
                        <>
                            <p className="text-orange-400 font-extrabold text-xl tracking-tight">{priceStr}</p>
                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold mt-1.5 ${trendBg} ${trendColor} border border-white/10 w-fit`}>
                                {TrendIcon}
                                <span className="uppercase tracking-wider">{trendText}</span>
                            </div>
                        </>
                    ) : (
                        <div className="mt-1">
                            <p className="text-rose-400 font-black text-sm uppercase tracking-wider leading-tight">No Flights<br />Available</p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px bg-white/20 my-4 shrink-0" />

                {/* Confirm – stretches remaining */}
                <div className="flex flex-col items-center justify-center flex-1 gap-1.5 px-4">
                    {isAvailable ? (
                        <>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-7 py-2.5 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-500/30 transition-all whitespace-nowrap"
                            >
                                Confirm
                            </a>
                            <span className="text-blue-300 text-[10px] font-medium text-center">With Travel Consultant</span>
                        </>
                    ) : (
                        <button
                            disabled
                            className="px-7 py-2.5 bg-slate-700 text-slate-400 font-bold text-sm rounded-full cursor-not-allowed whitespace-nowrap"
                        >
                            Sold Out
                        </button>
                    )}
                </div>

            </div>

            {/* ── Mobile layout – white card ──────────────────────────────── */}
            <div className="flex flex-col md:hidden bg-[#08155e]">

                {/* Row 1 – photo + from/to/dates */}
                <div className="flex items-center gap-4 p-4 pb-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400/30 shadow-md shrink-0">
                        {ticket.city_image
                            ? <img src={ticket.city_image} alt={ticket.to} className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-blue-800/60 flex items-center justify-center text-blue-300">
                                <Plane size={22} className="rotate-45" />
                            </div>
                        }
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-blue-300 text-[10px] font-semibold tracking-wide">From {ticket.from}</p>
                        <h3 className="text-white font-extrabold text-xl leading-tight tracking-tight truncate">{ticket.to}</h3>
                        {ticket.dates && (
                            <p className="text-blue-200 text-[11px] font-medium">{ticket.dates}</p>
                        )}
                    </div>
                </div>

                {/* Horizontal divider */}
                <div className="h-px bg-white/20 mx-4" />

                {/* Row 2 – airline + price + confirm */}
                <div className="flex items-center px-4 py-3">
                    {/* Airline */}
                    <div className="flex-1 min-w-0 pr-3">
                        <p className="text-white font-bold text-sm leading-snug">{ticket.airline || 'Airline'}</p>
                        <p className="text-blue-200 text-[11px]">Round Trip · Economy. 1Px</p>
                    </div>

                    <div className="w-px h-10 bg-white/20 shrink-0" />
                    <div className="flex-1 min-w-0 px-3">
                        <p className="text-white font-bold text-xs">Target Price</p>
                        {isAvailable ? (
                            <>
                                <p className="text-orange-400 font-extrabold text-base tracking-tight leading-tight">{priceStr}</p>
                                <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold mt-1 ${trendBg} ${trendColor} border border-white/5`}>
                                    {TrendIcon}
                                    <span className="uppercase tracking-tight">{trendText}</span>
                                </div>
                            </>
                        ) : (
                            <p className="text-rose-400 font-black text-xs uppercase tracking-tight leading-tight mt-0.5">Not Available</p>
                        )}
                    </div>

                    <div className="w-px h-10 bg-white/20 shrink-0" />
                    <div className="pl-3 flex flex-col items-center gap-1 shrink-0">
                        {isAvailable ? (
                            <>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 transition-all whitespace-nowrap"
                                >
                                    Confirm
                                </a>
                                <span className="text-blue-300 text-[9px] font-medium text-center">With Travel Consultant</span>
                            </>
                        ) : (
                            <button
                                disabled
                                className="px-5 py-2 bg-slate-700 text-slate-400 font-bold text-xs rounded-full cursor-not-allowed whitespace-nowrap"
                            >
                                Sold Out
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
const LivePrices: React.FC = () => {
    const { liveTickets, loading, refreshData } = useData();

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 font-sans selection:bg-blue-100">
            {/* Header / Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 bg-blue-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm">
                            <CheckCircle2 size={14} className="text-blue-500" />
                            <span>Human-Verified Market Data</span>
                        </div>
                        <h1 className="text-h1 text-slate-900 mb-4">
                            Live Flight <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">Rates</span>
                        </h1>
                        <p className="text-body-lg text-slate-500 max-w-2xl">
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

                    {/* Cards Container */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-h3 text-slate-900">
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

                        {/* Ticket List */}
                        {loading ? (
                            <div className="py-20 text-center">
                                <RefreshCcw className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
                                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Loading incoming rates...</p>
                            </div>
                        ) : liveTickets.length > 0 ? (
                            <div className="space-y-4">
                                {liveTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                                <div className="pt-4 pb-8 text-center animate-fade-in">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] opacity-80 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-slate-200/50 bg-white/50 shadow-sm">
                                        * Terms and Conditions apply and the fare depends on availability
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/60 shadow-xl">
                                <Plane className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No active routes at the moment.</p>
                            </div>
                        )}
                    </div>

                    {/* Side Info Panel */}
                    <div className="xl:w-[320px] shrink-0 space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <User className="text-blue-400 mb-4" size={28} />
                                <h3 className="text-h3 text-white mb-4">Our Edge</h3>
                                <p className="text-body text-slate-400 mb-6">
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
                                <h3 className="text-h4 text-white mb-3">Custom Booking?</h3>
                                <p className="text-body text-blue-100 mb-6">Let our experts craft the perfect journey, stress-free.</p>
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

