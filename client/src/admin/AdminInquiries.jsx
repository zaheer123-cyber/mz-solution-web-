import React, { useEffect, useState } from 'react';
import {
  Search,
  Download,
  Trash2,
  Eye,
  Mail,
  Building,
  DollarSign,
  Calendar,
  X,
  Loader2,
  CheckCircle,
  FileText
} from 'lucide-react';
import api from '../services/api';

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // Detail modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('New');
  const [modalNotes, setModalNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/inquiries', {
        params: { status: statusFilter, search }
      });
      if (res.data?.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleExportCsv = () => {
    window.open(`/api/inquiries/export?status=${statusFilter}`, '_blank');
  };

  const openModal = (inq) => {
    setSelectedInquiry(inq);
    setModalStatus(inq.status || 'New');
    setModalNotes(inq.adminNotes || '');
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedInquiry) return;
    try {
      setUpdating(true);
      const res = await api.patch(`/inquiries/${selectedInquiry._id}`, {
        status: modalStatus,
        adminNotes: modalNotes
      });
      if (res.data?.success) {
        setInquiries(inquiries.map(item => item._id === selectedInquiry._id ? res.data.data : item));
        setIsModalOpen(false);
      }
    } catch (err) {
      alert('Failed to update inquiry: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      return;
    }

    try {
      await api.delete(`/inquiries/${id}`);
      setInquiries(inquiries.filter(i => i._id !== id));
      if (selectedInquiry?._id === id) setIsModalOpen(false);
    } catch (err) {
      alert('Failed to delete inquiry: ' + err.message);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'Contacted':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Contact Inquiries</h2>
          <p className="text-xs text-slate-400">View project leads, update pipelines, and export to CSV</p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#141821] hover:bg-[#1E2536] border border-[#1F2638] text-white text-xs font-semibold rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#4F8CFF]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF]"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'New', 'Contacted', 'In Progress', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#4F8CFF] text-white'
                  : 'bg-[#0B0D12] border border-[#1F2638] text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#141821] border border-[#1F2638] rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin text-[#4F8CFF] mb-2" />
            <span className="text-xs">Loading inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No inquiries found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0E121A] text-slate-400 uppercase tracking-wider text-[11px] border-b border-[#1F2638]">
                <tr>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Service</th>
                  <th className="py-3.5 px-6">Budget</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2638]">
                {inquiries.map((inq) => {
                  const initials = inq.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                  const dateStr = new Date(inq.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <tr key={inq._id} className="hover:bg-[#181E2B] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1F2638] text-[#4F8CFF] font-bold text-xs flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-white">{inq.name}</p>
                            <p className="text-[11px] text-slate-400">{inq.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300 font-medium">
                        {inq.service}
                      </td>
                      <td className="py-4 px-6 text-white font-semibold">
                        {inq.budget || '$1,000 - $5,000'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusBadge(inq.status)}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                        {dateStr}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(inq)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#232B3D]"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(inq._id, inq.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail & Status Update Modal */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141821] border border-[#1F2638] rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F2638] pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Lead Details</h3>
                <p className="text-xs text-slate-400">Received on {new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A202E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#0B0D12] rounded-xl border border-[#1F2638]">
                <span className="text-slate-400 block mb-1">Customer Name</span>
                <span className="font-bold text-white text-sm">{selectedInquiry.name}</span>
              </div>
              <div className="p-3 bg-[#0B0D12] rounded-xl border border-[#1F2638]">
                <span className="text-slate-400 block mb-1">Email Address</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-[#4F8CFF] text-sm break-all">
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="p-3 bg-[#0B0D12] rounded-xl border border-[#1F2638]">
                <span className="text-slate-400 block mb-1">Company</span>
                <span className="font-semibold text-white">{selectedInquiry.company || 'Not provided'}</span>
              </div>
              <div className="p-3 bg-[#0B0D12] rounded-xl border border-[#1F2638]">
                <span className="text-slate-400 block mb-1">Budget</span>
                <span className="font-semibold text-white">{selectedInquiry.budget}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Project Requirements
              </label>
              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Selector & Admin Notes */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Pipeline Status
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Internal Team Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Add internal notes on calls, pricing quotes, or milestones..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#1F2638]">
              <button
                type="button"
                onClick={() => handleDelete(selectedInquiry._id, selectedInquiry.name)}
                className="px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                Delete Lead
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A202E] hover:bg-[#232B3D] text-xs font-semibold text-slate-300"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={updating}
                  className="px-6 py-2 rounded-xl bg-[#4F8CFF] hover:bg-[#3B76EB] text-xs font-semibold text-white shadow-md shadow-[#4F8CFF]/20 flex items-center gap-2"
                >
                  {updating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Notes & Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
