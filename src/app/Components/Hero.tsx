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
    <section className="relative min-h-[720px] flex items-center justify-center bg-slate-950 overflow-hidden pt-24 pb-16">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          className="w-full h-full object-cover opacity-60"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FACC15]/10 border border-[#FACC15]/30 px-6 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse" />
          <span className="text-[#FACC15] text-xs font-bold tracking-widest uppercase">
            {slides[currentSlide].badge}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
          {slides[currentSlide].title} <br />
          <span className="text-[#FACC15]">
            {slides[currentSlide].highlight}
          </span>
        </h1>

        <div className="relative max-w-2xl mx-auto mb-10">

          <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
            <div className="pl-6 text-slate-400">
              <Search size={20} />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(e.target.value.length >= 2);
              }}
              placeholder="Search IIT Delhi, AIIMS, JEE..."
              className="w-full py-4 px-4 text-slate-900 font-medium focus:outline-none"
            />

            <button className="bg-[#1A4AB2] hover:bg-[#153a8a] text-white px-8 py-4 font-bold transition-all">
              Search
            </button>
          </div>

          {/* Scrollable Dropdown */}
          {showResults && (
            <div className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-200 max-h-64 overflow-y-auto z-50">

              {colleges.length > 0 ? (
                colleges.map((college: any) => (
                  <Link
                    key={college._id}
                    href={`/colleges/${college.slug}`}
                    className="block px-6 py-4 hover:bg-slate-50 border-b last:border-none text-left"
                  >
                    <div className="font-semibold text-slate-900">
                      {college.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {college.state}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400">
                  No results found
                </div>
              )}

            </div>
          )}
        </div>
        {/* Subtitle */}
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          {slides[currentSlide].subtitle}
        </p>

        {/* SEARCH BAR (NOW CENTER & BELOW HEADING) */}

        {/* TABS SECTION */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">

          {[
            { label: "Engineering", desc: "250+ IITs/NITs" },
            { label: "Medical", desc: "100+ AIIMS" },
            { label: "Management", desc: "80+ IIMs" },
            { label: "Exams", desc: "JEE • NEET • CAT" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl hover:border-[#FACC15] hover:bg-white/10 transition-all duration-300 text-center"
            >
              <div className="text-[#FACC15] text-xs font-bold uppercase tracking-widest mb-1">
                {item.desc}
              </div>
              <div className="text-white font-semibold">
                {item.label}
              </div>
            </button>
          ))}

        </div>

        {/* TRUST STATS */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          {[
            { number: "15,000+", label: "Students Guided" },
            { number: "500+", label: "Institutions" },
            { number: "99%", label: "Success Rate" },
            { number: "24/7", label: "Expert Support" },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="text-2xl font-black text-[#FACC15]">
                {item.number}
              </div>
              <div className="text-slate-400 text-xs uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

  );
};

export default Hero;