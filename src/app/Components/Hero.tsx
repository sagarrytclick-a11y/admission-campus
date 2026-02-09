"use client";

import React, { useState } from "react";
import { Search, GraduationCap, Globe, BookOpen, Award, Building, Plane, Users, FileText, TrendingUp, Brain, Target } from "lucide-react";
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
    // Handle full search submission
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.length >= 2);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery("");
  };

  // Close results when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowResults(false);
    if (showResults) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showResults]);

  return (
    <>
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 5s ease-in-out infinite;
        }
      `}</style>
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-28 pb-20 overflow-hidden"
    >
      {/* Floating Education Icons & Logos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Gradients */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100 rounded-full blur-[140px] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-3xl" />
        
        {/* Floating Icons - Top Left */}
        <div className="absolute top-20 left-20 animate-float-slow">
          <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        {/* Floating Icons - Top Right */}
        <div className="absolute top-32 right-32 animate-float-medium">
          <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
            <Globe className="w-7 h-7 text-blue-500" />
          </div>
        </div>
        
        {/* Floating Icons - Middle Left */}
        <div className="absolute top-1/2 left-16 -translate-y-1/2 animate-float-reverse">
          <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        
        {/* Floating Icons - Middle Right */}
        <div className="absolute top-1/3 right-20 animate-float-slow">
          <div className="w-15 h-15 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
            <Award className="w-7 h-7 text-blue-500" />
          </div>
        </div>
        
        {/* Floating Icons - Bottom Left */}
        <div className="absolute bottom-32 left-32 animate-float-medium">
          <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
            <Building className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        
        {/* Floating Icons - Bottom Right */}
        <div className="absolute bottom-20 right-16 animate-float-reverse">
          <div className="w-13 h-13 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-blue-100">
            <Plane className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        
        {/* University Logos/Text Elements */}
        <div className="absolute top-40 left-1/4 animate-float-slow">
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-blue-100">
            <span className="text-xs font-bold text-blue-700">IIT</span>
          </div>
        </div>
        
        <div className="absolute top-60 right-1/3 animate-float-medium">
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-blue-100">
            <span className="text-xs font-bold text-blue-700">IIM</span>
          </div>
        </div>
        
        <div className="absolute bottom-40 left-1/3 animate-float-reverse">
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-blue-100">
            <span className="text-xs font-bold text-blue-700">AIIMS</span>
          </div>
        </div>
        
        {/* Additional Small Icons */}
        <div className="absolute top-1/4 right-1/4 animate-float-slow">
          <Users className="w-6 h-6 text-blue-400/60" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 animate-float-medium">
          <FileText className="w-6 h-6 text-blue-400/60" />
        </div>
        
        <div className="absolute top-1/2 right-1/6 animate-float-reverse">
          <TrendingUp className="w-6 h-6 text-blue-400/60" />
        </div>
        
        <div className="absolute bottom-1/4 right-1/3 animate-float-slow">
          <Brain className="w-6 h-6 text-blue-400/60" />
        </div>
        
        <div className="absolute top-1/3 left-1/6 animate-float-medium">
          <Target className="w-6 h-6 text-blue-400/60" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            India's #1 Admission Portal
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            Your Gateway to
            <span className="block text-blue-600 mt-2">Top Indian Universities</span>
          </h1>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-10">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search IITs, NITs, AIIMS, exams, courses..."
                className="w-full border-2 border-slate-200 bg-white rounded-2xl py-4 pl-14 pr-20 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:shadow-lg transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Search
              </button>

              {/* Search Results Dropdown */}
              {showResults && (query.length >= 2) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-slate-500">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <>
                      {/* Colleges Section */}
                      {colleges.length > 0 && (
                        <div className="border-b border-slate-100">
                          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Colleges</h3>
                          </div>
                          {colleges.slice(0, 5).map((college: any) => (
                            <Link
                              key={college._id}
                              href={`/colleges/${college.slug}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-b-0"
                            >
                              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={16} className="text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-900 truncate">{college.name}</div>
                                <div className="text-xs text-slate-500 truncate">
                                  {college.country_ref?.name || 'India'} • {college.state || 'Location'}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Exams Section */}
                      {exams.length > 0 && (
                        <div>
                          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Entrance Exams</h3>
                          </div>
                          {exams.slice(0, 5).map((exam: any) => (
                            <Link
                              key={exam._id}
                              href={`/exams/${exam.slug}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-b-0"
                            >
                              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                <FileText size={16} className="text-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-900 truncate">{exam.short_name || exam.name}</div>
                                <div className="text-xs text-slate-500 truncate">
                                  {exam.exam_type} • {exam.conducting_body}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* No Results */}
                      {colleges.length === 0 && exams.length === 0 && (
                        <div className="p-4 text-center text-slate-500">
                          <FileText size={24} className="mx-auto mb-2 text-slate-300" />
                          <p className="text-sm">No colleges or exams found</p>
                          <p className="text-xs mt-1">Try different keywords</p>
                        </div>
                      )}

                      {/* View All Results */}
                      {(colleges.length > 0 || exams.length > 0) && (
                        <div className="p-3 bg-slate-50 border-t border-slate-200">
                          <button
                            type="submit"
                            className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            View all results for "{query}"
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
            Discover top Indian colleges, crack entrance exams, and get expert guidance for your 
            academic journey. From JEE to NEET, we've got you covered.
          </p>

          {/* Search Box with Results */}
          

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: "🎓", label: "IITs & NITs" },
              { icon: "⚕️", label: "Medical Colleges" },
              { icon: "💼", label: "IIMs & MBA" },
              { icon: "📝", label: "Entrance Exams" },
              { icon: "�️", label: "Top Universities" }
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>10,000+ Students Placed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>500+ Indian Colleges</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
