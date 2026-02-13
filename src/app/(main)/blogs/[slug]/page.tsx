'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  MessageCircle, 
  ArrowLeft, 
  Share2,
  Tag,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'

interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image?: string
  author?: string
  published_at?: string
  read_time?: number
  views?: number
  comments?: number
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

const BlogDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  
  // Use TanStack Query for blog data
  const { 
    data: blog, 
    isLoading, 
    error, 
    refetch 
  } = useBlog(slug)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-[#1A4AB2] animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error instanceof Error && error.message === 'Blog not found' ? 'Article not found' : 'Failed to Load Article'}
          </h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'The article you are looking for does not exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => refetch()}
              className="bg-[#1A4AB2] hover:bg-[#1A4AB2]/90 text-white"
            >
              Try Again
            </Button>
            <Link href="/blogs">
              <Button variant="outline" className="border-[#1A4AB2] text-[#1A4AB2] hover:bg-[#1A4AB2]/10">
                Back to Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header - Simplified */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-4 text-slate-500 hover:text-[#1A4AB2] font-medium flex gap-2">
              <ArrowLeft size={16} />
              Back to Articles
            </Button>
          </Link>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Badge className="bg-[#1A4AB2]/10 text-[#1A4AB2] border-none px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {blog.category}
            </Badge>
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium bg-[#FACC15]/10 text-[#FACC15]/80 px-2 sm:px-3 py-1 rounded-lg border border-[#FACC15]/20">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Info - Simplified */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1A4AB2]/10 flex items-center justify-center">
                <User size={16} className="text-[#1A4AB2]" />
              </div>
              <span className="font-medium">{blog.author || 'Alpha World Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <span className="font-medium">
                {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            {blog.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <span className="font-medium">{blog.read_time} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image - Simplified */}
      {blog.image && (
        <div className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-[#1A4AB2]/5 to-[#FACC15]/5">
          <img
            src={blog.image.startsWith('http') ? blog.image : `/images/${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content - Simplified */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-lg">
          <div 
            className="text-slate-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ 
              __html: blog.content.replace(/\n/g, '<br />') 
            }}
          />

          {/* Related Exams - Simplified */}
          {blog.related_exams.length > 0 && (
            <div className="mt-12 p-6 bg-gradient-to-br from-[#1A4AB2]/10 to-[#FACC15]/10 rounded-xl border border-[#1A4AB2]/20">
              <h3 className="font-semibold text-[#1A4AB2] mb-4">Related Exams</h3>
              <div className="flex flex-wrap gap-3">
                {blog.related_exams.map((exam) => (
                  <span key={exam} className="text-sm font-medium bg-white text-[#1A4AB2] px-4 py-2 rounded-lg border border-[#1A4AB2]/20 hover:bg-[#1A4AB2]/5 transition-colors">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back to Blogs - Simplified */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <Button className="bg-gradient-to-r from-[#1A4AB2] to-[#1A4AB2]/90 hover:from-[#1A4AB2]/90 hover:to-[#1A4AB2] text-white font-semibold rounded-xl px-8 py-3 shadow-lg shadow-[#1A4AB2]/20">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage