
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Package, BlogPost } from '../types';
import { PACKAGES as INITIAL_PACKAGES, BLOG_POSTS as INITIAL_BLOGS } from '../constants';

// Supabase Configuration
const SUPABASE_URL = 'https://goxpwwrtonavvvijwvmw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mfAHnhWwCb6EVEOBGIsK0w_xBESkd1c';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface DataContextType {
  packages: Package[];
  blogs: BlogPost[];
  loading: boolean;
  addPackage: (pkg: Package) => Promise<void>;
  updatePackage: (pkg: Package) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  addBlog: (blog: BlogPost) => Promise<void>;
  updateBlog: (blog: BlogPost) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();

    // Subscribe to Real-time changes
    const packagesChannel = supabase
      .channel('public:packages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'packages' }, (payload) => {
        console.log('Real-time package update:', payload.eventType);
        if (payload.eventType === 'INSERT') {
          setPackages(prev => {
            if (prev.some(p => p.id === payload.new.id)) return prev;
            return [payload.new as Package, ...prev];
          });
        } else if (payload.eventType === 'UPDATE') {
          setPackages(prev => prev.map(p => p.id === payload.new.id ? (payload.new as Package) : p));
        } else if (payload.eventType === 'DELETE') {
          setPackages(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();

    const blogsChannel = supabase
      .channel('public:blogs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, (payload) => {
        console.log('Real-time blog update:', payload.eventType);
        if (payload.eventType === 'INSERT') {
          setBlogs(prev => {
            if (prev.some(b => b.id === payload.new.id)) return prev;
            return [payload.new as BlogPost, ...prev];
          });
        } else if (payload.eventType === 'UPDATE') {
          setBlogs(prev => prev.map(b => b.id === payload.new.id ? (payload.new as BlogPost) : b));
        } else if (payload.eventType === 'DELETE') {
          setBlogs(prev => prev.filter(b => b.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(packagesChannel);
      supabase.removeChannel(blogsChannel);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      console.log('Syncing starting data from Supabase...');
      setLoading(true);

      // Fetch Packages and Blogs in parallel
      const [pkgResult, blogResult] = await Promise.all([
        supabase
          .from('packages')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (pkgResult.error) throw pkgResult.error;
      if (blogResult.error) throw blogResult.error;

      // Only overwrite if we actually got data from Supabase
      if (pkgResult.data && pkgResult.data.length > 0) {
        setPackages(pkgResult.data);
      }
      if (blogResult.data && blogResult.data.length > 0) {
        setBlogs(blogResult.data);
      }
      console.log('Initial sync complete.');

    } catch (err) {
      console.error('Supabase fetch error:', err);
      // Fallback to constants
      setPackages(INITIAL_PACKAGES);
      setBlogs(INITIAL_BLOGS);
    } finally {
      setLoading(false);
    }
  };

  const addPackage = async (pkg: Package) => {
    const { id, ...pkgData } = pkg;
    const { data, error } = await supabase.from('packages').insert([pkgData]).select();
    if (error) {
      console.error('Error adding package:', error);
      return;
    }
    if (data) setPackages([data[0], ...packages]);
  };

  const updatePackage = async (pkg: Package) => {
    const { error } = await supabase.from('packages').update(pkg).eq('id', pkg.id);
    if (error) {
      console.error('Error updating package:', error);
      return;
    }
    setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
  };

  const deletePackage = async (id: string) => {
    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (error) {
      console.error('Error deleting package:', error);
      return;
    }
    setPackages(packages.filter(p => p.id !== id));
  };

  const addBlog = async (blog: BlogPost) => {
    const { id, ...blogData } = blog;
    const { data, error } = await supabase.from('blogs').insert([blogData]).select();
    if (error) {
      console.error('Error adding blog:', error);
      return;
    }
    if (data) setBlogs([data[0], ...blogs]);
  };

  const updateBlog = async (blog: BlogPost) => {
    const { error } = await supabase.from('blogs').update(blog).eq('id', blog.id);
    if (error) {
      console.error('Error updating blog:', error);
      return;
    }
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b));
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      console.error('Error deleting blog:', error);
      return;
    }
    setBlogs(blogs.filter(b => b.id !== id));
  };

  return (
    <DataContext.Provider value={{
      packages, blogs, loading,
      addPackage, updatePackage, deletePackage,
      addBlog, updateBlog, deleteBlog
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
