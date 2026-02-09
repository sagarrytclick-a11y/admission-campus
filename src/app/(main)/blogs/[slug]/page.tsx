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
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Again
            </Button>
            <Link href="/blogs">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Back to Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header - Simplified */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-4 text-slate-500 hover:text-blue-600 font-medium flex gap-2">
              <ArrowLeft size={16} />
              Back to Articles
            </Button>
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-1 rounded-full text-sm font-semibold">
              {blog.category}
            </Badge>
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-lg border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Info - Simplified */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
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
        <div className="relative h-80 w-full overflow-hidden bg-slate-100">
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
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12">
          <div 
            className="text-slate-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ 
              __html: blog.content.replace(/\n/g, '<br />') 
            }}
          />

          {/* Related Exams - Simplified */}
          {blog.related_exams.length > 0 && (
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-4">Related Exams</h3>
              <div className="flex flex-wrap gap-3">
                {blog.related_exams.map((exam) => (
                  <span key={exam} className="text-sm font-medium bg-white text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-3">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage