import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
    const whatsAppNumber = "256783084521";
    const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent("Hello Time2Fly, I'm interested in planning a trip!")}`;

    return (
        <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[9999] group flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl">
                Chat with us
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-r border-white/10"></div>
            </div>

            {/* Main Button */}
            <div className="relative">
                {/* Pulsing Ripple Effect */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:animate-none"></div>

                <div className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(37,211,102,0.7)] transition-all duration-500 group-hover:scale-110 active:scale-95 group-hover:rotate-12">
                    <MessageCircle size={32} fill="currentColor" className="text-white" />
                </div>

                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-[#25D366] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>
        </a>
    );
};

export default WhatsAppButton;
