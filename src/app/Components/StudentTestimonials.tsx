










"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';


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
    testimonial: "Alpha World Education made my dream of studying in Canada come true! Their guidance throughout the application process was exceptional. From IELTS preparation to visa assistance, they supported me at every step. Today, I'm pursuing my Masters at one of the world's top universities!",
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
    testimonial: "The team helped me secure admission to TU Munich with minimal tuition fees. Their expertise in German education system is unmatched. I'm now working at BMW and living my dream life in Europe!",
    achievement: "Got job offer from BMW within 6 months of graduation"
  },
  {
    name: "Ananya Singh",
    location: "Bangalore, Karnataka",
    university: "University of Melbourne",
    country: "Australia",
    course: "MBA",
    year: "2023",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    testimonial: "From a small town in Karnataka to Australia's top business school - Alpha World Education made this journey possible! Their career counseling helped me choose the right path, and their visa guidance was flawless.",
    achievement: "PR application approved, now permanent resident"
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
    testimonial: "Got admitted to 5 top US universities with their help! Their SOP review and interview preparation were game-changers. Now I'm working at Google with an H1B visa and earning in dollars!",
    achievement: "Multiple university admits, now at Google"
  },
  {
    name: "Neha Gupta",
    location: "Delhi NCR",
    university: "University of British Columbia",
    country: "Canada",
    course: "Masters in Environmental Science",
    year: "2023",
    rating: 5,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format&fit=crop",
    testimonial: "Alpha World Education understood my passion for environmental studies and helped me get into UBC with a full scholarship! Their personal statement guidance was incredible. I'm now contributing to climate change research!",
    achievement: "Full scholarship + research assistantship worth ₹20 lakhs"
  },
  {
    name: "Vikram Malhotra",
    location: "Chandigarh",
    university: "University of Sydney",
    country: "Australia",
    course: "Masters in Architecture",
    year: "2021",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    testimonial: "From designing buildings in Chandigarh to working on international projects in Sydney! Their portfolio guidance and university selection were perfect. I'm now a registered architect in Australia!",
    achievement: "Registered architect, working on global projects"
  }
];


export default function StudentTestimonials() {
  const slidesToShow = 3;
  const testimonials = studentTestimonials;
  const totalSlides = Math.ceil(testimonials.length / slidesToShow);

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [totalSlides]);

  const visible = testimonials.slice(
    currentSlide * slidesToShow,
    currentSlide * slidesToShow + slidesToShow
  );

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Student Testimonials
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0f172a] leading-tight">
            Trusted by Students <br />
            <span className="text-blue-600">Across India</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base">
            Verified success stories of students admitted to leading global universities
            with our counselling and application support.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* Controls */}
          <button
            onClick={() => setCurrentSlide(s => (s - 1 + totalSlides) % totalSlides)}
            className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white border border-slate-200 w-10 h-10 rounded-full flex items-center justify-center hover:border-blue-600 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setCurrentSlide(s => (s + 1) % totalSlides)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white border border-slate-200 w-10 h-10 rounded-full flex items-center justify-center hover:border-blue-600 transition"
          >
            <ChevronRight size={18} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(student => (
              <div
                key={student.name}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-600 transition"
              >
                {/* Quote */}
                <Quote size={28} className="text-blue-600 mb-4" />

                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  {student.testimonial}
                </p>

                {/* Student */}
                <div className="flex items-center gap-4 border-t pt-4">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      {student.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {student.university}, {student.country}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 text-xs text-slate-500">
                  Course: <span className="font-semibold">{student.course}</span>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  {[...Array(student.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["500+", "Students Admitted"],
            ["₹50Cr+", "Scholarships Secured"],
            ["50+", "Global Universities"],
            ["95%", "Visa Success Rate"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white border border-slate-200 rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-black text-blue-600">{value}</div>
              <div className="text-sm text-slate-600 mt-1">{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
