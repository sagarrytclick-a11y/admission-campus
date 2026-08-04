'use client'

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  Search
} from 'lucide-react';

const ExplorePrograms = () => {
  const cards = [
    {
      title: "Entrance Exams",
      description: "Get exam dates, syllabus, and preparation strategies for national tests.",
      image: "https://img.freepik.com/free-vector/online-exam-landing-page_33099-2374.jpg?semt=ais_user_personalization&w=740&q=80",
      icon: <FileText size={18} className="text-[#007BFF]" />,
      tags: ["JEE Main", "NEET", "CAT"],
      footerAction: "Explore Exams",
      href: "/exams"
    },
    {
      title: "Top Colleges",
      description: "Discover premier institutions ranked by placements and infrastructure.",
      image: "https://img.freepik.com/free-photo/happy-college-students-with-books-hands-walking-together-campus_8353-6400.jpg?semt=ais_user_personalization&w=740&q=80",
      icon: <Building2 size={18} className="text-[#007BFF]" />,
      tags: ["IITs", "NITs", "IIMs"],
      footerAction: "Browse Colleges",
      href: "/colleges"
    },
    {
      title: "College Compare",
      description: "Compare colleges based on your entrance exam scores.",
      image: "https://i.pinimg.com/1200x/f1/9a/c9/f19ac975e74bf07432725b87ec30e60e.jpg",
      icon: <GraduationCap size={18} className="text-[#007BFF]" />,
      tags: ["Rank Predictor", "Cut-offs"],
      footerAction: "Check Now",
      href: "/compare"
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto font-sans text-[#1E293B]">
      
      {/* Simple Header - Same font size as others */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-2">Campus Resources</h2>
          <p className="text-[#64748B] text-sm">Expert guidance and data-driven insights for your education journey.</p>
        </div>
        <Link href="/colleges" className="text-sm font-bold text-[#007BFF] hover:underline flex items-center gap-1">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {/* Simple Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="border-2 border-slate-300 rounded-xl overflow-hidden bg-white hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/20 transition-all duration-300 group flex flex-col"
          >
            {/* Simple Image Header */}
            <div className="aspect-[16/10] w-full overflow-hidden border-b-2 border-slate-300 bg-slate-50">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg border-2 border-slate-300 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1E293B]">{card.title}</h3>
              </div>
              
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {card.description}
              </p>

              {/* Simple Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {card.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-[#1E293B] bg-slate-100 border border-slate-300 px-3 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button - Same Simple Style */}
              <Link href={card.href} className="mt-auto">
                <button className="w-full bg-white border-2 border-slate-300 hover:border-[#007BFF] hover:bg-[#007BFF] hover:text-white text-[#1E293B] font-bold py-3 rounded-md text-sm transition-all flex items-center justify-center gap-2">
                  {card.footerAction}
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePrograms;