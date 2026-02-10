'use client'

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const ExplorePrograms = () => {
  // Using the exact colors from your Hero design
  const ADMISSION_YELLOW = "#FFD700";
  const ADMISSION_BLUE = "#1E6BFF";

  const cards = [
    {
      title: "Entrance Exams",
      description: "Get deep insights into exam dates, syllabus, and preparation strategies.",
      icon: <FileText className="w-6 h-6 text-white" />,
      iconBg: "bg-[#1E6BFF]",
      tags: ["JEE Main", "NEET", "CAT"],
      links: ["Download Sample Papers", "Mock Test Series"],
      footerAction: "Explore all Exams",
      href: "/exams"
    },
    {
      title: "Top Colleges",
      description: "Browse top-rated institutions based on placement and infrastructure.",
      icon: <Building2 className="w-6 h-6 text-white" />,
      iconBg: "bg-[#1E6BFF]",
      list: ["Top IITs in India", "Top NITs in India"],
      footerAction: "Browse All Colleges",
      href: "/colleges"
    },
    {
      title: "Admission Guidance",
      description: "Evaluate your chances of admission in top Indian colleges based on your scores.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      iconBg: "bg-[#1E6BFF]",
      tags: ["College Predictor", "Cut-off Analysis"],
      links: ["JEE College Predictor", "NEET College Predictor"],
      footerAction: "Get Guidance",
      href: "/blogs"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] py-20 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#1E6BFF] px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse" />
            Find Your Future
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Explore <span className="text-[#1E6BFF]">Programs</span>
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="group bg-white border border-slate-200 rounded-[32px] p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Container with specific Blue */}
              <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200`}>
                {card.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1E6BFF] transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {card.description}
              </p>

              {/* Content Area */}
              <div className="flex-grow">
                {card.tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {card.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 bg-slate-50 text-slate-700 text-[11px] font-bold px-4 py-2 rounded-xl border border-slate-100">
                        <TrendingUp size={12} className="text-[#1E6BFF]" /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {card.links && (
                  <ul className="space-y-3 mb-8">
                    {card.links.map((link) => (
                      <li key={link} className="text-slate-500 text-xs font-medium flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" /> {link}
                      </li>
                    ))}
                  </ul>
                )}

                {card.list && (
                  <ul className="space-y-4 mb-8">
                    {card.list.map((item) => (
                      <li key={item} className="text-slate-700 text-xs font-bold flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#1E6BFF]">
                          •
                        </div> 
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer Button - Matching Hero Action Style */}
              <Link href={card.href} className="mt-auto">
                <button className="w-full bg-slate-900 hover:bg-[#1E6BFF] text-white font-bold py-4 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-lg">
                  {card.footerAction}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePrograms;