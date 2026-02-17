"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Target, BrainCircuit, Globe, ArrowRight, MessageCircle } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  

export default function StudyPrograms() {
  const { openModal } = useFormModal();
  const programs = [
    {
      icon: Target,
      title: "Engineering Programs",
      description: "B.Tech, M.Tech, diploma courses, eligibility, entrance exams and top colleges.",
    },
    {
      icon: BrainCircuit,
      title: "Medical Programs",
      description: "MBBS, BDS, Nursing and allied medical courses with admission process.",
    },
    {
      icon: BookOpen,
      title: "Management & MBA",
      description: "MBA, PGDM and management programs including CAT, XAT, CMAT details.",
    },
    {
      icon: Globe,
      title: "Professional Courses",
      description: "Career-oriented certifications aligned with Indian industry requirements.",
    },
    {
      icon: Target,
      title: "Commerce & CA",
      description: "CA, CS and commerce programs with top colleges and career opportunities.",
    },
    {
      icon: BrainCircuit,
      title: "Science & Research",
      description: "Pure and applied sciences including research programs and PhD opportunities.",
    },
    {
      icon: BookOpen,
      title: "Arts & Humanities",
      description: "UG and PG programs in arts, humanities and social sciences in India.",
    },
    {
      icon: Globe,
      title: "Design & Architecture",
      description: "Design and architecture programs with NITs, IITs and top design schools.",
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#1A4AB2]/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#FACC15]/5 rounded-full blur-[120px] translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Explore Programs
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Find Your Perfect <span className="text-[#1A4AB2]">Career Path</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-base">
            Choose from diverse programs designed to match your interests. 
            Get expert guidance for admissions and campus selection.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-[40px] p-8 hover:border-[#1A4AB2]/30 hover:shadow-[0_30px_60px_rgba(26,74,178,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#1A4AB2]/5 text-[#1A4AB2] flex items-center justify-center mb-8 group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500 shadow-sm">
                <program.icon size={26} />
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mb-4 group-hover:text-[#1A4AB2] transition-colors">
                {program.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                {program.description}
              </p>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-[11px] font-black text-[#1A4AB2] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  Learn More
                  <ArrowRight size={14} />
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-100 group-hover:bg-[#FACC15] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-slate-900 border border-slate-800 rounded-[32px] px-8 py-4 shadow-2xl">
            <div className="flex items-center gap-4 pr-6 border-r border-slate-700 hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-[#1A4AB2]/20 flex items-center justify-center text-[#FACC15]">
                <MessageCircle size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Need Expert Advice?</div>
                <div className="font-bold text-white text-sm">Talk to Our Career Mentors</div>
              </div>
            </div>
            <button onClick={() => openModal()} className="bg-[#1A4AB2] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg">
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}