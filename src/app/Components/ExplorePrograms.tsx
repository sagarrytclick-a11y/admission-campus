'use client'

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Building2, 
  GraduationCap, 
  ArrowRight,
} from 'lucide-react';

const ExplorePrograms = () => {
  const cards = [
    {
      title: "Entrance Exams",
      description: "Get exam dates, syllabus, and preparation strategies for national tests.",
      image: "https://img.freepik.com/free-vector/online-exam-landing-page_33099-2374.jpg?semt=ais_user_personalization&w=740&q=80",
      icon: FileText,
      tags: ["JEE Main", "NEET", "CAT"],
      footerAction: "View Details",
      href: "/exams"
    },
    {
      title: "Top Colleges",
      description: "Discover premier institutions ranked by placements and infrastructure.",
      image: "https://img.freepik.com/free-photo/happy-college-students-with-books-hands-walking-together-campus_8353-6400.jpg?semt=ais_user_personalization&w=740&q=80",
      icon: Building2,
      tags: ["IITs", "NITs", "IIMs"],
      footerAction: "View Details",
      href: "/colleges"
    },
    {
      title: "NEET Score Predictor",
      description: "Estimate your NEET rank range from subject scores in seconds.",
      image: "https://i.pinimg.com/1200x/f1/9a/c9/f19ac975e74bf07432725b87ec30e60e.jpg",
      icon: GraduationCap,
      tags: ["Rank Predictor", "Cut-offs"],
      footerAction: "View Details",
      href: "/tools/neet-score-predictor"
    }
  ];

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto font-sans text-[#0F172A]">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-2">Campus Resources</h2>
          <p className="text-[#64748B] text-sm">Expert guidance and data-driven insights for your education journey.</p>
        </div>
        <Link href="/colleges" className="text-sm font-bold text-[#0066F5] hover:underline flex items-center gap-1">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title}
              className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white hover:border-[#0066F5] hover:shadow-lg hover:shadow-[#0066F5]/15 transition-all duration-300 group flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden border-b border-[#E2E8F0] bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#E8F1FF] rounded-lg border border-[#0066F5]/15 text-[#0066F5]">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#0066F5] transition-colors">
                    {card.title}
                  </h3>
                </div>
                
                <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-[#0066F5] bg-[#E8F1FF] border border-[#0066F5]/15 px-3 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={card.href} className="mt-auto">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066F5] text-white font-bold py-3 text-sm group-hover:bg-[#0047B3] transition-colors">
                    {card.footerAction}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePrograms;
