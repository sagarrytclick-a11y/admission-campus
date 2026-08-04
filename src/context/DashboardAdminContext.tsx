'use client'

import { createAdminContext, useAdminActions } from '@/context/AdminContext'

// Dashboard-specific interfaces
export interface DashboardStats {
  countries: number
  colleges: number
  blogs: number
  exams: number
  cities?: number
  categories?: number
  pendingEnquiries?: number
}

export interface RecentActivity {
  type: 'country' | 'exam' | 'blog' | 'college'
  action: string
  target: string
  time: string
  icon: any
}

export interface QuickAction {
  title: string
  description: string
  icon: any
  href: string
  color: string
}

// Default form data for dashboard (mostly empty since it's a read-only page)
const defaultDashboardFormData = {}

// Create the dashboard admin context
export const {
  AdminProvider: DashboardAdminProvider,
  useAdminContext: useDashboardAdminContext,
  AdminContext: DashboardContext
} = createAdminContext<any>(defaultDashboardFormData)

// Helper hook for dashboard actions
export const useDashboardAdminActions = () => useAdminActions<any>(DashboardContext)
