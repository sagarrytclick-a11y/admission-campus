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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-slate-200 border-t-[#1A4AB2] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Article not found
          </h2>
          <p className="text-slate-500 mb-6">
            The article you are looking for does not exist.
          </p>
          <Link href="/blogs">
            <Button className="bg-[#1A4AB2] hover:bg-[#1A4AB2]/90 text-white">
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-4 text-slate-500 hover:text-[#1A4AB2] font-medium flex gap-2">
              <ArrowLeft size={16} />
              Back to Articles
            </Button>
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#1A4AB2]/10 text-[#1A4AB2] px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {blog.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{blog.author || 'Academic Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            {blog.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{blog.read_time} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="relative h-96 w-full overflow-hidden bg-slate-100">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: blog.content.replace(/\n/g, '<br />') 
            }}
          />
        </div>

        {/* Related Exams */}
        {blog.related_exams.length > 0 && (
          <div className="mt-12 p-6 bg-slate-50 rounded-xl">
            <h3 className="font-semibold text-slate-900 mb-4">Related Exams</h3>
            <div className="flex flex-wrap gap-3">
              {blog.related_exams.map((exam) => (
                <span key={exam} className="bg-white text-[#1A4AB2] px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium">
                  {exam}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blogs */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <Button className="bg-[#1A4AB2] hover:bg-[#1A4AB2]/90 text-white px-8 py-3">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage