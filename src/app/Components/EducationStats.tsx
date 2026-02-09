"use client";
import React from "react";
import { GraduationCap, TrendingUp, Users, Award } from "lucide-react";

export default function EducationStats() {
  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Admitted",
      description: "Guided students into reputed colleges and universities."
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Admission Success Rate",
      description: "High approval rate in admissions and counselling process."
    },
    {
      icon: Users,
      value: "50+",
      label: "Partner Institutions",
      description: "Tie-ups with universities and colleges in India & abroad."
    },
    {
      icon: Award,
      value: "₹40+ Cr",
      label: "Scholarships Secured",
      description: "Merit-based and need-based scholarships for students."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-300 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award size={16} />
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Numbers That <span className="text-blue-600">Speak</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to student success is reflected in these achievements. 
            We've helped thousands of students achieve their academic dreams.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-slate-100 rounded-3xl p-8 text-center hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon size={32} />
              </div>

              <div className="text-4xl font-black text-slate-900 mb-2">
                {stat.value}
              </div>

              <div className="text-base font-bold text-slate-800 mb-3">
                {stat.label}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {stat.description}
              </p>

              {/* Animated dot indicator */}
              <div className="mt-4 flex justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white border-2 border-slate-200 rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-900">Trusted by 10,000+ Students</div>
              <div className="text-sm text-slate-500">Across India & Abroad</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
