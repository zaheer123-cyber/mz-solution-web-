import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ProjectCard } from '../components/ProjectCard';
import { CTASection } from '../components/CTASection';
import { Search, Loader2, FolderKanban } from 'lucide-react';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All Projects', 'SaaS', 'Web Apps', 'Fintech', 'E-commerce']);
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All Projects') {
          params.category = selectedCategory;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const res = await api.get('/projects', { params });
        if (res.data?.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchProjects();
    }, 250);

    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 min-h-screen">
      {/* Portfolio Header */}
      <section className="pt-16 pb-12 bg-[#0B0D12] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4F8CFF]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our <span className="electric-gradient-text">Portfolio</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Explore our diverse range of successful projects, from scalable SaaS platforms to innovative mobile applications.
          </p>

          {/* Category Filter Pills (matching PDF Page 2) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#4F8CFF] text-white shadow-md shadow-[#4F8CFF]/30'
                    : 'bg-[#141821] text-slate-400 hover:text-white hover:bg-[#1A202C] border border-[#1F2638]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name or technology..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#141821] border border-[#1F2638] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 pb-24 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#4F8CFF] mb-3" />
              <span>Loading portfolio items...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-[#141821]/50 border border-[#1F2638] rounded-2xl p-8 max-w-lg mx-auto">
              <FolderKanban className="w-12 h-12 text-[#4F8CFF]/60 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
              <p className="text-sm text-slate-400 mb-6">
                No matching projects were found for the selected category or search query.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Projects');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#1A202C] hover:bg-[#232B3D] border border-[#1F2638] rounded-lg text-xs font-semibold text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Have an Ambitious Project in Mind?"
        subtitle="Let's build a market-leading digital solution tailored precisely to your operational and user requirements."
      />
    </div>
  );
};
