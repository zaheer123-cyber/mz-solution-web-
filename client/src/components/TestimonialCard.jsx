import React from 'react';
import { Quote } from 'lucide-react';

export const testimonialsData = [
  {
    quote: "MzSolution transformed our online presence. Their attention to detail and technical expertise is unmatched. We saw a 150% increase in leads within 3 months.",
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
  },
  {
    quote: "Working with the team was a breeze. They understood our complex requirements perfectly and delivered a custom SaaS solution that exceeded our expectations.",
    name: "Mark Thompson",
    role: "CTO, FinNexus",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
  },
  {
    quote: "The UI/UX design they created for our mobile app is stunning. Our users love the new interface, and our engagement rates have never been higher.",
    name: "Emily Davis",
    role: "Founder, EcoStyle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
  }
];

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-7 flex flex-col justify-between card-hover relative group">
      <div className="mb-6">
        <div className="w-9 h-9 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] flex items-center justify-center mb-5">
          <Quote className="w-5 h-5 fill-[#4F8CFF]/20" />
        </div>
        <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="flex items-center gap-3.5 pt-4 border-t border-[#1F2638]/70">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border border-[#4F8CFF]/40 shadow-sm"
        />
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};
