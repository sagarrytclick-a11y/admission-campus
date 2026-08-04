'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAllColleges } from '@/hooks/useColleges'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import { Sparkles, GraduationCap, MapPin, Award, TrendingUp, Users, Building } from 'lucide-react'
import CollegeFilters from '@/components/colleges/CollegeFilters'

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<string>('all')
  const [selectedState, setSelectedState] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  const { data: collegesResponse, isLoading, error, refetch } = useAllColleges(searchTerm, 'all', 'all')
  const allColleges = collegesResponse?.colleges || []

  // Filter colleges by selected course and state
  const colleges = useMemo(() => {
    let filtered = allColleges

    if (selectedCourse !== 'all') {
      filtered = filtered.filter((college: any) =>
        college.categories?.includes(selectedCourse)
      )
    }

    if (selectedState !== 'all') {
      filtered = filtered.filter((college: any) =>
        college.city?.toLowerCase() === selectedState.toLowerCase()
      )
    }

    return filtered
  }, [allColleges, selectedCourse, selectedState])

  // Extract unique values for filters
  const { courses, states } = useMemo(() => {
    const courseSet = new Set(colleges.flatMap((college: any) => college.categories || []))
    const stateSet = new Set(colleges.map((college: any) => college.city).filter(Boolean))
    return {
      courses: Array.from(courseSet) as string[],
      states: Array.from(stateSet) as string[]
    }
  }, [colleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Banner */}
      <section className="relative bg-linear-to-br from-[#007BFF] to-[#0056CC] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-24 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-white/90 mb-6">
              <Sparkles size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Discover Excellence</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-yellow-300">Academic Destination</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore India's premier educational institutions with comprehensive rankings,
              detailed insights, and personalized guidance for your academic journey.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {[
                { icon: Building, label: "Colleges", value: "500+" },
                { icon: Users, label: "Students", value: "2M+" },
                { icon: MapPin, label: "Cities", value: "150+" },
                { icon: Award, label: "Rankings", value: "2026" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <stat.icon className="w-8 h-8 text-yellow-300 mb-2 mx-auto" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchSection
                onSearch={handleSearch}
                placeholder="Search colleges, courses, cities..."
                className="bg-white rounded-xl shadow-2xl border-0"
                showFilters={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-8 lg:py-16">
        {/* Mobile: Filters at top, Desktop: Sidebar layout */}
        <div className="lg:flex lg:gap-8">

          {/* Filters Sidebar - Mobile: Full width at top, Desktop: Sidebar */}
          <div className="lg:w-80 lg:shrink-0 lg:order-2">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-[#007BFF] mb-4 flex items-center gap-2">
                  <GraduationCap size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Filter Your Search</span>
                </h3>
                <CollegeFilters
                  courses={courses}
                  states={states}
                  selectedCourse={selectedCourse}
                  selectedState={selectedState}
                  onCourseChange={setSelectedCourse}
                  onStateChange={setSelectedState}
                />
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                <h4 className="font-bold text-[#007BFF] mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <TrendingUp size={14} className="sm:w-4 sm:h-4" />
                  Pro Tips
                </h4>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF] mt-2 shrink-0"></span>
                    <span className="leading-relaxed">Check NIRF rankings for quality assurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF] mt-2 shrink-0"></span>
                    <span className="leading-relaxed">Consider location and campus facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF] mt-2 shrink-0"></span>
                    <span className="leading-relaxed">Review placement statistics and alumni network</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Colleges Grid - Mobile: Below filters, Desktop: Main content */}
          <div className="mt-8 lg:mt-0 lg:flex-1 lg:order-1">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-2">
                {colleges.length > 0 ? `Found ${colleges.length} Colleges` : 'Explore Colleges'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {selectedCourse !== 'all' || selectedState !== 'all'
                  ? 'Filtered results based on your preferences'
                  : 'Browse through our comprehensive directory of top Indian colleges'
                }
              </p>
            </div>

            <CollegeMapping
              colleges={colleges}
              isLoading={isLoading}
              isError={!!error}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onRefetch={refetch}
              emptyMessage="No colleges found matching your criteria. Try adjusting your filters."
              showSearch={false}
            />
          </div>
        </div>
      </main>
    </div>
  )
}