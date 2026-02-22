'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { getCountrySlug, getCountryName } from "@/lib/normalize"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, ArrowRight, AlertCircle, RefreshCw, Award, Calendar, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAllColleges } from '@/hooks/useColleges'
import BackgroundSlider from '@/components/BackgroundSlider'

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const itemsPerPage = 10

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setIsSearchLoading(false)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
    if (value.trim()) {
      setIsSearchLoading(true)
    }
  }, [])

  const {
    data: collegesResponse = { colleges: [], total: 0, page: 1, totalPages: 1, hasMore: false },
    isLoading,
    isError,
    error,
    refetch
  } = useAllColleges(debouncedSearchTerm, selectedCountry, selectedExam)

  const colleges = collegesResponse.colleges

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedCountry, selectedExam])

  // Pagination logic
  const { paginatedColleges, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginated = colleges.slice(startIndex, endIndex)
    const pages = Math.ceil(colleges.length / itemsPerPage)
    return { paginatedColleges: paginated, totalPages: pages }
  }, [colleges, currentPage])

  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(
      colleges.map((c: any) => typeof c.country_ref === "object" ? c.country_ref.name : c.country_ref).filter(Boolean)
    )
    const examSet = new Set(colleges.flatMap((college: any) => college.exams))
    return {
      countries: Array.from(countrySet) as string[],
      exams: Array.from(examSet) as string[]
    }
  }, [colleges])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Hero Header Skeleton */}
        <div className="bg-slate-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
              <div className="h-8 bg-slate-700 rounded-full w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="h-16 bg-slate-700 rounded-lg w-3/4 mx-auto mb-6 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
              <div className="bg-white w-full rounded-2xl p-2 shadow-xl">
                <div className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* College Cards Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border border-slate-100 overflow-hidden">
                {/* Banner Skeleton */}
                <div className="h-40 sm:h-48 lg:h-60 bg-slate-200 animate-pulse"></div>
                
                {/* Info Skeleton */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="h-6 bg-slate-200 rounded-lg mb-4 animate-pulse"></div>
                  <div className="flex gap-2 mb-6">
                    <div className="h-6 bg-slate-200 rounded-lg w-20 animate-pulse"></div>
                    <div className="h-6 bg-slate-200 rounded-lg w-20 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="h-16 bg-slate-200 rounded-2xl animate-pulse"></div>
                    <div className="h-16 bg-slate-200 rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="h-12 bg-slate-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <BackgroundSlider>
        <div className="bg-slate-950/80 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-blue-900/20">
                <GraduationCap size={14} className="text-[#FACC15]" /> Explorer Mode
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
                FIND YOUR <span className="text-[#FACC15]">DREAM</span> COLLEGE
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed">
                Discover global opportunities across {countries.length || 'multiple'} countries with expert guidance.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full flex justify-center items-center">
              <div className="bg-white w-full rounded-2xl p-2 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  {/* Search Input Container */}
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A4AB2] h-4 w-4" />
                    <Input
                      placeholder="Search colleges..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10 h-12 w-full bg-transparent border-none rounded-xl text-sm font-medium placeholder:text-slate-400 focus-visible:ring-0"
                    />
                    {isSearchLoading && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-slate-200 border-t-[#1A4AB2] rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundSlider>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {colleges.length === 0 ? (
          <div className="text-center py-20 sm:py-24 lg:py-32 bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border border-dashed border-slate-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search size={24} className="sm:size-32 text-slate-300" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">No results matched your search</h3>
            <p className="text-slate-500 text-xs font-bold uppercase mt-2">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {paginatedColleges.map((college: any) => (
                <div
                  key={college._id}
                  className="group bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Banner */}
                  <div className="relative h-40 sm:h-48 lg:h-60 overflow-hidden">
                    <img
                      src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 sm:top-5 left-3 sm:left-5">
                      <div className="bg-white/95 backdrop-blur-md text-[#1A4AB2] px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {getCountryName(college.country_ref)}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-950 mb-3 sm:mb-4 leading-tight group-hover:text-[#1A4AB2] transition-colors line-clamp-2">
                      {college.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {college.exams.slice(0, 2).map((exam: any) => (
                        <span key={exam} className="text-[9px] font-black bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-tighter">
                          {exam}
                        </span>
                      ))}
                      {college.city && (
                        <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 uppercase tracking-tighter">
                          {college.city}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Award size={14} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Ranking</span>
                        </div>
                        <div className="text-sm font-black text-[#1A4AB2]">
                          {typeof college.ranking === 'string' ? college.ranking : 'Top Tier'}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Calendar size={14} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Est.</span>
                        </div>
                        <div className="text-sm font-black text-slate-900">
                          {college.establishment_year || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <Link href={`/colleges/${college.slug}`} className="block">
                      <Button className="w-full bg-slate-950 hover:bg-[#1A4AB2] text-white h-12 sm:h-14 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] transition-all group-hover:shadow-xl group-hover:shadow-blue-900/20">
                        View Details
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 sm:mt-12">
                <div className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, colleges.length)} of {colleges.length} colleges
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-3"
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(totalPages <= 3 ? totalPages : 5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-3"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}