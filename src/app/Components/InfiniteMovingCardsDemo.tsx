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
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Global University Network
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Trusted by World’s{" "}
            <span className="text-[#1E6BFF]">Top Universities</span>
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We work closely with globally ranked institutions to secure admissions
            for students through a transparent and success-driven process.
          </p>
        </div>

        {/* Infinite Moving Cards Container */}
        <div className="relative py-10 flex items-center justify-center overflow-hidden">
            {/* Added a subtle gradient mask for the fade effect on edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            
            <InfiniteMovingCards
                items={universities}
                direction="right"
                speed="slow" // Slower speed = More premium feel
            />
        </div>

        {/* Premium Trust Stats Bar - Dark Mode Impact */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-slate-900 border border-slate-800 rounded-[32px] px-10 py-8 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            {/* Decorative Blue Glow inside the bar */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E6BFF] opacity-10 rounded-full blur-2xl" />
            
            <div className="text-center group">
              <div className="text-3xl font-black text-[#1E6BFF] mb-1 tracking-tighter group-hover:scale-110 transition-transform">500+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Partner Institutions
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-slate-800" />

            <div className="text-center group">
              <div className="text-3xl font-black text-[#FFD700] mb-1 tracking-tighter group-hover:scale-110 transition-transform">98%</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Admission Success
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-slate-800" />

            <div className="text-center group">
              <div className="text-3xl font-black text-white mb-1 tracking-tighter group-hover:scale-110 transition-transform">50+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Globe2 size={12} className="text-[#1E6BFF]" />
                Destinations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}