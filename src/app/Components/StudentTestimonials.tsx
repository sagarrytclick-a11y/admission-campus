"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Star, Quote, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

const studentTestimonials = [
  {
    name: "Aditi Iyer",
    university: "IIT Madras",
    department: "Computer Science",
    year: "2024",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    testimonial: "The research culture and competitive environment at IITM pushed me beyond my limits. The career cell was instrumental in helping me navigate the high-pressure placement season.",
    achievement: "Secured ₹45 LPA package at Microsoft India"
  },
  {
    name: "Ishaan Malhotra",
    university: "BITS Pilani",
    department: "Mechanical Engineering",
    year: "2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    testimonial: "BITS' 'Zero Attendance' policy and the Practice School (PS) program gave me the freedom to work on my startup while gaining industry experience at top firms.",
    achievement: "Founded a Deep-Tech startup, raised ₹2 Cr in seed funding"
  },
  {
    name: "Sneha Kapoor",
    university: "SRM Institute of Science & Technology",
    department: "Electronics & Comm.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
    testimonial: "Coming from a small town, the exposure at SRM was life-changing. I had the chance to work on the student satellite project which was a dream come true.",
    achievement: "All India Rank (AIR) 15 in GATE 2024"
  },
  {
    name: "Vikram Mehra",
    university: "Delhi Technological University (DTU)",
    department: "Information Technology",
    year: "2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    testimonial: "The alumni network at DTU is incredibly strong. I received mentorship from seniors already in the industry, which helped me crack the toughest technical interviews.",
    achievement: "Selected for Google Summer of Code (GSoC)"
  }
];

export default function StudentTestimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextStep = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % studentTestimonials.length);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + studentTestimonials.length) % studentTestimonials.length);
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextStep, 5000);
    return () => clearInterval(timer);
  }, [nextStep]);

  // Framer Motion Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.9
    })
  };

  const student = studentTestimonials[index];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1A4AB2]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
            Trusted by <span className="text-[#1A4AB2]">Future Leaders</span>
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative flex justify-center items-center h-[550px] md:h-[450px]">
          
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-30">
            <button onClick={prevStep} className="p-4 bg-white shadow-xl rounded-full text-[#1A4AB2] hover:bg-[#1A4AB2] hover:text-white transition-all border border-slate-100">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-30">
            <button onClick={nextStep} className="p-4 bg-white shadow-xl rounded-full text-[#1A4AB2] hover:bg-[#1A4AB2] hover:text-white transition-all border border-slate-100">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Animating Card */}
          <div className="w-full max-w-4xl relative h-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 bg-white border border-slate-200 rounded-[48px] p-8 md:p-14 shadow-2xl flex flex-col md:flex-row items-center gap-10"
              >
                {/* Profile Image */}
                <div className="relative shrink-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] overflow-hidden rotate-3 shadow-2xl">
                    <img src={student.image} className="w-full h-full object-cover" alt={student.name} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FACC15] rounded-2xl flex items-center justify-center rotate-12 shadow-lg">
                    <Award size={20} className="text-slate-900" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#FACC15] fill-[#FACC15]" />)}
                  </div>
                  
                  <h3 className="text-[10px] font-black text-[#1A4AB2] uppercase tracking-[0.2em] mb-3">{student.achievement}</h3>
                  
                  <div className="relative">
                    <Quote size={40} className="absolute -top-6 -left-8 text-slate-100 -z-10" />
                    <p className="text-slate-700 text-lg md:text-xl font-bold italic leading-relaxed mb-8">
                      "{student.testimonial}"
                    </p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={18} className="text-[#1A4AB2]" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base uppercase tracking-tight leading-none">{student.name}</h4>
                      <p className="text-[11px] text-[#1A4AB2] font-black uppercase tracking-widest mt-1">{student.university} • {student.year}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Impact Metrics (Niche rakha hai placeholder ki tarah) */}
        <div className="mt-12 bg-slate-950 rounded-[60px] p-12 relative overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
                {[
                    ["500+", "Successful Admits"],
                    ["₹50Cr+", "Scholarships"],
                    ["50+", "Uni Partners"],
                    ["99%", "Visa Success"],
                ].map(([val, label], i) => (
                    <div key={i}>
                        <div className="text-2xl md:text-4xl font-black text-white mb-1">{val}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}