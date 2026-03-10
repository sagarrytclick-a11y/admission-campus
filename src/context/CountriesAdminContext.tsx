'use client'

import { createAdminContext, BaseEntity, useAdminActions } from '@/context/AdminContext'

// Country-specific interfaces
export interface Country extends BaseEntity {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Default form data for countries
const defaultCountryFormData = {
  name: '',
  slug: '',
  flag: '',
  description: '',
  meta_title: '',
  meta_description: '',
  is_active: true
}

// Create the countries admin context
export const {
  AdminProvider: CountriesAdminProvider,
  useAdminContext: useCountriesAdminContext,
  AdminContext: CountriesContext
} = createAdminContext<Country>(defaultCountryFormData)

// Helper hook for countries actions
export const useCountriesAdminActions = () => useAdminActions<Country>(CountriesContext)
