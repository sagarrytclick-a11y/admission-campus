'use client'

import { SITE_IDENTITY } from '@/site-identity'
import { FileText, Scale, Globe, AlertCircle, ShieldCheck, ChevronRight, Mail, Phone } from 'lucide-react'

export default function TermsAndConditionsPage() {
  const { name, contact } = SITE_IDENTITY

  return (
    <section className="w-full relative overflow-hidden bg-white">
      {/* PREMIUM HEADER BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[450px] bg-slate-900 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 pt-24 sm:pt-32 pb-24">
        
        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD700] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-2xl">
            <Scale size={14} />
            User Agreement
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tighter">
            Terms & <span className="text-[#1E6BFF]">Conditions</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Please read these terms carefully before using our services. By accessing {name}, 
            you agree to be bound by the following guidelines and legal framework.
          </p>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-slate-200 rounded-[40px] shadow-2xl shadow-blue-900/5 p-8 md:p-16 space-y-16">

            <TermsBlock
              icon={<ShieldCheck size={20} />}
              title="1. Acceptance of Terms"
              content={`By accessing or using ${name}'s website or services, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of our services immediately.`}
            />

            <TermsBlock
              icon={<Globe size={20} />}
              title="2. Scope of Services"
              content={`${name} provides education counseling and informational services. Please note that final admissions, decisions, and academic matters are made solely by the respective institutions and authorities.`}
            />

            <TermsBlock
              icon={<FileText size={20} />}
              title="3. Use of Website"
              content={
                <ul className="space-y-4">
                  {[
                    "Use the website only for lawful educational purposes",
                    "Do not attempt to misuse, scrape, or disrupt website services",
                    "Intellectual property and content cannot be reused without permission",
                    "Providing false information in enquiry forms is strictly prohibited"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm md:text-base">
                      <ChevronRight size={16} className="text-[#1E6BFF] mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              }
            />

            <TermsBlock
              icon={<AlertCircle size={20} />}
              title="4. Accuracy & Liability"
              content={`While we strive for 100% accuracy, ${name} does not guarantee the real-time accuracy of university fees, policies, or admission regulations. We are not liable for losses arising from reliance on the information provided.`}
            />

            <div className="h-px bg-slate-100 w-full" />

            {/* DYNAMIC CONTACT CARD */}
            <div className="bg-slate-50 rounded-[32px] p-8 md:p-10 border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FFD700] rounded-full" />
                Legal Help Desk
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm relative z-10">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1E6BFF]">
                        <Mail size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Us</p>
                        <a href={`mailto:${contact.email.general}`} className="text-slate-900 font-bold hover:text-[#1E6BFF] transition-colors">
                        {contact.email.general}
                        </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1E6BFF]">
                        <Phone size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Call Support</p>
                        <a href={`tel:${contact.phone.raw}`} className="text-slate-900 font-bold hover:text-[#1E6BFF] transition-colors">
                        {contact.phone.display}
                        </a>
                    </div>
                  </div>
                </div>

                <div className="md:border-l border-slate-200 md:pl-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Office Address</p>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {contact.address.office}, {contact.address.city}, {contact.address.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Effective Date: Feb 2026 • {name}
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* COMPONENT: TERMS BLOCK */
function TermsBlock({
  title,
  content,
  icon
}: {
  title: string
  content: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#1E6BFF] transition-colors">
          {title}
        </h2>
      </div>
      <div className="text-slate-500 leading-relaxed text-sm md:text-base pl-0 md:pl-14 font-medium">
        {content}
      </div>
    </div>
  )
}