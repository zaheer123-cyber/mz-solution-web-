import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Target,
  FolderKanban,
  Inbox,
  ArrowUpRight,
  TrendingUp,
  MoreVertical,
  ExternalLink,
  Loader2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import api from '../services/api';

export const AdminDashboard = () => {
  const [dataRange, setDataRange] = useState('7');
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({
    totalVisitors: 24532,
    totalLeads: 1284,
    totalProjects: 48,
    inquiriesCount: 321,
    newInquiriesCount: 5,
    trafficSources: [
      { name: 'Organic Search', value: 45, color: '#38BDF8' },
      { name: 'Direct', value: 30, color: '#4F8CFF' },
      { name: 'Social Media', value: 15, color: '#A855F7' },
      { name: 'Referral', value: 10, color: '#2DD4BF' }
    ],
    chartData: [],
    recentInquiries: []
  });

  const fetchOverview = async (days) => {
    try {
      setLoading(true);
      const res = await api.get(`/analytics/overview?days=${days}`);
      if (res.data?.success && res.data?.data) {
        setOverview(prev => ({
          ...prev,
          ...res.data.data
        }));
      }
    } catch (err) {
      console.warn('Could not load overview analytics, showing current state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(dataRange);
  }, [dataRange]);

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
    <div className="space-y-8">
      {/* 1. Top 4 Stats Cards (matching PDF Page 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Visitors */}
        <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 text-[#4F8CFF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5">
              <span>+12%</span>
              <span>↑</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Visitors</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {overview.totalVisitors?.toLocaleString() || '24,532'}
          </h3>
        </div>

        {/* Total Leads */}
        <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5">
              <span>+8%</span>
              <span>↑</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {overview.totalLeads?.toLocaleString() || '1,284'}
          </h3>
        </div>

        {/* Total Projects */}
        <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Stable
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Projects</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {overview.totalProjects || 48}
          </h3>
        </div>

        {/* Inquiries */}
        <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {overview.newInquiriesCount || 5} New
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inquiries</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {overview.inquiriesCount || 321}
          </h3>
        </div>
      </div>

      {/* 2. Middle Charts (matching PDF Page 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Traffic & Conversion Chart */}
        <div className="lg:col-span-8 bg-[#141821] border border-[#1F2638] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Traffic & Conversion</h3>
              <p className="text-xs text-slate-400">Visitors versus inquiry lead conversion rate</p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0B0D12] p-1 rounded-xl border border-[#1F2638]">
              <button
                onClick={() => setDataRange('7')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  dataRange === '7' ? 'bg-[#4F8CFF] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setDataRange('30')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  dataRange === '30' ? 'bg-[#4F8CFF] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overview.chartData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#4F8CFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F131C',
                    borderColor: '#1F2638',
                    borderRadius: '8px',
                    color: '#FFF'
                  }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#4F8CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" name="Visitors" />
                <Area type="monotone" dataKey="leads" stroke="#A855F7" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" name="Leads" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Donut Chart */}
        <div className="lg:col-span-4 bg-[#141821] border border-[#1F2638] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-base font-bold text-white">Traffic Sources</h3>
            <p className="text-xs text-slate-400">Visitor acquisition distribution</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overview.trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {overview.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F131C',
                    borderColor: '#1F2638',
                    borderRadius: '8px',
                    color: '#FFF'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Donut Legend (matching PDF Page 5) */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1F2638]/70 text-xs">
            {overview.trafficSources.map((source, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-slate-300 font-medium truncate">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Recent Customer Inquiries Table (matching PDF Page 5) */}
      <div className="bg-[#141821] border border-[#1F2638] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#1F2638] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Customer Inquiries</h3>
            <p className="text-xs text-slate-400">Direct lead submissions received from public forms</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-semibold text-[#4F8CFF] hover:text-blue-300 transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0E121A] text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-[#1F2638]">
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
              {overview.recentInquiries.length > 0 ? (
                overview.recentInquiries.map((inq) => {
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
                            <p className="font-semibold text-white">{inq.name}</p>
                            <p className="text-xs text-slate-400">{inq.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{inq.service}</td>
                      <td className="py-4 px-6 font-semibold text-white">{inq.budget || '$5,000'}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusBadge(inq.status)}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">{dateStr}</td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to="/admin/inquiries"
                          className="p-1.5 hover:bg-[#232B3D] rounded-lg text-slate-400 hover:text-white inline-flex transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No recent inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
