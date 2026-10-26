import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const defaultSettings = {
  companyName: 'MzSolution',
  tagline: 'Premium digital solutions for the modern era.',
  email: 'info@mzsolution.com',
  phone: '+1 (555) 000-0000',
  whatsapp: '+1 (555) 000-0001',
  address: '123 Tech Avenue, Silicon Valley',
  logo: '',
  socialLinks: {
    facebook: 'https://facebook.com/mzsolution',
    tiktok: 'https://tiktok.com/@mzsolution',
    linkedin: 'https://linkedin.com/company/mzsolution',
    twitter: 'https://twitter.com/mzsolution',
    instagram: 'https://instagram.com/mzsolution',
    github: 'https://github.com/mzsolution'
  },
  seoTitle: 'MzSolution | We Build Digital Experiences That Drive Growth',
  seoDescription: 'Empowering businesses with scalable websites, high-performance web applications, and cutting-edge digital marketing solutions.',
  footerText: '© 2024 MzSolution. All rights reserved.'
};

const SettingsContext = createContext({
  settings: defaultSettings,
  loading: false,
  refreshSettings: () => {}
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings/public');
      if (res.data?.success && res.data?.data) {
        setSettings(prev => ({
          ...prev,
          ...res.data.data,
          socialLinks: {
            ...prev.socialLinks,
            ...(res.data.data.socialLinks || {})
          }
        }));
      }
    } catch (err) {
      console.warn('Could not load website settings, using defaults');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
