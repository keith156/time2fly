
import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Bookmark, Clock, ChevronRight, Hash, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';
import SEO from '../components/SEO.tsx';

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

  if (selectedPost) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        <SEO
          title={`${selectedPost.title} | Time2Fly Blog`}
          description={selectedPost.excerpt}
          url={`https://time2flytnt.com/#/blog`}
          image={selectedPost.image}
        />
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
              width={1600}
              height={900}
              className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-110"
              style={{ transform: 'scale(1)' }}
              onLoad={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center pb-24 px-6">
              <div className="max-w-4xl w-full text-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 inline-flex items-center text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-[#0000ff] transition-colors group bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-slate-100"
                >
                  <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-2 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="h-[2px] w-8 bg-[#0000ff]"></span>
                  <span className="text-[#0000ff] text-xs font-black uppercase tracking-[0.3em]">{selectedPost.category}</span>
                  <span className="h-[2px] w-8 bg-[#0000ff]"></span>
                </div>
                <h1 className="text-h2 text-slate-900 mb-10">
                  {selectedPost.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center"><Calendar size={14} className="mr-2 text-[#0000ff]" /> {selectedPost.date}</span>
                  <span className="flex items-center"><User size={14} className="mr-2 text-[#0000ff]" /> {selectedPost.author}</span>
                  <span className="flex items-center"><Clock size={14} className="mr-2 text-[#0000ff]" /> 8 MIN READ</span>
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
                  <p className="text-h4 text-slate-900 mb-16 italic">
                    "{selectedPost.excerpt}"
                  </p>

                  <div className="text-body-lg text-slate-700 space-y-10 whitespace-pre-wrap">
                    {selectedPost.content || `
                      Traveling the world isn't just about seeing new places; it's about shifting your perspective. At Time2Fly, we believe every journey should be as unique as the traveler embarking on it.

                      When you step off that plane, you aren't just a tourist. You're a guest in someone else's home, a student of history, and an explorer of the unknown. This particular destination offers a blend of sensory experiences that simply cannot be captured in photographs alone.

                      The local culture here is deeply rooted in traditions that span centuries, yet there's a modern energy that's impossible to ignore. Whether you're navigating the bustling street markets or seeking silence in ancient ruins, you'll find that this place stays with you long after you've returned home.
                    `}
                  </div>
                </div>

                <div className="mt-24 p-12 bg-gradient-to-br from-[#0000ff] to-blue-700 rounded-[60px] relative overflow-hidden text-center group shadow-2xl shadow-blue-200">
                  <div className="absolute inset-0 opacity-10 transition-transform duration-[5000ms] group-hover:scale-110">
                    <img src={selectedPost.image} width={600} height={400} className="w-full h-full object-cover grayscale" loading="lazy" decoding="async" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-h3 text-white mb-4">Inspired by this story?</h3>
                    <p className="text-body-lg text-blue-100 mb-10 max-w-md mx-auto italic">Explore our custom packages to experience this destination for yourself.</p>
                    <button className="bg-white hover:bg-amber-400 hover:text-white text-[#0000ff] font-black px-12 py-5 rounded-full transition-all uppercase tracking-widest text-xs">Book the Journey</button>
                  </div>
                </div>
              </div>

              {/* Related/Author Info */}
              <div className="lg:col-span-3">
                <div className="sticky top-32 space-y-12">
                  <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                    <h4 className="text-caption text-amber-600 mb-6">About the Author</h4>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-amber-500 text-xl shadow-lg">
                        {selectedPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-body text-slate-900 font-black">{selectedPost.author}</p>
                        <p className="text-caption text-slate-400">Travel Expert</p>
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
    <div className="pt-24 bg-white pb-0">
      <SEO
        title="Travel Journal & Insights | Time2Fly Tours & Travel Ltd"
        description="Read our latest travel guides, tips, and inspiring stories from around the globe to help plan your next adventure."
        url="https://time2flytnt.com/#/blog"
      />
      {/* Mesmerizing Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white"></div>

        {/* Decorative background elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="h-[1px] w-12 bg-[#0000ff]"></span>
            <span className="text-[#0000ff] text-xs font-black uppercase tracking-[0.5em]">Global Perspectives</span>
            <span className="h-[1px] w-12 bg-[#0000ff]"></span>
          </div>

          <h1 className="text-h1 text-slate-900 mb-8 animate-fade-in-up">
            THE TRAVEL
            <span className="relative">
              <span className="relative z-10 text-[#0000ff]">JOURNAL</span>
            </span>
          </h1>

          <div className="max-w-xl relative py-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-h3 text-slate-800 italic">
              "Explore the world, <br />
              <span className="text-[#0000ff]">Travelling is knowledge</span>"
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-400">
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curated Insights from Uganda</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Mesmerizing Feed Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-slate-100 group flex flex-col h-full animate-fade-in-up"
            >
              <div
                className="relative overflow-hidden cursor-pointer h-[280px]"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={280}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-6 left-6 flex space-x-2">
                  <span className="bg-white/20 backdrop-blur-md text-black border border-white/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex items-center text-white text-[10px] font-black uppercase tracking-widest">
                    Explore Story <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div>
                  <div className="flex items-center space-x-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center"><Calendar size={14} className="mr-1.5 text-[#0000ff]" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1.5 text-[#0000ff]" /> {post.author.split(' ')[0]}</span>
                  </div>
                  <h2
                    className="text-h4 text-slate-900 mb-4 hover:text-[#0000ff] transition-colors cursor-pointer line-clamp-2"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.title}
                  </h2>
                  <p className="text-body text-slate-500 mb-6 line-clamp-3 italic flex-grow">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center text-slate-950 font-black uppercase tracking-widest text-[10px] group-hover:text-[#0000ff] transition-colors"
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
      <section className="mt-4 border-t border-slate-100 py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h4 className="text-h3 text-slate-900 uppercase tracking-tighter mb-4">Stay in the Loop</h4>
          <p className="text-body text-slate-500 mb-8">Subscribe to our monthly digest for exclusive travel deals, local Ugandan insights, and global adventure guides.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Your email address" className="flex-grow px-8 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0000ff] font-medium" />
            <button className="bg-slate-950 hover:bg-[#0000ff] text-white font-black px-12 py-4 rounded-2xl transition-all uppercase tracking-widest text-xs">Join Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

