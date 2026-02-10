"use client"
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
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Our Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Complete <span className="text-[#1E6BFF]">Support System</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            From initial counseling to post-arrival support, we provide comprehensive 
            services to ensure your study abroad journey is smooth and successful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-[32px] p-8 hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_50px_rgba(30,107,255,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300 shadow-sm mb-6">
                <service.icon size={28} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#1E6BFF] transition-colors leading-tight">
                {service.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[11px] font-extrabold text-[#1E6BFF] uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  Learn More
                  <ArrowRight size={14} />
                </span>
                <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-[#FFD700] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box - Premium Dark Style */}
        <div className="relative bg-slate-900 rounded-[40px] p-8 md:p-14 overflow-hidden shadow-2xl shadow-blue-900/20">
          {/* Decorative Circle in CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E6BFF] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-[#FFD700] mb-6">
              <Headphones size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Get personalized guidance from our expert counselors. 
              Schedule your free consultation today and take the first step.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/service"
                className="bg-[#1E6BFF] text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-slate-900 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                View All Services
                <ArrowRight size={18} />
              </Link>
              <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}