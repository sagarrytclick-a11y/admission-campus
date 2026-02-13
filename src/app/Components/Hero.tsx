"use client";

import React, { useState, useEffect } from "react";
import { Search, GraduationCap, Globe, Trophy, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

const slides = [
  {
    image: "https://i.pinimg.com/1200x/2f/da/76/2fda761c286bc155e5b36db39218a6c3.jpg",
    badge: "India's #1 Admission Portal",
    title: "Your Gateway to",
    highlight: "Top Indian Universities",
    subtitle: "Discover top Indian colleges, crack entrance exams, and get expert guidance for your academic journey.",
  },
  {
    image: "https://i.pinimg.com/1200x/60/66/7e/60667eb0809709e74a0271d8cd667799.jpg",
    badge: "Crack JEE, NEET & More",
    title: "Master Every",
    highlight: "Entrance Exam",
    subtitle: "Comprehensive preparation guides, mock tests, and expert strategies to help you ace competitive exams.",
  },
  {
    image: "https://i.pinimg.com/1200x/54/d5/7d/54d57d87f7fd99d604ab0fb6fb5485d1.jpg",
    badge: "500+ Partner Colleges",
    title: "Get Into Your",
    highlight: "Dream College",
    subtitle: "From IITs and NITs to AIIMS and IIMs - find detailed info about admissions and placements.",
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: collegesData, isLoading: isLoadingColleges } = useQuery({
    queryKey: ["colleges-search", query],
    queryFn: async () => {
      if (query.length < 2) return { data: { colleges: [] } };
      const response = await fetch(`/api/colleges?search=${query}`);
      return response.json();
    },
    enabled: query.length >= 2,
  });

  const colleges = collegesData?.data?.colleges || [];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <section className="relative min-h-[650px] lg:min-h-[850px] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-[90vh] transition-all duration-1000 ease-in-out transform ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full items-center justify-center text-white hover:bg-[#FACC15] hover:text-slate-950 transition-all duration-500">
        <ChevronLeft size={28} />
      </button>
      <button onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full items-center justify-center text-white hover:bg-[#FACC15] hover:text-slate-950 transition-all duration-500">
        <ChevronRight size={28} />
      </button>

      <div className="container mx-auto px-6 relative z-20 text-center">
        {/* Animated Badge */}
        <div key={`badge-${currentSlide}`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-8 animate-fadeIn">
          <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse shadow-[0_0_15px_#FACC15]" />
          <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">{slides[currentSlide].badge}</span>
        </div>

        {/* Heading */}
        <h1 key={`title-${currentSlide}`} className="text-white text-3xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.95] animate-slideUp">
          {slides[currentSlide].title} <br />
          <span className="text-[#FACC15]">{slides[currentSlide].highlight}</span>
        </h1>

        {/* Subtext */}
        <p key={`subtitle-${currentSlide}`} className="text-slate-300 max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed font-medium animate-fadeIn">
          {slides[currentSlide].subtitle}
        </p>

        {/* Refined Search Bar */}
        <div className="max-w-4xl mx-auto mb-16 relative px-4 sm:px-6">
          <div className="relative flex items-center bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/10">
            <div className="pl-6 text-slate-400">
              <Search size={22} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowResults(e.target.value.length >= 2); }}
              placeholder="Search IITs, NITs, AIIMS, entrance exams..."
              className="w-full bg-transparent py-3 sm:py-4 px-4 sm:px-6 text-slate-900 placeholder-slate-400 focus:outline-none text-sm md:text-base font-bold"
            />
            <button className="bg-[#1A4AB2] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all duration-500 flex items-center gap-2 flex-shrink-0">
              Find
            </button>
          </div>

          {/* Glassmorphism Results */}
          {showResults && (
            <div className="absolute top-full left-4 sm:left-0 right-4 sm:right-0 mt-4 bg-white text-left rounded-[32px] shadow-2xl z-50 max-h-96 overflow-hidden border border-slate-100 w-full sm:w-auto">
              {colleges.length > 0 ? (
                <div className="py-4">
                  {colleges.slice(0, 4).map((college: any) => (
                    <Link key={college._id} href={`/colleges/${college.slug}`} className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base group-hover:text-[#1A4AB2] transition-colors">{college.name}</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest">{college.state} • University</div>
                      </div>
                      <ArrowRight size={20} className="text-[#1A4AB2] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center font-bold text-slate-400">No institutions found matching your search</div>
              )}
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { label: "Engineering", count: "250+ IITs/NITs" },
            { label: "Medical", count: "100+ AIIMS/Colleges" },
            { label: "Management", count: "80+ IIMs/Top MBA" },
            { label: "Exams", count: "Crack JEE/NEET/CAT" }
          ].map((item, idx) => (
            <button key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl hover:border-[#FACC15] hover:bg-white/10 transition-all duration-500 text-left group">
              <div className="text-[#FACC15] text-[10px] font-black uppercase tracking-widest mb-1">{item.count}</div>
              <div className="text-white text-sm font-black group-hover:text-[#FACC15] transition-colors">{item.label}</div>
            </button>
          ))}
        </div>

        {/* Premium Trust Stats */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-8 border-t border-white/10">
          <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <GraduationCap className="text-[#FACC15]" size={18} /> 15,000+ Success Stories
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <Globe className="text-[#FACC15]" size={18} /> 500+ Top Institutions
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <Trophy className="text-[#FACC15]" size={18} /> 99% Admission Rate
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;