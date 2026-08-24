"use client";
import React from "react";
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Wallet,
  Globe,
  GraduationCap,
  Users,
  ArrowRight,
  Headphones,
  Sparkles
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

export default function ComprehensiveServices() {
  const { openModal } = useFormModal();

  const services = [
    {
      icon: Settings,
      title: "Career Counseling",
      desc: "Personalized guidance to choose the right course and university."
    },
    {
      icon: ShieldCheck,
      title: "Visa Assistance",
      desc: "End-to-end admission and visa support with high success rate."
    },
    {
      icon: GraduationCap,
      title: "University Applications",
      desc: "Applications to top universities across USA, UK, Canada, Australia & Europe."
    },
    {
      icon: Wallet,
      title: "Scholarships",
      desc: "Support in securing scholarships and managing education finances."
    },
    {
      icon: Globe,
      title: "Test Preparation",
      desc: "Expert coaching for IELTS, TOEFL, GRE and other entrance exams."
    },
    {
      icon: Users,
      title: "Student Support",
      desc: "Accommodation, travel, and support throughout your journey."
    }
  ];

  return (
    <section className="py-[32px] bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[#0066F5] mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-bold uppercase tracking-widest">Our Services</span>
          </div>
          <h2 className="text-4xl font-bold text-[#1E293B] mb-4">
            Complete Support for Your <span className="text-[#0066F5]">Journey</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-3xl mx-auto">
            From initial counseling to post-arrival support, we ensure your study abroad success.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white border border-slate-200 rounded-xl hover:border-[#0066F5] hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0066F5]/10 text-[#0066F5] flex items-center justify-center mb-6 group-hover:bg-[#0066F5] group-hover:text-white transition-all">
                <service.icon size={24} />
              </div>
              
              <h3 className="text-xl font-semibold text-[#1E293B] mb-3 group-hover:text-[#0066F5] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-[#64748B] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-[#F8FAFC] border border-slate-200 rounded-full px-8 py-4">
            <Headphones className="w-6 h-6 text-[#0066F5]" />
            <span className="text-[#64748B] font-medium">Expert consultants ready to help</span>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/service"
              className="bg-[#0066F5] hover:bg-[#0047B3] text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              Explore All Services
              <ArrowRight size={18} />
            </Link>
            
            <button 
              onClick={() => openModal()} 
              className="bg-[#0066F5] hover:bg-[#0047B3] text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}