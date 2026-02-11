import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Compass, Ticket, Zap, Globe, Users, Waves, Bird, Trees, Binoculars } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import SectionTitle from '../components/SectionTitle.tsx';

const DestinationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { destinations, packages, loading } = useData();
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const destination = destinations.find(d => d.id === id);
    const relatedPackages = packages.filter(p => p.destination.toLowerCase() === destination?.name.toLowerCase());

    // Auto-scroll logic for highlights
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let startTime: number | null = null;
        const speed = 0.05; // Pixels per ms

        const scroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (scrollContainer) {
                scrollContainer.scrollLeft += speed * 16;
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
        const handleMouseLeave = () => animationFrameId = requestAnimationFrame(scroll);

        animationFrameId = requestAnimationFrame(scroll);
        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [destination]);

    const getBgImage = (title: string) => {
        const lower = title.toLowerCase();
        if (lower.includes('adventure')) return "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop";
        if (lower.includes('culture')) return "https://images.unsplash.com/photo-1523055653229-f8386e58a8a4?q=80&w=800&auto=format&fit=crop";
        if (lower.includes('relaxation')) return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop";
        if (lower.includes('wildlife')) return "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800&auto=format&fit=crop";
        if (lower.includes('safari')) return "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop";
        return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop";
    };

    const getIcon = (title: string) => {
        const lower = title.toLowerCase();
        if (lower.includes('adventure')) return <Zap size={24} />;
        if (lower.includes('culture')) return <Users size={24} />;
        if (lower.includes('relaxation')) return <Waves size={24} />;
        if (lower.includes('wildlife')) return <Bird size={24} />;
        if (lower.includes('safari')) return <Binoculars size={24} />;
        return <Globe size={24} />;
    };

    const parseContent = (text: string) => {
        if (!text) return { highlights: [], mainContent: "" };

        const keywords = ['adventure', 'culture', 'relaxation', 'wildlife', 'safaris', 'safari'];
        const sections = text.split(/\n\n+/);
        const highlights: { title: string, content: string }[] = [];
        const mainParts: string[] = [];

        sections.forEach(section => {
            const lines = section.split('\n');
            const firstLine = lines[0].trim();
            const isHighlight = keywords.some(k =>
                firstLine.toLowerCase().includes(`**${k}**`) ||
                (firstLine.startsWith('**') && firstLine.endsWith('**') && keywords.some(k2 => firstLine.toLowerCase().includes(k2)))
            );

            if (isHighlight) {
                const title = firstLine.replace(/\*\*/g, '');
                const content = lines.slice(1).join('\n').trim();
                highlights.push({ title, content });
            } else {
                mainParts.push(section);
            }
        });

        return { highlights, mainContent: mainParts.join('\n\n') };
    };

    const renderFormattedText = (text: string) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    if (loading) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
                <Compass className="text-slate-200 mb-6" size={80} />
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Destination Not Found</h1>
                <p className="text-slate-500 mb-8 max-w-md text-center">Sorry, we couldn't find the destination you're looking for.</p>
                <button onClick={() => navigate('/destinations')} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs">Back to Destinations</button>
            </div>
        );
    }

    const { highlights, mainContent } = parseContent(destination.details);

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-slate-900">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => navigate('/destinations')}
                            className="mb-8 flex items-center text-amber-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-2 transition-transform" />
                            All Destinations
                        </button>
                        <h1 className="text-6xl md:text-9xl font-black text-white mb-4 uppercase tracking-tighter leading-none animate-fade-in-up">
                            {destination.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Modern Highlights Carousel */}
            {highlights.length > 0 && (
                <section className="py-16 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-amber-500 font-black tracking-[0.3em] uppercase text-[10px] mb-3 block">Handpicked Experiences</span>
                            <SectionTitle title={`The Heart of ${destination.name}`} centered={false} />
                        </div>
                        <p className="text-slate-500 font-medium max-w-sm text-sm">Discover what makes this destination truly unique through our curated highlights.</p>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 px-6 md:px-[calc(50vw-600px)] no-scrollbar scroll-smooth whitespace-nowrap pb-10"
                    >
                        {[...highlights, ...highlights].map((item, index) => (
                            <div
                                key={index}
                                className="inline-block relative min-w-[280px] md:min-w-[380px] h-[450px] rounded-[40px] overflow-hidden shadow-xl transition-all duration-700 group whitespace-normal align-top cursor-default mr-4"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 bg-slate-900">
                                    <img
                                        src={getBgImage(item.title)}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                        alt={item.title}
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop";
                                        }}
                                    />
                                </div>

                                {/* Overlay & Gradient */}
                                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                                {/* Content Glassmorphism Box */}
                                <div className="absolute bottom-4 left-4 right-4 p-6 md:p-8 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-700">
                                    <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-amber-500/30">
                                        {getIcon(item.title)}
                                    </div>
                                    <h4 className="text-2xl md:text-2xl font-black text-white uppercase tracking-tighter mb-3 leading-tight">{item.title}</h4>
                                    <p className="text-slate-100/90 text-sm font-medium leading-relaxed line-clamp-3 text-left">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Main Content Area */}
            <section className="py-24 px-6 bg-slate-50 overflow-hidden">
                <div className="max-w-4xl mx-auto bg-white p-12 md:p-24 rounded-[60px] shadow-sm border border-slate-100">
                    <div className="prose prose-lg max-w-none">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-[2px] w-12 bg-amber-500"></div>
                            <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-xs">Deep Dive: {destination.name}</p>
                        </div>
                        <div className="text-slate-600 text-xl font-medium leading-relaxed whitespace-pre-wrap selection:bg-amber-100">
                            {renderFormattedText(mainContent) || "More information about this destination will be available soon."}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
                <section className="py-24 bg-white border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <SectionTitle subtitle="Adventure Awaits" title={`Explore Tours in ${destination.name}`} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPackages.map((pkg) => (
                                <Link
                                    key={pkg.id}
                                    to={`/packages?pkg=${pkg.id}`}
                                    className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-100"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-lg">
                                            {pkg.duration}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">
                                            <Ticket size={14} className="mr-2" />
                                            Selected Voyage
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{pkg.destination}</h3>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex items-baseline">
                                                <span className="text-sm font-bold text-slate-400 mr-1">$</span>
                                                <span className="text-2xl font-black text-slate-900">{pkg.price}</span>
                                            </div>
                                            <span className="bg-slate-950 text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                                                <ArrowLeft className="rotate-180" size={18} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="max-w-5xl mx-auto bg-slate-950 rounded-[60px] p-12 md:p-24 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <img src={destination.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white px-4 mb-8 uppercase tracking-tighter leading-none">
                            Ready to <span className="text-amber-500">Visit {destination.name}</span>?
                        </h2>
                        <Link
                            to="/contact"
                            className="inline-flex bg-amber-500 hover:bg-white text-white hover:text-slate-950 px-12 py-6 rounded-3xl font-black transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-sm"
                        >
                            Plan Your {destination.name} Trip
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DestinationDetail;
