import React from "react";
import { ArrowRight, CheckCircle2, Star, GraduationCap, Building2, BookOpen } from "lucide-react";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";


const Hero: React.FC = () => {


  const { openModal } = useFormModal();


  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#12141D] text-[#F8FAFC] overflow-hidden pt-16">
      {/* Background Ambient Glow - Using Primary Blue */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#007BFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT COLUMN: INDIAN CONTEXT */}
        <div className="space-y-6">
          <div className="inline-flex  items-center mt-5 gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">AICTE, UGC & NMC Recognized</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
            Your Future <br />
            <span className="text-[#007BFF]">
              <Typewriter
                options={{
                  strings: ['In Top IITs & NITs.', 'In Leading IIMs.', 'In Top Medical Govt.'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>

          <p className="text-[#94A3B8] text-sm md:text-base max-w-sm leading-relaxed">
            Expert guidance for <span className="text-white font-medium">Engineering, Management, and Medical</span> admissions across India. Secure your seat in the country's premier institutions.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/colleges">
              <button className="bg-[#007BFF] hover:bg-[#0056CC] text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 group shadow-lg shadow-[#007BFF]/20">
                Find Top Colleges
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button onClick={() => openModal()} className="border border-white/10 hover:bg-white/5 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all">
              Counseling 2026
            </button>
          </div>

          {/* Value Props for Indian Students */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
            {["Entrance Support", "Rank Prediction", "Direct Admissions", "Placement Stats"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-[12px] text-[#94A3B8] font-medium">
                <CheckCircle2 size={14} className="text-[#FFC107]" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: IMPROVED VISUAL STACK */}
        <div className="relative flex justify-center items-center h-full">
          {/* Background Decorative Frame */}
          <div className="absolute w-[85%] aspect-[3/4] border border-white/5 rounded-[40px] rotate-6 translate-x-4 -z-10" />

          {/* Main Pinterest Image Card - Student in Indian Campus setting */}
          <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-[40px] overflow-hidden border-[6px] border-[#1E212B] shadow-2xl z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://i.pinimg.com/736x/f3/5d/12/f35d121e8d8d8b96b23f9b5b8829e4e0.jpg"
              alt="Indian Engineering & Management Students"
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12141D] via-transparent to-transparent opacity-70" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={14} className="text-[#FFC107]" />
                <span className="text-[10px] font-bold uppercase text-[#FFC107]">Pan India Network</span>
              </div>
              <p className="text-sm font-semibold text-white">Connecting students to 500+ Top Colleges</p>
            </div>
          </div>

          {/* Floating Course Categories */}
          <div className="absolute -left-12 top-1/4 bg-[#1E212B]/80 border border-white/10 p-5 rounded-3xl shadow-2xl z-30 backdrop-blur-md transform -translate-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#007BFF]/20 flex items-center justify-center text-[#007BFF] font-bold text-xs">B.T</div>
                <span className="text-[11px] font-bold">B.Tech / JEE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFC107]/20 flex items-center justify-center text-[#FFC107] font-bold text-xs">MB</div>
                <span className="text-[11px] font-bold">MBA / CAT</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-bold text-xs">MD</div>
                <span className="text-[11px] font-bold">MBBS / NEET</span>
              </div>
            </div>
          </div>

          {/* Placement Badge - Bottom Right */}
          <div className="absolute -right-6 bottom-8 bg-[#007BFF] p-6 rounded-[2.5rem] shadow-2xl z-30 flex flex-col items-center justify-center text-white transform rotate-6 hover:rotate-0 transition-all cursor-default">
            <span className="text-2xl font-black leading-none">45LPA+</span>
            <span className="text-[9px] uppercase tracking-tighter font-bold opacity-90 mt-1 text-center">Highest Placement <br /> Guidance</span>
          </div>

          {/* Ambient Glow behind image */}
          <div className="absolute w-64 h-64 bg-[#FFC107]/20 rounded-full blur-[80px] -z-10" />
        </div>

      </div>
    </section>
  );
};

export default Hero;