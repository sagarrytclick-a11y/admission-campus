"use client";

import React, { useState } from 'react';
import { Search, Plus, X, ArrowUpDown, Star, MapPin, GraduationCap, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  city?: string
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

export default function CompareColleges() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Real API data fetching
  const { data: colleges = [], isLoading, error } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/colleges');
        if (!res.ok) {
          throw new Error('Failed to fetch colleges');
        }
        const data = await res.json();
        return data.data?.colleges || [];
      } catch (error) {
        console.error('Error fetching colleges:', error);
        throw error;
      }
    }
  });

  const filteredColleges = Array.isArray(colleges) ? colleges.filter((college: College) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.city?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const availableColleges = filteredColleges.filter(
    (college: College) => !selectedColleges.some(selected => selected._id === college._id)
  );

  const addCollege = (college: College) => {
    if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
      setShowAddModal(false);
    }
  };

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter(college => college._id !== collegeId));
  };

  const clearAll = () => {
    setSelectedColleges([]);
  };

  const comparisonMetrics = [
    { key: 'ranking', label: 'Country Ranking', icon: Star, format: (college: College) => {
      if (typeof college.ranking === 'object' && college.ranking?.country_ranking) {
        return `#${college.ranking.country_ranking}`;
      }
      return college.ranking ? `#${college.ranking}` : 'N/A';
    }},
    { key: 'world_ranking', label: 'World Ranking', icon: Award, format: (college: College) => {
      if (typeof college.ranking === 'object' && college.ranking?.world_ranking) {
        return `#${college.ranking.world_ranking}`;
      }
      return 'N/A';
    }},
    { key: 'fees', label: 'Annual Fees', icon: TrendingUp, format: (college: College) => {
      if (college.fees_structure?.courses && college.fees_structure.courses.length > 0) {
        const course = college.fees_structure.courses[0];
        return course.annual_tuition_fee.replace(/^:\s*/, '') || 'N/A';
      }
      return college.fees ? `₹${college.fees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-")}` : 'N/A';
    }},
    { key: 'establishment_year', label: 'Established', icon: GraduationCap, format: (college: College) => college.establishment_year || 'N/A' },
    { key: 'exams', label: 'Entrance Exams', icon: CheckCircle2, format: (college: College) => college.exams?.join(', ') || 'N/A' },
    { key: 'accreditation', label: 'Accreditation', icon: CheckCircle2, format: (college: College) => {
      if (typeof college.ranking === 'object' && college.ranking?.accreditation?.length > 0) {
        return college.ranking.accreditation.join(', ');
      }
      return 'N/A';
    }}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-slate-900">College Comparison</h1>
              <span className="text-sm text-slate-500">
                Compare up to 3 colleges side by side
              </span>
            </div>
            {selectedColleges.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-slate-900">Loading Colleges...</h2>
            <p className="text-slate-600">Fetching college data for comparison</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Data</h2>
            <p className="text-slate-600 mb-4">Failed to fetch college data. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056CC]"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && !error && (
          <>
        {/* Add College Section */}
        {selectedColleges.length < 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Add Colleges to Compare</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  {selectedColleges.length}/3 colleges selected
                </span>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] text-black focus:border-transparent"
              />
            </div>

            {availableColleges.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableColleges.slice(0, 6).map((college : College) => (
                  <div
                    key={college._id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-[#007BFF] hover:shadow-md transition-all cursor-pointer"
                    onClick={() => addCollege(college)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {college.banner_url ? (
                          <img
                            src={college.banner_url}
                            alt={college.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <GraduationCap className="w-8 h-8 text-blue-600 hidden" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{college.name}</h3>
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {college.city}{college.country_ref?.name ? `, ${college.country_ref.name}` : ''}
                        </p>
                        {college.establishment_year && (
                          <p className="text-xs text-slate-500">Est. {college.establishment_year}</p>
                        )}
                      </div>
                    </div>
                    <button className="ml-2 p-1 hover:bg-blue-50 rounded">
                      <Plus className="w-4 h-4 text-[#007BFF]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comparison Table */}
        {selectedColleges.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-900">Metric</th>
                    {selectedColleges.map((college) => (
                      <th key={college._id} className="p-4 min-w-[280px]">
                        <div className="space-y-3">
                          <button
                            onClick={() => removeCollege(college._id)}
                            className="float-right p-1 hover:bg-red-50 rounded-full group"
                          >
                            <X className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                          </button>
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                              {college.banner_url ? (
                                <img
                                  src={college.banner_url}
                                  alt={college.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <GraduationCap className="w-10 h-10 text-[#007BFF] hidden" />
                            </div>
                            <h3 className="font-semibold text-slate-900 text-sm">{college.name}</h3>
                            <p className="text-xs text-slate-600">{college.city}{college.country_ref?.name ? `, ${college.country_ref.name}` : ''}</p>
                            {college.establishment_year && (
                              <p className="text-xs text-slate-500">Est. {college.establishment_year}</p>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* College Images */}
                 

                  {/* Description */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-700">About</td>
                    {selectedColleges.map((college) => (
                      <td key={college._id} className="p-4">
                        <p className="text-sm text-slate-600 leading-relaxed">{college.overview?.description || college.about_content || 'No description available'}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Comparison Metrics */}
                  {comparisonMetrics.map((metric) => (
                    <tr key={metric.key} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-700">
                        <div className="flex items-center gap-2">
                          {React.createElement(metric.icon, { className: "w-4 h-4 text-[#007BFF]" })}
                          {metric.label}
                        </div>
                      </td>
                      {selectedColleges.map((college) => (
                        <td key={college._id} className="p-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-900">
                              {metric.format(college)}
                            </div>
                            {metric.key === 'ranking' && typeof college.ranking === 'object' && college.ranking?.country_ranking && (
                              <div className="flex justify-center mt-1">
                                <span className="text-xs bg-[#007BFF]/20 text-[#007BFF] px-2 py-1 rounded-full">
                                  #{college.ranking.country_ranking}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Courses */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-700">Popular Courses</td>
                    {selectedColleges.map((college) => (
                      <td key={college._id} className="p-4">
                        <div className="space-y-1">
                          {college.fees_structure?.courses?.slice(0, 3).map((course, index) => (
                            <div key={index} className="text-xs bg-[#007BFF]/10 text-[#007BFF] px-2 py-1 rounded-full inline-block">
                              {course.course_name}
                            </div>
                          ))}
                          {college.fees_structure?.courses && college.fees_structure.courses.length > 3 && (
                            <div className="text-xs text-slate-500">+{college.fees_structure.courses.length - 3} more</div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Comparison Summary */}
            <div className="bg-gradient-to-r from-[#007BFF]/10 to-[#FACC15]/10 p-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Comparison Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedColleges.map((college, index) => (
                  <div key={college._id} className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{college.name}</h4>
                      <span className="text-xs bg-[#007BFF]/20 text-[#007BFF] px-2 py-1 rounded-full">
                        Option {index + 1}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Country Rank:</span>
                        <span className="font-medium text-slate-900">
                          {(() => {
                            if (typeof college.ranking === 'object' && college.ranking?.country_ranking) {
                              return `#${college.ranking.country_ranking}`;
                            }
                            return college.ranking ? `#${college.ranking}` : 'N/A';
                          })()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Fees:</span>
                        <span className="font-medium text-slate-900">
                          {(() => {
                            if (college.fees_structure?.courses && college.fees_structure.courses.length > 0) {
                              const course = college.fees_structure.courses[0];
                              return course.annual_tuition_fee.replace(/^:\s*/, '') || 'N/A';
                            }
                            return college.fees ? `₹${college.fees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-")}` : 'N/A';
                          })()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Established:</span>
                        <span className="font-medium text-slate-900">{college.establishment_year || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedColleges.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpDown className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Start Comparing Colleges</h2>
            <p className="text-slate-600 max-w-md mx-auto">
              Add up to 3 colleges to compare their features, fees, placements, and more side by side.
            </p>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
