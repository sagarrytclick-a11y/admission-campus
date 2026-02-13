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
  // Theme Color Tokens
  const PRIMARY_BLUE = "#1A4AB2"; // Deep Royal Blue
  const ACCENT_GOLD = "#FACC15";  // Warm Sun Yellow
  const SOFT_SLATE = "#64748B";   // Neutral Grey for subtext

  const cards = [
    {
      title: "Entrance Exams",
      description: "Get deep insights into exam dates, syllabus, and preparation strategies for national level tests.",
      icon: <FileText className="w-6 h-6 text-white" />,
      iconBg: "bg-[#1A4AB2]",
      tags: ["JEE Main", "NEET", "CAT"],
      links: ["Download Sample Papers", "Mock Test Series"],
      footerAction: "Explore all Exams",
      href: "/exams"
    },
    {
      title: "Top Colleges",
      description: "Browse top-rated institutions based on placement records, campus life, and infrastructure.",
      icon: <Building2 className="w-6 h-6 text-white" />,
      iconBg: "bg-[#1A4AB2]",
      list: ["Top IITs in India", "Top NITs in India"],
      footerAction: "Browse All Colleges",
      href: "/colleges"
    },
    {
      title: "Admission Guidance",
      description: "Evaluate your admission chances in top Indian colleges based on your entrance scores.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      iconBg: "bg-[#1A4AB2]",
      tags: ["College Predictor", "Cut-off 2024"],
      links: ["JEE College Predictor", "NEET College Predictor"],
      footerAction: "Get Guidance Now",
      href: "/blogs"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] py-24 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/10 border border-[#1A4AB2]/20 text-[#1A4AB2] px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse" />
            Discover Your Path
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore <span className="text-[#1A4AB2]">Campus</span> Programs
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl text-base">
            Navigate Indian education landscape with expert guidance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="group bg-white border border-slate-200 rounded-[40px] p-10 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle top border accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1A4AB2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Icon Container */}
              <div className={`w-16 h-16 ${card.iconBg} rounded-[20px] flex items-center justify-center mb-8 shadow-xl shadow-blue-900/20 group-hover:rotate-6 transition-transform`}>
                {card.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1A4AB2] transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Content Area */}
              <div className="flex-grow">
                {card.tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {card.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-2 bg-slate-50 text-slate-700 text-[10px] font-bold px-3 py-2 rounded-2xl border border-slate-100 group-hover:border-[#FACC15]/50 transition-colors">
                        <TrendingUp size={12} className="text-[#1A4AB2]" /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {card.links && (
                  <ul className="space-y-4 mb-8">
                    {card.links.map((link) => (
                      <li key={link} className="text-slate-600 text-xs font-semibold flex items-center gap-2 hover:text-[#1A4AB2] cursor-pointer transition-colors">
                        <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full shrink-0" /> {link}
                      </li>
                    ))}
                  </ul>
                )}

                {card.list && (
                  <ul className="space-y-4 mb-8">
                    {card.list.map((item) => (
                      <li key={item} className="text-slate-800 text-xs font-bold flex items-center gap-3 group/item">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#1A4AB2] group-hover/item:bg-[#FACC15] group-hover/item:text-slate-900 transition-colors">
                          <ArrowRight size={12} />
                        </div> 
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer Button - Matching Hero Action Style */}
              <Link href={card.href} className="mt-auto">
                <button className="w-full bg-[#0F172A] hover:bg-[#1A4AB2] text-white font-bold py-4 px-6 rounded-[24px] text-xs flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-lg">
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