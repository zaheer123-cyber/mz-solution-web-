import React, { useEffect, useState } from 'react';
import { Save, Check, Loader2, Globe, Mail, Phone, MessageCircle, Share2, Shield } from 'lucide-react';
import api from '../services/api';
import { useSettings } from '../context/SettingsContext';

export const AdminSettings = () => {
  const { refreshSettings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    seoTitle: '',
    seoDescription: '',
    footerText: '',
    socialLinks: {
      facebook: '',
      tiktok: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      github: ''
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get('/settings');
        if (res.data?.success && res.data?.data) {
          const s = res.data.data;
          setFormData({
            companyName: s.companyName || '',
            tagline: s.tagline || '',
            email: s.email || '',
            phone: s.phone || '',
            whatsapp: s.whatsapp || '',
            address: s.address || '',
            seoTitle: s.seoTitle || '',
            seoDescription: s.seoDescription || '',
            footerText: s.footerText || '',
            socialLinks: {
              facebook: s.socialLinks?.facebook || '',
              tiktok: s.socialLinks?.tiktok || '',
              linkedin: s.socialLinks?.linkedin || '',
              twitter: s.socialLinks?.twitter || '',
              instagram: s.socialLinks?.instagram || '',
              github: s.socialLinks?.github || ''
            }
          });
        }
      } catch (err) {
        setErrorMsg('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg(null);

    try {
      await api.put('/settings', formData);
      setSavedSuccess(true);
      await refreshSettings();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Website Settings</h2>
          <p className="text-xs text-slate-400">Configure global metadata, contact details, and social channels</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Website settings updated and synchronized across all pages.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#4F8CFF] mb-2" />
          <span className="text-xs">Loading configuration...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Branding */}
          <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-[#1F2638] pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#4F8CFF]" />
              <span>General Branding</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Footer Text</label>
              <input
                type="text"
                value={formData.footerText}
                onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-[#1F2638] pb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#4F8CFF]" />
              <span>Contact Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Support Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Number</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Physical Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-[#1F2638] pb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#4F8CFF]" />
              <span>Social Media Profiles</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Facebook URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Twitter / X URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">TikTok URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.tiktok}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-[#141821] border border-[#1F2638] rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-[#1F2638] pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#4F8CFF]" />
              <span>SEO Search Meta Configuration</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meta Title Tag</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meta Description</label>
              <textarea
                rows="3"
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2638] text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-[#4F8CFF] hover:bg-[#3B76EB] text-white font-semibold text-xs shadow-md shadow-[#4F8CFF]/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Website Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
