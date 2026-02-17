"use client";
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Wallet,
  Globe,
  GraduationCap,
  Users,
  ArrowRight,
  Headphones
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  

const services = [
  {
    icon: Settings,
    title: "Career & Course Counseling",
    desc: "Personalized guidance to help students choose the right course and university."
  },
  {
    icon: ShieldCheck,
    title: "Visa & Admission Assistance",
    desc: "End-to-end admission and visa support with a high success rate."
  },
  {
    icon: GraduationCap,
    title: "University Applications",
    desc: "Applications to top universities across USA, UK, Canada, Australia & Europe."
  },
  {
    icon: Wallet,
    title: "Scholarships & Financial Aid",
    desc: "Support in securing scholarships and managing education finances."
  },
  {
    icon: Globe,
    title: "IELTS / TOEFL / GRE Prep",
    desc: "Expert coaching and preparation for international entrance exams."
  },
  {
    icon: Users,
    title: "Pre & Post Departure Support",
    desc: "Accommodation, travel, and student support even after admission."
  }
];

export default function ComprehensiveServices() {
  const { openModal } = useFormModal();
  return (
    <section id="services" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1A4AB2]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FACC15]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter">
            Complete <span className="text-[#1A4AB2]">Support System</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            From initial counseling to post-arrival support, we provide comprehensive 
            services to ensure your study abroad journey is smooth and successful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-[40px] p-10 hover:border-[#1A4AB2]/30 hover:shadow-[0_30px_60px_rgba(26,74,178,0.1)] transition-all duration-500 hover:-translate-y-3 flex flex-col h-full"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-[20px] bg-[#1A4AB2]/5 text-[#1A4AB2] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500 shadow-sm mb-8">
                <service.icon size={30} />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-[#1A4AB2] transition-colors leading-tight">
                {service.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                <span className="text-[11px] font-black text-[#1A4AB2] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  Explore Service
                  <ArrowRight size={14} />
                </span>
                <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-[#FACC15] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="relative bg-slate-900 rounded-[50px] p-10 md:p-20 overflow-hidden shadow-2xl shadow-blue-900/20">
          {/* Brand Accent inside CTA */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A4AB2] opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-[#FACC15] mb-8">
              <Headphones size={32} />
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-base leading-relaxed">
              Get personalized guidance from our expert mentors. 
              Schedule your free session today and take the first step toward your dream.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/service"
                className="bg-[#1A4AB2] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                All Services
                <ArrowRight size={18} />
              </Link>
              <button onClick={() => openModal()} className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center shadow-lg">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}