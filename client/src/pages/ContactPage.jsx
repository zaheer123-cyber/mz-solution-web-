import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import api from '../services/api';
import { useSettings } from '../context/SettingsContext';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a required service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please provide at least 10 characters describing your project'),
  honeypot: z.string().optional() // anti-spam
});

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const { settings } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const initialService = searchParams.get('service') || 'Web Development';
  const projectRef = searchParams.get('projectRef') || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: initialService,
      budget: '$1,000 - $5,000',
      message: projectRef ? `Inquiring regarding ${projectRef}:\n` : '',
      honeypot: ''
    }
  });

  useEffect(() => {
    if (searchParams.get('service')) {
      setValue('service', searchParams.get('service'));
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const res = await api.post('/inquiries', data);
      if (res.data?.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError(res.data?.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setSubmitError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const social = settings.socialLinks || {};

  return (
    <div className="pt-24 min-h-screen bg-[#0B0D12]">
      {/* Header */}
      <section className="pt-16 pb-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4F8CFF]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Let's <span className="electric-gradient-text">Collaborate</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Fill out the form below or reach out directly via our social channels.
          </p>
        </div>
      </section>

      {/* Main Grid: Form on Left, Contact info on Right (matching PDF Page 4) */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-[#141821] border border-[#1F2638] rounded-3xl p-8 sm:p-10 shadow-2xl relative">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for reaching out to MzSolution. An engineering director will review your project requirements and respond within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 bg-[#1B2230] hover:bg-[#232C3E] border border-[#273552] text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-red-400 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot field for bot suppression */}
                  <input type="text" {...register('honeypot')} className="hidden" tabIndex="-1" autoComplete="off" />

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Full Name <span className="text-[#4F8CFF]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-xl bg-[#0B0D12] border ${
                          errors.name ? 'border-red-500' : 'border-[#1F2638]'
                        } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all`}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address <span className="text-[#4F8CFF]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl bg-[#0B0D12] border ${
                          errors.email ? 'border-red-500' : 'border-[#1F2638]'
                        } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all`}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Row 2: Company & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        {...register('company')}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Service Required <span className="text-[#4F8CFF]">*</span>
                      </label>
                      <select
                        {...register('service')}
                        className={`w-full px-4 py-3 rounded-xl bg-[#0B0D12] border ${
                          errors.service ? 'border-red-500' : 'border-[#1F2638]'
                        } text-sm text-white focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all`}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="MERN Stack Development">MERN Stack Development</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="SaaS Platform">SaaS Platform</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="E-commerce Development">E-commerce Development</option>
                        <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                      </select>
                      {errors.service && <p className="text-xs text-red-400 mt-1.5">{errors.service.message}</p>}
                    </div>
                  </div>

                  {/* Row 3: Budget */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Budget (Optional)
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-sm text-white focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all"
                    >
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+</option>
                    </select>
                  </div>

                  {/* Row 4: Project Details */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Project Details <span className="text-[#4F8CFF]">*</span>
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your project..."
                      {...register('message')}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0B0D12] border ${
                        errors.message ? 'border-red-500' : 'border-[#1F2638]'
                      } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all`}
                    ></textarea>
                    {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message.message}</p>}
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#4F8CFF] hover:bg-[#3B76EB] text-white font-semibold text-base shadow-lg shadow-[#4F8CFF]/30 hover:shadow-xl hover:shadow-[#4F8CFF]/40 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Contact Information (matching PDF Page 4) */}
            <div className="lg:col-span-5 space-y-10 lg:pl-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {/* Email Us */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#141821] border border-[#1F2638]">
                    <div className="w-11 h-11 rounded-xl bg-[#1A2234] border border-[#273552] flex items-center justify-center text-[#4F8CFF] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Us</p>
                      <a href={`mailto:${settings.email || 'info@mzsolution.com'}`} className="text-base font-semibold text-white hover:text-[#4F8CFF] transition-colors">
                        {settings.email || 'info@mzsolution.com'}
                      </a>
                    </div>
                  </div>

                  {/* Call Us */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#141821] border border-[#1F2638]">
                    <div className="w-11 h-11 rounded-xl bg-[#1A2234] border border-[#273552] flex items-center justify-center text-[#4F8CFF] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Call Us</p>
                      <a href={`tel:${settings.phone || '+1 (555) 000-0000'}`} className="text-base font-semibold text-white hover:text-[#4F8CFF] transition-colors">
                        {settings.phone || '+1 (555) 000-0000'}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  {settings.whatsapp && (
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#141821] border border-[#1F2638]">
                      <div className="w-11 h-11 rounded-xl bg-[#14231E] border border-[#1C3A2C] flex items-center justify-center text-[#25D366] shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">WhatsApp</p>
                        <a
                          href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi MzSolution, I would like to discuss a project.')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-white hover:text-[#25D366] transition-colors"
                        >
                          {settings.whatsapp}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Follow Us (matching PDF Page 4) */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#4F8CFF] hover:border-[#4F8CFF] transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#4F8CFF] hover:border-[#4F8CFF] transition-all"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#4F8CFF] hover:border-[#4F8CFF] transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#4F8CFF] hover:border-[#4F8CFF] transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
