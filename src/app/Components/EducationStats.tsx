"use client";
import React from "react";
import { GraduationCap, TrendingUp, Users, Award } from "lucide-react";

export default function EducationStats() {
  // Brand Colors matching Hero logic
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Admitted",
      description: "Guided students into reputed colleges and universities."
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "High approval rate in admissions and counselling process."
    },
    {
      icon: Users,
      value: "500+",
      label: "Indian Colleges",
      description: "Tie-ups with premier universities and colleges across India."
    },
    {
      icon: Award,
      value: "₹40+ Cr",
      label: "Scholarships",
      description: "Merit-based and need-based scholarships secured for students."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Numbers That <span className="text-[#1E6BFF]">Speak</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Our commitment to student success is reflected in these achievements. 
            We've helped thousands of students achieve their academic dreams.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-[32px] p-8 text-center hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_50px_rgba(30,107,255,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center"
            >
              {/* Icon with Brand Blue Background */}
              <div className="w-16 h-16 mb-8 rounded-2xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center group-hover:bg-[#1E6BFF] group-hover:text-white transition-all duration-300 shadow-sm">
                <stat.icon size={28} />
              </div>

              {/* Counter Value - Bold & Black */}
              <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                {stat.value}
              </div>

              {/* Label with Yellow Dot */}
              <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                {stat.label}
              </div>

              <p className="text-slate-500 text-xs leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge - Premium Glass Style */}
        <div className="flex justify-center mt-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-slate-900 border border-slate-800 rounded-[32px] px-10 py-6 shadow-2xl shadow-blue-900/20">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-900 bg-[#1E6BFF] flex items-center justify-center text-white font-bold text-xs"
                >
                  <Users size={14} />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-[#FFD700] flex items-center justify-center text-slate-900 font-bold text-xs">
                +10k
              </div>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-white text-base">Trusted by 10,000+ Students</div>
              <div className="text-xs text-slate-400 font-medium">Join the community of successful students across India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}