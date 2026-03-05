import { SITE_IDENTITY } from '@/site-identity'
import { ShieldCheck, Lock, Eye, FileText, Mail, Phone } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const { name, contact } = SITE_IDENTITY

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#1E293B] mb-4">
            Privacy <span className="text-[#007BFF]">Policy</span>
          </h1>
          <p className="text-[#64748B]">
            Your trust is our greatest asset. This policy outlines how {name} 
            collects, uses, and safeguards your data with the highest standards of security.
          </p>
        </div>

        <div className="space-y-8">
          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#007BFF]" />
              1. Introduction
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              {name} respects your privacy and is committed to protecting personal information you share with us. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website or services.
            </p>
          </div>

          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#007BFF]" />
              2. Information We Collect
            </h2>
            <ul className="space-y-2 text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Personal details (Name, Email, Phone)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Academic background & education history
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Country, course, and institution interests
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Enquiry form data & counselling notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Technical data (IP address, browser fingerprints)
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#007BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l.43.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73.73l.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              3. Data Usage
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              We use your data to provide personalized counselling, process university applications, share relevant admission updates, 
              and ensure we meet all legal and regulatory obligations for international student placement.
            </p>
          </div>

          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#007BFF]" />
              4. Data Security
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              We follow strict technical and organisational measures to protect your personal information from unauthorized access, 
              misuse, or disclosure. Access is limited to authorized personnel and encrypted via secure protocols.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="bg-[#F8FAFC] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#007BFF]" />
                <div>
                  <p className="text-sm text-[#64748B]">Email</p>
                  <a href={`mailto:${contact.email.general}`} className="text-[#1E293B] font-medium hover:text-[#007BFF]">
                    {contact.email.general}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#007BFF]" />
                <div>
                  <p className="text-sm text-[#64748B]">Phone</p>
                  <a href={`tel:${contact.phone.raw}`} className="text-[#1E293B] font-medium hover:text-[#007BFF]">
                    {contact.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-[#64748B] mt-8">
            Last Updated: February 2026 • {name} Compliance Team
          </p>
        </div>
      </div>
    </div>
  )
}