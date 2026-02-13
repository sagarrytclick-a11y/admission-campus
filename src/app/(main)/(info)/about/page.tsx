"use client"
import React from 'react';
import { Check, Award, Users, ArrowRight, Star, ShieldCheck, Zap, Heart } from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

export default function AboutPage() {
  const { openModal } = useFormModal();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Slate 950 Academic Theme */}
      <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-blue-900/20">
            <Star size={14} className="text-[#FACC15]" /> Our Legacy & Vision
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            50+ YEARS OF GUIDING <br />
            <span className="text-[#FACC15]">ACADEMIC EXCELLENCE</span>
          </h1>
          
          <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto font-medium uppercase tracking-wider leading-relaxed mb-12">
            For five decades, we have bridged the gap between student aspirations and world-class institutions with honesty, transparency, and measurable results.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openModal}
              className="px-10 h-16 rounded-2xl bg-[#1A4AB2] hover:bg-white hover:text-[#1A4AB2] text-white text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20"
            >
              Consult an Expert
            </button>
            <div className="flex items-center gap-3 px-6 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                    ))}
                </div>
                <span className="text-white text-[10px] font-bold uppercase tracking-tight">Trusted by 100K+ Students</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP - Gold Accents */}
      <section className="relative -mt-10 z-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100">
            {[
              { label: "Success Rate", value: "99.2%", icon: <Zap className="text-[#FACC15]" size={16}/> },
              { label: "Partner Universities", value: "800+", icon: <ShieldCheck className="text-[#FACC15]" size={16}/> },
              { label: "Scholarships Won", value: "$45M+", icon: <Award className="text-[#FACC15]" size={16}/> },
              { label: "Global Offices", value: "12+", icon: <Users className="text-[#FACC15]" size={16}/> }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-8 rounded-[24px] hover:bg-slate-50 transition-colors group">
                <div className="mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-950 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY - Premium Magazine Layout */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FACC15]/10 rounded-full blur-3xl"></div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-8 tracking-tighter uppercase leading-tight">
                FROM VISION TO <span className="text-[#1A4AB2]">GLOBAL REALITY</span>
              </h2>
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                <p>Founded in 1974, our journey began with a simple but powerful belief: <span className="text-slate-950 font-bold">Every student deserves unbiased, expert guidance.</span> What started as a small counseling cell has evolved into a global educational powerhouse.</p>
                <p>We don't just process applications; we curate futures. Our methodology combines decades of institutional memory with cutting-edge data to ensure students find the perfect academic match.</p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Personalized Roadmap", color: "bg-blue-50 text-[#1A4AB2]" },
                  { title: "Verified Institutions", color: "bg-amber-50 text-amber-600" },
                  { title: "Lifetime Support", color: "bg-green-50 text-green-600" },
                  { title: "Transparent Process", color: "bg-purple-50 text-purple-600" }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl ${item.color} font-black text-[11px] uppercase tracking-wide`}>
                    <Check size={16} /> {item.title}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden rotate-3 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&fit=crop" alt="Students" className="w-full h-full object-cover -rotate-3 scale-110" />
              </div>
              <div className="absolute -bottom-10 -right-6 bg-white p-8 rounded-[32px] shadow-2xl border border-slate-100 max-w-[240px]">
                 <div className="text-5xl font-black text-[#1A4AB2] mb-2 tracking-tighter">50+</div>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Unbroken Trust & Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Grid Layout */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
              PRINCIPLES SHAPED BY <span className="text-[#FACC15]">HISTORY</span>
            </h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">Our core values are non-negotiable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Uncompromising Integrity", desc: "Our guidance is driven by honesty. We recommend institutions that fit the student, not our interests.", icon: <ShieldCheck size={24}/> },
              { title: "Student-Centricity", desc: "Every journey is unique. We tailor our expertise to individual academic strengths and financial goals.", icon: <Heart size={24}/> },
              { title: "Data-Backed Advice", desc: "50 years of data allows us to predict outcomes with precision and handle complex visa regulations.", icon: <Zap size={24}/> },
              { title: "Global Responsibility", desc: "Our role extends beyond admission. We ensure students are prepared for global professional environments.", icon: <Star size={24}/> }
            ].map((value, index) => (
              <div key={index} className="group bg-white/5 hover:bg-[#1A4AB2] border border-white/10 rounded-[40px] p-10 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#FACC15] flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-[#1A4AB2] transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{value.title}</h3>
                <p className="text-slate-400 group-hover:text-white/80 font-medium leading-relaxed transition-colors">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#1A4AB2] rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
              READY TO JOIN OUR <br />
              <span className="text-[#FACC15]">SUCCESS LEGACY?</span>
            </h2>
            <p className="text-blue-100 text-sm md:text-base font-medium uppercase tracking-widest mb-12 max-w-xl mx-auto">
              Become part of the next generation of global leaders.
            </p>
            
            <button
              onClick={openModal}
              className="bg-white text-[#1A4AB2] px-12 h-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-950 hover:text-white transition-all shadow-xl"
            >
              Start Your Application <ArrowRight size={16} className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}