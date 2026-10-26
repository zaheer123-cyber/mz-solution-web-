import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0D12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141821] border border-[#1F2638] rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="flex items-center gap-3 border-b border-[#1F2638] pb-6">
            <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 text-[#4F8CFF] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
              <p className="text-xs text-slate-400 mt-1">Last updated: October 2024</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
            <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing and using the MzSolution website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-lg font-bold text-white">2. Intellectual Property</h2>
            <p>
              All proprietary materials, code samples, logos, graphics, and interface designs on this website are the property of MzSolution or its respective clients and are protected by applicable intellectual property laws.
            </p>

            <h2 className="text-lg font-bold text-white">3. Client Engagements</h2>
            <p>
              Software development contracts, milestones, deliverables, warranties, and service level agreements (SLAs) are governed by individual Master Services Agreements (MSAs) and Statements of Work (SOWs) executed directly between MzSolution and the client.
            </p>

            <h2 className="text-lg font-bold text-white">4. Contact Information</h2>
            <p>
              Inquiries regarding these terms should be addressed to <a href="mailto:info@mzsolution.com" className="text-[#4F8CFF]">info@mzsolution.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
