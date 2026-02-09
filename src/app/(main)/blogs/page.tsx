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
  RefreshCw
} from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'

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
    <div className="min-h-screen bg-slate-50/50">
      {/* HERO - Simplified & Clean */}
      <header className="relative py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FileText size={14} /> Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Insights & <span className="text-blue-600">Guides</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Expert advice, study tips, and global education insights curated by our counselors.
            </p>
            <div className="flex items-center justify-center gap-2 bg-white rounded-xl border border-slate-200 px-6 py-3 shadow-sm">
              <FileText className="text-blue-600" />
              <span className="font-semibold text-slate-900">
                {filteredBlogs.length} Articles
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* FILTER BAR - Simplified */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] border-slate-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={16} className="mr-2" /> Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* BLOG GRID - Simplified Design */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {filteredBlogs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <article
                key={blog._id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="block aspect-[16/10] overflow-hidden bg-slate-100"
                >
                  <img
                    src={
                      blog.image ||
                      `https://picsum.photos/seed/${blog.slug}/600/400`
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {blog.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">
                      {new Date(
                        blog.published_at || blog.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>

                  <p className="text-slate-600 text-sm line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-slate-700">
                        {blog.author || 'Team'}
                      </span>
                    </div>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight size={14} />
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

/* STATES */

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
      <div className="text-center">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Loading articles...</p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
      <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">No articles found</h3>
      <p className="text-slate-500">
        Try changing your search or category filter.
      </p>
    </div>
  )
}

function ErrorState({
  error,
  refetch
}: {
  error: any
  refetch: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
      <div className="text-center max-w-md bg-white rounded-2xl border border-slate-200 p-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error.message}</p>
        <Button
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
