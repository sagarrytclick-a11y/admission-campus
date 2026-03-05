import { SITE_IDENTITY } from '@/site-identity'
import { FileText, Scale, Globe, AlertCircle, ShieldCheck, Mail, Phone } from 'lucide-react'

export default function TermsAndConditionsPage() {
  const { name, contact } = SITE_IDENTITY

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#1E293B] mb-4">
            Terms & <span className="text-[#007BFF]">Conditions</span>
          </h1>
          <p className="text-[#64748B]">
            Please read these terms carefully before using our services. By accessing {name}, 
            you agree to be bound by the following guidelines.
          </p>
        </div>

        <div className="space-y-8">
          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#007BFF]" />
              1. Acceptance of Terms
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              By accessing or using {name}'s website or services, you agree to comply with these Terms & Conditions. 
              If you do not agree with any part of these terms, you must discontinue use of our services immediately.
            </p>
          </div>

          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#007BFF]" />
              2. Scope of Services
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              {name} provides education counseling and informational services. Please note that final admissions, 
              decisions, and academic matters are made solely by the respective institutions and authorities.
            </p>
          </div>

          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#007BFF]" />
              3. Use of Website
            </h2>
            <ul className="space-y-2 text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Use website only for lawful educational purposes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Do not attempt to misuse, scrape, or disrupt website services
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Intellectual property and content cannot be reused without permission
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007BFF] mt-1">•</span>
                Providing false information in enquiry forms is strictly prohibited
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-[#007BFF] pl-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#007BFF]" />
              4. Accuracy & Liability
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              While we strive for 100% accuracy, {name} does not guarantee the real-time accuracy of university fees, 
              policies, or admission regulations. We are not liable for losses arising from reliance on the information provided.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="bg-[#F8FAFC] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Contact Us</h3>
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
            Effective Date: February 2026 • {name}
          </p>
        </div>
      </div>
    </div>
  )
}