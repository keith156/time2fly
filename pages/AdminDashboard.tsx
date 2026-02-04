import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package as PackageIcon, FileText, Plus, Edit, Trash2, LogOut, Upload, X, User, MapPin, Star } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { Package, BlogPost, Destination } from '../types';

const AdminDashboard: React.FC = () => {
  const {
    packages, blogs, destinations,
    addPackage, updatePackage, deletePackage,
    addBlog, updateBlog, deleteBlog,
    addDestination, updateDestination, deleteDestination
  } = useData();

  const [activeTab, setActiveTab] = useState<'packages' | 'blogs' | 'destinations'>('packages');
  const [editingPackage, setEditingPackage] = useState<Partial<Package> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingDest, setEditingDest] = useState<Partial<Destination> | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('t2f_admin_auth');
    navigate('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'pkg' | 'blog' | 'dest') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'pkg') setEditingPackage(prev => ({ ...prev, image: base64String }));
        else if (type === 'blog') setEditingBlog(prev => ({ ...prev, image: base64String }));
        else setEditingDest(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const savePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    const pkg = {
      ...editingPackage,
      id: editingPackage.id || Date.now().toString(),
      rating: editingPackage.rating || 5,
      isStarred: editingPackage.isStarred || false
    } as Package;

    if (editingPackage.id) updatePackage(pkg);
    else addPackage(pkg);
    setEditingPackage(null);
  };

  const saveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    const blog = {
      ...editingBlog,
      id: editingBlog.id || Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: editingBlog.author || 'Editorial Team',
    } as BlogPost;

    if (editingBlog.id) updateBlog(blog);
    else addBlog(blog);
    setEditingBlog(null);
  };

  const saveDest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;
    const dest = {
      ...editingDest,
      id: editingDest.id || Date.now().toString(),
    } as Destination;

    if (editingDest.id) updateDestination(dest);
    else addDestination(dest);
    setEditingDest(null);
  };

  const toggleStar = (pkg: Package) => {
    updatePackage({ ...pkg, isStarred: !pkg.isStarred });
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'packages': return setEditingPackage({});
      case 'blogs': return setEditingBlog({});
      case 'destinations': return setEditingDest({});
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden p-2 border border-slate-100">
              <img src="/assets/logo.png" alt="Time2Fly Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Dashboard</h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Content Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 max-w-lg">
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'packages' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <PackageIcon size={16} />
            <span>Packages</span>
          </button>
          <button
            onClick={() => setActiveTab('destinations')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'destinations' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <MapPin size={16} />
            <span>Regions</span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'blogs' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <FileText size={16} />
            <span>Blogs</span>
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={renderActiveForm}
          className="mb-8 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          <span>Add New {activeTab === 'packages' ? 'Package' : activeTab === 'blogs' ? 'Post' : 'Destination'}</span>
        </button>

        {/* Modals (Package, Blog, Destination) */}
        {editingPackage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-[40px]">
                <h2 className="text-2xl font-black uppercase tracking-tighter">{editingPackage.id ? 'Edit' : 'Create'} Tour Package</h2>
                <button onClick={() => setEditingPackage(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={savePackage} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Destination Name</label>
                    <input type="text" value={editingPackage.destination || ''} onChange={e => setEditingPackage({ ...editingPackage, destination: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="e.g. Paris, France" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Price ($)</label>
                    <input type="number" value={editingPackage.price || ''} onChange={e => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="e.g. 1200" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Duration</label>
                    <input type="text" value={editingPackage.duration || ''} onChange={e => setEditingPackage({ ...editingPackage, duration: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="e.g. 7 Days" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Image Upload</label>
                    <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-amber-500 transition-colors">
                      {editingPackage.image ? (
                        <div className="relative h-32 w-full">
                          <img src={editingPackage.image} className="h-full w-full object-cover rounded-xl" />
                          <button type="button" onClick={() => setEditingPackage({ ...editingPackage, image: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"><X size={14} /></button>
                        </div>
                      ) : (
                        <div className="py-4">
                          <Upload className="mx-auto text-slate-400 mb-2" />
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Click to Upload</p>
                        </div>
                      )}
                      <input type="file" onChange={e => handleImageUpload(e, 'pkg')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea rows={3} value={editingPackage.description || ''} onChange={e => setEditingPackage({ ...editingPackage, description: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="Short catchphrase..." required></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Detailed Itinerary</label>
                  <textarea rows={6} value={editingPackage.itinerary || ''} onChange={e => setEditingPackage({ ...editingPackage, itinerary: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="Day 1: Arrival... Day 2: Tour..."></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-amber-500 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest">Save Package</button>
                  <button type="button" onClick={() => setEditingPackage(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-5 rounded-2xl transition-all uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-[40px]">
                <h2 className="text-2xl font-black uppercase tracking-tighter">{editingBlog.id ? 'Edit' : 'Create'} Blog Post</h2>
                <button onClick={() => setEditingBlog(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={saveBlog} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Blog Title</label>
                    <input type="text" value={editingBlog.title || ''} onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Category</label>
                    <input type="text" value={editingBlog.category || ''} onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="e.g. Travel Tips" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Writer / Author Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" value={editingBlog.author || ''} onChange={e => setEditingBlog({ ...editingBlog, author: e.target.value })} className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="e.g. John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Blog Banner Upload</label>
                    <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-amber-500 transition-colors">
                      {editingBlog.image ? (
                        <div className="relative h-24 w-full">
                          <img src={editingBlog.image} className="h-full w-full object-cover rounded-xl" />
                          <button type="button" onClick={() => setEditingBlog({ ...editingBlog, image: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={14} /></button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto text-slate-400 mb-1" size={24} />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Banner</p>
                        </div>
                      )}
                      <input type="file" onChange={e => handleImageUpload(e, 'blog')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Short Excerpt</label>
                  <input type="text" value={editingBlog.excerpt || ''} onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Content</label>
                  <textarea rows={10} value={editingBlog.content || ''} onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="Write your blog post here..." required></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-amber-500 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest">Publish Post</button>
                  <button type="button" onClick={() => setEditingBlog(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-5 rounded-2xl transition-all uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingDest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-[40px]">
                <h2 className="text-2xl font-black uppercase tracking-tighter">{editingDest.id ? 'Edit' : 'Create'} Destination</h2>
                <button onClick={() => setEditingDest(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={saveDest} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Country/Region Name</label>
                    <input type="text" value={editingDest.name || ''} onChange={e => setEditingDest({ ...editingDest, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="e.g. Switzerland" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Hero Image Upload</label>
                    <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-amber-500 transition-colors">
                      {editingDest.image ? (
                        <div className="relative h-32 w-full">
                          <img src={editingDest.image} className="h-full w-full object-cover rounded-xl" />
                          <button type="button" onClick={() => setEditingDest({ ...editingDest, image: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"><X size={14} /></button>
                        </div>
                      ) : (
                        <div className="py-4">
                          <Upload className="mx-auto text-slate-400 mb-2" />
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upload Landscape</p>
                        </div>
                      )}
                      <input type="file" onChange={e => handleImageUpload(e, 'dest')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Brief Insights/Details</label>
                  <textarea rows={4} value={editingDest.details || ''} onChange={e => setEditingDest({ ...editingDest, details: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-medium" placeholder="Describe the region's appeal..." required></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-amber-500 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest">Save Region</button>
                  <button type="button" onClick={() => setEditingDest(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-5 rounded-2xl transition-all uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Preview</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Details</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeTab === 'packages' ? packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 relative">
                      <img src={pkg.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                      {pkg.isStarred && (
                        <div className="absolute top-4 left-6 bg-red-600 rounded-full p-1 border-2 border-white shadow-lg">
                          <Star size={10} fill="white" className="text-white" />
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 uppercase tracking-tight">{pkg.destination}</p>
                      <p className="text-sm font-bold text-amber-500">${pkg.price} • {pkg.duration}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => toggleStar(pkg)} className={`p-3 rounded-xl transition-all ${pkg.isStarred ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500'}`} title={pkg.isStarred ? 'Unstar' : 'Star for Special Offers'}><Star size={18} fill={pkg.isStarred ? "white" : "none"} /></button>
                        <button onClick={() => setEditingPackage(pkg)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></button>
                        <button onClick={() => deletePackage(pkg.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )) : activeTab === 'destinations' ? destinations.map(dest => (
                  <tr key={dest.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <img src={dest.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 uppercase tracking-tight">{dest.name}</p>
                      <p className="text-xs font-bold text-slate-400 line-clamp-1">{dest.details}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => setEditingDest(dest)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></button>
                        <button onClick={() => deleteDestination(dest.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )) : blogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <img src={blog.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 uppercase tracking-tight">{blog.title}</p>
                      <p className="text-sm font-bold text-slate-500">{blog.category} • {blog.date} • By {blog.author}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => setEditingBlog(blog)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></button>
                        <button onClick={() => deleteBlog(blog.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;