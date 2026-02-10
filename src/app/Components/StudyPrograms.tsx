"use client";
import React from "react";
import { BookOpen, Target, BrainCircuit, Globe, ArrowRight, MessageCircle } from "lucide-react";

export default function StudyPrograms() {
  // Brand Colors
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Explore Programs
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Find Your Perfect <span className="text-[#1E6BFF]">Career Path</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Choose from diverse programs designed to match your interests and career goals. 
            Get expert guidance for admissions and college selection.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-[28px] p-7 hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_40px_rgba(30,107,255,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center mb-6 group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300 shadow-sm">
                <program.icon size={22} />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-[#1E6BFF] transition-colors">
                {program.title}
              </h3>

              <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">
                {program.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[11px] font-extrabold text-[#1E6BFF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Learn More
                  <ArrowRight size={14} />
                </span>
                <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-[#FFD700] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Matching the premium floating style */}
        <div className="flex justify-center mt-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-slate-900 border border-slate-800 rounded-[32px] px-10 py-5 shadow-2xl">
            <div className="flex items-center gap-4 pr-6 border-r border-slate-700">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-[#FFD700]">
                <MessageCircle size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Need Help Choosing?</div>
                <div className="font-bold text-white text-sm">Talk to Our Career Experts</div>
              </div>
            </div>
            <button className="bg-[#1E6BFF] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-white hover:text-slate-900 transition-all shadow-lg shadow-blue-500/20">
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}