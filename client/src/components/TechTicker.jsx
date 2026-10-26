import React from 'react';

const technologies = [
  'MongoDB',
  'Express.js',
  'React.js',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Next.js',
  'PostgreSQL',
  'Docker',
  'GraphQL',
  'REST APIs'
];

export const TechTicker = () => {
  return (
    <section className="py-12 border-y border-[#1F2638] bg-[#0E1118]/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Powered By Modern Enterprise Technologies
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto px-4">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-xl bg-[#141821] border border-[#1F2638] text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:border-[#4F8CFF]/50 hover:bg-[#1B2230] transition-all duration-200 cursor-default shadow-sm"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
};
