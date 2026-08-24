"use client";

import React from "react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";
import {
  PhoneCall,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CtaSection: React.FC = () => {
  const { openModal } = useFormModal();

  return (
    <section
      id="contact"
      className="relative overflow-hidden brand-section bg-[#F4F7FC] border-t border-[#E2E8F0]"
    >
      <div className="brand-container relative z-10 text-center">
        <div className="brand-eyebrow mb-4 justify-center">
          <Sparkles size={14} className="text-[#0066F5]" />
          Start Your Future Today
        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-5 leading-tight">
          Ready to Step Into Your{" "}
          <span className="text-[#0066F5]">Dream College?</span>
        </h2>

        <p className="mx-auto brand-subtitle mb-10">
          Join thousands of students who secured seats with expert counselling
          for MD/MS, Management and Engineering across India.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Guidance",
              desc: "Transparent process with direct institutional insights.",
            },
            {
              icon: GraduationCap,
              title: "Expert Mentors",
              desc: "Personalised coaching for exams and counselling rounds.",
            },
            {
              icon: PhoneCall,
              title: "Priority Support",
              desc: "Help from shortlisting to documentation and admission.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="brand-card p-7 text-center group"
            >
              <div className="w-12 h-12 bg-[#E8F1FF] rounded-xl flex items-center justify-center text-[#0066F5] mb-5 mx-auto group-hover:bg-[#0066F5] group-hover:text-white transition-all">
                <item.icon size={22} />
              </div>
              <h4 className="text-[#0F172A] font-bold text-base mb-2">
                {item.title}
              </h4>
              <p className="text-[#64748B] text-xs leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={openModal}
            className="brand-cta w-full sm:w-auto"
          >
            Book Free Counseling <ArrowRight size={16} />
          </button>

          <Link href="/colleges" className="brand-cta-secondary w-full sm:w-auto">
            Browse Colleges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
