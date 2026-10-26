import React from 'react';
import { Lightbulb, Shield, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection } from '../components/CTASection';

export const AboutPage = () => {
  const stats = [
    { value: '10+', label: 'Years of Excellence' },
    { value: '250+', label: 'Projects Delivered' },
    { value: '50+', label: 'Expert Specialists' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      desc: 'We constantly push the boundaries of technology to find new and better ways to solve complex business problems.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      desc: 'We believe in transparent communication, rigorous engineering honesty, and building long-term relationships based on trust.'
    },
    {
      icon: Award,
      title: 'Excellence',
      desc: 'We are committed to delivering premium quality in every single line of code, architectural design, and interface pixel.'
    }
  ];

  const team = [
    {
      name: 'Alex Rivera',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Jessica Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Michael Smith',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sarah Williams',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* 1. Header */}
      <section className="pt-16 pb-14 bg-[#0B0D12] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4F8CFF]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our <span className="electric-gradient-text">Mission & Vision</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering businesses through innovative digital solutions and high-end software development.
          </p>
        </div>
      </section>

      {/* 2. Who We Are with Stats & Office Image (matching PDF Page 3) */}
      <section className="py-16 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content & Stats */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#4F8CFF] font-bold mb-3 block">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                Architecting Digital Excellence for Tomorrow's Leaders
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                MzSolution is a premium software development company and digital agency dedicated to building scalable websites, high-performance web applications, and cutting-edge digital solutions.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-10">
                Our team of expert developers, designers, and digital strategists work together to transform your business goals into reality, ensuring every project is delivered with the highest standards of quality and innovation.
              </p>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#141821] border border-[#1F2638] shadow-sm"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#4F8CFF] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Office / Team Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1F2638] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="MzSolution Team Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Values (matching PDF Page 3) */}
      <section className="py-20 bg-[#0D1017] border-y border-[#1F2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-base">
              The foundational principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#141821] border border-[#1F2638] rounded-2xl p-8 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1A2234] border border-[#273552] flex items-center justify-center text-[#4F8CFF] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Meet the Experts (matching PDF Page 3) */}
      <section className="py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Meet the Experts
            </h2>
            <p className="text-slate-400 text-base">
              The passionate minds and engineers behind MzSolution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#141821] border border-[#1F2638] rounded-2xl overflow-hidden card-hover text-center group"
              >
                <div className="aspect-square w-full bg-[#1A202E] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Partner With Our Expert Team?"
        subtitle="Let's transform your high-level roadmap into scalable production software."
      />
    </div>
  );
};
