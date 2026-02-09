"use client";
import React from "react";
import { BookOpen, Target, BrainCircuit, Globe } from "lucide-react";

export default function StudyPrograms() {
  const programs = [
    {
      icon: Target,
      title: "Engineering Programs",
      description:
        "Complete details about B.Tech, M.Tech, diploma courses, eligibility, entrance exams, fees and top colleges.",
    },
    {
      icon: BrainCircuit,
      title: "Medical Programs",
      description:
        "Explore MBBS, BDS, Nursing and allied medical courses with admission process and counselling guidance.",
    },
    {
      icon: BookOpen,
      title: "Management & MBA",
      description:
        "Information on MBA, PGDM and management programs including entrance exams like CAT, XAT, CMAT.",
    },
    {
      icon: Globe,
      title: "Professional Courses",
      description:
        "Career-oriented courses and certifications aligned with Indian industry requirements.",
    },
    {
      icon: Target,
      title: "Commerce & CA",
      description:
        "Details of CA, CS and commerce programs with top colleges and career opportunities.",
    },
    {
      icon: BrainCircuit,
      title: "Science & Research",
      description:
        "Courses in pure and applied sciences including research programs and PhD opportunities in India.",
    },
    {
      icon: BookOpen,
      title: "Arts & Humanities",
      description:
        "Undergraduate and postgraduate programs in arts, humanities and social sciences in Indian universities.",
    },
    {
      icon: Globe,
      title: "Design & Architecture",
      description:
        "Design, architecture and planning programs with NITs, IITs and top design schools.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Target size={16} />
            Explore Programs
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Find Your Perfect <span className="text-blue-600">Career Path</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose from diverse programs designed to match your interests and career goals. 
            Get expert guidance for admissions, exams, and college selection.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <program.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {program.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1">
                  Explore Programs
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Target size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-6 bg-white border-2 border-slate-200 rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-left">
              <div className="text-sm text-slate-500">Need Help Choosing?</div>
              <div className="font-semibold text-slate-900">Talk to Our Experts</div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}