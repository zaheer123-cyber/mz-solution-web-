import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, MessageCircle, Shield } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();
  const social = settings.socialLinks || {};

  return (
    <footer className="bg-[#080A0E] border-t border-[#1F2638] text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1F2638]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4F8CFF] flex items-center justify-center text-white shadow-md shadow-[#4F8CFF]/30">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {settings.companyName || 'MzSolution'}
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {settings.tagline || 'Premium digital solutions for the modern era.'}
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#4F8CFF] hover:bg-[#192233] transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#4F8CFF] hover:bg-[#192233] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-lg bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#4F8CFF] hover:bg-[#192233] transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#4F8CFF] hover:bg-[#192233] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi MzSolution, I would like to discuss a project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-lg bg-[#141821] border border-[#1F2638] flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#14231e] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">MERN Stack Development</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">SaaS Solutions</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Custom Software</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Digital Marketing</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email || 'info@mzsolution.com'}`} className="hover:text-white transition-colors">
                  {settings.email || 'info@mzsolution.com'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone || '+1 (555) 000-0000'}`} className="hover:text-white transition-colors">
                  {settings.phone || '+1 (555) 000-0000'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5" />
                <span>{settings.address || '123 Tech Avenue, Silicon Valley'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{settings.footerText || '© 2024 MzSolution. All rights reserved.'}</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin" className="flex items-center gap-1 hover:text-[#4F8CFF] transition-colors">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
