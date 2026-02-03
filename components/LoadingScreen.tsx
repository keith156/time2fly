import React from 'react';
import { Plane } from 'lucide-react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
            <style>{`
        @keyframes fly-path {
          0% {
            transform: translateX(-120vw) translateY(20vh) rotate(-15deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          40% {
             transform: translateX(-10vw) translateY(-5vh) rotate(0deg) scale(1);
          }
          60% {
             transform: translateX(10vw) translateY(-10vh) rotate(5deg) scale(1);
          }
          100% {
            transform: translateX(120vw) translateY(-50vh) rotate(15deg) scale(0.8);
            opacity: 0;
          }
        }
        
        .animate-fly {
          animation: fly-path 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>

            {/* Flying Plane Container */}
            <div className="relative z-10 animate-fly">
                {/* Trail effect */}
                <div className="absolute top-1/2 right-full w-32 h-1 bg-gradient-to-l from-white/50 to-transparent -translate-y-1/2 blur-sm"></div>

                <div className="relative">
                    <Plane size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] fill-slate-900" strokeWidth={1.5} />
                </div>
            </div>

            <div className="absolute bottom-20 flex flex-col items-center space-y-4 z-10">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs animate-pulse">Preparing for Takeoff</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
