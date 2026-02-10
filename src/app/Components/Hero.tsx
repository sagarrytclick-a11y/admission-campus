"use client";

import React, { useState, useEffect } from "react";
import { Search, GraduationCap, Globe, BookOpen, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

// Slider data with images and text
const slides = [
  {
    image: "https://i.pinimg.com/1200x/2f/da/76/2fda761c286bc155e5b36db39218a6c3.jpg",
    badge: "India's #1 Admission Portal",
    title: "Your Gateway to",
    highlight: "Top Indian Universities",
    subtitle: "Discover top Indian colleges, crack entrance exams, and get expert guidance for your academic journey. From JEE to NEET, we've got you covered.",
  },
  {
    image: "https://i.pinimg.com/1200x/60/66/7e/60667eb0809709e74a0271d8cd667799.jpg",
    badge: "Crack JEE, NEET & More",
    title: "Master Every",
    highlight: "Entrance Exam",
    subtitle: "Comprehensive preparation guides, mock tests, and expert strategies to help you ace JEE, NEET, AIIMS, and other top competitive exams.",
  },
  {
    image:"https://i.pinimg.com/1200x/54/d5/7d/54d57d87f7fd99d604ab0fb6fb5485d1.jpg",
    badge: "500+ Partner Colleges",
    title: "Get Into Your",
    highlight: "Dream College",
    subtitle: "From IITs and NITs to AIIMS and IIMs - find detailed information about admissions, fees, cutoffs, and placements.",
  },
  {
    image:"https://i.pinimg.com/1200x/20/b0/e7/20b0e7c5b902bc6a8591943766cee8d9.jpg",
    badge: "Expert Career Guidance",
    title: "Shape Your",
    highlight: "Future Career",
    subtitle: "Get personalized counseling from industry experts. Choose the right course, college, and career path for a successful future.",
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // TanStack Query for colleges
  const { data: collegesData, isLoading: isLoadingColleges } = useQuery({
    queryKey: ["colleges-search", query],
    queryFn: async () => {
      if (query.length < 2) return { data: { colleges: [] } };
      const response = await fetch(`/api/colleges?search=${query}`);
      return response.json();
    },
    enabled: query.length >= 2,
  });

  // TanStack Query for exams
  const { data: examsData, isLoading: isLoadingExams } = useQuery({
    queryKey: ["exams-search", query],
    queryFn: async () => {
      if (query.length < 2) return { data: [] };
      const response = await fetch(`/api/admin/exams?search=${query}`);
      return response.json();
    },
    enabled: query.length >= 2,
  });

  const colleges = collegesData?.data?.colleges || [];
  const exams = examsData?.data || [];
  const isLoading = isLoadingColleges || isLoadingExams;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.length >= 2);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
      {/* Background Slider with Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
           
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-[#FFD700] w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Static Floating Icons - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none container mx-auto">
        <div className="absolute top-20 left-4 lg:left-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
        <div className="absolute top-28 right-4 lg:right-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Globe className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
        <div className="absolute bottom-40 left-8 lg:left-16 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
        <div className="absolute bottom-32 right-8 lg:right-16 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-20 text-center">
        {/* Badge - Animated */}
        <div 
          key={`badge-${currentSlide}`}
          className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-8 animate-fadeIn"
        >
          <div className="flex items-center gap-2 text-white text-[10px] sm:text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            {currentSlideData.badge}
          </div>
        </div>

        {/* Main Heading - Animated */}
        <h1 
          key={`title-${currentSlide}`}
          className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight animate-slideUp"
        >
          {currentSlideData.title} <br className="hidden sm:block" />
          <span className="text-[#FFD700]">{currentSlideData.highlight}</span>
        </h1>

        {/* Subtext - Animated */}
        <p 
          key={`subtitle-${currentSlide}`}
          className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-10 text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-0 animate-fadeIn"
        >
          {currentSlideData.subtitle}
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-10 relative px-2 sm:px-0">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <div className="absolute left-4 sm:left-6 text-gray-400">
              <Search size={18} className="sm:w-5 sm:h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search IITs, NITs, AIIMS, exams..."
              className="w-full bg-white rounded-full py-3 sm:py-5 pl-11 sm:pl-14 pr-24 sm:pr-36 text-gray-800 placeholder-gray-400 focus:outline-none shadow-xl text-sm sm:text-base"
            />
            <button
              type="submit"
              className="absolute right-1.5 sm:right-2 bg-[#1E6BFF] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm sm:text-base"
            >
              Search
            </button>
          </form>

          {/* Search Results Dropdown */}
          {showResults && (query.length >= 2) && (
            <div className="absolute top-full left-2 right-2 sm:left-0 sm:right-0 mt-2 sm:mt-3 bg-white text-left rounded-xl sm:rounded-2xl shadow-2xl z-50 max-h-60 sm:max-h-80 overflow-y-auto overflow-hidden">
              {isLoading ? (
                <div className="p-4 sm:p-6 text-center text-gray-500 text-sm">Searching...</div>
              ) : (
                <div className="py-2">
                  {colleges.slice(0, 3).map((college: any) => (
                    <Link key={college._id} href={`/colleges/${college.slug}`} className="block px-4 sm:px-6 py-2 sm:py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <div className="font-bold text-gray-900 text-sm sm:text-base">{college.name}</div>
                      <div className="text-xs text-gray-500">{college.state}</div>
                    </Link>
                  ))}
                  {exams.slice(0, 2).map((exam: any) => (
                    <Link key={exam._id} href={`/exams/${exam.slug}`} className="block px-4 sm:px-6 py-2 sm:py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <div className="font-bold text-blue-600 text-sm sm:text-base">{exam.short_name || exam.name}</div>
                      <div className="text-xs text-gray-500">Entrance Exam</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2 sm:px-0">
          {[
            { icon: <Building className="w-3 h-3 sm:w-4 sm:h-4" />, label: "IITs & NITs" },
            { icon: "⚕️", label: "Medical" },
            { icon: <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />, label: "IIMs & MBA" },
            { icon: <PenLine className="w-3 h-3 sm:w-4 sm:h-4" />, label: "Exams" },
            { icon: <Target className="w-3 h-3 sm:w-4 sm:h-4" />, label: "Universities" }
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-sm border border-white/20 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-black/40 transition-all"
            >
              <span className="text-white/90 text-xs sm:text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 10,000+ Students
          </div>
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 500+ Colleges
          </div>
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 95% Success
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple helper icons for the category buttons if lucide-react isn't fully imported
const Building = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const Briefcase = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PenLine = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const Target = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default Hero;
