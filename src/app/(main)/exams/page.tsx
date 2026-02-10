'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Globe, Calendar, Building, Clock, FileText, ArrowRight, X, LayoutGrid, AlertCircle, RefreshCw } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  hero_section: {
    title: string
    subtitle?: string
    image?: string
  }
  is_active: boolean
  display_order: number
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')

  const { 
    data: examsData = [], 
    isLoading, 
    error,
    refetch 
  } = useExams()

  const exams = Array.isArray(examsData) ? examsData : []

  const filteredExams = useMemo(() => {
    let filtered = exams

    if (selectedType !== 'all') {
      filtered = filtered.filter(exam => exam.exam_type === selectedType)
    }

    if (selectedMode !== 'all') {
      filtered = filtered.filter(exam => exam.exam_mode === selectedMode)
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchLower) ||
        exam.short_name.toLowerCase().includes(searchLower) ||
        exam.conducting_body.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [exams, searchTerm, selectedType, selectedMode])

  const examTypes = useMemo(() => [...new Set(exams.map(exam => exam.exam_type).filter(Boolean))], [exams])
  const examModes = useMemo(() => [...new Set(exams.map(exam => exam.exam_mode).filter(Boolean))], [exams])

  const resetFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedMode('all')
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-[#1E6BFF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Exams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Failed to Load Exams
          </h2>

          <p className="text-slate-600 mb-6">
            {(error as Error)?.message || "An unexpected error occurred"}
          </p>

          <Button
            onClick={() => { (refetch as () => void)(); }}
            className="bg-[#1E6BFF] hover:bg-blue-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-blue-900/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
              📝 Entrance Exams
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ace Your <span className="text-[#FFD700]">Entrance Exams</span>
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive preparation guides, syllabus, and important dates for all major 
              entrance examinations across different streams and countries.
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
                    placeholder="Search exams by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {examTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                      <SelectValue placeholder="All Modes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Modes</SelectItem>
                      {examModes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="h-14 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 bg-[#1E6BFF] text-white px-6 py-3 rounded-full">
              <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
              <span className="font-medium">Loading exams...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-600 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to Load Exams</h2>
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
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-6 bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-lg">
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-2xl">{filteredExams.length}</div>
                  <div className="text-sm text-slate-500">Exams Available</div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-500 mb-1">{examTypes.length} exam types</div>
                  <div className="text-sm text-slate-500">{examModes.length} exam modes</div>
                </div>
              </div>
            </div>

            {/* No Results */}
            {filteredExams.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <FileText size={48} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No exams found</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find more options.
                </p>
              </div>
            ) : (
              /* Exams Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredExams.map((exam) => (
                  <div
                    key={exam._id}
                    className="group bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-[#1E6BFF] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Hero Image */}
                    {exam.hero_section?.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={exam.hero_section.image}
                          alt={exam.hero_section.title || exam.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}

                    {/* Exam Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#1E6BFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <div className="bg-[#1E6BFF] text-white px-3 py-1 rounded-full text-xs font-bold">
                          {exam.short_name}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1E6BFF] transition-colors line-clamp-2">
                        {exam.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold bg-blue-50 text-[#1E6BFF] px-3 py-2 rounded-xl">
                          {exam.exam_type}
                        </span>
                      </div>

                      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                        {exam.description}
                      </p>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-[#1E6BFF] mb-2">
                            <Building size={16} />
                            <span className="text-sm font-medium">Conducting Body</span>
                          </div>
                          <div className="text-sm font-bold text-slate-900 truncate" title={exam.conducting_body}>
                            {exam.conducting_body}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-[#1E6BFF] mb-2">
                            <Calendar size={16} />
                            <span className="text-sm font-medium">Frequency</span>
                          </div>
                          <div className="text-sm font-bold text-slate-900">
                            {exam.frequency}
                          </div>
                        </div>
                      </div>

                      {/* Mode Badge */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-slate-400">
                          Mode: {exam.exam_mode}
                        </div>
                        <Link href={`/exams/${exam.slug}`}>
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
      </div>
      <FAQ />
    </div>
  );
}