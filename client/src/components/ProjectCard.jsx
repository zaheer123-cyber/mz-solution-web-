import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#141821] border border-[#1F2638] rounded-2xl overflow-hidden card-hover flex flex-col group">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] bg-[#0F131C] overflow-hidden border-b border-[#1F2638]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
            <Layers className="w-8 h-8 text-[#4F8CFF]/50" />
            <span className="text-xs">MzSolution Project</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 bg-[#4F8CFF] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Tech and category badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            <span className="text-[11px] font-semibold text-[#4F8CFF] bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 px-2.5 py-0.5 rounded-full">
              {project.category}
            </span>
            {project.technologies?.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] text-slate-400 bg-[#1A202E] border border-[#232B3D] px-2 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2.5">
            <Link to={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Action Links matching PDF: Live Demo & View Details */}
        <div className="pt-4 border-t border-[#1F2638] flex items-center justify-between">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-[#4F8CFF] transition-colors"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-500">Live Demo (Internal)</span>
          )}

          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#4F8CFF] hover:text-blue-300 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
