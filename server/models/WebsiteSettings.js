import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'MzSolution',
      trim: true
    },
    tagline: {
      type: String,
      default: 'Premium digital solutions for the modern era.',
      trim: true
    },
    email: {
      type: String,
      default: 'info@mzsolution.com',
      trim: true
    },
    phone: {
      type: String,
      default: '+1 (555) 000-0000',
      trim: true
    },
    whatsapp: {
      type: String,
      default: '+1 (555) 000-0001',
      trim: true
    },
    address: {
      type: String,
      default: '123 Tech Avenue, Silicon Valley',
      trim: true
    },
    logo: {
      type: String,
      default: ''
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/mzsolution' },
      tiktok: { type: String, default: 'https://tiktok.com/@mzsolution' },
      linkedin: { type: String, default: 'https://linkedin.com/company/mzsolution' },
      twitter: { type: String, default: 'https://twitter.com/mzsolution' },
      instagram: { type: String, default: 'https://instagram.com/mzsolution' },
      github: { type: String, default: 'https://github.com/mzsolution' }
    },
    seoTitle: {
      type: String,
      default: 'MzSolution | Digital Experiences That Drive Growth',
      trim: true
    },
    seoDescription: {
      type: String,
      default: 'Empowering businesses with scalable websites, high-performance web applications, and cutting-edge digital marketing solutions.',
      trim: true
    },
    footerText: {
      type: String,
      default: '© 2024 MzSolution. All rights reserved.',
      trim: true
    }
  },
  { timestamps: true }
);

export const WebsiteSettings = mongoose.model('WebsiteSettings', websiteSettingsSchema);
