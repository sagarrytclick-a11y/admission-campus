"use client";

import React from "react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";
import { PhoneCall, GraduationCap, ShieldCheck } from "lucide-react";

const CtaSection: React.FC = () => {
  const { openModal } = useFormModal();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[length:26px_26px] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" />

      {/* Soft blue glows */}
      <div className="absolute top-24 left-20 w-40 h-40 bg-blue-500 rounded-full blur-[90px] opacity-20" />
      <div className="absolute bottom-24 right-20 w-48 h-48 bg-blue-400 rounded-full blur-[110px] opacity-15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <GraduationCap className="w-4 h-4" />
          Free Admission Guidance
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Take the First Step Towards Your{" "}
          <span className="text-blue-400">Dream College</span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto max-w-3xl text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 px-4">
          Get personalised guidance from experienced admission consultants.
          From college selection to entrance exam preparation, we help you make
          informed decisions with confidence.
        </p>

        {/* Trust blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <ShieldCheck className="w-7 h-7 text-blue-400 mb-3 mx-auto" />
            <div className="text-white font-semibold mb-1">
              Transparent Guidance
            </div>
            <div className="text-slate-400 text-sm">
              Honest advice with no false promises
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <GraduationCap className="w-7 h-7 text-blue-400 mb-3 mx-auto" />
            <div className="text-white font-semibold mb-1">
              College Partnerships
            </div>
            <div className="text-slate-400 text-sm">
              Access to top Indian institutions
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <PhoneCall className="w-7 h-7 text-blue-400 mb-3 mx-auto" />
            <div className="text-white font-semibold mb-1">
              End-to-End Support
            </div>
            <div className="text-slate-400 text-sm">
              From counselling to admission assistance
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Admission Help
          </button>

          <Link
            href="/colleges"
            className="rounded-full border border-white/30 px-8 lg:px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
          >
            Explore Colleges
          </Link>
        </div>

        {/* Trust line */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
          <span>✓ No hidden charges</span>
          <span>✓ Confidential consultation</span>
          <span>✓ Trusted by thousands of students</span>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
