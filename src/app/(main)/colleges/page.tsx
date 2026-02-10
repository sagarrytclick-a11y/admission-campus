'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { getCountrySlug } from "@/lib/normalize"
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCountryName } from "@/lib/normalize"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, DollarSign, Clock, GraduationCap, Building, Filter, X, ArrowRight, Loader2, AlertCircle, RefreshCw, Award, Calendar } from 'lucide-react'
import { useInfiniteColleges } from '@/hooks/useColleges'
import BackgroundSlider from '@/components/BackgroundSlider'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees: number
  duration: string
  establishment_year?: string
  ranking?: string
  banner_url?: string
  about_content: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  
  const observer = useRef<IntersectionObserver | null>(null)
  
  // Use TanStack Query for infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteColleges(debouncedSearchTerm, selectedCountry, selectedExam)
  
  // Flatten all pages for rendering
  const colleges = useMemo(() => 
    data?.pages.flatMap(page => page.colleges) || [], [data]
  )
  
  const totalCount = data?.pages[0]?.total || 0

  // Debounce search term (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Setup intersection observer for infinite scroll
  const lastCollegeRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetchingNextPage) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    })
    
    if (node) observer.current.observe(node)
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  // Extract unique countries and exams from colleges for filters
  const { countries, exams } = useMemo(() => {
    const countrySet = new Set(
      colleges
        .map(college => {
          const c = college.country_ref
          if (!c) return null
          if (typeof c === "string") return c
          if (typeof c === "object") return c.name ?? null
          return null
        })
        .filter(Boolean)
    )
    
    const examSet = new Set(colleges.flatMap(college => college.exams))
    
    return {
      countries: Array.from(countrySet),
      exams: Array.from(examSet)
    }
  }, [colleges])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-[#1E6BFF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Excellence...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to Load Colleges</h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <Button 
            onClick={() => { void refetch(); }}
            className="bg-[#1E6BFF] hover:bg-blue-700 text-white font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      
      {/* Header Section */}
      <BackgroundSlider>
        <div className="bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-blue-900/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
              🎓 College Search
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Find Your <span className="text-[#FFD700]">Dream College</span>
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover top colleges and universities with detailed information about 
              courses, fees, admissions, and eligibility criteria.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    placeholder="Search colleges by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((c) => (
                        <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger className="h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                      <SelectValue placeholder="All Exams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exams</SelectItem>
                      {exams.map((exam) => (
                        <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => { setSearchTerm(''); setSelectedCountry('all'); setSelectedExam('all'); }}
                    className="h-14 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* <div className="text-center mb-12">
              <div className="inline-flex items-center gap-6 bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-lg">
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-2xl">{totalCount}</div>
                  <div className="text-sm text-slate-500">Colleges Found</div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-500 mb-1">in {countries.length} countries</div>
                  <div className="text-sm text-slate-500">accepting {exams.length} exam scores</div>
                </div>
              </div>
            </div> */}
        </div>
      </BackgroundSlider>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 bg-[#1E6BFF] text-white px-6 py-3 rounded-full">
              <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
              <span className="font-medium">Loading amazing colleges...</span>
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <div className="text-red-600 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to Load Colleges</h2>
            <p className="text-slate-600 mb-6">
              {(error as Error)?.message || 'An unexpected error occurred'}
            </p>
            <Button 
              onClick={() => { (refetch as () => void)(); }}
              className="bg-[#1E6BFF] hover:bg-blue-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            {/* <div className="text-center mb-12">
              <div className="inline-flex items-center gap-6 bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-lg">
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-2xl">{totalCount}</div>
                  <div className="text-sm text-slate-500">Colleges Found</div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-500 mb-1">in {countries.length} countries</div>
                  <div className="text-sm text-slate-500">accepting {exams.length} exam scores</div>
                </div>
              </div>
            </div> */}

            {/* No Results */}
            {colleges.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search size={48} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No colleges found</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find more options.
                </p>
              </div>
            ) : (
              /* Colleges Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {colleges.map((college, index) => (
                  <div
                    key={college._id}
                    ref={index === colleges.length - 1 ? lastCollegeRef : null}
                    className="group bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* College Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Country Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-[#1E6BFF] text-white px-3 py-1 rounded-full text-xs font-bold">
                          {getCountryName(college.country_ref)}
                        </div>
                      </div>

                      {/* Ranking Badge */}
                      {college.ranking && typeof college.ranking === 'string' && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-[#1E6BFF] text-white px-3 py-1 rounded-full text-xs font-bold">
                            Rank #{college.ranking}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* College Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1E6BFF] transition-colors line-clamp-2">
                        {college.name}
                      </h3>

                      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                        {college.about_content}
                      </p>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-[#1E6BFF] mb-2">
                            <Award size={16} />
                            <span className="text-sm font-medium">Ranking</span>
                          </div>
                          <div className="text-xl font-bold text-slate-900">
                            {typeof college.ranking === 'object' && college.ranking?.country_ranking ? `#${college.ranking.country_ranking}` : college.ranking && typeof college.ranking === 'string' ? college.ranking : 'Top Ranked'}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-[#1E6BFF] mb-2">
                            <Calendar size={16} />
                            <span className="text-sm font-medium">Established</span>
                          </div>
                          <div className="text-xl font-bold text-slate-900">
                            {college.establishment_year || 'N/A'}
                          </div>
                        </div>
                      </div>

                      {/* Exams */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {college.exams.slice(0, 3).map((exam) => (
                          <span key={exam} className="text-xs font-bold bg-blue-50 text-[#1E6BFF] px-3 py-2 rounded-xl">
                            {exam}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-slate-400">
                          Est. {college.establishment_year}
                        </div>
                        <Link href={`/colleges/${college.slug}`}>
                          <Button className="bg-[#1E6BFF] hover:bg-blue-700 text-white rounded-xl">
                            View Details
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Loading Indicator */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <div className="inline-flex items-center gap-3 bg-[#1E6BFF] text-white px-6 py-3 rounded-full">
              <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
              <span className="font-medium">Loading more colleges...</span>
            </div>
          </div>
        )}

        {/* End Message */}
        {!hasNextPage && colleges.length > 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500 font-medium">
              Showing all {colleges.length} colleges
            </p>
          </div>
        )}
      </div>
    </div>
  );
}