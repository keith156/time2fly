
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Package, BlogPost, Destination } from '../types';
import { compressImage } from '../utils/imageCompression';

// Supabase Configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface DataContextType {
  packages: Package[];
  blogs: BlogPost[];
  destinations: Destination[];
  loading: boolean;
  lastUpdated: string | null;
  refreshData: () => Promise<void>;
  isUploading: boolean;
  addPackage: (pkg: Package) => Promise<void>;
  updatePackage: (pkg: Package) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  addBlog: (blog: BlogPost) => Promise<void>;
  updateBlog: (blog: BlogPost) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  addDestination: (dest: Destination) => Promise<void>;
  updateDestination: (dest: Destination) => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
  migrateLocalData: () => Promise<{ packages: number; blogs: number; destinations: number }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true); // Start loading by default
  const [isUploading, setIsUploading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Initial Fetch & Real-time Subscription
  useEffect(() => {
    fetchInitialData();

    // Subscribe to Real-time changes
    const fetchTableSync = (table: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
      const channel = supabase.channel(`public:${table}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
          console.log(`Real-time update for ${table}:`, payload.eventType);
          if (payload.eventType === 'INSERT') {
            setter(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setter(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
          } else if (payload.eventType === 'DELETE') {
            setter(prev => prev.filter(item => item.id !== payload.old.id));
          }
          setLastUpdated(new Date().toISOString());
        })
        .subscribe();

      return channel;
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

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [pkgResult, blogResult, destResult] = await Promise.all([
        supabase.from('packages').select('*').order('created_at', { ascending: false }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('destinations').select('*').order('created_at', { ascending: false })
      ]);

      if (pkgResult.data) setPackages(pkgResult.data);
      if (blogResult.data) setBlogs(blogResult.data);
      if (destResult.data) setDestinations(destResult.data);

      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error('Supabase fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchInitialData();
  };

  const uploadImage = async (base64String: string, path: string): Promise<string> => {
    if (!base64String.startsWith('data:')) return base64String;

    try {
      const blob = await compressImage(base64String);
      const contentType = 'image/jpeg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, blob, { contentType, upsert: true });

      if (uploadError) throw new Error('Image upload failed');

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Image upload critical error:', err);
      throw err;
    }
  };

  // CRUD Operations - Direct to Supabase (Optimistic updates are handled by Realtime subscription mostly, 
  // but we can locally update for instant feedback if Realtime is slow, though Realtime is preferred for consistency)

  const addPackage = async (pkg: Package) => {
    setIsUploading(true);
    try {
      const { id, ...pkgData } = pkg;
      if (pkgData.image) pkgData.image = await uploadImage(pkgData.image, 'packages');

      const { data, error } = await supabase.from('packages').insert([pkgData]).select().single();
      if (error) {
        console.error('Package insert error:', error);
      } else if (data) {
        setPackages(prev => [data, ...prev]);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const updatePackage = async (pkg: Package) => {
    setIsUploading(true);
    try {
      const updatedPkg = { ...pkg };
      if (updatedPkg.image && updatedPkg.image.startsWith('data:')) {
        updatedPkg.image = await uploadImage(updatedPkg.image, 'packages');
      }
      const { data, error } = await supabase.from('packages').update(updatedPkg).eq('id', pkg.id).select().single();
      if (error) {
        console.error('Package update error:', error);
      } else if (data) {
        setPackages(prev => prev.map(item => item.id === pkg.id ? data : item));
      }
    } finally {
      setIsUploading(false);
    }
  };

  const deletePackage = async (id: string) => {
    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (error) {
      console.error('Package delete error:', error);
    } else {
      setPackages(prev => prev.filter(item => item.id !== id));
    }
  };

  const addBlog = async (blog: BlogPost) => {
    setIsUploading(true);
    try {
      const { id, ...blogData } = blog;
      if (blogData.image) blogData.image = await uploadImage(blogData.image, 'blogs');

      const { data, error } = await supabase.from('blogs').insert([blogData]).select().single();
      if (error) {
        console.error('Blog insert error:', error);
      } else if (data) {
        setBlogs(prev => [data, ...prev]);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const updateBlog = async (blog: BlogPost) => {
    setIsUploading(true);
    try {
      const updatedBlog = { ...blog };
      if (updatedBlog.image && updatedBlog.image.startsWith('data:')) {
        updatedBlog.image = await uploadImage(updatedBlog.image, 'blogs');
      }
      const { data, error } = await supabase.from('blogs').update(updatedBlog).eq('id', blog.id).select().single();
      if (error) {
        console.error('Blog update error:', error);
      } else if (data) {
        setBlogs(prev => prev.map(item => item.id === blog.id ? data : item));
      }
    } finally {
      setIsUploading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      console.error('Blog delete error:', error);
    } else {
      setBlogs(prev => prev.filter(item => item.id !== id));
    }
  };

  const addDestination = async (dest: Destination) => {
    setIsUploading(true);
    try {
      const { id, ...destData } = dest;
      if (destData.image) destData.image = await uploadImage(destData.image, 'destinations');

      const { data, error } = await supabase.from('destinations').insert([destData]).select().single();
      if (error) {
        console.error('Destination insert error:', error);
      } else if (data) {
        setDestinations(prev => [data, ...prev]);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const updateDestination = async (dest: Destination) => {
    setIsUploading(true);
    try {
      const updatedDest = { ...dest };
      if (updatedDest.image && updatedDest.image.startsWith('data:')) {
        updatedDest.image = await uploadImage(updatedDest.image, 'destinations');
      }
      const { data, error } = await supabase.from('destinations').update(updatedDest).eq('id', dest.id).select().single();
      if (error) {
        console.error('Destination update error:', error);
      } else if (data) {
        setDestinations(prev => prev.map(item => item.id === dest.id ? data : item));
      }
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDestination = async (id: string) => {
    const { error } = await supabase.from('destinations').delete().eq('id', id);
    if (error) {
      console.error('Destination delete error:', error);
    } else {
      setDestinations(prev => prev.filter(item => item.id !== id));
    }
  };

  const migrateLocalData = async () => {
    // Migration is no longer needed/supported in the strict sync version
    // returning empty counts
    return { packages: 0, blogs: 0, destinations: 0 };
  };

  return (
    <DataContext.Provider value={{
      packages, blogs, destinations, loading, isUploading, lastUpdated, refreshData,
      addPackage, updatePackage, deletePackage,
      addBlog, updateBlog, deleteBlog,
      addDestination, updateDestination, deleteDestination,
      migrateLocalData
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
