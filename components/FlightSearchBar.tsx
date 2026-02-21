import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ArrowLeftRight, ChevronDown, Search, MapPin, Calendar, Users, Plane, ChevronLeft, ChevronRight } from 'lucide-react';

type TripType = 'Round trip' | 'One way';
type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';

interface Passengers {
    adults: number;
    children: number;
    infantsSeat: number;
    infantsLap: number;
}

const WHATSAPP_NUMBER = '256783084521';

const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

function toYMD(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseYMD(s: string): Date | null {
    if (!s) return null;
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// ── Portal wrapper ────────────────────────────────────────────────────────────
// Renders children at document.body, bypassing ALL stacking contexts.
interface PortalProps {
    children: React.ReactNode;
    anchorRef: React.RefObject<HTMLElement>;
    open: boolean;
}

const DropdownPortal: React.FC<PortalProps> = ({ children, anchorRef, open }) => {
    const [style, setStyle] = useState<React.CSSProperties>({ position: 'absolute', top: 0, left: 0, zIndex: 99999 });

    const updatePosition = useCallback(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setStyle({
                position: 'absolute',
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                zIndex: 99999,
            });
        }
    }, [anchorRef]);

    useLayoutEffect(() => {
        if (open) {
            updatePosition();
            window.addEventListener('resize', updatePosition);
            return () => window.removeEventListener('resize', updatePosition);
        }
    }, [open, updatePosition]);

    if (!open) return null;
    return ReactDOM.createPortal(
        <div style={style}>{children}</div>,
        document.body
    );
};

// ── Custom Calendar ───────────────────────────────────────────────────────────
interface DatePickerProps {
    value: string;
    onChange: (val: string) => void;
    minDate?: string;
    label: string;
}

const DatePickerDropdown: React.FC<DatePickerProps> = ({ value, onChange, minDate, label }) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const selected = parseYMD(value);
    const minD = parseYMD(minDate || '') ?? todayDate;

    const initView = () => {
        const base = selected ?? new Date();
        return { year: base.getFullYear(), month: base.getMonth() };
    };
    const [view, setView] = useState(initView);

    useEffect(() => {
        if (open) setView(initView());
    }, [open]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
                panelRef.current && !panelRef.current.contains(e.target as Node)
            ) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const prevMonth = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
    const nextMonth = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

    const firstDay = new Date(view.year, view.month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const cells: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    while (cells.length % 7 !== 0) cells.push(null);

    const pick = (day: number) => {
        const d = new Date(view.year, view.month, day);
        if (d < minD) return;
        onChange(toYMD(d));
        setOpen(false);
    };

    const displayValue = selected
        ? selected.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '';

    return (
        <div className="relative flex-1 min-w-0">
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white transition-all text-left"
            >
                <Calendar size={14} className="text-blue-400 shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                    <span className={`text-sm font-semibold truncate ${displayValue ? 'text-slate-800' : 'text-slate-400'}`}>
                        {displayValue || 'Select date'}
                    </span>
                </div>
                <ChevronDown size={13} className={`text-slate-300 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <DropdownPortal anchorRef={triggerRef as React.RefObject<HTMLElement>} open={open}>
                <div ref={panelRef} className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-4 w-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <button type="button" onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm font-bold text-white">{MONTHS[view.month]} {view.year}</span>
                        <button type="button" onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mb-2">
                        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-white/30 uppercase py-1">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-1">
                        {cells.map((day, idx) => {
                            if (day === null) return <div key={idx} />;
                            const cellDate = new Date(view.year, view.month, day);
                            const isPast = cellDate < minD;
                            const isToday = toYMD(cellDate) === toYMD(todayDate);
                            const isSelected = value === toYMD(cellDate);
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={isPast}
                                    onClick={() => pick(day)}
                                    className={[
                                        'w-full aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all',
                                        isPast ? 'text-white/20 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white cursor-pointer',
                                        isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : '',
                                        isToday && !isSelected ? 'text-blue-400 ring-1 ring-blue-400/50' : '',
                                        !isPast && !isSelected ? 'text-white/80' : '',
                                    ].join(' ')}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
                        <button type="button" onClick={() => { onChange(''); setOpen(false); }} className="text-xs text-white/40 hover:text-white/70 font-semibold transition-colors">Clear</button>
                        <button type="button" onClick={() => { onChange(toYMD(new Date())); setOpen(false); }} className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors">Today</button>
                    </div>
                </div>
            </DropdownPortal>
        </div>
    );
};

// ── Passenger Row ─────────────────────────────────────────────────────────────
interface PaxRowProps { label: string; sub?: string; value: number; onDec: () => void; onInc: () => void; disableDec: boolean; }

const PaxRow: React.FC<PaxRowProps> = ({ label, sub, value, onDec, onInc, disableDec }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
        <div>
            <p className="text-sm font-semibold text-white">{label}</p>
            {sub && <p className="text-xs text-white/40">{sub}</p>}
        </div>
        <div className="flex items-center gap-3">
            <button type="button" onClick={onDec} disabled={disableDec} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all font-bold text-lg leading-none">−</button>
            <span className="w-5 text-center font-bold text-white text-sm">{value}</span>
            <button type="button" onClick={onInc} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold text-lg leading-none">+</button>
        </div>
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const FlightSearchBar: React.FC = () => {
    const [tripType, setTripType] = useState<TripType>('Round trip');
    const [cabin, setCabin] = useState<CabinClass>('Economy');
    const [passengers, setPassengers] = useState<Passengers>({ adults: 1, children: 0, infantsSeat: 0, infantsLap: 0 });
    const [from, setFrom] = useState('Entebbe (EBB)');
    const [to, setTo] = useState('');
    const [departure, setDeparture] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [showTripMenu, setShowTripMenu] = useState(false);
    const [showCabinMenu, setShowCabinMenu] = useState(false);
    const [showPassengers, setShowPassengers] = useState(false);

    // Portal anchors — refs on the TRIGGER buttons
    const tripBtnRef = useRef<HTMLButtonElement>(null);
    const paxBtnRef = useRef<HTMLButtonElement>(null);
    const cabinBtnRef = useRef<HTMLButtonElement>(null);

    // Panel refs for outside-click detection
    const tripPanelRef = useRef<HTMLDivElement>(null);
    const paxPanelRef = useRef<HTMLDivElement>(null);
    const cabinPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const t = e.target as Node;
            if (showTripMenu && tripBtnRef.current && !tripBtnRef.current.contains(t) && tripPanelRef.current && !tripPanelRef.current.contains(t)) setShowTripMenu(false);
            if (showPassengers && paxBtnRef.current && !paxBtnRef.current.contains(t) && paxPanelRef.current && !paxPanelRef.current.contains(t)) setShowPassengers(false);
            if (showCabinMenu && cabinBtnRef.current && !cabinBtnRef.current.contains(t) && cabinPanelRef.current && !cabinPanelRef.current.contains(t)) setShowCabinMenu(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showTripMenu, showPassengers, showCabinMenu]);

    const totalPax = passengers.adults + passengers.children + passengers.infantsSeat + passengers.infantsLap;

    const adjust = useCallback((key: keyof Passengers, delta: number) => {
        setPassengers(prev => ({ ...prev, [key]: Math.max(key === 'adults' ? 1 : 0, prev[key] + delta) }));
    }, []);

    const swapLocations = () => {
        const prevFrom = from;
        setFrom(to || 'Entebbe (EBB)');
        setTo(prevFrom === 'Entebbe (EBB)' ? '' : prevFrom);
    };

    const handleExplore = () => {
        if (!to || !departure) { alert('Please fill in destination and departure date.'); return; }
        const paxSummary = [
            `${passengers.adults} adult${passengers.adults > 1 ? 's' : ''}`,
            passengers.children > 0 ? `${passengers.children} child${passengers.children > 1 ? 'ren' : ''}` : '',
            passengers.infantsSeat > 0 ? `${passengers.infantsSeat} infant${passengers.infantsSeat > 1 ? 's' : ''} (seat)` : '',
            passengers.infantsLap > 0 ? `${passengers.infantsLap} infant${passengers.infantsLap > 1 ? 's' : ''} (lap)` : '',
        ].filter(Boolean).join(', ');
        const depDisplay = parseYMD(departure)?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) ?? departure;
        const retDisplay = returnDate ? parseYMD(returnDate)?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) ?? returnDate : null;
        const lines: string[] = [
            `✈️ *Flight Enquiry — Time2Fly*`, ``,
            `*Trip type:* ${tripType}`, `*From:* ${from}`, `*To:* ${to}`,
            `*Departure:* ${depDisplay}`,
            ...(tripType === 'Round trip' && retDisplay ? [`*Return:* ${retDisplay}`] : []),
            `*Passengers:* ${paxSummary}`, `*Cabin:* ${cabin}`, ``,
            `Please help me book this flight. Thank you! 🙏`,
        ];
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    };

    const paxHandlers = {
        adults: { dec: () => adjust('adults', -1), inc: () => adjust('adults', 1) },
        children: { dec: () => adjust('children', -1), inc: () => adjust('children', 1) },
        infantsSeat: { dec: () => adjust('infantsSeat', -1), inc: () => adjust('infantsSeat', 1) },
        infantsLap: { dec: () => adjust('infantsLap', -1), inc: () => adjust('infantsLap', 1) },
    };

    // Shared dropdown panel styles
    const panelCls = "bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60";

    return (
        <section id="flight-search" style={{ backgroundColor: '#000033' }} className="py-6 px-4 scroll-mt-24">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-6">

                {/* Heading */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Plane size={16} className="text-white" />
                    </div>
                    <h2 className="text-base font-black text-slate-800 uppercase tracking-widest">BOOK FLIGHT</h2>
                    <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Book via WhatsApp</span>
                </div>

                {/* Controls row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 pb-4 border-b border-slate-100">

                    {/* Trip type */}
                    <div className="relative">
                        <button
                            ref={tripBtnRef}
                            type="button"
                            onClick={() => { setShowTripMenu(p => !p); setShowCabinMenu(false); setShowPassengers(false); }}
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeftRight size={14} />
                            {tripType}
                            <ChevronDown size={13} className={`transition-transform ${showTripMenu ? 'rotate-180' : ''}`} />
                        </button>
                        <DropdownPortal anchorRef={tripBtnRef as React.RefObject<HTMLElement>} open={showTripMenu}>
                            <div ref={tripPanelRef} className={`${panelCls} min-w-[150px] overflow-hidden`}>
                                {(['Round trip', 'One way'] as TripType[]).map(t => (
                                    <button key={t} type="button"
                                        onClick={() => { setTripType(t); setShowTripMenu(false); if (t === 'One way') setReturnDate(''); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${tripType === t ? 'text-blue-400 font-bold' : 'text-white/70'}`}
                                    >
                                        {tripType === t && <span className="mr-2">✓</span>}{t}
                                    </button>
                                ))}
                            </div>
                        </DropdownPortal>
                    </div>

                    {/* Passengers */}
                    <div className="relative">
                        <button
                            ref={paxBtnRef}
                            type="button"
                            onClick={() => { setShowPassengers(p => !p); setShowTripMenu(false); setShowCabinMenu(false); }}
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            <Users size={14} />
                            {totalPax} passenger{totalPax !== 1 ? 's' : ''}
                            <ChevronDown size={13} className={`transition-transform ${showPassengers ? 'rotate-180' : ''}`} />
                        </button>
                        <DropdownPortal anchorRef={paxBtnRef as React.RefObject<HTMLElement>} open={showPassengers}>
                            <div ref={paxPanelRef} className={`${panelCls} w-72 p-4`}>
                                <PaxRow label="Adults" value={passengers.adults} onDec={paxHandlers.adults.dec} onInc={paxHandlers.adults.inc} disableDec={passengers.adults <= 1} />
                                <PaxRow label="Children" sub="Aged 2–11" value={passengers.children} onDec={paxHandlers.children.dec} onInc={paxHandlers.children.inc} disableDec={passengers.children <= 0} />
                                <PaxRow label="Infants" sub="In seat (2+)" value={passengers.infantsSeat} onDec={paxHandlers.infantsSeat.dec} onInc={paxHandlers.infantsSeat.inc} disableDec={passengers.infantsSeat <= 0} />
                                <PaxRow label="Infants" sub="On lap (under 2)" value={passengers.infantsLap} onDec={paxHandlers.infantsLap.dec} onInc={paxHandlers.infantsLap.inc} disableDec={passengers.infantsLap <= 0} />
                                <div className="flex justify-end gap-4 mt-3 pt-3 border-t border-white/10">
                                    <button type="button" onClick={() => setShowPassengers(false)} className="text-sm text-white/40 hover:text-white/70 font-semibold transition-colors">Cancel</button>
                                    <button type="button" onClick={() => setShowPassengers(false)} className="text-sm text-blue-400 font-black hover:text-blue-300 transition-colors">Done</button>
                                </div>
                            </div>
                        </DropdownPortal>
                    </div>

                    {/* Cabin class */}
                    <div className="relative">
                        <button
                            ref={cabinBtnRef}
                            type="button"
                            onClick={() => { setShowCabinMenu(p => !p); setShowTripMenu(false); setShowPassengers(false); }}
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            {cabin}
                            <ChevronDown size={13} className={`transition-transform ${showCabinMenu ? 'rotate-180' : ''}`} />
                        </button>
                        <DropdownPortal anchorRef={cabinBtnRef as React.RefObject<HTMLElement>} open={showCabinMenu}>
                            <div ref={cabinPanelRef} className={`${panelCls} min-w-[180px] overflow-hidden`}>
                                {(['Economy', 'Premium Economy', 'Business', 'First'] as CabinClass[]).map(c => (
                                    <button key={c} type="button"
                                        onClick={() => { setCabin(c); setShowCabinMenu(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${cabin === c ? 'text-blue-400 font-bold' : 'text-white/70'}`}
                                    >
                                        {cabin === c && <span className="mr-2">✓</span>}{c}
                                    </button>
                                ))}
                            </div>
                        </DropdownPortal>
                    </div>
                </div>

                {/* Search row */}
                <div className="flex flex-col md:flex-row items-stretch gap-2">

                    {/* From */}
                    <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white transition-all min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-400 shrink-0" />
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">From</span>
                            <input value={from} onChange={e => setFrom(e.target.value)} className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none font-semibold min-w-0" placeholder="Origin city or airport" />
                        </div>
                    </div>

                    {/* Swap */}
                    <button type="button" onClick={swapLocations} className="hidden md:flex self-center shrink-0 p-2 rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all" title="Swap">
                        <ArrowLeftRight size={14} />
                    </button>

                    {/* To */}
                    <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white transition-all min-w-0">
                        <MapPin size={14} className="text-blue-400 shrink-0" />
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">To</span>
                            <input value={to} onChange={e => setTo(e.target.value)} className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none font-semibold min-w-0" placeholder="Destination city or airport" />
                        </div>
                    </div>

                    {/* Dates */}
                    <DatePickerDropdown label="Departure" value={departure} onChange={setDeparture} minDate={toYMD(todayDate)} />
                    {tripType === 'Round trip' && (
                        <DatePickerDropdown label="Return" value={returnDate} onChange={setReturnDate} minDate={departure || toYMD(todayDate)} />
                    )}

                    {/* Explore button */}
                    <button type="button" onClick={handleExplore} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black px-7 py-3 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 text-sm uppercase tracking-wide shrink-0 mt-1 md:mt-0">
                        <Search size={16} />
                        <span>GET QUOTE</span>
                    </button>
                </div>

                {/* Mobile swap */}
                <button type="button" onClick={swapLocations} className="md:hidden flex items-center gap-2 mt-3 text-xs text-slate-400 hover:text-blue-600 font-semibold transition-colors">
                    <ArrowLeftRight size={13} />
                    Swap origin &amp; destination
                </button>

            </div>
        </section>
    );
};

export default FlightSearchBar;
