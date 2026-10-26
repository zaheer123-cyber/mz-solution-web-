import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Code,
  Layers,
  Smartphone,
  Cloud,
  ShoppingCart,
  ShieldCheck,
  Palette,
  TrendingUp,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';

const iconOptions = [
  'Code',
  'Layers',
  'Smartphone',
  'Cloud',
  'ShoppingCart',
  'ShieldCheck',
  'Palette',
  'TrendingUp'
];

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: 'Code',
    description: '',
    benefits: '',
    startingPrice: '',
    order: 0,
    published: true
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services/admin/all');
      if (res.data?.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      icon: 'Code',
      description: '',
      benefits: '',
      startingPrice: '',
      order: services.length + 1,
      published: true
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditingService(s);
    setFormData({
      title: s.title || '',
      slug: s.slug || '',
      icon: s.icon || 'Code',
      description: s.description || '',
      benefits: Array.isArray(s.benefits) ? s.benefits.join('\n') : '',
      startingPrice: s.startingPrice || '',
      order: s.order || 0,
      published: Boolean(s.published)
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingService ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const payload = {
        ...formData,
        benefits: formData.benefits.split('\n').map(b => b.trim()).filter(Boolean)
      };

      if (editingService) {
        await api.put(`/services/${editingService._id}`, payload);
      } else {
        await api.post('/services', payload);
      }

      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) {
      return;
    }

    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      alert('Failed to delete service: ' + err.message);
    }
  };

  const togglePublish = async (s) => {
    try {
      const updated = !s.published;
      await api.put(`/services/${s._id}`, { published: updated });
      setServices(services.map(item => item._id === s._id ? { ...item, published: updated } : item));
    } catch (err) {
      alert('Failed to update service status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Services Management</h2>
          <p className="text-xs text-slate-400">Configure public service packages, feature bullet points, and pricing</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4F8CFF] hover:bg-[#3B76EB] text-white text-xs font-semibold rounded-xl shadow-md shadow-[#4F8CFF]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-[#141821] border border-[#1F2638] rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin text-[#4F8CFF] mb-2" />
            <span className="text-xs">Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No services found. Click "New Service" to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0E121A] text-slate-400 uppercase tracking-wider text-[11px] border-b border-[#1F2638]">
                <tr>
                  <th className="py-3.5 px-6">Service</th>
                  <th className="py-3.5 px-6">Icon</th>
                  <th className="py-3.5 px-6">Starting Price</th>
                  <th className="py-3.5 px-6">Order</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2638]">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-[#181E2B] transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-white">{s.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-sm">{s.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-lg bg-[#1A2234] text-[#4F8CFF] font-mono text-[11px] border border-[#273552]">
                        {s.icon}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-medium">
                      {s.startingPrice || 'Custom Quote'}
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                      {s.order}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => togglePublish(s)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase transition-colors ${
                          s.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-700/30 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                        }`}
                      >
                        {s.published ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#4F8CFF] hover:bg-[#232B3D]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id, s.title)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141821] border border-[#1F2638] rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F2638] pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingService ? 'Edit Service' : 'Create New Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A202E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Icon Style
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Service Description *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Key Benefits (one per line)
                </label>
                <textarea
                  rows="3"
                  placeholder="Custom API Integrations&#10;Real-time Features&#10;High Security Standards"
                  value={formData.benefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Starting Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $2,500 or $500/mo"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded bg-[#0B0D12] border-[#1F2638] text-[#4F8CFF] focus:ring-0"
                  />
                  <span>Show on public website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1F2638]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A202E] hover:bg-[#232B3D] text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#4F8CFF] hover:bg-[#3B76EB] text-xs font-semibold text-white shadow-md shadow-[#4F8CFF]/20 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingService ? 'Save Changes' : 'Create Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
