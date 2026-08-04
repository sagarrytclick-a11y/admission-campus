'use client'

import { createAdminContext, BaseEntity, useAdminActions } from '@/context/AdminContext'

// College-specific interfaces
export interface College extends BaseEntity {
  _id: string
  name: string
  slug: string
  country_ref: any
  city?: string | {
    name: string
    slug: string
    state: string
  }
  exams: string[]
  categories: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  ranking_section?: {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

// Default form data for colleges
const defaultCollegeFormData = {
  // Basic Info
  name: '',
  slug: '',
  country_ref: '',
  city: {
    name: '',
    slug: '',
    state: ''
  },
  exams: [],
  categories: [],
  banner_url: '',
  is_active: true,
  establishment_year: '',

  // Overview
  overview_title: 'Overview',
  overview_description: '',

  // Key Highlights
  key_highlights_title: 'Key Highlights',
  key_highlights_description: '',
  key_highlights_features: [],

  // Why Choose Us
  why_choose_us_title: 'Why Choose Us',
  why_choose_us_description: '',
  why_choose_us_features: [],

  // Ranking & Recognition
  ranking_title: 'Ranking & Recognition',
  ranking_description: '',
  country_ranking: '',
  world_ranking: '',
  accreditation: [],

  // Admission Process
  admission_process_title: 'Admission Process',
  admission_process_description: '',
  admission_process_steps: [],

  // Documents Required
  documents_required_title: 'Documents Required',
  documents_required_description: '',
  documents_required_documents: [],

  // Fees Structure
  fees_structure_title: 'Fees Structure',
  fees_structure_description: '',
  fees_structure_courses: [],

  // Campus Highlights
  campus_highlights_title: 'Campus Highlights',
  campus_highlights_description: '',
  campus_highlights_highlights: []
}

// Create the colleges admin context
export const {
  AdminProvider: CollegesAdminProvider,
  useAdminContext: useCollegesAdminContext,
  AdminContext: CollegesContext
} = createAdminContext<College>(defaultCollegeFormData)

// Helper hook for colleges actions
export const useCollegesAdminActions = () => useAdminActions<College>(CollegesContext)
