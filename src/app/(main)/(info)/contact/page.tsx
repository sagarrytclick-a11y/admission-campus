"use client";
import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Globe, Users, Award, CheckCircle, Star, Instagram, Linkedin } from "lucide-react";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

export default function ContactPage() {
  const { emails, phones, address, socials } = useContactInfo();
  const { openModal } = useFormModal();

  return (
    <div className="bg-slate-50">
      
      {/* HERO SECTION - Slate 950 Theme */}
      <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl">
            <MessageCircle size={14} className="text-[#FACC15]" /> Global Support Center
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            CONNECT WITH <br />
            <span className="text-[#FACC15]">OUR EXPERTS</span>
          </h1>
          
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed mb-12">
            Have questions about admissions or visas? Reach out through any channel. 
            Our consultants are ready to guide your next academic move.
          </p>
          
          <button
            onClick={openModal}
            className="px-12 h-16 rounded-2xl bg-[#1A4AB2] text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-[#1A4AB2] transition-all shadow-2xl shadow-blue-900/40"
          >
            Launch Quick Inquiry <ArrowRight size={16} className="inline ml-2" />
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Contact Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-10 rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-950 mb-10 uppercase tracking-tight">Direct Channels</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Phone Item */}
                <div className="group flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-50 text-[#1A4AB2] rounded-[24px] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Support</p>
                    <a href={createTelLink(phones.primary)} className="text-lg font-black text-slate-950 hover:text-[#1A4AB2] transition-colors uppercase tracking-tight">
                      {phones.primary}
                    </a>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Mon-Sat: 9AM-6PM</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="group flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-50 text-[#1A4AB2] rounded-[24px] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Queries</p>
                    <a href={createMailtoLink(emails.info)} className="text-lg font-black text-slate-950 hover:text-[#1A4AB2] transition-colors uppercase tracking-tight">
                      {emails.info}
                    </a>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">24/7 Digital Desk</p>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="group flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-50 text-[#1A4AB2] rounded-[24px] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Chat</p>
                    <a href={createWhatsAppLink(phones.primaryRaw)} className="text-lg font-black text-slate-950 hover:text-[#1A4AB2] transition-colors uppercase tracking-tight">
                      INSTANT CONNECT
                    </a>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Typical response: 5 mins</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="group flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-50 text-[#1A4AB2] rounded-[24px] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Head Office</p>
                    <p className="text-lg font-black text-slate-950 leading-tight uppercase tracking-tight">
                      {address.office}
                    </p>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">
                      {address.city}, {address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Instagram</p>
                        <p className="text-xl font-black text-slate-950 uppercase">Global Updates</p>
                    </div>
                    <a href={socials.instagram} target="_blank" className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center group-hover:bg-[#1A4AB2] transition-colors">
                        <Instagram size={20} />
                    </a>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">LinkedIn</p>
                        <p className="text-xl font-black text-slate-950 uppercase">Professional Hub</p>
                    </div>
                    <a href={socials.linkedin} target="_blank" className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center group-hover:bg-[#1A4AB2] transition-colors">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
          </div>

          {/* Sidebar - Trust Panel */}
          <div className="space-y-6">
            <div className="bg-[#1A4AB2] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              
              <h3 className="text-2xl font-black mb-10 uppercase tracking-tight">WHY PARTNER <br/> WITH US?</h3>
              
              <div className="space-y-8">
                {[
                  { val: "99.2%", label: "VISA SUCCESS RATE", icon: <CheckCircle className="text-[#FACC15]" size={20}/> },
                  { val: "100K+", label: "SUCCESSFUL STUDENTS", icon: <Users className="text-[#FACC15]" size={20}/> },
                  { val: "800+", label: "PARTNER UNIVERSITIES", icon: <Award className="text-[#FACC15]" size={20}/> }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-black tracking-tighter">{stat.val}</div>
                      <p className="text-blue-200 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                 <button onClick={openModal} className="w-full h-14 bg-white text-[#1A4AB2] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FACC15] hover:text-slate-950 transition-all">
                    Get Free Assessment
                 </button>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 text-center">
                <Clock className="w-8 h-8 text-[#FACC15] mx-auto mb-4" />
                <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-widest mb-2">Live Availability</h4>
                <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[13px] font-bold text-slate-600">Counselors are Online Now</span>
                </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}