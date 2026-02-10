"use client"
import { GraduationCap, ShieldCheck, Globe, CheckCircle2, ArrowRight } from "lucide-react";

export default function AlphaWorldAdvantage() {
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  const stats = [
    { label: "Students Guided", value: "15,000+" },
    { label: "Visa Success", value: "99%" },
    { label: "Scholarships", value: "₹2 Cr+" },
    { label: "Partner Unis", value: "200+" },
  ];

  const points = [
    {
      icon: GraduationCap,
      title: "Experienced Counselors",
      desc: "Certified experts with years of experience in international admissions and career mapping."
    },
    {
      icon: Globe,
      title: "Global University Network",
      desc: "Direct partnerships with top-tier universities in USA, UK, Canada, Australia & Europe."
    },
    {
      icon: ShieldCheck,
      title: "High Visa Approval",
      desc: "Accurate documentation and expert guidance to ensure maximum approval chances."
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
              Why Choose Us
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Trusted <span className="text-[#1E6BFF]">Study Abroad</span> Consultants
            </h2>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
              We help students achieve their international education goals through expert guidance, 
              transparent processes, and strong global partnerships.
            </p>

            {/* Stats Grid - Modern Compact Style */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl group hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-[#1E6BFF] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-[#1E6BFF] text-white px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-blue-200">
              Get Started Now
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Side: Feature Cards */}
          <div className="space-y-6">
            {points.map((item, i) => (
              <div
                key={i}
                className="group bg-white border border-slate-200 p-8 rounded-[32px] hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_50px_rgba(30,107,255,0.1)] transition-all duration-500 flex gap-6"
              >
                <div className="shrink-0 w-14 h-14 bg-blue-50 text-[#1E6BFF] flex items-center justify-center rounded-2xl group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300">
                  <item.icon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#1E6BFF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Verification Strip */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-8 md:gap-16">
          {['Certified Counselors', 'No Hidden Costs', 'Direct University Tie-ups'].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <CheckCircle2 size={16} className="text-[#FFD700]" />
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}