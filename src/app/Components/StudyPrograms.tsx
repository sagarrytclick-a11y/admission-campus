"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Target, BrainCircuit, Globe, ArrowRight, MessageCircle, Sparkles, PencilRuler, Microscope, Landmark, Palette } from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function StudyPrograms() {
  const { openModal } = useFormModal();
  
  const programs = [
    { icon: Target, title: "Engineering Programs", description: "B.Tech, M.Tech, diploma courses, entrance exams and top colleges." },
    { icon: BrainCircuit, title: "Medical Programs", description: "MBBS, BDS, Nursing and allied medical courses with admission process." },
    { icon: BookOpen, title: "Management & MBA", description: "MBA, PGDM and management programs including CAT, XAT, CMAT details." },
    { icon: Globe, title: "Professional Courses", description: "Career-oriented certifications aligned with Indian industry requirements." },
    { icon: Landmark, title: "Commerce & CA", description: "CA, CS and commerce programs with top colleges and career opportunities." },
    { icon: Microscope, title: "Science & Research", description: "Pure and applied sciences including research programs and PhD opportunities." },
    { icon: Palette, title: "Arts & Humanities", description: "UG and PG programs in arts, humanities and social sciences in India." },
    { icon: PencilRuler, title: "Design & Architecture", description: "Design and architecture programs with NITs, IITs and top schools." },
  ];

  return (
    <section className="py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        
        {/* Simple Header - Consistent with previous sections */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#007BFF] mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Academic Pathways</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B] mb-4">
            Find Your Perfect Career Path
          </h2>
          <p className="text-[#64748B] text-sm max-w-2xl font-medium leading-relaxed">
            Choose from diverse programs designed to match your interests. 
            Get expert guidance for admissions and campus selection.
          </p>
        </div>

        {/* Programs Grid - Simple Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-[#F8FAFC] border border-slate-100 rounded-lg p-6 hover:border-[#007BFF] transition-all flex flex-col h-full"
            >
              {/* Simple Icon */}
              <div className="w-12 h-12 rounded-md bg-white border border-slate-100 text-[#007BFF] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#007BFF] group-hover:text-white transition-all">
                <program.icon size={22} />
              </div>

              <h3 className="text-lg font-semibold text-[#1E293B] mb-3 group-hover:text-[#007BFF] transition-colors">
                {program.title}
              </h3>

              <p className="text-[#64748B] text-xs leading-relaxed mb-6 flex-grow font-medium">
                {program.description}
              </p>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-200/50">
                <span className="text-xs font-bold text-[#007BFF] flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                  Explore Now
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-[#F8FAFC] border border-slate-100 rounded-lg px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#007BFF]">
                <MessageCircle size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Need Expert Advice?</p>
                <p className="font-semibold text-[#1E293B] text-sm">Talk to our Career Mentors</p>
              </div>
            </div>

            <button 
              onClick={() => openModal()} 
              className="w-full md:w-auto bg-[#1E293B] text-white px-8 py-3 rounded-md text-sm font-bold hover:bg-[#007BFF] transition-colors active:scale-95"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}