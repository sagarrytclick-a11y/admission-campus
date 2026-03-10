'use client'

import { createAdminContext, BaseEntity, useAdminActions } from '@/context/AdminContext'

// City-specific interfaces
export interface City extends BaseEntity {
  _id: string
  id: string
  name: string
  slug: string
  country_ref: {
    _id: string
    name: string
    slug: string
  }
  description: string
  cityImage: string
  features: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Default form data for cities
const defaultCityFormData = {
  id: '',
  name: '',
  slug: '',
  country_ref: '',
  description: '',
  cityImage: '',
  features: [],
  is_active: true
}

// Create the cities admin context
export const {
  AdminProvider: CitiesAdminProvider,
  useAdminContext: useCitiesAdminContext,
  AdminContext: CitiesContext
} = createAdminContext<City>(defaultCityFormData)

// Helper hook for cities actions
export const useCitiesAdminActions = () => useAdminActions<City>(CitiesContext)
