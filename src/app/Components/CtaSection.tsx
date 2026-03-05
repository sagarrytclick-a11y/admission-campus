"use client";

import React from "react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";
import { PhoneCall, GraduationCap, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const CtaSection: React.FC = () => {
  const { openModal } = useFormModal();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-20 border-t border-slate-100 font-sans"
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[#F8FAFC] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-24 text-center z-10">

        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 text-[#007BFF] mb-8">
          <Sparkles size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Start Your Future Today</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#007BFF] mb-6 leading-tight">
          Ready to Step Into Your <br />
          <span className="text-[#1E293B]">Dream University?</span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto max-w-2xl text-sm md:text-base text-[#64748B] leading-relaxed mb-12 font-medium">
          Don't leave your career to chance. Join 10,000+ students who have already secured their future with our expert admission roadmap.
        </p>

        {/* Benefit Cards - Simple Light Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Admits",
              desc: "100% transparent process with direct university tie-ups."
            },
            {
              icon: GraduationCap,
              title: "Expert Mentors",
              desc: "Personalized coaching from Ivy League & IIT alumni."
            },
            {
              icon: PhoneCall,
              title: "Priority Support",
              desc: "24/7 assistance from documentation to hostel arrival."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-lg p-8 group hover:border-[#007BFF] transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 bg-[#F8FAFC] rounded-md flex items-center justify-center text-[#007BFF] mb-6 mx-auto group-hover:bg-[#007BFF] group-hover:text-white transition-all">
                <item.icon size={22} />
              </div>
              <h4 className="text-[#1E293B] font-bold text-base mb-2">
                {item.title}
              </h4>
              <p className="text-[#64748B] text-xs leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openModal}
            className="w-full sm:w-auto bg-[#1E293B] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#007BFF] transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95"
          >
            Book Free Counseling <ArrowRight size={16} />
          </button>

          <Link
            href="/colleges"
            className="w-full sm:w-auto rounded-md border border-slate-200 bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-[#1E293B] transition-all hover:border-[#007BFF] hover:text-[#007BFF] flex items-center justify-center"
          >
            Browse Colleges
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-10 text-[#64748B] text-[10px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF]" /> No Service Fees
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF]" /> Verified Universities
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF]" /> 99% Visa Success
          </span>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;