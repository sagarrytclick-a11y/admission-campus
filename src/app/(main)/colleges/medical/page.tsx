'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { getCountrySlug, getCountryName } from "@/lib/normalize"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, ArrowRight, AlertCircle, RefreshCw, Award, Calendar, GraduationCap, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react'
import { useAllColleges } from '@/hooks/useColleges'
import BackgroundSlider from '@/components/BackgroundSlider'

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2"
const ACCENT_GOLD = "#FACC15"
const MEDICAL_GREEN = "#10B981"

export default function MedicalCollegesPage() {
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

  // Filter colleges for medical category
  const medicalColleges = useMemo(() => {
    return collegesResponse.colleges.filter((college: any) => 
      college.categories && college.categories.includes('medical')
    )
  }, [collegesResponse.colleges])

  const colleges = medicalColleges

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

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Colleges</h2>
          <p className="text-slate-600 mb-6">{error?.message || 'Failed to load medical colleges'}</p>
          <Button 
            onClick={() => refetch()}
            className="bg-[#10B981] hover:bg-[#10B981]/90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#10B981] via-[#10B981]/90 to-slate-900 text-white">
        <BackgroundSlider>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
              <Stethoscope className="w-4 h-4" />
              Medical Colleges
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Top <span className="text-[#FACC15]">Medical</span> Institutions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover premier medical colleges offering MBBS, BDS, and specialized healthcare programs 
              with advanced clinical training, research facilities, and hospital affiliations.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FACC15]">{colleges.length}+</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">Medical Colleges</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FACC15]">AIIMS</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">Premier Institutes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FACC15]">NEET</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">Primary Entrance</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search medical colleges by name, location, or specialization..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-12 bg-white/90 text-slate-900 placeholder-slate-500 border-0 rounded-xl focus:ring-2 focus:ring-[#FACC15] transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          </div>
        </BackgroundSlider>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => {
                    const slug = getCountrySlug(country)
                    return slug ? (
                      <SelectItem key={country} value={slug}>
                        {getCountryName(country)}
                      </SelectItem>
                    ) : null
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Entrance Exam</label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Exams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  {exams.map((exam) => (
                    <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('all')
                  setSelectedExam('all')
                }}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        {colleges.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Medical Colleges Found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search terms or filters to find medical colleges.
            </p>
            <Button onClick={() => refetch()} className="bg-[#10B981] hover:bg-[#10B981]/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Results
            </Button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {colleges.length} Medical Colleges Found
                </h2>
                <p className="text-slate-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, colleges.length)} of {colleges.length}
                </p>
              </div>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedColleges.map((college: any) => (
                <div
                  key={college._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#10B981]/10 transition-all duration-500 overflow-hidden"
                >
                  {/* College Banner */}
                  <div className="relative h-48 bg-gradient-to-br from-[#10B981] to-[#10B981]/80 overflow-hidden">
                    {college.banner_url ? (
                      <img
                        src={college.banner_url}
                        alt={college.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Stethoscope className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-[#FACC15] text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      MEDICAL
                    </div>
                  </div>

                  {/* College Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#10B981] transition-colors">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                        <span>{typeof college.country_ref === "object" ? college.country_ref.name : college.country_ref}</span>
                        {college.city && (
                          <>
                            <span>•</span>
                            <span className="text-[#10B981] font-medium">{college.city}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Exams */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {college.exams.slice(0, 2).map((exam: any) => (
                        <span key={exam} className="text-[9px] font-black bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-tighter">
                          {exam}
                        </span>
                      ))}
                      {college.exams.length > 2 && (
                        <span className="text-[9px] font-black bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-tighter">
                          +{college.exams.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Key Info */}
                    <div className="space-y-2 mb-6 text-sm">
                      {college.establishment_year && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Established:</span>
                          <span className="font-medium text-slate-900">{college.establishment_year}</span>
                        </div>
                      )}
                      {college.fees && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Fees:</span>
                          <span className="font-medium text-slate-900">₹{college.fees.toLocaleString()}/year</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link href={`/colleges/${college.slug}`}>
                      <button className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg">
                        View Details
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, colleges.length)} of {colleges.length} medical colleges
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
