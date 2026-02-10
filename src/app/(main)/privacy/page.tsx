'use client'

import { SITE_IDENTITY } from '@/site-identity'
import { ShieldCheck, Lock, Eye, FileText, ChevronRight } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const { name, contact } = SITE_IDENTITY

  return (
    <section className="w-full relative overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-slate-900 pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 pt-20 sm:pt-32 pb-24">
        {/* HERO / INTRO */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD700] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-xl">
            <ShieldCheck size={14} className="animate-pulse" />
            Legal & Compliance
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tighter">
            Privacy <span className="text-[#1E6BFF]">Policy</span>
          </h1>
          <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Your trust is our greatest asset. This policy outlines how {name} 
            collects, uses, and safeguards your data with the highest standards of security.
          </p>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-slate-200 rounded-[40px] shadow-2xl shadow-blue-900/10 p-8 md:p-16 space-y-16">
            
            <PolicyBlock
              icon={<FileText size={20} />}
              title="1. Introduction"
              content={`${name} respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website or services.`}
            />

            <PolicyBlock
              icon={<Eye size={20} />}
              title="2. Information We Collect"
              content={
                <ul className="space-y-4">
                  {[
                    "Personal details (Name, Email, Phone)",
                    "Academic background & education history",
                    "Country, course, and institution interests",
                    "Enquiry form data & counselling notes",
                    "Technical data (IP address, browser fingerprints)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <ChevronRight size={16} className="text-[#1E6BFF] mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              }
            />

            <PolicyBlock
              icon={<SettingsIcon />}
              title="3. Data Usage"
              content="We use your data to provide personalized counselling, process university applications, share relevant admission updates, and ensure we meet all legal and regulatory obligations for international student placement."
            />

            <PolicyBlock
              icon={<Lock size={20} />}
              title="4. Data Security"
              content="We follow strict technical and organisational measures to protect your personal information from unauthorised access, misuse, or disclosure. Access is limited to authorised personnel and encrypted via secure protocols."
            />

            <div className="h-px bg-slate-100 w-full" />

            {/* CONTACT CARD */}
            <div className="bg-slate-50 rounded-[32px] p-8 md:p-10 border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FFD700] rounded-full" />
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">General Inquiries</p>
                    <a href={`mailto:${contact.email.general}`} className="text-[#1E6BFF] font-bold text-base hover:underline">
                      {contact.email.general}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Direct Helpline</p>
                    <a href={`tel:${contact.phone.raw}`} className="text-slate-900 font-bold text-base hover:underline">
                      {contact.phone.display}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Corporate Address</p>
                  <p className="text-slate-600 leading-relaxed font-medium italic">
                    {contact.address.office}, {contact.address.city}, {contact.address.country}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Last Updated: February 2026 • {name} Compliance Team
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SettingsIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
}

/* POLICY BLOCK */
function PolicyBlock({
  title,
  content,
  icon
}: {
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#1E6BFF] transition-colors">
          {title}
        </h2>
      </div>
      <div className="text-slate-500 leading-relaxed text-sm md:text-base pl-0 md:pl-14">{content}</div>
    </div>
  )
}