import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, Code, Sparkles, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { TechTicker } from '../components/TechTicker';
import { TestimonialCard, testimonialsData } from '../components/TestimonialCard';
import { CTASection } from '../components/CTASection';

export const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, servRes] = await Promise.all([
          api.get('/projects?limit=2'),
          api.get('/services')
        ]);
        if (projRes.data?.success) setFeaturedProjects(projRes.data.data);
        if (servRes.data?.success) setServices(servRes.data.data.slice(0, 4));
      } catch (err) {
        console.warn('Error fetching homepage data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const devSteps = [
    { number: '1', title: 'Discover', desc: 'In-depth research, requirements gathering, and strategic project scoping.' },
    { number: '2', title: 'Design', desc: 'Creative UX wireframing, high-fidelity prototypes, and interactive interfaces.' },
    { number: '3', title: 'Develop', desc: 'Agile clean coding, robust API integrations, and comprehensive automated testing.' },
    { number: '4', title: 'Deploy', desc: 'Continuous deployment, performance optimization, and ongoing maintenance.' }
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4F8CFF]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141821] border border-[#232B3E] text-xs font-semibold text-[#4F8CFF] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-pulse"></span>
            <span>Software Development & Digital Agency</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            We Build{' '}
            <span className="electric-gradient-text">Digital Experiences</span>
            <br />That Drive Growth
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering businesses with scalable websites, high-performance web applications, and cutting-edge digital marketing solutions tailored for the modern era.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-[#4F8CFF] hover:bg-[#3B76EB] rounded-xl shadow-lg shadow-[#4F8CFF]/30 hover:shadow-xl hover:shadow-[#4F8CFF]/45 transition-all duration-200"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-300 hover:text-white bg-[#141821] hover:bg-[#1C2230] border border-[#1F2638] rounded-xl transition-all duration-200"
            >
              Explore Our Work
            </Link>
          </div>

          {/* Hero Digital Wave Visual Banner (matching PDF page 6) */}
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#1F2638] shadow-2xl bg-[#0d1017]">
            <div className="aspect-[21/9] sm:aspect-[24/9] w-full relative overflow-hidden bg-gradient-to-tr from-[#06080D] via-[#0E1526] to-[#0A101D] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
                alt="Digital Neural Wave"
                className="w-full h-full object-cover mix-blend-screen opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">
                    Active Production Clusters & Real-time Delivery
                  </span>
                </div>
                <span className="text-xs text-[#4F8CFF] font-semibold hidden sm:inline-block">
                  Next-Gen Architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Expertise Section */}
      <section className="py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Expertise
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Innovative solutions tailored to your business needs, powered by the latest technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} variant="compact" />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F8CFF] hover:text-blue-300 transition-colors"
            >
              <span>View All Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Partner With MzSolution? */}
      <section className="py-20 bg-[#0D1017] border-y border-[#1F2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image / Visual */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1F2638] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Engineering Team Collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-wider text-[#4F8CFF] font-bold">
                  Engineered For Scale
                </span>
                <p className="text-white font-semibold text-lg mt-1">
                  Transforming ambitious concepts into world-class digital realities.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Why Partner With <span className="text-[#4F8CFF]">MzSolution?</span>
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  We don't just write code — we design scalable digital experiences that transform businesses and accelerate sustainable revenue.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center text-[#4F8CFF] shrink-0 mt-1">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Premium Quality Assurance</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      We maintain the highest standards of code quality, performance audits, and pixel-level polish for every project we undertake.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center text-[#4F8CFF] shrink-0 mt-1">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Modern Tech Stack</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      We harness bleeding-edge ecosystems like React, Node.js, Next.js, and cloud native architectures to ensure speed, security, and scalability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center text-[#4F8CFF] shrink-0 mt-1">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Transparent Process</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      From initial discovery to continuous deployment, you are an active partner with weekly sprints, clear milestones, and direct communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section className="py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Featured Projects
              </h2>
              <p className="text-slate-400 text-base max-w-xl">
                A showcase of our recent work across various industries, pushing the boundaries of digital innovation.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F8CFF] hover:text-blue-300 transition-colors shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Development Process */}
      <section className="py-20 bg-[#0D1017] border-y border-[#1F2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Development Process
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              From concept to reality, we follow a structured and proven path to guaranteed success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {devSteps.map((step) => (
              <div key={step.number} className="relative group">
                <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-7 text-center card-hover h-full flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#4F8CFF] text-white font-extrabold text-lg flex items-center justify-center mb-6 shadow-lg shadow-[#4F8CFF]/30 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technologies Ticker */}
      <TechTicker />

      {/* 7. Client Testimonials */}
      <section className="py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Client Testimonials
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              See what our partners have to say about working with MzSolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((test, idx) => (
              <TestimonialCard key={idx} testimonial={test} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action Banner */}
      <CTASection />
    </div>
  );
};
