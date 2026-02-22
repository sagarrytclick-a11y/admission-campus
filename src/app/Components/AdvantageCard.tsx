"use client"
import { GraduationCap, ShieldCheck, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  

export default function AdmissionCampusAdvantage() {
  const { openModal } = useFormModal();
  const stats = [
    { label: "IITs Guided", value: "500+" },
    { label: "NEET Success", value: "95%" },
    { label: "Scholarships", value: "₹5 Cr+" },
    { label: "Partner Colleges", value: "150+" },
  ];

  const points = [
    {
      icon: GraduationCap,
      title: "IIT/JEE Experts",
      desc: "Specialized counseling for IITs, NITs, and top engineering colleges with proven admission strategies."
    },
    {
      icon: Globe,
      title: "Medical College Network",
      desc: "Direct partnerships with top medical colleges including AIIMS, JIPMER, and state medical universities."
    },
    {
      icon: ShieldCheck,
      title: "Counseling Excellence",
      desc: "Expert guidance for JoSAA, NEET counseling, and state-level admission processes with high success rates."
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1A4AB2]/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
              Why Choose Us
            </div>
            
            <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Trusted <span className="text-[#1A4AB2]">Indian College</span> Consultants
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl">
              We help students secure admissions in top Indian engineering and medical colleges 
              through expert guidance, transparent processes, and strong institutional partnerships.
            </p>

            {/* Stats Grid - Enhanced with Brand Tints */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#1A4AB2]/5 border border-[#1A4AB2]/10 p-6 rounded-[24px] group hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <div className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-[#1A4AB2] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => openModal()} className="bg-[#1A4AB2] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-blue-900/20">
              Get Started Now
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Side: Feature Cards */}
          <div className="space-y-8">
            {points.map((item, i) => (
              <div
                key={i}
                className="group bg-white border border-slate-200 p-10 rounded-[40px] hover:border-[#1A4AB2]/30 hover:shadow-[0_30px_60px_rgba(26,74,178,0.1)] transition-all duration-500 flex items-start gap-8 hover:-translate-y-2"
              >
                <div className="shrink-0 w-16 h-16 bg-[#1A4AB2]/5 text-[#1A4AB2] flex items-center justify-center rounded-2xl group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500 shadow-sm">
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3 group-hover:text-[#1A4AB2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Verification Strip */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-10 md:gap-20">
          {['IIT/JEE Specialized', 'NEET Counseling', 'Direct College Tie-ups'].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={18} className="text-[#FACC15]" />
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}