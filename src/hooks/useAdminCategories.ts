'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AdminCategory {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Fetch all categories for admin (including inactive ones)
const fetchAdminCategories = async (): Promise<AdminCategory[]> => {
  const response = await fetch('/api/admin/categories')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch admin categories')
  }

  return result.data
}

// Create category
const createCategory = async (data: { name: string; description: string; image?: string }): Promise<AdminCategory> => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create category')
  }

  const result = await response.json()
  return result.data
}

// Update category
const updateCategory = async (data: { slug: string; name: string; description: string; image?: string; is_active?: boolean }): Promise<AdminCategory> => {
  const response = await fetch('/api/categories', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update category')
  }

  const result = await response.json()
  return result.data
}

// Delete category (hard delete for admin)
const deleteCategory = async (slug: string): Promise<void> => {
  const response = await fetch(`/api/admin/categories?slug=${slug}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete category')
  }
}

// React Query hooks
export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['admin-categories'],
    queryFn: fetchAdminCategories,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
    },
  })
}
