import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTASection = ({
  title = "Ready to Scale Your Digital Presence?",
  subtitle = "Let's discuss your next project and build something extraordinary together.",
  buttonText = "Contact Us Now",
  buttonLink = "/contact"
}) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient with subtle glow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#141A28] via-[#101522] to-[#141A28] border border-[#263554] p-10 md:p-16 text-center shadow-2xl overflow-hidden">
          {/* Ambient blue blur behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F8CFF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/25 text-[#4F8CFF] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transform Your Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={buttonLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B76EB] rounded-xl shadow-lg shadow-[#4F8CFF]/30 hover:shadow-xl hover:shadow-[#4F8CFF]/45 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-300 hover:text-white bg-[#141821] hover:bg-[#1B212E] border border-[#1F2638] rounded-xl transition-all duration-200"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
