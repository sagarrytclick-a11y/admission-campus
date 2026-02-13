"use client";

import React from "react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";
import { PhoneCall, GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  

const CtaSection: React.FC = () => {
  const { openModal } = useFormModal();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 py-24"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:32px_32px] opacity-30" />
      
      {/* Brand Specific Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1A4AB2]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FACC15]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-24 text-center z-10">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-10 shadow-2xl backdrop-blur-md">
          <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
          Free Admission Guidance
        </div>

        {/* High-Impact Heading */}
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tighter text-white mb-6 leading-[1.05]">
          Take First Step Towards Your{" "}
          <span className="text-[#1A4AB2]">Dream College</span>
        </h2>

        {/* Persuasive Subtext */}
        <p className="mx-auto max-w-3xl text-base md:text-lg text-slate-400 leading-relaxed mb-12">
          Get personalised guidance from certified admission consultants.
          From university selection to visa processing, we help you make
          informed decisions with total confidence.
        </p>

        {/* Trust Grid - Matching 40px Radius */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {[
            {
              icon: ShieldCheck,
              title: "Transparent Guidance",
              desc: "Honest advice with no false promises or hidden agendas."
            },
            {
              icon: GraduationCap,
              title: "Global Partnerships",
              desc: "Direct access to top-tier international and Indian institutions."
            },
            {
              icon: PhoneCall,
              title: "End-to-End Support",
              desc: "From initial counselling to post-arrival assistance."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 group hover:border-[#1A4AB2]/50 transition-all duration-500">
              <div className="w-12 h-12 bg-[#1A4AB2]/10 rounded-2xl flex items-center justify-center text-[#1A4AB2] mb-4 mx-auto group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                <item.icon size={24} />
              </div>
              <div className="text-white font-black text-base mb-2 uppercase tracking-tight">
                {item.title}
              </div>
              <div className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openModal}
            className="w-full sm:w-auto bg-[#1A4AB2] hover:bg-white hover:text-slate-900 text-white px-10 py-4 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-500 shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-2"
          >
            Get Admission Help
            <ArrowRight size={16} />
          </button>

          <Link
            href="/colleges"
            className="w-full sm:w-auto rounded-full border border-white/20 px-10 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-500 hover:bg-white/10 flex items-center justify-center"
          >
            Explore Colleges
          </Link>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1"><span className="text-[#FACC15]">✓</span> No hidden charges</span>
          <span className="flex items-center gap-1"><span className="text-[#FACC15]">✓</span> Confidential consultation</span>
          <span className="flex items-center gap-1"><span className="text-[#FACC15]">✓</span> Trusted by 10k+ Students</span>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;