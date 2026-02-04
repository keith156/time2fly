
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Package, BlogPost, Destination } from '../types';
import { PACKAGES as INITIAL_PACKAGES, BLOG_POSTS as INITIAL_BLOGS, DESTINATIONS as INITIAL_DESTINATIONS } from '../constants';

// Supabase Configuration
const SUPABASE_URL = 'https://goxpwwrtonavvvijwvmw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mfAHnhWwCb6EVEOBGIsK0w_xBESkd1c';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface DataContextType {
  packages: Package[];
  blogs: BlogPost[];
  destinations: Destination[];
  loading: boolean;
  addPackage: (pkg: Package) => Promise<void>;
  updatePackage: (pkg: Package) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  addBlog: (blog: BlogPost) => Promise<void>;
  updateBlog: (blog: BlogPost) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  addDestination: (dest: Destination) => Promise<void>;
  updateDestination: (dest: Destination) => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 't2f_cached_data';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Try to load from LocalStorage first for instant UI
    const cachedData = localStorage.getItem(STORAGE_KEY);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (parsed.packages) setPackages(parsed.packages);
        if (parsed.blogs) setBlogs(parsed.blogs);
        if (parsed.destinations) setDestinations(parsed.destinations);
      } catch (e) {
        console.error("Cache parsing error", e);
      }
    }

    fetchInitialData();

    // Subscribe to Real-time changes
    const fetchTableSync = (table: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
      return supabase
        .channel(`public:${table}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
          if (payload.eventType === 'INSERT') {
            setter(prev => {
              const next = prev.some(item => item.id === payload.new.id) ? prev : [payload.new, ...prev];
              return next;
            });
          } else if (payload.eventType === 'UPDATE') {
            setter(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
          } else if (payload.eventType === 'DELETE') {
            setter(prev => prev.filter(item => item.id !== payload.old.id));
          }
        })
        .subscribe();
    };

    const packagesChannel = fetchTableSync('packages', setPackages);
    const blogsChannel = fetchTableSync('blogs', setBlogs);
    const destinationsChannel = fetchTableSync('destinations', setDestinations);

    return () => {
      supabase.removeChannel(packagesChannel);
      supabase.removeChannel(blogsChannel);
      supabase.removeChannel(destinationsChannel);
    };
  }, []);

  // CRITICAL: Auto-save ANY change (real-time or local) to localStorage
  // This ensures other devices see the update next time they open the site
  useEffect(() => {
    const dataToCache = {
      packages,
      blogs,
      destinations,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
  }, [packages, blogs, destinations]);

  const fetchInitialData = async () => {
    try {
      // Only show spinner if we have NO data at all
      const hasData = packages.length > 0 || destinations.length > 0;
      if (!hasData) setLoading(true);

      const [pkgResult, blogResult, destResult] = await Promise.all([
        supabase.from('packages').select('*').order('created_at', { ascending: false }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('destinations').select('*').order('created_at', { ascending: false })
      ]);

      if (pkgResult.data && pkgResult.data.length > 0) setPackages(pkgResult.data);
      if (blogResult.data && blogResult.data.length > 0) setBlogs(blogResult.data);
      if (destResult.data && destResult.data.length > 0) setDestinations(destResult.data);

    } catch (err) {
      console.error('Supabase fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPackage = async (pkg: Package) => {
    const { id, ...pkgData } = pkg;
    const { data, error } = await supabase.from('packages').insert([pkgData]).select();
    if (data) setPackages([data[0], ...packages]);
  };

  const updatePackage = async (pkg: Package) => {
    await supabase.from('packages').update(pkg).eq('id', pkg.id);
    setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
  };

  const deletePackage = async (id: string) => {
    await supabase.from('packages').delete().eq('id', id);
    setPackages(packages.filter(p => p.id !== id));
  };

  const addBlog = async (blog: BlogPost) => {
    const { id, ...blogData } = blog;
    const { data, error } = await supabase.from('blogs').insert([blogData]).select();
    if (data) setBlogs([data[0], ...blogs]);
  };

  const updateBlog = async (blog: BlogPost) => {
    await supabase.from('blogs').update(blog).eq('id', blog.id);
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b));
  };

  const deleteBlog = async (id: string) => {
    await supabase.from('blogs').delete().eq('id', id);
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const addDestination = async (dest: Destination) => {
    const { id, ...destData } = dest;
    const { data } = await supabase.from('destinations').insert([destData]).select();
    if (data) setDestinations([data[0], ...destinations]);
  };

  const updateDestination = async (dest: Destination) => {
    await supabase.from('destinations').update(dest).eq('id', dest.id);
    setDestinations(destinations.map(d => d.id === dest.id ? dest : d));
  };

  const deleteDestination = async (id: string) => {
    await supabase.from('destinations').delete().eq('id', id);
    setDestinations(destinations.filter(d => d.id !== id));
  };

  return (
    <DataContext.Provider value={{
      packages, blogs, destinations, loading,
      addPackage, updatePackage, deletePackage,
      addBlog, updateBlog, deleteBlog,
      addDestination, updateDestination, deleteDestination
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
