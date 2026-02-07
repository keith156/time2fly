
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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 't2f_cached_data';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    // 1. Try to load from LocalStorage first for instant UI
    const cachedData = localStorage.getItem(STORAGE_KEY);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (parsed.packages) setPackages(parsed.packages);
        if (parsed.blogs) setBlogs(parsed.blogs);
        if (parsed.destinations) setDestinations(parsed.destinations);
        if (parsed.lastUpdated) setLastUpdated(parsed.lastUpdated);
      } catch (e) {
        console.error("Cache parsing error", e);
      }
    }

    fetchInitialData();

    // Subscribe to Real-time changes with automatic reconnection handling
    const fetchTableSync = (table: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
      const channel = supabase.channel(`public:${table}`);

      channel
        .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
          console.log(`Real-time update for ${table}:`, payload.eventType);
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
          setLastUpdated(new Date().toISOString());
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`Successfully subscribed to ${table} changes`);
          }
          if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            console.warn(`Real-time connection ${status} for ${table}. Attempting to re-fetch...`);
            fetchInitialData();
          }
        });

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

  // CRITICAL: Auto-save ANY change (real-time or local) to localStorage
  // This ensures other devices see the update next time they open the site
  useEffect(() => {
    try {
      // STRIP LARGE IMAGES FROM CACHE TO PREVENT QUOTA ERRORS
      // We only want the text data (itinerary, description, etc.) cached
      const stripImages = (items: any[]) => items.map(item => {
        const { image, ...rest } = item;
        // Only keep URL images, strip base64
        if (typeof image === 'string' && image.startsWith('data:')) {
          return { ...rest, image: '' };
        }
        return item;
      });

      const dataToCache = {
        packages: stripImages(packages),
        blogs: stripImages(blogs),
        destinations: stripImages(destinations),
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
    } catch (e) {
      console.warn("Storage quota exceeded or unavailable. Clearing cache to maintain stability.", e);
      localStorage.removeItem(STORAGE_KEY);
    }
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
    // If it's already a URL, return it
    if (!base64String.startsWith('data:')) return base64String;

    console.log('Starting image upload...');

    try {
      // Extract content type and base64 data
      const [header, data] = base64String.split(',');
      const contentType = header.split(':')[1].split(';')[0];
      const binary = atob(data);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], { type: contentType });

      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const filePath = `${path}/${fileName}`;

      console.log('Uploading to Supabase Storage...');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, blob, { contentType, upsert: true });

      if (uploadError) {
        console.warn('Supabase Storage upload failed. Using base64 fallback.', uploadError);
        // Fallback: keep base64 in database
        // This ensures upload still works even if storage bucket isn't configured
        return base64String;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('Image upload error. Using base64 fallback:', err);
      // Fallback to base64 so upload doesn't fail completely
      return base64String;
    }
  };

  const addPackage = async (pkg: Package) => {
    console.log('addPackage: Setting isUploading to true');
    setIsUploading(true);
    try {
      const { id, ...pkgData } = pkg;
      if (pkgData.image) {
        pkgData.image = await uploadImage(pkgData.image, 'packages');
      }
      const { data, error } = await supabase.from('packages').insert([pkgData]).select();
      if (data) setPackages([data[0], ...packages]);
      if (error) console.error('Package insert error:', error);
    } finally {
      console.log('addPackage: Setting isUploading to false');
      setIsUploading(false);
    }
  };

  const updatePackage = async (pkg: Package) => {
    console.log('updatePackage: Setting isUploading to true');
    setIsUploading(true);
    try {
      const updatedPkg = { ...pkg };
      if (updatedPkg.image && updatedPkg.image.startsWith('data:')) {
        updatedPkg.image = await uploadImage(updatedPkg.image, 'packages');
      }
      await supabase.from('packages').update(updatedPkg).eq('id', pkg.id);
      setPackages(packages.map(p => p.id === pkg.id ? updatedPkg : p));
    } finally {
      console.log('updatePackage: Setting isUploading to false');
      setIsUploading(false);
    }
  };

  const deletePackage = async (id: string) => {
    await supabase.from('packages').delete().eq('id', id);
    setPackages(packages.filter(p => p.id !== id));
  };

  const addBlog = async (blog: BlogPost) => {
    setIsUploading(true);
    try {
      const { id, ...blogData } = blog;
      if (blogData.image) {
        blogData.image = await uploadImage(blogData.image, 'blogs');
      }
      const { data, error } = await supabase.from('blogs').insert([blogData]).select();
      if (data) setBlogs([data[0], ...blogs]);
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
      await supabase.from('blogs').update(updatedBlog).eq('id', blog.id);
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b));
    } finally {
      setIsUploading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    await supabase.from('blogs').delete().eq('id', id);
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const addDestination = async (dest: Destination) => {
    setIsUploading(true);
    try {
      const { id, ...destData } = dest;
      if (destData.image) {
        destData.image = await uploadImage(destData.image, 'destinations');
      }
      const { data } = await supabase.from('destinations').insert([destData]).select();
      if (data) setDestinations([data[0], ...destinations]);
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
      await supabase.from('destinations').update(updatedDest).eq('id', dest.id);
      setDestinations(destinations.map(d => d.id === dest.id ? updatedDest : d));
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDestination = async (id: string) => {
    await supabase.from('destinations').delete().eq('id', id);
    setDestinations(destinations.filter(d => d.id !== id));
  };

  return (
    <DataContext.Provider value={{
      packages, blogs, destinations, loading, isUploading, lastUpdated, refreshData,
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
