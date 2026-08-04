"use client"
import React from "react";
import { Star, Quote, Award, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentTestimonialSlider() {
  const studentTestimonials = [
    {
      name: "Ananya Reddy",
      university: "IIT Bombay",
      year: "2024",
      image: "https://img.freepik.com/premium-photo/portrait-24yearold-smart-indian-college-girl_1077802-296862.jpg",
      testimonial: "The peer learning culture and coding competitions at IIT Bombay shaped my technical depth.",
      achievement: "₹52 LPA Package"
    },
    {
      name: "Arjun Sharma",
      university: "IIT Delhi",
      year: "2023",
      image: "https://imgcdn.stablediffusionweb.com/2024/12/17/e591519f-4727-40bc-9fac-bc51ef1d14f6.jpg",
      testimonial: "IIT Delhi gave me exposure beyond textbooks. Every experience pushed me forward.",
      achievement: "Raised ₹3.5 Cr"
    },
    {
      name: "Meera Krishnan",
      university: "NIT Trichy",
      year: "2024",
      image: "https://media.istockphoto.com/id/1029797636/photo/school-girl-stock-image.jpg?s=612x612&w=0&k=20&c=vTO9wMeghrSTzTrKNvv_vBmjF7yJMMPA-coFg3bab2w=",
      testimonial: "Mentorship and the strong alumni network helped me prepare strategically for GATE.",
      achievement: "AIR 9 GATE"
    },
    {
      name: "Vikram Mehra",
      university: "DTU Delhi",
      year: "2023",
      image: "https://img.freepik.com/premium-photo/portrait-indian-college-boy-holding-books_255667-22041.jpg?semt=ais_user_personalization&w=740&q=80",
      testimonial: "The technical interviews were tough, but the preparation modules were spot on.",
      achievement: "Selected GSoC"
    }
  ];

  const duplicatedTestimonials = [...studentTestimonials, ...studentTestimonials];

  return (
    <section className="py-20 bg-white overflow-hidden relative font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 mb-12">
        <div className="flex items-center gap-2 text-[#007BFF] mb-3">
          <Sparkles size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Success Stories</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">
          Trusted by Future Leaders
        </h2>
      </div>

      {/* Slider Container */}
      <div className="flex relative">
        {/* Fading Overlays */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-6 pr-6"
          animate={{ x: [0, -1800] }} 
          transition={{
            duration: 40, 
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ x: undefined }} // Simple pause on hover logic can be handled via CSS or state if needed
        >
          {duplicatedTestimonials.map((student, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[400px] flex-shrink-0 group bg-[#F8FAFC] border border-slate-100 rounded-lg p-6 md:p-8 hover:border-[#007BFF] transition-all duration-300 relative"
            >
              {/* Simple Achievement Badge */}
              <div className="mb-6 flex justify-between items-start">
                <div className="bg-white border border-slate-200 px-3 py-1 rounded-md shadow-sm flex items-center gap-2">
                  <Award size={14} className="text-[#007BFF]" />
                  <span className="text-[9px] font-bold text-[#1E293B] uppercase tracking-wider">{student.achievement}</span>
                </div>
                <Quote size={24} className="text-slate-200" />
              </div>

              <p className="text-[#64748B] text-sm font-medium leading-relaxed mb-8 italic">
                "{student.testimonial}"
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-sm leading-none mb-1">{student.name}</h4>
                  <p className="text-[10px] text-[#007BFF] font-bold uppercase tracking-wider">
                    {student.university}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <CheckCircle2 size={18} className="ml-auto text-green-500 opacity-50" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}