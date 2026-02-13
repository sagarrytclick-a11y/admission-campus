"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Clock, Banknote, FileText, ArrowRight } from 'lucide-react';
import {
  MapPin
} from "lucide-react";
import { useState, useEffect, useRef } from 'react';

// Brand Color Constants - Strictly using #1A4AB2
const PRIMARY_BLUE = "#1A4AB2"; 
const ACCENT_GOLD = "#FACC15";  
const SOFT_SLATE = "#64748B";

const COLLEGES_PER_PAGE = 6;

/* =======================
   UNIVERSITY CARD
======================= */

const UniversityCard = ({
  name,
  image,
  slug,
  country = "India",
  ranking,
  fees,
  duration,
  establishment_year,
  about,
  overview,
  exams,
  annual_tuition_fee,
  courses,
  accreditation
}: any) => {

  return (
    <Link href={`/colleges/${slug}`} className="block group h-full">
      <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden hover:border-[#1A4AB2]/30 hover:shadow-[0_20px_50px_-12px_rgba(26,74,178,0.15)] transition-all duration-500 flex flex-col h-full">
        
        {/* Image Section - Scaled Down */}
        <div className="h-48 bg-slate-100 relative overflow-hidden">
          <img
            src={image || `https://picsum.photos/seed/${slug}/400/300`}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          
          {ranking && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/50">
              <p className="text-[10px] font-black text-[#1A4AB2] uppercase tracking-tighter">
                Rank #{ranking}
              </p>
            </div>
          )}

          {accreditation && (
            <div className="absolute top-4 right-4 bg-[#1A4AB2] text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
              {accreditation}
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
            <MapPin size={12} className="text-[#FACC15]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{country}</span>
          </div>
        </div>

        {/* Content Section - Compact Layout */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-black text-slate-950 leading-[1.2] mb-2 group-hover:text-[#1A4AB2] transition-colors line-clamp-2 uppercase tracking-tight">
              {name}
            </h3>
            <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed">
              {overview || about || "Explore world-class education and career opportunities."}
            </p>
          </div>

          {/* Combined Data Points - More Compact */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <Banknote size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">Tuition</span>
              </div>
              <p className="text-[11px] font-bold text-slate-900 truncate">
                {annual_tuition_fee || fees || "Enquire"}
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
              <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                <Clock size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">Period</span>
              </div>
              <p className="text-[11px] font-bold text-slate-900">{duration || "4"} Years</p>
            </div>
          </div>

          {/* Tags - Unified Area */}
          <div className="space-y-3 mb-6">
            {courses && (
              <div className="flex flex-wrap gap-1.5">
                {courses.slice(0, 2).map((course: any, i: number) => (
                  <span key={i} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tight">
                    {typeof course === 'string' ? course : course.course_name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Minimal */}
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#1A4AB2]">
                <GraduationCap size={14} />
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-0.5">Established</p>
                <p className="text-[10px] font-bold text-slate-700">{establishment_year || "---"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1A4AB2] font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
              View Profile
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =======================
   UPCOMING EXAMS SECTION
======================= */

const UpcomingExamsSection = ({ exams, loading }: { exams: any[]; loading: boolean }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/5 border border-[#1A4AB2]/10 text-[#1A4AB2] px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FACC15] rounded-full animate-pulse"></span>
            Entrance Calendar 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Upcoming <span className="text-[#1A4AB2]">Exam Dates</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-60 bg-slate-50 rounded-[40px] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {exams.slice(0, 8).map((exam, idx) => (
              <Link key={idx} href={`/exams/${exam.slug}`} className="group bg-slate-50 border border-slate-200 rounded-[40px] p-8 hover:bg-white hover:border-[#1A4AB2]/20 hover:shadow-2xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white text-[#1A4AB2] flex items-center justify-center group-hover:bg-[#1A4AB2] group-hover:text-white transition-all shadow-md mb-6">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-[#1A4AB2] transition-colors">{exam.short_name || exam.name}</h3>
                <div className="flex items-center gap-2 text-[10px] text-[#1A4AB2] font-black uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full"></span> Live Registration
                </div>
                <div className="mt-4 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Exam Date</p>
                    <p className="text-sm font-bold text-slate-800">{exam.next_date || "Coming Soon"}</p>
                  </div>
                  <div className="text-slate-300 group-hover:text-[#1A4AB2] transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center bg-slate-900 text-white rounded-[40px] pl-10 pr-5 py-5 shadow-2xl">
            <div className="flex -space-x-3 mr-8">
              {[1, 2, 3].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-[#FACC15] text-slate-900 text-[10px] font-black flex items-center justify-center">+10k</div>
            </div>
            <p className="text-sm font-bold mr-12 hidden md:block tracking-tight">Join 10,000+ students tracking exam schedules</p>
            <Link href="/exams" className="bg-[#1A4AB2] px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-3 shadow-lg">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =======================
   MAIN SECTION
======================= */

export default function FeaturedSection() {
  const { universities, exams, loading } = useFeaturedData();
  const [displayedColleges, setDisplayedColleges] = useState(COLLEGES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedUniversities = universities.slice(0, displayedColleges);
  const hasMoreColleges = displayedColleges < universities.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedColleges(prev => Math.min(prev + COLLEGES_PER_PAGE, universities.length));
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="space-y-32 py-32 bg-[#F8FAFC]">
      {/* Universities */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2]/5 border border-[#1A4AB2]/10 text-[#1A4AB2] px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-sm">
            <span className="w-3 h-3 bg-[#FACC15] rounded-full animate-pulse"></span>
            Partner Institutions
          </div>
          <h2 className="text-4xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tighter">
            Top <span className="text-[#1A4AB2]">Indian Colleges</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Detailed guides on admissions, course structures, and placement records for India's elite academic universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedUniversities.map((u: any, i: number) => (
            <UniversityCard
              key={i}
              name={u.name}
              image={u.banner_url}
              slug={u.slug}
              country={u.country_ref?.name}
              about={u.about_content}
              fees={u.fees_structure?.courses?.[0]?.annual_tuition_fee}
              duration={u.fees_structure?.courses?.[0]?.duration}
              establishment_year={u.establishment_year}
              ranking={u.ranking?.country_ranking || u.ranking}
              courses={u.popular_courses || ["Engineering", "Medicine", "Management"]}
              accreditation={u.accreditation || "AICTE"}
            />
          ))}
        </div>

        {/* Load More Section */}
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] text-center mb-6">
            Showing {displayedColleges} of {universities.length} colleges
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {hasMoreColleges && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-white hover:bg-slate-50 text-[#1A4AB2] border-2 border-[#1A4AB2] px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-5 h-5 border-3 border-slate-300 border-t-[#1A4AB2] rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Colleges <ArrowRight size={16} />
                  </>
                )}
              </button>
            )}
            
            <Link 
              href="/colleges" 
              className="bg-[#1A4AB2] hover:bg-slate-900 text-white px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl"
            >
              View All Colleges <ArrowRight size={16} />
            </Link>
          </div>
          
          {!hasMoreColleges && universities.length > COLLEGES_PER_PAGE && (
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-6">
              All {universities.length} colleges loaded
            </p>
          )}
        </div>
      </section>

      <UpcomingExamsSection exams={exams} loading={loading} />
    </div>
  );
}

const useFeaturedData = () => {
  const colleges = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => (await fetch("/api/colleges")).json(),
  });
  const exams = useQuery({
    queryKey: ["exams"],
    queryFn: async () => (await fetch("/api/admin/exams")).json(),
  });

  return {
    universities: colleges.data?.data?.colleges || [],
    exams: exams.data?.data || [],
    loading: colleges.isLoading || exams.isLoading,
  };
};