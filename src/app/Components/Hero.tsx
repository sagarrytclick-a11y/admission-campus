"use client";

import React, { useState } from "react";
import { Search, GraduationCap, Globe, BookOpen, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Hero: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // TanStack Query for colleges
  const { data: collegesData, isLoading: isLoadingColleges } = useQuery({
    queryKey: ["colleges-search", query],
    queryFn: async () => {
      if (query.length < 2) return { data: { colleges: [] } };
      const response = await fetch(`/api/colleges?search=${query}`);
      return response.json();
    },
    enabled: query.length >= 2,
  });

  // TanStack Query for exams
  const { data: examsData, isLoading: isLoadingExams } = useQuery({
    queryKey: ["exams-search", query],
    queryFn: async () => {
      if (query.length < 2) return { data: [] };
      const response = await fetch(`/api/admin/exams?search=${query}`);
      return response.json();
    },
    enabled: query.length >= 2,
  });

  const colleges = collegesData?.data?.colleges || [];
  const exams = examsData?.data || [];
  const isLoading = isLoadingColleges || isLoadingExams;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.length >= 2);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="University Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Static Floating Icons (Positioned exactly as per image) */}
      <div className="absolute inset-0 z-10 pointer-events-none container mx-auto">
        <div className="absolute top-20 left-10 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <GraduationCap className="w-6 h-6 text-blue-600" />
        </div>
        <div className="absolute top-28 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Globe className="w-6 h-6 text-blue-600" />
        </div>
        <div className="absolute bottom-40 left-16 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
          <Trophy className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Badge */}
        <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 mb-8">
          <div className="flex items-center gap-2 text-white text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            India's #1 Admission Portal
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Your Gateway to <br />
          <span className="text-[#FFD700]">Top Indian Universities</span>
        </h1>

        {/* Subtext */}
        <p className="text-white/90 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Discover top Indian colleges, crack entrance exams, and get expert guidance for 
          your academic journey. From JEE to NEET, we've got you covered.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10 relative">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <div className="absolute left-6 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search IITs, NITs, AIIMS, exams, courses..."
              className="w-full bg-white rounded-full py-5 pl-14 pr-36 text-gray-800 placeholder-gray-400 focus:outline-none shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-2 bg-[#1E6BFF] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all"
            >
              Search
            </button>
          </form>

          {/* Search Results Dropdown */}
          {showResults && (query.length >= 2) && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white text-left rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto overflow-hidden">
              {isLoading ? (
                <div className="p-6 text-center text-gray-500">Searching...</div>
              ) : (
                <div className="py-2">
                  {colleges.slice(0, 3).map((college: any) => (
                    <Link key={college._id} href={`/colleges/${college.slug}`} className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <div className="font-bold text-gray-900">{college.name}</div>
                      <div className="text-xs text-gray-500">{college.state}</div>
                    </Link>
                  ))}
                  {exams.slice(0, 2).map((exam: any) => (
                    <Link key={exam._id} href={`/exams/${exam.slug}`} className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <div className="font-bold text-blue-600">{exam.short_name || exam.name}</div>
                      <div className="text-xs text-gray-500">Entrance Exam</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: <Building className="w-4 h-4" />, label: "IITs & NITs" },
            { icon: "⚕️", label: "Medical Colleges" },
            { icon: <Briefcase className="w-4 h-4" />, label: "IIMs & MBA" },
            { icon: <PenLine className="w-4 h-4" />, label: "Entrance Exams" },
            { icon: <Target className="w-4 h-4" />, label: "Top Universities" }
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-lg hover:bg-black/40 transition-all"
            >
              <span className="text-white/90 text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 10,000+ Students Placed
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 500+ Indian Colleges
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 95% Success Rate
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple helper icons for the category buttons if lucide-react isn't fully imported
const Building = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const Briefcase = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PenLine = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const Target = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default Hero;