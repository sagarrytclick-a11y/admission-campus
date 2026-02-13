'use client'

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Building, FileText, ArrowRight, AlertCircle, RefreshCw, Layout, Calendar } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'
import { motion, AnimatePresence } from 'framer-motion'

// --- CONSTANTS ---
const ITEMS_PER_PAGE = 9;

// --- SUB-COMPONENT: SKELETON CARD ---
const ExamSkeleton = () => (
  <div className="bg-white rounded-[40px] border border-slate-100 p-8 h-full animate-pulse">
    <div className="flex justify-between items-start mb-6">
      <div className="w-16 h-16 rounded-[24px] bg-slate-100" />
      <div className="w-20 h-6 bg-slate-100 rounded-full" />
    </div>
    <div className="h-8 bg-slate-100 rounded-xl w-3/4 mb-4" />
    <div className="h-4 bg-slate-50 rounded-lg w-1/3 mb-8" />
    <div className="grid grid-cols-2 gap-3 mb-8">
      <div className="h-16 bg-slate-50 rounded-3xl" />
      <div className="h-16 bg-slate-50 rounded-3xl" />
    </div>
    <div className="h-12 bg-slate-100 rounded-xl w-full mt-auto" />
  </div>
);

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

  // Filters logic
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
  const examTypes = useMemo(() => [...new Set(exams.map(exam => exam.exam_type).filter(Boolean))], [exams])

  // Infinite Scroll Observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isFetching) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredExams.length));
          setIsLoadingMore(false);
        }, 600);
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoadingMore, isFetching, filteredExams.length]);

  // Loading State (Skeleton)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-slate-950 pt-32 pb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center animate-pulse">
            <div className="h-8 w-48 bg-slate-800 rounded-full mx-auto mb-8" />
            <div className="h-16 md:h-24 bg-slate-800 rounded-3xl w-3/4 mx-auto mb-6" />
            <div className="h-16 max-w-5xl bg-white/5 rounded-[24px] mx-auto" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => <ExamSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">Sync Interrupted</h3>
          <p className="text-slate-500 text-sm mb-8 font-medium">We couldn't reach the admission servers. Please check your connection.</p>
          <Button onClick={() => refetch()} className="w-full bg-[#1A4AB2] h-14 rounded-2xl font-black uppercase tracking-widest gap-2">
            <RefreshCw size={18} /> Retry Connection
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER SECTION */}
      <div className="relative bg-slate-950 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8"
          >
            <Layout size={14} className="text-[#FACC15]" /> Admission Gateway 2026
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            ACE YOUR <span className="text-[#FACC15]">ENTRANCE</span> EXAMS
          </h1>

          <div className="max-w-2xl mx-auto mt-12">
            <div className="bg-white rounded-2xl p-2 shadow-xl flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A4AB2] h-4 w-4" />
                <Input
                  placeholder="Search exams (JEE, NEET, CAT...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-transparent border-none rounded-xl text-sm font-medium focus-visible:ring-0 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Statistics Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <StatCard label="Total Exams" value={filteredExams.length} color="text-[#1A4AB2]" />
          <StatCard label="Categories" value={examTypes.length} color="text-slate-950" />
          
        </div>

        {filteredExams.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <FileText size={48} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Exams Found</h3>
            <p className="text-slate-500 text-xs font-bold uppercase mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {displayedExams.map((exam, index) => (
                  <ExamCard key={exam._id} exam={exam} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Trigger */}
            <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-16">
              {isLoadingMore ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1A4AB2] rounded-full animate-spin" />
                  <p className="text-[#1A4AB2] font-black text-[10px] uppercase tracking-[0.2em]">Loading Discovery Deck...</p>
                </div>
              ) : hasMore ? (
                <div className="h-12 w-1 bg-slate-100 rounded-full animate-bounce" />
              ) : (
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">End of Catalogue</p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="bg-white py-20 border-t border-slate-100">
        <FAQ />
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-white px-8 py-4 rounded-[24px] border border-slate-100 shadow-sm text-center min-w-[140px]">
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</div>
    </div>
  )
}

function ExamCard({ exam, index }: { exam: any, index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 flex flex-col h-full"
    >
      <div className="h-2 bg-[#1A4AB2] w-0 group-hover:w-full transition-all duration-700" />
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 rounded-[24px] bg-slate-50 text-[#1A4AB2] flex items-center justify-center border border-slate-100 group-hover:bg-[#1A4AB2] group-hover:text-white transition-all duration-500">
            <FileText size={28} />
          </div>
          <div className="bg-[#FACC15] text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {exam.short_name}
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-slate-950 mb-3 leading-tight uppercase group-hover:text-[#1A4AB2] transition-colors">
          {exam.name}
        </h3>

        <div className="inline-block self-start text-[9px] font-black bg-blue-50 text-[#1A4AB2] px-3 py-1.5 rounded-lg uppercase tracking-wider mb-6">
          {exam.exam_type}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <InfoTile icon={<Building size={14}/>} label="Body" value={exam.conducting_body} />
          <InfoTile icon={<Calendar size={14}/>} label="Freq" value={exam.frequency} />
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {exam.exam_mode}
          </div>
          <Link href={`/exams/${exam.slug}`}>
            <Button className="bg-[#1A4AB2] hover:bg-slate-950 text-white h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              Explore <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function InfoTile({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
      <div className="flex items-center gap-2 text-slate-400 mb-1">
        {icon}
        <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-[10px] font-black text-slate-900 truncate uppercase">{value}</div>
    </div>
  )
}