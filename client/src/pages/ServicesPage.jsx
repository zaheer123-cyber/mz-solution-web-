import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ServiceCard } from '../components/ServiceCard';
import { CTASection } from '../components/CTASection';
import { Sparkles, Loader2 } from 'lucide-react';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data?.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      {/* Services Header */}
      <section className="pt-16 pb-14 bg-[#0B0D12] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4F8CFF]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141821] border border-[#232B3E] text-xs font-semibold text-[#4F8CFF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Lifecycle Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our <span className="electric-gradient-text">Premium Services</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We provide a wide range of digital solutions designed to help your business thrive in the competitive digital landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-24 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#4F8CFF] mb-3" />
              <span>Loading services...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} variant="full" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <CTASection
        title="Ready to Build Something Extraordinary?"
        subtitle="Schedule a consultation with our technology strategists and explore how we can accelerate your digital roadmap."
      />
    </div>
  );
};
