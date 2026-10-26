import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, Folder, User, Loader2 } from 'lucide-react';
import api from '../services/api';
import { CTASection } from '../components/CTASection';

export const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projects/view/${slug}`);
        if (res.data?.success) {
          setProject(res.data.data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F8CFF] mr-3" />
        <span>Loading project details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-32 pb-20 min-h-screen max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
        <p className="text-slate-400 mb-8">{error || "The project you requested doesn't exist or has been unpublished."}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F8CFF] text-white rounded-xl font-semibold shadow-lg shadow-[#4F8CFF]/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      {/* Header & Breadcrumb */}
      <section className="pt-12 pb-10 bg-[#0B0D12] border-b border-[#1F2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-[#4F8CFF] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#4F8CFF]/10 border border-[#4F8CFF]/25 text-[#4F8CFF]">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            {project.shortDescription || project.description}
          </p>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="py-12 pb-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Visual Image */}
          <div className="rounded-2xl overflow-hidden border border-[#1F2638] bg-[#141821] mb-12 shadow-2xl aspect-[16/9] max-h-[550px] w-full">
            <img
              src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2-column info grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Full Description & Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold text-white">Project Overview</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line text-base">
                  {project.description}
                </p>
              </div>

              {/* Technologies Used */}
              <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-[#1A2234] border border-[#273552] text-[#4F8CFF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Metadata & External links */}
            <div className="space-y-6">
              <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-[#1F2638] pb-4">
                  Project Info
                </h3>

                <div className="space-y-4 text-sm">
                  {project.clientName && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#4F8CFF]" /> Client:
                      </span>
                      <span className="font-semibold text-white">{project.clientName}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Folder className="w-4 h-4 text-[#4F8CFF]" /> Category:
                    </span>
                    <span className="font-semibold text-white">{project.category}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#4F8CFF]" /> Delivered:
                    </span>
                    <span className="font-semibold text-white">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>

                {/* External Action Links */}
                <div className="pt-4 border-t border-[#1F2638] space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#4F8CFF] hover:bg-[#3B76EB] text-white font-semibold rounded-xl text-sm shadow-md shadow-[#4F8CFF]/20 transition-all"
                    >
                      <span>Visit Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#1A2234] hover:bg-[#232F48] border border-[#273552] text-slate-200 font-semibold rounded-xl text-sm transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source Code</span>
                    </a>
                  )}

                  <Link
                    to={`/contact?service=${encodeURIComponent(project.category)}&projectRef=${encodeURIComponent(project.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-transparent hover:bg-[#1A202E] border border-[#1F2638] text-slate-300 font-semibold rounded-xl text-sm transition-all"
                  >
                    <span>Request Similar Project</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable CTA */}
      <CTASection
        title="Ready to Build Your Next Success Story?"
        subtitle="Discuss your technological challenges with our development team today."
      />
    </div>
  );
};
