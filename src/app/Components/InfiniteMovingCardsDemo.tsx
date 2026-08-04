"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import {
  GraduationCap,
  BookOpen,
  Award,
  Star,
  Crown,
  Shield,
  MapPin,
  Target,
  Globe2,
} from "lucide-react";

 

const universities = [
  { name: "IIT Delhi", icon: Crown },
  { name: "IIT Bombay", icon: Shield },
  { name: "IIT Madras", icon: BookOpen },
  { name: "AIIMS Delhi", icon: Star },
  { name: "IIM Ahmedabad", icon: Target },
  { name: "NIT Trichy", icon: Award },
  { name: "IIT Kanpur", icon: MapPin },
  { name: "IIT Roorkee", icon: GraduationCap },
];

export function InfiniteMovingCardsDemo() {
  return (
    <section className="relative py-24 bg-[#12141D] overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4A90E2]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#1E212B] border border-[#94A3B8]/10 text-[#00D4FF] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-xl">
            <span className="w-2.5 h-2.5 bg-[#00D4FF] rounded-full animate-pulse"></span>
            Global University Network
          </div>

          <h2 className="text-3xl md:text-6xl font-black text-[#F8FAFC] mb-6 tracking-tight leading-[1.1]">
            Trusted by World's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00D4FF]">Top Universities</span>
          </h2>

          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">
            We work closely with globally ranked institutions to secure admissions
            for students through a transparent and success-driven process.
          </p>
        </div>

        {/* Infinite Moving Cards Container */}
        <div className="relative py-12 flex items-center justify-center overflow-hidden">
            {/* Soft gradient masks for seamless scrolling edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#12141D] via-[#12141D]/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#12141D] via-[#12141D]/80 to-transparent z-10" />
            
            <InfiniteMovingCards
                items={universities}
                direction="right"
                speed="slow" 
                className="font-black uppercase tracking-widest text-[#F8FAFC]"
            />
        </div>

        {/* Premium Trust Stats Bar */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#1E212B] border border-[#94A3B8]/10 rounded-[32px] px-10 py-8 shadow-2xl relative overflow-hidden">
            {/* Brand Accent Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4A90E2]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black text-[#4A90E2] mb-1 tracking-tighter group-hover:scale-110 transition-transform duration-500">500+</div>
              <div className="text-[11px] text-[#94A3B8] font-black uppercase tracking-widest">
                Partner Institutions
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-slate-800" />

            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black text-[#00D4FF] mb-1 tracking-tighter group-hover:scale-110 transition-transform duration-500">98%</div>
              <div className="text-[11px] text-[#94A3B8] font-black uppercase tracking-widest">
                Admission Success
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-slate-800" />

            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-black text-[#F8FAFC] mb-1 tracking-tighter group-hover:scale-110 transition-transform duration-500">50+</div>
              <div className="text-[11px] text-[#94A3B8] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                <Globe2 size={14} className="text-[#]" /> Destinations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}