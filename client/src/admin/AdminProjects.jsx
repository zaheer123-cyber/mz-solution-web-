import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Check,
  X,
  Upload,
  Loader2,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'SaaS',
    technologies: '',
    shortDescription: '',
    description: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    clientName: '',
    featured: false,
    published: true,
    order: 0
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects/admin/all', {
        params: { search, category: categoryFilter }
      });
      if (res.data?.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: 'SaaS',
      technologies: '',
      shortDescription: '',
      description: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      clientName: '',
      featured: false,
      published: true,
      order: projects.length + 1
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      category: project.category || 'SaaS',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      shortDescription: project.shortDescription || '',
      description: project.description || '',
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      clientName: project.clientName || '',
      featured: Boolean(project.featured),
      published: Boolean(project.published),
      order: project.order || 0
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingProject ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploadingImage(true);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.success && res.data.fileUrl) {
        setFormData(prev => ({ ...prev, image: res.data.fileUrl }));
      }
    } catch (err) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  const togglePublish = async (project) => {
    try {
      const updated = !project.published;
      await api.put(`/projects/${project._id}`, { published: updated });
      setProjects(projects.map(p => p._id === project._id ? { ...p, published: updated } : p));
    } catch (err) {
      alert('Failed to update publication status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Management</h2>
          <p className="text-xs text-slate-400">Add, edit, publish, and curate portfolio projects</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4F8CFF] hover:bg-[#3B76EB] text-white text-xs font-semibold rounded-xl shadow-md shadow-[#4F8CFF]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF]"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
          >
            <option value="All">All Categories</option>
            <option value="SaaS">SaaS</option>
            <option value="Web Apps">Web Apps</option>
            <option value="Fintech">Fintech</option>
            <option value="E-commerce">E-commerce</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#141821] border border-[#1F2638] rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin text-[#4F8CFF] mb-2" />
            <span className="text-xs">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No projects found. Click "New Project" to create your first portfolio entry.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0E121A] text-slate-400 uppercase tracking-wider text-[11px] border-b border-[#1F2638]">
                <tr>
                  <th className="py-3.5 px-6">Project</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Featured</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2638]">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-[#181E2B] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80'}
                          alt={p.title}
                          className="w-12 h-9 rounded-lg object-cover border border-[#1F2638] bg-[#0E121A]"
                        />
                        <div>
                          <p className="font-bold text-white">{p.title}</p>
                          <p className="text-[11px] text-slate-400">/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => togglePublish(p)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase transition-colors ${
                          p.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-700/30 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                        }`}
                      >
                        {p.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      {p.featured ? (
                        <span className="text-emerald-400 font-semibold text-xs">Yes</span>
                      ) : (
                        <span className="text-slate-500 text-xs">No</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View Live Page"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#232B3D]"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(p)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#4F8CFF] hover:bg-[#232B3D]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id, p.title)}
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

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141821] border border-[#1F2638] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F2638] pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
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
                    Project Title *
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
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="Web Apps">Web Apps</option>
                    <option value="Fintech">Fintech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="AI">AI</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB, Tailwind"
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>
              </div>

              {/* Image URL and Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or upload below"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                  <label className="px-3 py-2.5 bg-[#1B212E] hover:bg-[#252E40] border border-[#232B3D] rounded-xl text-xs font-semibold text-white cursor-pointer flex items-center gap-1.5">
                    {uploadingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Short Summary
                </label>
                <input
                  type="text"
                  placeholder="One sentence summary for cards..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Project Description *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://demo.mzsolution.com"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    GitHub / Source Code URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded bg-[#0B0D12] border-[#1F2638] text-[#4F8CFF] focus:ring-0"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded bg-[#0B0D12] border-[#1F2638] text-[#4F8CFF] focus:ring-0"
                  />
                  <span>Publish Immediately</span>
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
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
