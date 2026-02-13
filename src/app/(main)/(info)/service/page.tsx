"use client";
import React from 'react';
import { GraduationCap, FileText, DollarSign, BookOpen, TrendingUp, Home, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import FAQ from "@/app/Components/FAQ";

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION - Slate 950 Theme */}
      <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-blue-900/20">
            <Star size={14} className="text-[#FACC15]" /> Premium Academic Services
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            YOUR COMPLETE <br />
            <span className="text-[#FACC15]">ADMISSION SOLUTION</span>
          </h1>
          
          <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto font-medium uppercase tracking-wider leading-relaxed mb-12">
            From strategic college selection to complex visa processing — we manage every 
            milestone of your educational journey with 50 years of proven expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
             {["95% Success Rate", "500+ Indian Colleges", "25+ Global Streams"].map((badge, i) => (
               <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-[#FACC15]" /> {badge}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-4 uppercase tracking-tighter">
              EXPERT SUPPORT <span className="text-[#1A4AB2]">FOR EVERY STEP</span>
            </h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">Comprehensive guidance tailored to your goals</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                title: "College Admissions", 
                desc: "Strategic matching with top-tier Indian institutions based on your academic profile.",
                icon: <GraduationCap size={28} />,
                link: "Match Profile"
              },
              { 
                title: "Entrance Exam Prep", 
                desc: "Intensive preparation modules for JEE, NEET, and CAT with a track record of top percentiles.",
                icon: <FileText size={28} />,
                link: "Start Prep"
              },
              { 
                title: "Campus Housing", 
                desc: "Verified, safe, and convenient accommodation solutions near major university hubs.",
                icon: <Home size={28} />,
                link: "Browse Housing"
              },
              { 
                title: "Scholarships & Aid", 
                desc: "Navigate complex financial aid landscapes and secure exclusive scholarship grants.",
                icon: <DollarSign size={28} />,
                link: "Find Funding"
              },
              { 
                title: "International Visa", 
                desc: "End-to-end documentation support and interview coaching for global study permits.",
                icon: <BookOpen size={28} />,
                link: "Get Started"
              },
              { 
                title: "Career Roadmap", 
                desc: "Personalized mentorship to align your degree with long-term industry opportunities.",
                icon: <TrendingUp size={28} />,
                link: "Get Advice"
              }
            ].map((service, i) => (
              <div key={i} className="group bg-white rounded-[40px] p-10 border border-slate-100 hover:border-[#1A4AB2] hover:shadow-[0_40px_80px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 flex flex-col">
                <div className="w-16 h-16 bg-slate-50 text-[#1A4AB2] rounded-[24px] flex items-center justify-center mb-8 group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tight group-hover:text-[#1A4AB2] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                  {service.desc}
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-[11px] font-black text-[#1A4AB2] uppercase tracking-widest group-hover:gap-4 transition-all">
                  {service.link} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION - Deep Blue Impact */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-slate-950 rounded-[60px] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                PROVEN <span className="text-[#FACC15]">RECOGNITION</span>
              </h2>
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Global impact across five decades</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { val: "10K+", label: "STUDENTS PLACED" },
                { val: "500+", label: "COLLEGE PARTNERS" },
                { val: "25+", label: "STATES COVERED" },
                { val: "₹50Cr+", label: "TOTAL SCHOLARSHIPS" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] font-black text-[#FACC15] uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#1A4AB2] px-10 h-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FACC15] hover:text-slate-950 transition-all shadow-xl">
                Start Your Journey Today
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-6">Expert consultation • No commitment required</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <div className="bg-white py-20">
        <FAQ />
      </div>
    </div>
  );
};

export default ServicesPage;