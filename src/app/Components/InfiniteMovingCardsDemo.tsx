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
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Subtle Background Glow (getadmissioninfo style) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-72 h-72 bg-blue-100 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-24 right-16 w-96 h-96 bg-blue-200 rounded-full blur-[140px] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100">
            <GraduationCap className="w-4 h-4" />
            Our Global University Network
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Trusted by the World’s{" "}
            <span className="text-blue-600">Top Universities</span>
          </h2>

          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We work closely with globally ranked institutions to secure admissions
            for students through a transparent, ethical, and success-driven process.
          </p>
        </div>

        {/* Infinite Moving Cards */}
        <div className="h-[15rem] flex items-center justify-center overflow-hidden">
          <InfiniteMovingCards
            items={universities}
            direction="right"
            speed="normal" // slower = premium consultancy feel
          />
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-10 bg-white border border-slate-200 rounded-2xl px-10 py-6 shadow-md">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-slate-500 font-medium">
                Partner Universities
              </div>
            </div>

            <div className="w-px h-12 bg-slate-200" />

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-slate-500 font-medium">
                Visa & Admission Success
              </div>
            </div>

            <div className="w-px h-12 bg-slate-200" />

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-slate-500 font-medium">
                Study Destinations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
