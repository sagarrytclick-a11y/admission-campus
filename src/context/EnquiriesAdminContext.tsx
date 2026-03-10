'use client'

import { createAdminContext, useAdminActions } from '@/context/AdminContext'

// Enquiry-specific interfaces (doesn't extend BaseEntity since enquiries don't have is_active)
export interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'pending' | 'contacted' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  source: 'contact-form' | 'website' | 'email' | 'phone' | 'other'
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

// Default form data for enquiries (read-only, so mostly empty)
const defaultEnquiryFormData = {}

// Create the enquiries admin context
export const {
  AdminProvider: EnquiriesAdminProvider,
  useAdminContext: useEnquiriesAdminContext,
  AdminContext: EnquiriesContext
} = createAdminContext<Enquiry>(defaultEnquiryFormData)

// Helper hook for enquiries actions
export const useEnquiriesAdminActions = () => useAdminActions<Enquiry>(EnquiriesContext)
