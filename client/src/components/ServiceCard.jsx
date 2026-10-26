import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Layers,
  Smartphone,
  Cloud,
  ShoppingCart,
  ShieldCheck,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  Code,
  Layers,
  Smartphone,
  Cloud,
  ShoppingCart,
  ShieldCheck,
  Palette,
  TrendingUp
};

export const ServiceCard = ({ service, variant = 'full' }) => {
  const IconComponent = iconMap[service.icon] || Code;

  return (
    <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-7 flex flex-col justify-between card-hover group relative overflow-hidden">
      {/* Top subtle glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4F8CFF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Icon box */}
        <div className="w-12 h-12 rounded-xl bg-[#1A2234] border border-[#273552] flex items-center justify-center text-[#4F8CFF] group-hover:scale-110 group-hover:bg-[#4F8CFF] group-hover:text-white transition-all duration-300 mb-6 shadow-md shadow-[#4F8CFF]/10">
          <IconComponent className="w-6 h-6 transition-colors" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Benefits List (shown in full variant or if present) */}
        {service.benefits && service.benefits.length > 0 && (
          <ul className="space-y-2.5 mb-8">
            {service.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#4F8CFF] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action CTA */}
      <div className="pt-2 border-t border-[#1F2638]/60 mt-auto">
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F8CFF] group-hover:text-blue-300 hover:gap-3 transition-all duration-200"
        >
          <span>Discuss Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
