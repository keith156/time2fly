
import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Search, ArrowRight, Loader2, Info, ExternalLink, Calculator } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import SectionTitle from '../components/SectionTitle';

interface FlightOption {
  airline: string;
  price: number;
  type: string;
  source?: string;
}

const FlightEstimator: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FlightOption[]>([]);
  const [error, setError] = useState('');
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);
    setSources([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Find current real flight prices from ${origin} to ${destination} on ${date}. 
      The trip type is ${tripType}. 
      Return a list of at least 3 flight options from different airlines.
      For each option, provide: Airline Name and the Price in USD.
      Keep the description concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      const parsedSources = groundingSources
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title,
          uri: chunk.web.uri
        }));
      setSources(parsedSources);

      const lines = text.split('\n');
      const flightOptions: FlightOption[] = [];
      const priceRegex = /\$\s?(\d{1,5}(?:,\d{3})*(?:\.\d{2})?)/g;
      
      lines.forEach(line => {
        const matches = [...line.matchAll(priceRegex)];
        if (matches.length > 0) {
          const rawPrice = parseFloat(matches[0][1].replace(/,/g, ''));
          const airlineMatch = line.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
          if (rawPrice) {
            flightOptions.push({
              airline: airlineMatch ? airlineMatch[0] : 'Various Airlines',
              price: rawPrice,
              type: tripType
            });
          }
        }
      });

      if (flightOptions.length === 0) {
        const anyPriceMatch = text.match(/\$(\d+)/);
        if (anyPriceMatch) {
          flightOptions.push({
            airline: 'Estimated Airline',
            price: parseFloat(anyPriceMatch[1]),
            type: tripType
          });
        } else {
          throw new Error("Could not extract specific price data. Please try another destination.");
        }
      }

      const adjustedResults = flightOptions.map(opt => ({
        ...opt,
        price: opt.price + 100
      }));

      setResults(adjustedResults.slice(0, 5));
    } catch (err: any) {
      console.error(err);
      setError('We could not fetch live estimates right now. Please check back later or contact our agents.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-slate-950 py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Clouds" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle 
            subtitle="Flight Tool" 
            title="Real-Time Ticket Estimator" 
            description="Get instant estimates for your next flight based on current market trends, including our exclusive Time2Fly premium service package."
            light={true}
          />
        </div>
      </section>

      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100">
            <form onSubmit={handleEstimate} className="space-y-8">
              <div className="flex flex-wrap gap-4 mb-4">
                <button 
                  type="button" 
                  onClick={() => setTripType('round-trip')}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${tripType === 'round-trip' ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  Round Trip
                </button>
                <button 
                  type="button" 
                  onClick={() => setTripType('one-way')}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${tripType === 'one-way' ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  One Way
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">From</label>
                  <div className="relative">
                    <Plane className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-45" size={20} />
                    <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Departure City (e.g. Nairobi)" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination City (e.g. London)" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900" required />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-slate-950 hover:bg-amber-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-[0.2em] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group">
                {loading ? <><Loader2 className="animate-spin" size={24} /><span>Analyzing Flight Data...</span></> : <><Search size={24} /><span>Calculate Estimate</span></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4">
          {error && <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center"><Info className="text-red-500 mx-auto mb-4" size={40} /><p className="text-red-600 font-bold text-lg">{error}</p></div>}
          {!loading && results.length > 0 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Time2Fly Estimates</h3>
                <span className="text-xs font-bold text-slate-400 uppercase bg-slate-100 px-4 py-1 rounded-full">Results based on live search</span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {results.map((res, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-8 rounded-[32px] hover:border-amber-500 hover:shadow-2xl transition-all group flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300"><Plane size={32} /></div>
                      <div>
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{res.airline}</h4>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{res.type} • Economy Class</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <span className="text-amber-500 font-black text-4xl tracking-tighter">${res.price.toLocaleString()}</span>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">+ $100 Service Fee Included</p>
                    </div>
                    <button className="bg-amber-500 hover:bg-slate-950 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/20 uppercase tracking-widest text-xs flex items-center group">
                      Book via Agent <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
              {sources.length > 0 && (
                <div className="mt-12 p-8 bg-slate-50 rounded-3xl">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Verification Sources</h4>
                  <div className="flex flex-wrap gap-4">{sources.map((src, idx) => (<a key={idx} href={src.uri} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 font-bold text-sm hover:underline bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"><ExternalLink size={14} /><span className="truncate max-w-[200px]">{src.title}</span></a>))}</div>
                </div>
              )}
            </div>
          )}
          {!loading && results.length === 0 && !error && (
            <div className="text-center py-20 opacity-30"><Calculator className="mx-auto mb-6" size={64} /><p className="text-2xl font-black uppercase tracking-tighter">Ready to Estimate</p><p className="font-bold">Enter your route above to see current prices.</p></div>
          )}
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 bg-white rounded-3xl shadow-sm"><div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Search size={32} /></div><h4 className="text-xl font-black uppercase mb-4 tracking-tight">Live Search</h4><p className="text-slate-500 font-medium">Real-time data for accurate planning.</p></div>
            <div className="p-8 bg-white rounded-3xl shadow-sm"><div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Plane size={32} /></div><h4 className="text-xl font-black uppercase mb-4 tracking-tight">Premium Service</h4><p className="text-slate-500 font-medium">Our flat fee covers 24/7 expert support.</p></div>
            <div className="p-8 bg-white rounded-3xl shadow-sm"><div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Calculator size={32} /></div><h4 className="text-xl font-black uppercase mb-4 tracking-tight">Final Costs</h4><p className="text-slate-500 font-medium">All taxes and fees included in results.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightEstimator;
