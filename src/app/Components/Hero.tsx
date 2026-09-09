"use client";

import React, { useState, useEffect, useEffectEvent, useRef } from "react";
import {
  Search,
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
  searchPlaceholder: string;
};

const SLIDES: Slide[] = [
  {
    id: "md-ms",
    title: "MD / MS Admissions",
    caption: "PG medical seats with expert counselling",
    searchPlaceholder: "Search Colleges, Courses, Exams...",
  },
  {
    id: "management",
    title: "Management Excellence",
    caption: "MBA admissions made simple",
    searchPlaceholder: "Search Colleges, Courses, Exams...",
  },
  {
    id: "engineering",
    title: "Engineering Excellence",
    caption: "Find the right B.Tech college for you",
    searchPlaceholder: "Search Colleges, Courses, Exams...",
  },
];

const STATS = [
  { icon: GraduationCap, label: "6000+ Institutions" },
  { icon: FileText, label: "200+ Exams" },
  { icon: Monitor, label: "200+ Online Courses" },
  { icon: BookOpen, label: "200+ Courses" },
];

const TYPING_SPEED_MS = 55;
const HERO_VIDEO = "/Hero/hero.mp4";

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [typing, setTyping] = useState({ slide: 0, count: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useFormModal();

  const slide = SLIDES[slideIndex];
  const typedCount = typing.slide === slideIndex ? typing.count : 0;
  const typedTitle = slide.title.slice(0, typedCount);

  const onAutoAdvance = useEffectEvent(() => {
    setSlideIndex((prev) => (prev + 1) % SLIDES.length);
  });

  useEffect(() => {
    if (searchOpen) return;
    const interval = setInterval(() => onAutoAdvance(), 6500);
    return () => clearInterval(interval);
  }, [searchOpen]);

  useEffect(() => {
    const length = SLIDES[slideIndex].title.length;
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setTyping({ slide: slideIndex, count });
      if (count >= length) clearInterval(interval);
    }, TYPING_SPEED_MS);
    return () => clearInterval(interval);
  }, [slideIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (searchOpen || prefersReducedMotion) {
      video.pause();
      return;
    }

    const play = () => {
      void video.play().catch(() => {
        // Autoplay can be blocked; muted + playsInline usually succeeds.
      });
    };

    play();

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [searchOpen]);

  return (
    <section className="relative min-h-[56vh] sm:min-h-[62vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center pb-12 sm:pb-14">
      <div className="absolute inset-0 bg-[#07111F]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-linear-to-b from-[#07111F]/70 via-[#07111F]/25 to-[#07111F]/80" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0066F5]/15 via-transparent to-[#0047B3]/20" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14 text-center">
        <div className="inline-flex items-stretch gap-3 mb-4 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-tight drop-shadow-md">
            <span className="relative inline-block">
              <span className="invisible" aria-hidden>
                {slide.title}
              </span>
              <span className="absolute inset-0 flex items-center whitespace-nowrap">
                {typedTitle}
                <span
                  className="ml-1 inline-block w-0.5 sm:w-0.75 h-[1em] bg-[#0066F5] animate-pulse"
                  aria-hidden
                />
              </span>
            </span>
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

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Hero headlines">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === slideIndex}
              aria-label={s.title}
              onClick={() => setSlideIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === slideIndex
                  ? "w-7 bg-[#0066F5]"
                  : "w-2 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-16 sm:right-auto z-20 rounded-full bg-white/85 backdrop-blur-sm px-3 py-1.5 text-[11px] sm:text-sm font-medium text-slate-700 shadow-sm max-w-[min(78vw,28rem)] truncate">
        {slide.caption}
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </section>
  );
}
