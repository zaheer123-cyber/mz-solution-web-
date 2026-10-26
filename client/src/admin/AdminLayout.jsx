import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Sparkles,
  Settings,
  LogOut,
  Zap,
  ExternalLink,
  Menu,
  X,
  User,
  Shield,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Project Management', path: '/admin/projects', icon: FolderKanban },
    { name: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
    { name: 'Services', path: '/admin/services', icon: Sparkles },
    { name: 'Analytics', path: '/admin/analytics', icon: LayoutDashboard },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#10141D] border-b border-[#1F2638] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4F8CFF] flex items-center justify-center text-white">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-lg text-white">MzAdmin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (matching PDF Page 5) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-[#0D1017] border-r border-[#1F2638] flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="px-6 py-6 flex items-center justify-between border-b border-[#1F2638]/60">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#4F8CFF] flex items-center justify-center text-white shadow-md shadow-[#4F8CFF]/30">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MzAdmin
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#141821] text-[#4F8CFF] font-semibold border border-[#242E44] shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#121620]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Card (matching PDF Page 5) */}
        <div className="p-4 border-t border-[#1F2638] space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#141821] transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#141821] border border-[#1F2638]">
            <Link to="/admin/profile" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#1F2638] text-[#4F8CFF] flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@mzsolution.com'}</p>
              </div>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar with Search */}
        <header className="h-16 px-6 border-b border-[#1F2638] bg-[#0B0D12] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white hidden sm:block">
              Dashboard Overview
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#141821] border border-[#1F2638] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF]"
              />
            </div>

            <Link
              to="/admin/profile"
              className="p-2 rounded-lg bg-[#141821] border border-[#1F2638] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </div>
        </header>

        {/* Outlet for Admin Pages */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
