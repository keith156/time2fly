import React from 'react';
import { MapPin, Plane } from 'lucide-react';

const REGIONS = [
  {
    name: 'Europe',
    position: 'top-left',
    airlines: [
      { name: 'Turkish Airlines', detail: 'Istanbul', logo: 'https://www.logo.wine/a/logo/Turkish_Airlines/Turkish_Airlines-Logo.wine.svg' },
      { name: 'KLM', detail: 'Amsterdam', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg' },
      { name: 'Brussels Airlines', detail: 'Brussels', logo: '/assets/brussel-logo.svg' }
    ],
    alignment: 'left',
    connectorStart: { x: 50, y: 50 },
    connectorEnd: { x: 25, y: 30 },
    curveText: 'Europe flights'
  },
  {
    name: 'Middle East',
    position: 'top-right',
    airlines: [
      { name: 'Emirates', detail: 'Dubai', logo: 'https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg' },
      { name: 'flydubai', detail: 'Dubai', logo: 'https://www.logo.wine/a/logo/Flydubai/Flydubai-Logo.wine.svg' },
      { name: 'Qatar Airways', detail: 'Doha', logo: 'https://www.logo.wine/a/logo/Qatar_Airways/Qatar_Airways-Logo.wine.svg' },
      { name: 'Air Arabia', detail: 'Sharjah', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Air_Arabia_logo.svg/1920px-Air_Arabia_logo.svg.png' }
    ],
    alignment: 'right',
    connectorStart: { x: 50, y: 50 },
    connectorEnd: { x: 75, y: 30 },
    curveText: 'Middle East flights'
  },
  {
    name: 'Africa',
    position: 'bottom-left',
    airlines: [
      { name: 'EgyptAir', detail: 'Cairo', logo: 'https://www.logo.wine/a/logo/EgyptAir/EgyptAir-Logo.wine.svg' },
      { name: 'Ethiopian Airlines', detail: 'Addis Ababa', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ethiopian_Airlines_Logo.svg/1024px-Ethiopian_Airlines_Logo.svg.png' },
      { name: 'Kenya Airways', detail: 'Nairobi', logo: 'https://www.logo.wine/a/logo/Kenya_Airways/Kenya_Airways-Logo.wine.svg' },
      { name: 'RwandAir', detail: 'Kigali', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/RwandAir_logo.svg/1024px-RwandAir_logo.svg.png' },
      { name: 'Air Tanzania', detail: 'Dar es Salaam', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Air_Tanzania_logo.svg/1024px-Air_Tanzania_logo.svg.png' },
      { name: 'Uganda Airlines', detail: 'Johannesburg', logo: '/assets/uganda-airlines-logo.png' },
      { name: 'South African Airways', detail: 'Johannesburg', logo: '/assets/South_African_Airways-Logo.wine.svg' }
    ],
    alignment: 'left',
    connectorStart: { x: 50, y: 50 },
    connectorEnd: { x: 25, y: 70 },
    curveText: 'Africa flights'
  },
  {
    name: 'Asia/Others',
    position: 'bottom-right',
    airlines: [
      { name: 'Turkish Airlines', detail: 'Singapore', logo: 'https://www.logo.wine/a/logo/Turkish_Airlines/Turkish_Airlines-Logo.wine.svg' },
      { name: 'Qatar Airways', detail: 'Doha', logo: 'https://www.logo.wine/a/logo/Qatar_Airways/Qatar_Airways-Logo.wine.svg' },
      { name: 'KLM', detail: 'Amsterdam', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg' },
      { name: 'Emirates', detail: 'Dubai', logo: 'https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg' },
      { name: 'Singapore', detail: 'New Delhi', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Singapore_Airlines_Logo.svg/1024px-Singapore_Airlines_Logo.svg.png' },
      { name: 'KLM', detail: 'Dubai', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg' },
      { name: 'Malaysia Airlines', detail: 'Kuala Lumpur', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Malaysia_Airlines_Logo.svg/1200px-Malaysia_Airlines_Logo.svg.png' }
    ],
    alignment: 'right',
    connectorStart: { x: 50, y: 50 },
    connectorEnd: { x: 75, y: 70 },
    curveText: 'Asia & Others'
  }
];

const AirlinesNetwork: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#eaf4fc] py-20 lg:py-32">
      {/* Subtle world map background pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg")',
          backgroundSize: '80%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a4a75] tracking-wide relative inline-block">
            <span className="relative z-10 bg-[#eaf4fc] px-4">Airlines Connecting Uganda to the World</span>
            <div className="absolute top-1/2 left-[-20vw] right-[-20vw] h-[1px] bg-[#1a4a75]/30 -z-10 hidden md:block"></div>
          </h2>
        </div>

        <div className="relative flex flex-col lg:block min-h-[800px]">
          
          {/* Dynamic SVG Connectors (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Connectors using bezier curves to simulate the image */}
              {/* Top Left */}
              <path d="M 50% 50% Q 30% 30% 25% 20%" fill="none" stroke="white" strokeWidth="3" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 25% 40% 20% 30%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 35% 20% 30% 10%" fill="none" stroke="white" strokeWidth="2" filter="url(#glow)" className="opacity-80" />
              
              {/* Top Right */}
              <path d="M 50% 50% Q 70% 30% 75% 20%" fill="none" stroke="white" strokeWidth="3" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 75% 40% 80% 30%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 65% 20% 70% 10%" fill="none" stroke="white" strokeWidth="2" filter="url(#glow)" className="opacity-80" />
              
              {/* Bottom Left */}
              <path d="M 50% 50% Q 30% 70% 25% 80%" fill="none" stroke="white" strokeWidth="3" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 25% 60% 20% 70%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 40% 80% 35% 90%" fill="none" stroke="white" strokeWidth="2" filter="url(#glow)" className="opacity-80" />
              
              {/* Bottom Right */}
              <path d="M 50% 50% Q 70% 70% 75% 80%" fill="none" stroke="white" strokeWidth="3" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 75% 60% 80% 70%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" className="opacity-80" />
              <path d="M 50% 50% Q 65% 80% 70% 90%" fill="none" stroke="white" strokeWidth="2" filter="url(#glow)" className="opacity-80" />
            </svg>
          </div>

          {/* Center Point - Entebbe */}
          <div className="relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 flex flex-col items-center justify-center mb-12 lg:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(220,38,38,0.5)] z-20 relative">
              <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-red-800"></div>
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75"></div>
            </div>
            <div className="mt-4 bg-[#1a2f4c] text-white px-6 py-3 rounded-lg shadow-xl text-center border-b-4 border-red-600">
              <h3 className="font-bold text-lg leading-tight uppercase tracking-wider">Entebbe, Uganda</h3>
              <p className="text-white/70 text-sm mt-1">Entebbe Intl Airport</p>
            </div>
          </div>

          {/* Regions Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:block gap-8 w-full z-10 relative">
            {REGIONS.map((region, index) => {
              // Positioning logic for desktop
              const lgClasses = 
                region.position === 'top-left' ? 'lg:absolute lg:top-5 lg:left-10 w-full lg:w-[320px]' :
                region.position === 'top-right' ? 'lg:absolute lg:top-5 lg:right-10 w-full lg:w-[320px]' :
                region.position === 'bottom-left' ? 'lg:absolute lg:bottom-10 lg:left-10 w-full lg:w-[320px]' :
                'lg:absolute lg:bottom-10 lg:right-10 w-full lg:w-[320px]';

              return (
                <div key={index} className={`bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white shadow-lg ${lgClasses}`}>
                  <h3 className="text-[#1a4a75] font-bold text-lg mb-4 border-b border-[#1a4a75]/10 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    {region.name}
                  </h3>
                  <div className="space-y-3">
                    {region.airlines.map((airline, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden group-hover:shadow-md transition-all">
                          {airline.logo ? (
                            <img src={airline.logo} alt={airline.name} className="w-full h-full object-contain" onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }} />
                          ) : null}
                          <Plane className={`w-5 h-5 text-slate-400 ${airline.logo ? 'hidden' : ''}`} />
                        </div>
                        <div className="flex-1 min-w-0 flex items-baseline justify-[#1a4a75]">
                          <span className="font-bold text-sm text-[#1a4a75] truncate mr-2">{airline.name}</span>
                          <span className="text-xs text-slate-500 truncate">{airline.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-center w-full max-w-lg">
            <h3 className="text-xl font-bold text-[#1a4a75] tracking-wide bg-[#eaf4fc] inline-block px-4">
              Connecting Uganda to the World
            </h3>
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#1a4a75]/30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirlinesNetwork;
