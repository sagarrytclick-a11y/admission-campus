'use client'

import { createAdminContext, BaseEntity, useAdminActions } from '@/context/AdminContext'

// Blog-specific interfaces
export interface Blog extends BaseEntity {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Default form data for blogs
const defaultBlogFormData = {
  title: '',
  slug: '',
  category: '',
  tags: [],
  content: '',
  image: '',
  related_exams: [],
  is_active: true
}

// Create the blogs admin context
export const {
  AdminProvider: BlogsAdminProvider,
  useAdminContext: useBlogsAdminContext,
  AdminContext: BlogsContext
} = createAdminContext<Blog>(defaultBlogFormData)

// Helper hook for blogs actions
export const useBlogsAdminActions = () => useAdminActions<Blog>(BlogsContext)
