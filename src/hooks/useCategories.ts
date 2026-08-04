'use client'

import { useQuery } from '@tanstack/react-query'

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Fetch active categories for public display
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch('/api/categories')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch categories')
  }

  return result.data
}

// React Query hook for categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
