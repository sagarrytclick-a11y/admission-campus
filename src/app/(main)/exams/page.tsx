'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Building, FileText, ArrowRight, AlertCircle, RefreshCw, Sparkles, Calendar, Layers, Monitor, X } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'

const ITEMS_PER_PAGE = 9;

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const { data: examsData = [], isLoading, error, refetch, isFetching } = useExams()
  const exams = useMemo(() => Array.isArray(examsData) ? examsData : [], [examsData])

  // Simple Filtering Logic
  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = !searchTerm || 
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.short_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || exam.exam_type === selectedType;
      const matchesMode = selectedMode === 'all' || exam.exam_mode === selectedMode;
      return matchesSearch && matchesType && matchesMode;
    });
  }, [exams, searchTerm, selectedType, selectedMode])

  const displayedExams = useMemo(() => filteredExams.slice(0, displayedCount), [filteredExams, displayedCount])
  const hasMore = displayedExams.length < filteredExams.length

  // Extract unique values for filters
  const examTypes = useMemo(() => [...new Set(exams.map(exam => exam.exam_type).filter(Boolean))], [exams])
  const examModes = useMemo(() => [...new Set(exams.map(exam => exam.exam_mode).filter(Boolean))], [exams])

  // Infinite Scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isFetching) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredExams.length));
          setIsLoadingMore(false);
        }, 400);
      }
    });
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoadingMore, isFetching, filteredExams.length]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HEADER SECTION */}
      <header className="bg-[#F8FAFC] border-b border-slate-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex items-center gap-2 text-[#007BFF] mb-4">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Entrance Exams 2026</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-8 tracking-tight">
            Explore <span className="text-[#007BFF]">Entrance Exams</span>
          </h1>

          {/* ALL-IN-ONE SEARCH & FILTERS BAR */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-[2] bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm focus-within:border-[#007BFF] transition-colors">
              <Search className="text-slate-400" size={18} />
              <Input
                placeholder="Search exams (JEE, NEET, CAT...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-400"
              />
              {searchTerm && <X size={14} className="text-slate-400 cursor-pointer" onClick={() => setSearchTerm('')} />}
            </div>

            {/* Exam Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="flex-1 bg-white border-slate-200 h-11 text-[11px] font-bold uppercase tracking-wider rounded-lg text-slate-700">
                <Layers size={14} className="mr-2 text-slate-400" />
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900">
                <SelectItem value="all">All Types</SelectItem>
                {examTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Exam Mode Filter */}
            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger className="flex-1 bg-white border-slate-200 h-11 text-[11px] font-bold uppercase tracking-wider rounded-lg text-slate-700">
                <Monitor size={14} className="mr-2 text-slate-400" />
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900">
                <SelectItem value="all">All Modes</SelectItem>
                {examModes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* GRID SECTION */}
      <main className="max-w-7xl mx-auto px-6 lg:px-24 py-16">
        {filteredExams.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFC] rounded-lg border border-dashed border-slate-200">
            <p className="text-sm font-bold text-slate-400 uppercase">No exams found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedExams.map((exam) => (
                <div key={exam._id} className="group bg-white border border-slate-100 rounded-lg p-6 hover:border-[#007BFF] transition-all shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-slate-50 text-[#007BFF] rounded flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <span className="text-[10px] font-bold bg-[#F8FAFC] text-[#1E293B] px-2 py-1 rounded border border-slate-100 uppercase">
                      {exam.short_name}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#1E293B] mb-2 group-hover:text-[#007BFF] transition-colors">{exam.name}</h3>
                  <p className="text-[10px] font-bold text-[#007BFF] uppercase tracking-wider mb-6">{exam.exam_type}</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-xs">
                      <Building size={14} className="text-slate-400" />
                      <span className="text-slate-600 font-medium line-clamp-1">{exam.conducting_body}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-slate-600 font-medium">{exam.frequency}</span>
                    </div>
                  </div>

                  <Link href={`/exams/${exam.slug}`} className="mt-auto">
                    <Button className="w-full bg-[#1E293B] hover:bg-[#007BFF] text-white rounded-md h-10 text-[10px] font-bold uppercase tracking-widest transition-colors">
                      Learn More <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Load More Trigger */}
            <div ref={loadMoreRef} className="mt-12 text-center">
              {isLoadingMore && <div className="w-6 h-6 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin mx-auto" />}
              {!hasMore && filteredExams.length > 0 && (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End of List</p>
              )}
            </div>
          </>
        )}
      </main>

      <div className="bg-[#F8FAFC] py-16 border-t border-slate-100">
        <FAQ />
      </div>
    </div>
  );
}