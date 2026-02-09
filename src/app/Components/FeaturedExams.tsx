"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  FileText,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

/* =======================
   TYPES
======================= */

interface UniversityCardProps {
  name: string;
  image: string;
  slug: string;
  country?: string;
  ranking?: string;
  fees?: number;
  duration?: string;
  establishment_year?: string;
  about?: string;
}

interface ExamCardProps {
  name: string;
  short_name?: string;
  exam_type?: string;
  conducting_body?: string;
  exam_mode?: string;
  frequency?: string;
  description?: string;
  slug: string;
  next_date?: string;
}

/* =======================
   UNIVERSITY CARD
======================= */

const UniversityCard = (props: UniversityCardProps) => {
  const {
    name,
    image,
    slug,
    country,
    ranking,
    fees,
    duration,
    establishment_year,
    about,
  } = props;

  return (
    <Link href={`/colleges/${slug}`} className="block h-full">
      <div className="group bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

        <div className="h-52 bg-slate-100 relative overflow-hidden">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Ranking Badge */}
          {ranking && typeof ranking === 'string' && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              Rank #{ranking}
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {name}
          </h3>

          {about && (
            <p className="text-slate-600 leading-relaxed line-clamp-2">{about}</p>
          )}

          {country && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <MapPin size={12} />
              </div>
              {country}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm pt-3">
            {fees && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 font-medium">Annual Fees</p>
                <p className="font-bold text-slate-900">₹{fees.toLocaleString()}</p>
              </div>
            )}
            {duration && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 font-medium">Duration</p>
                <p className="font-bold text-slate-900">{duration} Years</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t flex justify-between items-center">
            <span className="text-xs text-slate-400">
              Est. {establishment_year}
            </span>
            <span className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:text-blue-700">
              View Details 
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =======================
   EXAM CARD
======================= */

const ExamCard = ({
  name,
  short_name,
  exam_type,
  conducting_body,
  exam_mode,
  frequency,
  description,
  slug,
}: ExamCardProps) => (
  <Link href={`/exams/${slug}`} className="block h-full">
    <div className="group bg-white border-2 border-slate-100 rounded-3xl p-6 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
          <FileText size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {short_name || name}
          </h3>
          <p className="text-sm text-slate-500 font-medium">{exam_type}</p>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 text-xs text-slate-600 mb-6">
        {exam_mode && (
          <span className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium">
            {exam_mode}
          </span>
        )}
        {frequency && (
          <span className="px-3 py-2 bg-green-50 text-green-700 rounded-xl font-medium">
            {frequency}
          </span>
        )}
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Calendar size={12} />
          </div>
          <span className="text-xs text-slate-400">{conducting_body}</span>
        </div>
        <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View Exam
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </span>
      </div>
    </div>
  </Link>
);

/* =======================
   UPCOMING EXAMS (NO SLIDER)
======================= */

const UpcomingExamsSection = ({
  exams,
  loading,
}: {
  exams: ExamCardProps[];
  loading: boolean;
}) => (
  <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-[140px]" />
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
          📝 Entrance Exams
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Upcoming <span className="text-blue-600">Exam Dates</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Stay updated with important entrance exam schedules, application deadlines, 
          and preparation tips for top universities and colleges.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-white border-2 border-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {exams.slice(0, 8).map((exam, idx) => (
            <Link
              key={idx}
              href={`/exams/${exam.slug}`}
              className="group bg-white border-2 border-slate-100 rounded-3xl p-6 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {exam.name}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                {exam.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Calendar size={16} />
                  <span className="font-medium">{exam.next_date || "Date TBA"}</span>
                </div>
                <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  View Details
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center">
        <div className="inline-flex items-center gap-6 bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-lg">
          <div className="text-left">
            <div className="font-bold text-slate-900">50+ Exams</div>
            <div className="text-sm text-slate-500">Engineering, Medical & More</div>
          </div>
          <Link
            href="/exams"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Exams
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* =======================
   DATA FETCH
======================= */

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

/* =======================
   MAIN SECTION
======================= */

export default function FeaturedSection() {
  const { universities, exams, loading } = useFeaturedData();

  return (
    <div className="space-y-32 py-32 bg-gradient-to-br from-white via-slate-50 to-blue-50">
      
      {/* Universities */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🎓 Featured Indian Colleges
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Top <span className="text-blue-600">Indian Colleges</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore premier Indian institutions with comprehensive admission details, 
            scholarship opportunities, and success stories from our alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {universities.slice(0, 6).map((u: any, i: number) => (
            <UniversityCard
              key={i}
              name={u.name}
              image={u.banner_url}
              slug={u.slug}
              country={u.country_ref?.name}
              about={u.about_content}
              fees={u.fees}
              duration={u.duration}
              establishment_year={u.establishment_year}
              ranking={typeof u.ranking === 'string' ? u.ranking : u.ranking?.country_ranking}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Exams */}
      <UpcomingExamsSection exams={exams} loading={loading} />
    </div>
  );
}
