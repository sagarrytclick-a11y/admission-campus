'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search,
  FileText,
  User,
  ArrowRight,
  X,
  AlertCircle,
  RefreshCw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const { data: blogs = [], isLoading, error, refetch } = useBlogs()

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory =
        selectedCategory === 'all' || blog.category === selectedCategory
      const matchesSearch =
        !searchTerm ||
        [blog.title, blog.content, ...blog.tags].some(t =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        )
      return matchesCategory && matchesSearch
    })
  }, [blogs, searchTerm, selectedCategory])

  // Pagination logic
  const { paginatedBlogs, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginated = filteredBlogs.slice(startIndex, endIndex)
    const pages = Math.ceil(filteredBlogs.length / itemsPerPage)
    return { paginatedBlogs: paginated, totalPages: pages }
  }, [filteredBlogs, currentPage])

  const categories = useMemo(
    () => [...new Set(blogs.map(blog => blog.category))],
    [blogs]
  )

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} refetch={refetch} />

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION - Slate 950 Academic Theme */}

      {/* HERO SECTION - Slate 950 Academic Theme */}
   {/* HERO SECTION - Updated for Perfect Centering */}
<header className="relative min-h-[520px] md:min-h-[650px] flex flex-col items-center justify-center bg-slate-950 overflow-hidden px-4 sm:px-6">

  {/* Background Grid */}
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:28px_28px] md:[background-size:30px_30px]"></div>
  </div>

  <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-6 sm:mb-8 shadow-xl shadow-blue-900/20">
      <BookOpen size={14} className="text-[#FACC15]" />
      Knowledge Hub
    </div>

    {/* Title */}
    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight uppercase leading-tight">
      INSIGHTS & <span className="text-[#FACC15]">GUIDES</span>
    </h1>

    {/* Subtitle */}
    <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl md:max-w-2xl mx-auto font-medium uppercase tracking-wide leading-relaxed mb-8 sm:mb-12">
      Expert advice and global education trends curated by our senior consultants.
    </p>

    {/* SEARCH + FILTER */}
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-3 items-stretch">

        {/* SEARCH */}
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A4AB2] h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 h-12 sm:h-14 w-full bg-transparent border-none rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-0"
          />
        </div>

        {/* SELECT */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-12 sm:h-14 w-full md:w-48 bg-slate-50 border-none rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-4 sm:px-6 focus:ring-0">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
            <SelectItem value="all" className="text-[11px] font-bold">
              ALL TOPICS
            </SelectItem>
            {categories.map(cat => (
              <SelectItem
                key={cat}
                value={cat}
                className="text-[11px] font-bold uppercase"
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* RESET */}
        <Button
          variant="ghost"
          onClick={() => {
            setSearchTerm('')
            setSelectedCategory('all')
          }}
          className="h-12 sm:h-14 w-full md:w-14 bg-slate-100 hover:bg-[#1A4AB2] hover:text-white rounded-xl transition-all flex items-center justify-center shrink-0"
        >
          <X size={18} />
        </Button>

      </div>
    </div>

  </div>
</header>


      {/* BLOG GRID */}
     <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

  {filteredBlogs.length === 0 ? (
    <div className="text-center py-20 sm:py-32 bg-white rounded-3xl sm:rounded-[40px] border-2 border-dashed border-slate-200">
      <FileText size={40} className="text-slate-200 mx-auto mb-6" />
      <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase">
        No articles found
      </h3>
      <p className="text-slate-500 text-[10px] sm:text-[11px] font-black uppercase tracking-widest mt-2">
        Try adjusting your filters
      </p>
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {paginatedBlogs.map(blog => (
        <article
          key={blog._id}
          className="group bg-white rounded-3xl sm:rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_30px_60px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
        >

          <Link
            href={`/blogs/${blog.slug}`}
            className="relative aspect-[16/10] overflow-hidden bg-slate-100"
          >
            <img
              src={blog.image || `https://picsum.photos/seed/${blog.slug}/600/400`}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#1A4AB2] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                {blog.category}
              </span>
            </div>
          </Link>

          <div className="p-6 sm:p-8 flex-1 flex flex-col">

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              {new Date(blog.published_at || blog.createdAt).toLocaleDateString()}
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-950 leading-tight group-hover:text-[#1A4AB2] transition-colors mb-4 uppercase line-clamp-2">
              {blog.title}
            </h2>

            <p className="text-slate-500 text-sm line-clamp-3 mb-6">
              {blog.content}
            </p>

            <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center border">
                  <User size={16} className="text-[#1A4AB2]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase">
                  {blog.author || 'ACADEMIC TEAM'}
                </span>
              </div>

              <Link
                href={`/blogs/${blog.slug}`}
                className="bg-[#FACC15] p-2.5 sm:p-3 rounded-xl text-slate-950 hover:bg-[#1A4AB2] hover:text-white transition-all shadow-md active:scale-95"
              >
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>
        </article>
      ))}
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
      <div className="flex items-center justify-between mt-12">
        <div className="text-sm text-slate-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} articles
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

</main>

    </div >
  )
}

/* POLISHED STATES */

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-[#1A4AB2] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-950 font-black uppercase tracking-[0.2em] text-[10px]">Syncing Knowledge Hub...</p>
      </div>
    </div>
  )
}

function ErrorState({ error, refetch }: { error: any; refetch: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md bg-white rounded-[40px] border border-slate-100 p-12 shadow-2xl">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-slate-950 mb-2 uppercase tracking-tight">System Error</h2>
        <p className="text-slate-500 text-sm font-medium mb-8">{error.message}</p>
        <Button
          onClick={refetch}
          className="bg-[#1A4AB2] hover:bg-slate-950 text-white h-14 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Try Again
        </Button>
      </div>
    </div>
  )
}