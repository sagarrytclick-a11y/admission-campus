'use client'

import React, { useState, useMemo } from 'react'
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
  ChevronRight
} from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'

// Theme Constants
const PRIMARY_BLUE = "#1A4AB2";
const ACCENT_GOLD = "#FACC15";

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { data: blogs = [], isLoading, error, refetch } = useBlogs()

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

  const categories = useMemo(
    () => [...new Set(blogs.map(blog => blog.category))],
    [blogs]
  )

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} refetch={refetch} />

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION - Slate 950 Academic Theme */}
      <header className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1A4AB2_1px,transparent_1px)] [background-size:30px_30px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#1A4AB2] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-blue-900/20">
              <BookOpen size={14} className="text-[#FACC15]" /> Knowledge Hub
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              INSIGHTS & <span className="text-[#FACC15]">GUIDES</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium uppercase tracking-wider leading-relaxed mb-12">
              Expert advice and global education trends curated by our senior consultants.
            </p>
            
            {/* Filter/Search Bar Glassmorphism */}
         <div className="max-w-5xl mx-auto px-4">
  <div className="bg-white rounded-[32px] p-3 shadow-2xl border border-slate-100">
    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
      
      {/* 1. SEARCH INPUT - MD par zyada space lega */}
      <div className="relative w-full md:flex-[2.5] flex items-center">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1A4AB2] h-5 w-5 z-10" />
        <Input
          placeholder="SEARCH FOR TOPICS, GUIDES, NEWS..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-14 h-16 w-full bg-slate-50 border-none rounded-[24px] text-[12px] font-bold uppercase tracking-wider placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#1A4AB2]/20"
        />
      </div>

      {/* 2. SELECT & 3. RESET BUTTON - MD par grouped aur centered rahenge */}
      <div className="flex items-center justify-center w-full md:flex-[1.5] gap-2">
        <div className="flex-1">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-16 w-full bg-slate-50 border-none rounded-[24px] text-[11px] font-black uppercase tracking-widest px-6 focus:ring-0">
              <SelectValue placeholder="CATEGORY" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
              <SelectItem value="all" className="text-[11px] font-bold">ALL TOPICS</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat} className="text-[11px] font-bold uppercase">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          onClick={() => { setSearchTerm(''); setSelectedCategory('all') }}
          className="h-16 w-16 flex-shrink-0 bg-slate-100 hover:bg-[#1A4AB2] hover:text-white rounded-[24px] transition-all flex items-center justify-center"
        >
          <X size={20} />
        </Button>
      </div>

    </div>
  </div>
</div>
          </div>
        </div>
      </header>

      {/* BLOG GRID */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
             <FileText size={48} className="text-slate-200 mx-auto mb-6" />
             <h3 className="text-xl font-black text-slate-900 uppercase">No articles found</h3>
             <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <article
                key={blog._id}
                className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(26,74,178,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Container */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-100"
                >
                  <img
                    src={blog.image || `https://picsum.photos/seed/${blog.slug}/600/400`}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-[#1A4AB2] text-white text-[9px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </Link>

                <div className="p-8 flex-1 flex flex-col">
                  {/* Date & Meta */}
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                    <span>{new Date(blog.published_at || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-black text-slate-950 leading-tight group-hover:text-[#1A4AB2] transition-colors mb-4 uppercase tracking-tight line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-8">
                    {blog.content}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                        <User size={18} className="text-[#1A4AB2]" />
                      </div>
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">
                        {blog.author || 'ACADEMIC TEAM'}
                      </span>
                    </div>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="bg-[#FACC15] p-3 rounded-xl text-slate-950 hover:bg-[#1A4AB2] hover:text-white transition-all shadow-md active:scale-95"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
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