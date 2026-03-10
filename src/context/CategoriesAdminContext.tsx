'use client'

import { createAdminContext, BaseEntity, useAdminActions } from '@/context/AdminContext'

// Category-specific interfaces
export interface Category extends BaseEntity {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Default form data for categories
const defaultCategoryFormData = {
  name: '',
  slug: '',
  description: '',
  image: '',
  is_active: true
}

// Create the categories admin context
export const {
  AdminProvider: CategoriesAdminProvider,
  useAdminContext: useCategoriesAdminContext,
  AdminContext: CategoriesContext
} = createAdminContext<Category>(defaultCategoryFormData)

// Helper hook for categories actions
export const useCategoriesAdminActions = () => useAdminActions<Category>(CategoriesContext)
