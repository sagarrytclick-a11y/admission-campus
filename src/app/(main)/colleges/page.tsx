'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const {
    data: collegesResponse = { colleges: [], total: 0, page: 1, totalPages: 1, hasMore: false },
    isLoading,
    isError,
    error,
    refetch
  } = useAllColleges(searchTerm, selectedCountry, selectedExam)

  const colleges = collegesResponse.colleges

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCountry, selectedExam])

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-[#1A4AB2] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-[10px]">Loading Institutions...</p>
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
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                FIND YOUR <span className="text-[#FACC15]">DREAM</span> COLLEGE
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed">
                Discover global opportunities across {countries.length || 'multiple'} countries with expert guidance.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-2xl mx-auto px-4 w-full flex justify-center items-center">
              <div className="bg-white w-full rounded-2xl p-2 shadow-xl">
                <div className="flex items-center gap-2">
                  {/* Search Input Container */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A4AB2] h-4 w-4" />
                    <Input
                      placeholder="Search colleges..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 w-full bg-transparent border-none rounded-xl text-sm font-medium placeholder:text-slate-400 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundSlider>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {colleges.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No results matched your search</h3>
            <p className="text-slate-500 text-xs font-bold uppercase mt-2">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedColleges.map((college: any) => (
                <div
                  key={college._id}
                  className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 hover:-translate-y-2"
                >
                {/* Banner */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-5 left-5">
                    <div className="bg-white/95 backdrop-blur-md text-[#1A4AB2] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {getCountryName(college.country_ref)}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-950 mb-4 leading-tight group-hover:text-[#1A4AB2] transition-colors line-clamp-2">
                    {college.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {college.exams.slice(0, 2).map((exam: any) => (
                      <span key={exam} className="text-[9px] font-black bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-tighter">
                        {exam}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Award size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Ranking</span>
                      </div>
                      <div className="text-sm font-black text-[#1A4AB2]">
                        {typeof college.ranking === 'string' ? college.ranking : 'Top Tier'}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
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
                    <Button className="w-full bg-slate-950 hover:bg-[#1A4AB2] text-white h-14 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all group-hover:shadow-xl group-hover:shadow-blue-900/20">
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
              <div className="flex items-center justify-between mt-12">
                <div className="text-sm text-slate-500">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, colleges.length)} of {colleges.length} colleges
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                          className="w-8 h-8 p-0"
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
                    className="flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
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