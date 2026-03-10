'use client'

import { createAdminContext, BaseEntity, useAdminActions } from '@/context/AdminContext'

// Exam-specific interfaces
export interface Exam extends BaseEntity {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  is_active: boolean
  display_order: number
  hero_section: {
    title: string
    subtitle: string
    image: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  }
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  }
}

// Default form data for exams
const defaultExamFormData = {
  name: '',
  slug: '',
  short_name: '',
  exam_type: 'International',
  conducting_body: '',
  exam_mode: 'Online',
  frequency: 'Monthly',
  description: '',
  is_active: true,
  display_order: 0,
  hero_section: {
    title: '',
    subtitle: '',
    image: ''
  },
  overview: {
    title: 'Overview',
    content: '',
    key_highlights: []
  },
  registration: {
    title: 'Registration',
    description: '',
    bullet_points: []
  },
  exam_pattern: {
    title: 'Exam Pattern',
    description: '',
    total_duration_mins: 120,
    score_range: '0-100',
    table_data: []
  },
  exam_dates: {
    title: 'Important Dates',
    important_dates: []
  },
  result_statistics: {
    title: 'Result Statistics',
    description: '',
    passing_criteria: '',
    total_marks: 100,
    passing_marks: 40
  }
}

// Create the exams admin context
export const {
  AdminProvider: ExamsAdminProvider,
  useAdminContext: useExamsAdminContext,
  AdminContext: ExamsContext
} = createAdminContext<Exam>(defaultExamFormData)

// Helper hook for exams actions
export const useExamsAdminActions = () => useAdminActions<Exam>(ExamsContext)
