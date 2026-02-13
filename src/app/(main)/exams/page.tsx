'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Globe, Calendar, Building, FileText, ArrowRight, X, AlertCircle, RefreshCw, GraduationCap, Layout } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'
import { motion } from 'framer-motion'

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

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
    if (selectedType !== 'all') filtered = filtered.filter(exam => exam.exam_type === selectedType)
    if (selectedMode !== 'all') filtered = filtered.filter(exam => exam.exam_mode === selectedMode)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchLower) ||
        exam.short_name.toLowerCase().includes(searchLower)
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
          <div className="w-16 h-16 border-4 border-slate-100 border-t-[#1A4AB2] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-[10px]">Loading Entrance Exams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER SECTION - Slate 950 Theme */}
      <div className="relative bg-slate-950 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8">
            <Layout size={14} className="text-[#FACC15]" /> Admission Gateway 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            ACE YOUR <span className="text-[#FACC15]">ENTRANCE</span> EXAMS
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed mb-16">
            Everything you need to know about eligibility, dates, and patterns for top global exams.
          </p>

          {/* Search & Filters Glassmorphism */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[32px] p-3 shadow-2xl flex flex-col md:flex-row gap-2">
              <div className="relative flex-[2]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1A4AB2] h-5 w-5" />
                <Input
                  placeholder="SEARCH FOR EXAM (E.G. MCAT, JEE, IELTS)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-16 bg-slate-50 border-none rounded-[24px] text-[12px] font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[#1A4AB2]/20"
                />
              </div>

              {/* <div className="flex flex-1 gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-16 bg-slate-50 border-none rounded-[24px] text-[11px] font-black uppercase tracking-widest px-6">
                    <SelectValue placeholder="EXAM TYPE" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="all">ALL TYPES</SelectItem>
                    {examTypes.map((t) => <SelectItem key={t} value={t} className="text-[11px] font-bold">{t.toUpperCase()}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className="h-16 w-16 bg-slate-100 hover:bg-[#1A4AB2] hover:text-white rounded-[24px] transition-all"
                >
                  <X size={20} />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Statistics Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="bg-white px-8 py-4 rounded-[24px] border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-black text-[#1A4AB2]">{filteredExams.length}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Exams Available</div>
          </div>
          <div className="bg-white px-8 py-4 rounded-[24px] border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-black text-slate-950">{examTypes.length}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Categories</div>
          </div>
        </div>

        {filteredExams.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <FileText size={48} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase">No Exams Found</h3>
            <p className="text-slate-500 text-xs font-bold uppercase mt-2">Try different keywords or clear filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam) => (
              <div
                key={exam._id}
                className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Visual Header */}
                <div className="h-2 bg-[#1A4AB2] w-0 group-hover:w-full transition-all duration-700"></div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-[24px] bg-slate-50 text-[#1A4AB2] flex items-center justify-center border border-slate-100 group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
                      <FileText size={28} />
                    </div>
                    <div className="bg-[#FACC15] text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {exam.short_name}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-950 mb-3 leading-tight uppercase tracking-tight group-hover:text-[#1A4AB2] transition-colors">
                    {exam.name}
                  </h3>

                  <div className="inline-block self-start text-[9px] font-black bg-blue-50 text-[#1A4AB2] px-3 py-1.5 rounded-lg uppercase tracking-wider mb-6">
                    {exam.exam_type}
                  </div>

                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                    {exam.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Building size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Body</span>
                      </div>
                      <div className="text-[11px] font-black text-slate-900 truncate uppercase">
                        {exam.conducting_body}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Calendar size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Frequency</span>
                      </div>
                      <div className="text-[11px] font-black text-slate-900 uppercase">
                        {exam.frequency}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      MODE: {exam.exam_mode}
                    </div>
                    <Link href={`/exams/${exam.slug}`}>
                      <Button className="bg-[#1A4AB2] hover:bg-slate-950 text-white h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Details <ArrowRight size={14} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQ SECTION with padding */}
      <div className="bg-white py-20">
        <FAQ />
      </div>
    </div>
  );
}