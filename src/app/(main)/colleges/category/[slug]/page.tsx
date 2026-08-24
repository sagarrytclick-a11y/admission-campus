'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useAllColleges } from '@/hooks/useColleges'
import { useCategories } from '@/hooks/useCategories'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import CollegeFilters from '@/components/colleges/CollegeFilters'
import { GraduationCap, Award, MapPin, Star } from 'lucide-react'

export default function CategoryCollegesPage() {
  const params = useParams()
  const categorySlug = params.slug as string
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<string>(categorySlug)
  const [selectedState, setSelectedState] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Get category info — wait for this before showing "not found"
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories()
  const currentCategory = categories?.find(cat => cat.slug === categorySlug)

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  // Filter by category on the server so we don't miss colleges past a client-side slice
  const {
    data: collegesResponse = { colleges: [] },
    isLoading: collegesLoading,
    error,
    refetch,
  } = useAllColleges(searchTerm, 'all', 'all', categorySlug)

  const allColleges = collegesResponse.colleges || []
  const isLoading = categoriesLoading || collegesLoading

  // Optional location filter stays client-side on the already category-filtered set
  const colleges = useMemo(() => {
    if (selectedState === 'all') return allColleges

    return allColleges.filter((college: any) =>
      college.city?.toLowerCase() === selectedState.toLowerCase()
    )
  }, [allColleges, selectedState])

  // Extract unique values for filters
  const { states } = useMemo(() => {
    const stateSet = new Set(allColleges.map((college: any) => college.city).filter(Boolean))
    return {
      states: Array.from(stateSet) as string[]
    }
  }, [allColleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  // Stats for the category
  const categoryStats = useMemo(() => {
    const totalColleges = colleges.length
    const avgFees = colleges.reduce((sum: number, college: any) => sum + (college.fees || 0), 0) / totalColleges || 0
    const statesCount = states.length

    return {
      totalColleges,
      avgFees: Math.round(avgFees),
      statesCount
    }
  }, [colleges, states])

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-[#E8F1FF] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0066F5]/30 border-t-[#0066F5] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#64748B]">Loading category...</p>
        </div>
      </div>
    )
  }

  if ((!currentCategory && !categoriesLoading) || categoriesError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-[#E8F1FF] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-4">Category Not Found</h1>
          <p className="text-[#64748B] mb-6 sm:mb-8">The category you're looking for doesn't exist.</p>
          <a href="/colleges" className="inline-flex items-center gap-2 bg-[#0066F5] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#0047B3] transition-colors text-sm sm:text-base">
            <GraduationCap size={18} />
            View All Colleges
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1220] text-white">
        {/* Category image or brand wash */}
        {currentCategory?.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentCategory.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#0B1220] via-[#0B1220]/88 to-[#0066F5]/55" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 100% 0%, rgba(0,102,245,0.45), transparent 55%), linear-gradient(135deg, #0B1220 0%, #0047B3 55%, #0066F5 100%)",
            }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 mb-4">
              <GraduationCap size={14} className="text-white" />
              College Category
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight mb-3">
              {currentCategory?.name || categorySlug}{" "}
              <span className="text-white/90">Colleges in India</span>
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto mb-6">
              {currentCategory?.description ||
                `Explore top ${currentCategory?.name || categorySlug} colleges — fees, rankings, cities and admission guidance in one place.`}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-7 text-xs sm:text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 backdrop-blur-sm">
                <GraduationCap size={14} />
                {categoryStats.totalColleges} Colleges
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 backdrop-blur-sm">
                <MapPin size={14} />
                {categoryStats.statesCount} Cities
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0066F5] px-3 py-1.5">
                <Award size={14} />
                Verified Listings
              </span>
            </div>

            <div className="max-w-xl mx-auto text-left">
              <SearchSection
                onSearch={handleSearch}
                placeholder={`Search ${currentCategory?.name || categorySlug} colleges...`}
                showFilters={false}
                className="!border border-[#E2E8F0] !shadow-lg !rounded-2xl !p-3 sm:!p-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* Filters Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain">
                <CollegeFilters
                  courses={[categorySlug]}
                  states={states}
                  selectedCourse={selectedCourse}
                  selectedState={selectedState}
                  onCourseChange={setSelectedCourse}
                  onStateChange={setSelectedState}
                  embedded
                />

                <div className="mt-4 sm:mt-6 rounded-xl bg-[#E8F1FF] border border-[#0066F5]/15 p-4">
                  <h4 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-[#0066F5]" />
                    Category Overview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Total Colleges</span>
                      <span className="font-semibold text-[#0066F5]">{categoryStats.totalColleges}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Locations</span>
                      <span className="font-semibold text-[#0066F5]">{categoryStats.statesCount}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#64748B]">Avg. Fees</span>
                      <span className="font-semibold text-[#0066F5]">
                        {categoryStats.avgFees ? `₹${categoryStats.avgFees.toLocaleString()}` : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colleges List */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  {currentCategory?.name || categorySlug} Colleges
                </h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Showing {colleges.length} institution{colleges.length === 1 ? "" : "s"}
                  {selectedState !== "all" ? ` in ${selectedState}` : ""}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-6">
                <CollegeMapping
                  colleges={colleges}
                  isLoading={isLoading}
                  error={error}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  onRefetch={refetch}
                  currentCategory={categorySlug}
                  showSearch={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
