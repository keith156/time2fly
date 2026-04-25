
import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Instagram, Facebook, Music2, Linkedin, ExternalLink, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.tsx';
import SEO from '../components/SEO.tsx';

const Contact: React.FC = () => {
  const phoneNumber = "+256 759 243 331";
  const whatsAppNumber = "+256 783 084 521";
  const whatsAppUrl = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}`;
  const mapsUrl = "https://share.google/Cfq91VFGLqOJaaU9y";

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Contact',
        event_label: 'Inquiry Form'
      });
    }

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "0f499afe-5446-4ab4-900d-7848dda03d30");
    formData.append("subject", `New Inquiry from ${formData.get("name")}`);
    formData.append("from_name", "Time2Fly Website Inquiry");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResult("Thank you! Your message has been sent successfully. Our team will contact you shortly.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('error');
      setResult("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO
        title="Contact Us | Time2Fly Tours & Travel Ltd"
        description="Get in touch with Time2Fly Tours & Travel Ltd. Our travel specialists are ready to help you plan your next adventure from our Kampala office."
        url="https://time2flytnt.com/#/contact"
      />
      {/* Header */}
      <section className="bg-slate-950 pt-24 section-spacing text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
            width={1920}
            height={600}
            className="w-full h-full object-cover"
            alt="Contact background"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            subtitle="Contact Us"
            title="Get in Touch with Time2Fly"
            description="Our travel specialists are ready to help you plan your next adventure. Reach out to Time2Fly Tours & Travel Ltd today."
            light={true}
            titleClassName="md:text-[66px]"
          />
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-6 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-h4 text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-500 mb-2">Bookings & Support</p>
                  <p className="text-blue-600 font-bold">info@time2flytnt.com</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-6 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-h4 text-slate-900 mb-1">Call Us</h4>
                  <p className="text-slate-500 mb-2">Mon - Sat: 8am - 7pm</p>
                  <div className="flex flex-col text-blue-600 font-bold">
                    <span>+256 759 243 331</span>
                    <span>+256 783 084 521</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-8 rounded-3xl shadow-sm border border-green-100 flex items-start space-x-6 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-h4 text-green-900 mb-1">WhatsApp</h4>
                  <p className="text-green-700 mb-2">Instant Chat</p>
                  <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-black flex items-center">
                    {whatsAppNumber}
                  </a>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-6 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-h4 text-slate-900 mb-1">Our Location</h4>
                  <p className="text-slate-500 mb-2">Visit our Office</p>
                  <p className="text-blue-600 font-bold">Kampala, Uganda</p>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-amber-600 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors">
                    Open in Google Maps <ExternalLink size={14} className="ml-2" />
                  </a>
                </div>
              </div>

              {/* Social Media Shortcuts */}
              <div className="pt-8">
                <p className="text-caption text-slate-400 mb-6 ml-2">Follow our Journey</p>
                <div className="grid grid-cols-4 gap-4">
                  <a href="https://www.facebook.com/timetofly.ug/" target="_blank" rel="noopener noreferrer" className="bg-slate-50 p-4 rounded-2xl flex justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></a>
                  <a href="https://www.instagram.com/time2fly06/" target="_blank" rel="noopener noreferrer" className="bg-slate-50 p-4 rounded-2xl flex justify-center hover:bg-pink-600 hover:text-white transition-all"><Instagram size={20} /></a>
                  <a href="https://www.tiktok.com/@time2fly06" target="_blank" rel="noopener noreferrer" className="bg-slate-50 p-4 rounded-2xl flex justify-center hover:bg-slate-900 hover:text-white transition-all"><Music2 size={20} /></a>
                  <a href="https://ug.linkedin.com/company/time2fly06" target="_blank" rel="noopener noreferrer" className="bg-slate-50 p-4 rounded-2xl flex justify-center hover:bg-blue-700 hover:text-white transition-all"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 p-6 md:p-8 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-h3 text-slate-900 mb-8">Inquiry Form</h3>
                
                {status === 'success' ? (
                  <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center space-y-4 animate-fade-in">
                    <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-green-900">Message Sent!</h4>
                    <p className="text-green-700 font-medium">{result}</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-green-600 font-bold hover:underline uppercase tracking-widest text-xs"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {status === 'error' && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-700 text-sm font-medium">
                        {result}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-caption text-slate-500 ml-1">Full Name</label>
                        <input name="name" type="text" className="w-full px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-amber-500 font-medium bg-white" placeholder="e.g. John Doe" required />
                      </div>
                      <div className="space-y-3">
                        <label className="text-caption text-slate-500 ml-1">Phone Number</label>
                        <input name="phone" type="tel" className="w-full px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-amber-500 font-medium bg-white" placeholder="e.g. +256..." required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-caption text-slate-500 ml-1">Email Address</label>
                      <input name="email" type="email" className="w-full px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-amber-500 font-medium bg-white" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-caption text-slate-500 ml-1">Primary Interest</label>
                      <div className="relative">
                        <select name="interest" className="w-full px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-amber-500 appearance-none bg-white font-medium cursor-pointer">
                          <option>Flight Ticketing</option>
                          <option>Vacation Adventures</option>
                          <option>Corporate Travel</option>
                          <option>Visa Consultation</option>
                          <option>Hotel Booking</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                          <MessageSquare size={18} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-caption text-slate-500 ml-1">Additional Details</label>
                      <textarea name="message" rows={6} className="w-full px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-amber-500 resize-none font-medium bg-white" placeholder="Tell us about your travel dates and destination preference..." required></textarea>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        By sending this inquiry, you agree to our <a href="/#/privacy-policy" className="text-blue-600 font-bold hover:underline">Privacy Policy</a>. We collect your data solely to process your request and will never share it with unauthorized third parties.
                      </p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className={`w-full ${status === 'loading' ? 'bg-slate-400' : 'bg-slate-900 hover:bg-amber-500'} text-white font-black px-12 py-4 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3`}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        'Send Inquiry'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 w-full relative">
        <div className="absolute inset-0 bg-slate-200 overflow-hidden cursor-pointer" onClick={() => window.open(mapsUrl, '_blank')}>
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
            width={1200}
            height={400}
            className="w-full h-full object-cover grayscale opacity-50"
            alt="Map location placeholder"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-950 p-8 rounded-[32px] shadow-2xl border border-slate-800 text-center animate-bounce hover:bg-amber-500 transition-colors">
              <MapPin className="text-amber-500 mx-auto mb-3" size={40} />
              <p className="font-black text-white uppercase tracking-widest text-sm">Kampala Office</p>
              <p className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.3em]">CLICK TO VIEW ON MAP</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
