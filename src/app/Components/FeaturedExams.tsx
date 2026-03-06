"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Clock, Banknote, FileText, ArrowRight, Sparkles, CalendarDays, MapPin } from 'lucide-react';
import { useState } from 'react';

const COLLEGES_PER_PAGE = 6;


const UniversityCard = ({ name, image, slug, country = "India", ranking, fees, duration, establishment_year, about, overview, courses }: any) => {
  return (
    <Link href={`/colleges/${slug}`} className="group block h-full">
      <div className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/20 transition-all duration-300 flex flex-col h-full">
        {/* Simple Image */}
        <div className="h-44 bg-slate-50 border-b-2 border-slate-300">
          <img
            src={image || `https://picsum.photos/seed/${slug}/400/300`}
            alt={name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold leading-tight text-[#1E293B] group-hover:text-[#007BFF] transition-colors line-clamp-2">
              {name}
            </h3>
            {ranking && (
              <span className="text-[10px] font-bold bg-slate-100 border border-slate-300 px-2 py-1 rounded-lg shadow-sm whitespace-nowrap">
                #{ranking} Rank
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-600 text-[10px] font-medium mb-4">
            <MapPin size={12} /> {country} • Est. {establishment_year || "---"}
          </div>

          {/* Stats Row */}
          <div className="flex gap-4 mb-4 pt-4 border-t-2 border-slate-200">
            <div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Fees</p>
              <p className="text-xs font-semibold text-[#1E293B]">{fees || "Enquire"}</p>
            </div>
            <div className="w-[1px] h-6 bg-slate-300 mt-1"></div>
            <div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Duration</p>
              <p className="text-xs font-semibold text-[#1E293B]">{duration || "4"} Years</p>
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-[#007BFF] flex items-center gap-1 group-hover:gap-2  transition-all">
              View Profile <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
/* =======================
   UPCOMING EXAMS SECTION (SIMPLE)
======================= */
const UpcomingExamsSection = ({ exams, loading }: { exams: any[]; loading: boolean }) => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#1E293B] mb-2">
            <CalendarDays size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Entrance Calendar 2026</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B]">Upcoming Exam Dates</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exams.slice(0, 8).map((exam, idx) => (
              <Link key={idx} href={`/exams/${exam.slug}`} className="group p-5 border border-slate-100 rounded-lg bg-[#F8FAFC] hover:border-[#007BFF] transition-colors">
                <h3 className="font-semibold text-[#1E293B] mb-1 group-hover:text-[#007BFF]">{exam.short_name || exam.name}</h3>
                <p className="text-[10px] text-[#64748B] font-medium mb-3 uppercase tracking-wider">Exam: {exam.next_date || "TBA"}</p>
                <div className="text-[#007BFF] text-xs font-bold flex items-center gap-1">
                  Details <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};



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
    <div className="bg-white font-sans text-[#1E293B]">
      {/* Universities Section */}
      <section className="max-w-7xl mx-auto py-16 px-6 lg:px-24">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#007BFF] mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Partner Institutions</span>
          </div>
          <h2 className="text-3xl text-[#1E293B] font-bold tracking-tight mb-3">Top Indian Colleges</h2>
          <p className="text-[#64748B] text-sm max-w-2xl font-medium leading-relaxed">
            Detailed guides on admissions, course structures, and placement records for India's elite academic universities.
          </p>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedUniversities.map((u: any, i: number) => (
            <UniversityCard
              key={i}
              name={u.name}
              image={u.banner_url}
              slug={u.slug}
              country={u.country_ref?.name}
              establishment_year={u.establishment_year}
              ranking={u.ranking?.country_ranking || u.ranking}
              fees={u.fees || u.annual_fees || u.fees_structure?.courses?.[0]?.annual_tuition_fee}
              duration={u.duration || u.fees_structure?.courses?.[0]?.duration}
            />
          ))}
        </div>

        {/* Load More & Navigation */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center">
          <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-widest mb-6">
            Showing {displayedColleges} of {universities.length} institutions
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {hasMoreColleges && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-white border border-slate-200 text-[#1E293B] text-sm font-bold rounded-md hover:border-[#007BFF] hover:text-[#007BFF] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isLoadingMore ? "Loading..." : "Load More"}
                {!isLoadingMore && <ArrowRight size={14} />}
              </button>
            )}

            <Link href="/colleges">
              <button className="px-8 py-3 bg-[#1E293B] text-white text-sm font-bold rounded-md hover:bg-[#007BFF] transition-colors shadow-sm active:scale-95">
                View All Colleges
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary Section */}
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
