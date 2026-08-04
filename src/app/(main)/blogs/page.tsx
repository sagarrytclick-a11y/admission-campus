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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar
} from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const { data: blogs = [], isLoading, error, refetch } = useBlogs()

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
      const matchesSearch = !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [blogs, searchTerm, selectedCategory])

  const { paginatedBlogs, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return {
      paginatedBlogs: filteredBlogs.slice(startIndex, startIndex + itemsPerPage),
      totalPages: Math.ceil(filteredBlogs.length / itemsPerPage)
    }
  }, [filteredBlogs, currentPage])

  const categories = useMemo(() => [...new Set(blogs.map(b => b.category).filter(Boolean))], [blogs])

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HEADER SECTION */}
      <header className="bg-[#F8FAFC] border-b border-slate-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex items-center gap-2 text-[#007BFF] mb-4">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Resources & Insights</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-8 tracking-tight">
            Blogs <span className="text-[#007BFF]">Hub</span>
          </h1>

          {/* INLINE FILTERS BAR */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search - Text set to Slate-900 for visibility */}
            <div className="relative flex-2 bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm focus-within:border-[#007BFF] transition-colors">
              <Search className="text-slate-400" size={18} />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-400"
              />
              {searchTerm && <X size={14} className="text-slate-400 cursor-pointer hover:text-red-500" onClick={() => setSearchTerm('')} />}
            </div>

            {/* Category */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="flex-1 bg-white border-slate-200 h-11 text-[11px] font-bold uppercase tracking-wider rounded-lg text-slate-700">
                <FileText size={14} className="mr-2 text-slate-400" />
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900">
                <SelectItem value="all">All Topics</SelectItem>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* BLOG GRID */}
      <main className="max-w-7xl mx-auto px-6 lg:px-24 py-16">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFC] rounded-lg border border-dashed border-slate-200">
            <p className="text-sm font-bold text-slate-400 uppercase">No matches found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map(blog => (
              <article key={blog._id} className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/20 transition-all duration-300 flex flex-col h-full">
                {/* Image Section - Fixed Height */}
                <Link href={`/blogs/${blog.slug}`} className="relative h-48 bg-slate-50 border-b-2 border-slate-300">
                  <img 
                    src={blog.image || `https://picsum.photos/seed/${blog.slug}/400/200`} 
                    alt={blog.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </Link>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                    <Calendar size={12} />
                    {new Date(blog.published_at || blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-bold text-[#1E293B] mb-2 line-clamp-2 leading-snug">
                    {blog.title}
                  </h2>

                  {/* Description - Fixed Height */}
                  <p className="text-slate-600 text-xs mb-4 leading-relaxed line-clamp-2 h-8">
                    {blog.content}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                        <User size={10} className="text-[#007BFF]" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">Admission Campus Team</span>
                    </div>
                    <Link href={`/blogs/${blog.slug}`} className="text-[#007BFF] bg-[#007BFF]/10 text-[#007BFF] hover:translate-x-1 transition-all duration-200 rounded-full p-2 flex ">
                       <p className="text-[10px] font-bold">View Details</p>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} variant="outline" className="w-9 h-9 p-0 rounded-md border-slate-200 text-slate-600 hover:text-black">
              <ChevronLeft size={18} />
            </Button>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="outline" className="w-9 h-9 p-0 rounded-md border-slate-200 hover:text-black text-slate-600">
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}