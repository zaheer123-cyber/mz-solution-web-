import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0D12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141821] border border-[#1F2638] rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="flex items-center gap-3 border-b border-[#1F2638] pb-6">
            <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 text-[#4F8CFF] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
              <p className="text-xs text-slate-400 mt-1">Last updated: October 2024</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              MzSolution ("we", "our", or "us") is dedicated to protecting your privacy and personal data. This Privacy Policy details how we collect, store, and utilize information when you visit our website or submit project inquiries.
            </p>

            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>
              We collect information that you explicitly provide to us when submitting inquiries through our contact forms, including your name, email address, company name, service requirements, budget ranges, and project descriptions.
            </p>

            <h2 className="text-lg font-bold text-white">3. Privacy-First First-Party Analytics</h2>
            <p>
              We utilize privacy-preserving, first-party aggregated analytics to evaluate website performance. We do not track personal identifying information across external third-party sites, nor do we sell or monetize your data with third-party advertisers.
            </p>

            <h2 className="text-lg font-bold text-white">4. Data Security</h2>
            <p>
              We employ industry-standard encryption, strict access controls, HTTPS transport security, and secure database infrastructures to prevent unauthorized access or disclosure.
            </p>

            <h2 className="text-lg font-bold text-white">5. Contact Us</h2>
            <p>
              For any questions regarding our privacy practices, please contact us at <a href="mailto:info@mzsolution.com" className="text-[#4F8CFF]">info@mzsolution.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
