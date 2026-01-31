
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
  const [packages, setPackages] = useState<Package[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
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

      // Only use INITIAL data if Supabase is empty
      setPackages(pkgResult.data && pkgResult.data.length > 0 ? pkgResult.data : INITIAL_PACKAGES);
      setBlogs(blogResult.data && blogResult.data.length > 0 ? blogResult.data : INITIAL_BLOGS);

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
