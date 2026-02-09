'use client'

import React, { useState } from 'react';
import Link from 'next/link'; // Next.js Link import kiya
import { 
  FileText, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const ExplorePrograms = () => {
  const [activeTab, setActiveTab] = useState('All Programs');

  const cards = [
    {
      title: "Entrance Exams",
      description: "Get deep insights into exam dates, syllabus, and preparation strategies.",
      icon: <FileText className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-600",
      tags: ["JEE Main", "NEET", "CAT"],
      links: ["Download Sample Papers", "Mock Test Series"],
      footerAction: "Explore all Exams",
      href: "/exams" // Link yahan define kiya
    },
    {
      title: "Top Colleges",
      description: "Browse top-rated institutions based on placement and infrastructure.",
      icon: <Building2 className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-600",
      list: ["Top IITs in India", "Top NITs in India"],
      footerAction: "Browse All Colleges",
      href: "/colleges" // Link yahan define kiya
    },
    {
      title: "Admission Guidance",
      description: "Evaluate your chances of admission in top Indian colleges based on your scores.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-600",
      tags: ["College Predictor", "Cut-off Analysis"],
      links: ["JEE College Predictor", "NEET College Predictor"],
      footerAction: "Get Guidance",
      href: "/blogs" // Link yahan define kiya
    }
  ];

  return (
    <div className="bg-white py-16 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-blue-600 font-extrabold text-xs uppercase tracking-widest mb-2">
            Find Your Future
          </p>
          <h2 className="text-3xl font-bold text-slate-900">Explore Programs</h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* 3 cards hain toh grid-cols-3 better rahega */}
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                {card.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Dynamic Content (Tags/Links/List) */}
              <div className="flex-grow">
                {card.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {card.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-100">
                        <TrendingUp size={12} className="text-slate-400" /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {card.links && (
                  <ul className="space-y-2 mb-6">
                    {card.links.map((link) => (
                      <li key={link} className="text-slate-400 text-xs font-medium flex items-center gap-2">
                        <span className="w-1 h-1 bg-slate-300 rounded-full" /> {link}
                      </li>
                    ))}
                  </ul>
                )}

                {card.list && (
                  <ul className="space-y-3 mb-6">
                    {card.list.map((item) => (
                      <li key={item} className="text-slate-600 text-xs font-semibold flex items-center gap-2">
                        <span className="text-slate-300 font-bold text-lg leading-none">•</span> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer Button with Next.js Link */}
              <Link href={card.href} className="mt-auto">
                <button className="w-full bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors group">
                  {card.footerAction}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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