
import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Bookmark, Clock, ChevronRight, Hash, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const { blogs, loading } = useData();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll to top when a post is selected
  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const updateProgress = () => {
        const scrolled = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        setReadingProgress((scrolled / height) * 100);
      };

      window.addEventListener('scroll', updateProgress);
      return () => window.removeEventListener('scroll', updateProgress);
    }
  }, [selectedPost]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Opening Journal...</p>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        {/* Reading Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1.5 bg-amber-500 z-[60] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />

        <article className="animate-fade-in-up">
          {/* Immersive Detail Hero */}
          <div className="relative h-[80vh] w-full overflow-hidden">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-110"
              style={{ transform: 'scale(1)' }}
              onLoad={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center pb-24 px-6">
              <div className="max-w-4xl w-full text-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 inline-flex items-center text-white/70 font-black uppercase tracking-widest text-[10px] hover:text-amber-400 transition-colors group bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
                >
                  <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-2 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="h-[2px] w-8 bg-amber-500"></span>
                  <span className="text-amber-500 text-xs font-black uppercase tracking-[0.3em]">{selectedPost.category}</span>
                  <span className="h-[2px] w-8 bg-amber-500"></span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 drop-shadow-2xl">
                  {selectedPost.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center"><Calendar size={14} className="mr-2 text-amber-500" /> {selectedPost.date}</span>
                  <span className="flex items-center"><User size={14} className="mr-2 text-amber-500" /> {selectedPost.author}</span>
                  <span className="flex items-center"><Clock size={14} className="mr-2 text-amber-500" /> 8 MIN READ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Floating Meta Sidebar */}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-32 flex flex-col space-y-8 items-center">
                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-2xl transition-all"><Share2 size={20} /></button>
                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-2xl transition-all"><Bookmark size={20} /></button>
                  <div className="h-20 w-[1px] bg-slate-100"></div>
                  <span className="rotate-90 whitespace-nowrap text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Scroll Down</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-8 lg:col-start-2">
                <div className="prose prose-slate prose-2xl max-w-none">
                  <p className="text-slate-900 font-bold text-2xl md:text-3xl mb-16 leading-tight italic">
                    "{selectedPost.excerpt}"
                  </p>

                  <div className="text-slate-700 leading-relaxed font-medium space-y-10 text-lg md:text-xl whitespace-pre-wrap">
                    {selectedPost.content || `
                      Traveling the world isn't just about seeing new places; it's about shifting your perspective. At Time2Fly, we believe every journey should be as unique as the traveler embarking on it.

                      When you step off that plane, you aren't just a tourist. You're a guest in someone else's home, a student of history, and an explorer of the unknown. This particular destination offers a blend of sensory experiences that simply cannot be captured in photographs alone.

                      The local culture here is deeply rooted in traditions that span centuries, yet there's a modern energy that's impossible to ignore. Whether you're navigating the bustling street markets or seeking silence in ancient ruins, you'll find that this place stays with you long after you've returned home.
                    `}
                  </div>
                </div>

                <div className="mt-24 p-12 bg-slate-950 rounded-[60px] relative overflow-hidden text-center group">
                  <div className="absolute inset-0 opacity-20 transition-transform duration-[5000ms] group-hover:scale-110">
                    <img src={selectedPost.image} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-4">Inspired by this story?</h3>
                    <p className="text-slate-400 font-medium mb-10 max-w-md mx-auto italic">Explore our custom packages to experience this destination for yourself.</p>
                    <button className="bg-amber-500 hover:bg-white hover:text-slate-950 text-white font-black px-12 py-5 rounded-full transition-all uppercase tracking-widest text-xs">Book the Journey</button>
                  </div>
                </div>
              </div>

              {/* Related/Author Info */}
              <div className="lg:col-span-3">
                <div className="sticky top-32 space-y-12">
                  <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-6">About the Author</h4>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-amber-500 text-xl shadow-lg">
                        {selectedPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-900 font-black uppercase tracking-tight">{selectedPost.author}</p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Travel Expert</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">Dedicated to uncovering the world's most authentic experiences since 2018.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white min-h-screen pb-32">
      {/* Mesmerizing Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1491557345352-5929e343d421?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-30"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/80 to-white"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-6 py-2 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl animate-fade-in-up">
            Venture Stories
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.8] animate-fade-in-up">
            THE TRAVEL <br /><span className="text-amber-500">JOURNAL</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic animate-fade-in-up">
            "Explore the world, Travelling is knowledge" — Curated insights from the heart of Uganda.
          </p>
        </div>
      </section>

      {/* Mesmerizing Feed Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, idx) => (
            <article
              key={post.id}
              className={`bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-slate-100 group flex flex-col h-full ${idx === 0 ? 'md:col-span-2 lg:col-span-2 md:flex-row' : ''}`}
            >
              <div
                className={`relative overflow-hidden cursor-pointer ${idx === 0 ? 'md:w-[50%] h-[400px] md:h-auto' : 'h-[320px]'}`}
                onClick={() => setSelectedPost(post)}
              >
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute top-6 left-6 flex space-x-2">
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest">
                    Explore Story <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>

              <div className={`p-10 flex flex-col justify-between ${idx === 0 ? 'md:w-[50%]' : 'flex-grow'}`}>
                <div>
                  <div className="flex items-center space-x-4 mb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center"><Calendar size={14} className="mr-1.5 text-amber-500" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1.5 text-amber-500" /> {post.author.split(' ')[0]}</span>
                  </div>
                  <h2
                    className={`font-black text-slate-900 mb-6 hover:text-amber-500 transition-colors cursor-pointer leading-none uppercase tracking-tighter ${idx === 0 ? 'text-2xl md:text-4xl' : 'text-2xl'}`}
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium line-clamp-3 italic">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center text-slate-950 font-black uppercase tracking-widest text-[10px] group-hover:text-amber-500 transition-colors"
                  >
                    Read Journal <ArrowRight size={14} className="ml-2 group-hover:translate-x-3 transition-transform" />
                  </button>
                  <div className="flex space-x-2 text-slate-300">
                    <Eye size={16} />
                    <span className="text-[10px] font-black">1.2K</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-40">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200"><Hash size={40} /></div>
            <p className="text-slate-400 text-2xl font-black uppercase tracking-widest">Awaiting new stories...</p>
          </div>
        )}
      </div>

      {/* Magazine Footer Info */}
      <section className="mt-32 border-t border-slate-100 py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">Stay in the Loop</h4>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">Subscribe to our monthly digest for exclusive travel deals, local Ugandan insights, and global adventure guides.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Your email address" className="flex-grow px-8 py-5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 font-medium" />
            <button className="bg-slate-950 hover:bg-amber-500 text-white font-black px-12 py-5 rounded-2xl transition-all uppercase tracking-widest text-xs">Join Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
