"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award, CheckCircle2 } from 'lucide-react';

const studentTestimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    university: "University of Toronto",
    country: "Canada",
    course: "Masters in Computer Science",
    year: "2023",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?q=80&w=400&auto=format&fit=crop",
    testimonial: "Alpha World Education made my dream of studying in Canada come true! Their guidance throughout the application process was exceptional. From IELTS preparation to visa assistance, they supported me at every step.",
    achievement: "Secured 100% scholarship worth ₹15 lakhs"
  },
  {
    name: "Rahul Patel",
    location: "Ahmedabad, Gujarat",
    university: "Technical University of Munich",
    country: "Germany",
    course: "Masters in Mechanical Engineering",
    year: "2022",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    testimonial: "The team helped me secure admission to TU Munich with minimal tuition fees. Their expertise in German education system is unmatched. I'm now working at BMW in Europe!",
    achievement: "Job offer from BMW within 6 months"
  },
  {
    name: "Arjun Reddy",
    location: "Hyderabad, Telangana",
    university: "University of Texas at Dallas",
    country: "USA",
    course: "Masters in Data Science",
    year: "2022",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    testimonial: "Got admitted to 5 top US universities with their help! Their SOP review and interview preparation were game-changers. Now I'm working at Google with an H1B visa!",
    achievement: "Multiple admits, now at Google USA"
  }
];

export default function StudentTestimonials() {
  const ADMISSION_BLUE = "#1E6BFF";
  const ADMISSION_YELLOW = "#FFD700";
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = studentTestimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#1E6BFF] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
            Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Trusted by Students <span className="text-[#1E6BFF]">Across India</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Verified success stories of students admitted to leading global universities 
            with our expert counseling and application support.
          </p>
        </div>

        {/* Testimonial Slider Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {studentTestimonials.map((student, idx) => (
            <div
              key={idx}
              className="group bg-white border border-slate-200 rounded-[32px] p-8 hover:border-[#1E6BFF]/30 hover:shadow-[0_20px_50px_rgba(30,107,255,0.12)] transition-all duration-500 flex flex-col"
            >
              {/* Top Row: Rating & Quote */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
                  ))}
                </div>
                <Quote size={32} className="text-blue-50 opacity-0 group-hover:opacity-100 group-hover:text-[#1E6BFF]/20 transition-all" />
              </div>

              {/* Achievement Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1E6BFF] px-3 py-1.5 rounded-xl text-[11px] font-bold mb-6 self-start">
                <Award size={14} />
                {student.achievement}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                "{student.testimonial}"
              </p>

              {/* Student Profile Info */}
              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="relative">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 size={12} className="text-[#1E6BFF]" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                  <p className="text-[11px] text-[#1E6BFF] font-bold uppercase tracking-wider">{student.university}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{student.country} • {student.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proof Stats - Glassmorphism Style */}
        <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1E6BFF] opacity-10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                    ["500+", "Students Admitted"],
                    ["₹50Cr+", "Scholarships Secured"],
                    ["50+", "Global Universities"],
                    ["95%", "Visa Success Rate"],
                ].map(([value, label], i) => (
                    <div key={i} className="text-center lg:border-r last:border-0 border-slate-800 px-4">
                        <div className="text-3xl md:text-4xl font-black text-[#1E6BFF] mb-2 tracking-tighter">{value}</div>
                        <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}