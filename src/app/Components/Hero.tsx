"use client";

import React, { useState, useEffect, useEffectEvent } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FileText,
  Monitor,
  BookOpen,
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";
import SearchOverlay from "@/app/Components/SearchOverlay";

type Slide = {
  id: string;
  title: string;
  caption: string;
  image: string;
  searchPlaceholder: string;
};

const SLIDES: Slide[] = [
  {
    id: "md-ms",
    title: "MD / MS Admissions",
    caption: "AIIMS Delhi & Top Medical Colleges",
    image: "https://i.pinimg.com/1200x/43/d9/25/43d925ce787ec1b4d17c307254e88770.jpg",
    searchPlaceholder: "Search Colleges, Courses, Exams...",
  },
  {
    id: "management",
    title: "Management Excellence",
    caption: "IIMs & Leading Business Schools",
    image: "https://i.pinimg.com/1200x/fa/bf/e3/fabfe396cfff23de88157d017ce43867.jpg",
    searchPlaceholder: "Search Colleges, Courses, Exams...",
  },
  {
    id: "engineering",
    title: "Engineering Excellence",
    caption: "IIT Delhi (Indian Institute of Technology)",
    image: "https://i.pinimg.com/736x/2f/fd/d6/2ffdd6cbce2d30f433f03db90d6f353b.jpg",
    searchPlaceholder: "Search Colleges, Courses, Exams...",
  },
];

const STATS = [
  { icon: GraduationCap, label: "6000+ Institutions" },
  { icon: FileText, label: "200+ Exams" },
  { icon: Monitor, label: "200+ Online Courses" },
  { icon: BookOpen, label: "200+ Courses" },
];

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openModal } = useFormModal();

  const slide = SLIDES[slideIndex];

  const onAutoAdvance = useEffectEvent(() => {
    setSlideIndex((prev) => (prev + 1) % SLIDES.length);
  });

  useEffect(() => {
    if (searchOpen) return;
    const interval = setInterval(() => onAutoAdvance(), 6500);
    return () => clearInterval(interval);
  }, [searchOpen]);

  const goPrev = () =>
    setSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setSlideIndex((prev) => (prev + 1) % SLIDES.length);

  return (
    <section className="relative min-h-[48vh] sm:min-h-[52vh] md:min-h-[58vh] overflow-hidden flex items-center justify-center pb-12 sm:pb-14">
      {/* Background slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === slideIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12 text-center">
        <div className="inline-flex items-stretch gap-3 mb-4 sm:mb-8 md:mb-10">
          <h1
            key={slide.title}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-tight"
          >
            {slide.title}
          </h1>
          <span
            className="hidden sm:block w-1.5 md:w-2 rounded-full shrink-0 self-stretch bg-[#0066F5]"
            aria-hidden
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 md:mb-8">
          {STATS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-sm border border-white/10 px-3.5 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 opacity-90" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Opens full search overlay */}
        <div className="relative mx-auto max-w-2xl mb-6 md:mb-8">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2 rounded-full bg-white shadow-xl pl-4 sm:pl-5 pr-1.5 py-1.5 text-left hover:shadow-2xl transition-shadow"
          >
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <span className="flex-1 min-w-0 text-slate-400 text-sm sm:text-base font-medium py-2.5 truncate">
              {slide.searchPlaceholder}
            </span>
            <span className="shrink-0 rounded-full bg-[#0066F5] hover:bg-[#0047B3] text-white font-bold text-xs sm:text-base px-3.5 sm:px-7 py-2.5 sm:py-3 transition-colors">
              Search
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => openModal()}
          className="inline-flex items-center justify-center rounded-full bg-[#0066F5] hover:bg-[#0047B3] text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 shadow-lg shadow-[#0066F5]/35 transition-colors"
        >
          Need Counselling
        </button>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/55 hover:bg-black/75 text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/55 hover:bg-black/75 text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-3 right-16 sm:right-auto z-20 rounded-full bg-white/85 backdrop-blur-sm px-3 py-1.5 text-[11px] sm:text-sm font-medium text-slate-700 shadow-sm max-w-[min(78vw,28rem)] truncate">
        {slide.caption}
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </section>
  );
}
