"use client";
import React from "react";
import { GraduationCap, TrendingUp, Users, Award } from "lucide-react";

// Strict Brand Theme
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  

export default function EducationStats() {
  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Admitted",
      description: "Guided students into reputed colleges and universities across the globe."
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "Consistently high approval rate in admissions and counselling process."
    },
    {
      icon: Users,
      value: "500+",
      label: "Indian Colleges",
      description: "Direct tie-ups with premier universities and colleges across India."
    },
    {
      icon: Award,
      value: "₹40+ Cr",
      label: "Scholarships",
      description: "Merit-based and need-based scholarships secured for our students."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1A4AB2]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Our Global Impact
          </div>
          <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter">
            Numbers That <span className="text-[#1A4AB2]">Inspire</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Our commitment to student success is reflected in our data. 
            We turn academic dreams into reality for thousands of students.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-[40px] p-10 text-center hover:border-[#1A4AB2]/30 hover:shadow-[0_30px_60px_rgba(26,74,178,0.1)] transition-all duration-500 hover:-translate-y-3 flex flex-col items-center"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 mb-10 rounded-[20px] bg-[#1A4AB2]/5 text-[#1A4AB2] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500 shadow-sm group-hover:rotate-6">
                <stat.icon size={28} />
              </div>

              {/* Counter Value */}
              <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                {stat.value}
              </div>

              {/* Label with Gold Accent */}
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full" />
                {stat.label}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="flex justify-center mt-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-slate-900 border border-slate-800 rounded-[32px] px-8 py-6 shadow-2xl shadow-blue-900/20">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-4 border-slate-900 bg-[#1A4AB2] flex items-center justify-center text-white shadow-lg overflow-hidden"
                >
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="alumni" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-slate-900 bg-[#FACC15] flex items-center justify-center text-slate-900 font-black text-xs shadow-lg">
                +10k
              </div>
            </div>
            <div className="text-left pl-6">
              <div className="font-extrabold text-white text-base tracking-tight">Trusted by 10,000+ Students</div>
              <div className="text-xs text-slate-400 font-medium">Empowering the next generation of Indian leaders</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}