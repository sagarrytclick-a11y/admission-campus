import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Types for our data
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

// Hook for fetching all enquiries
export function useAdminEnquiries() {
  return useQuery({
    queryKey: ['admin-enquiries'],
    queryFn: async (): Promise<Enquiry[]> => {
      const response = await fetch('/api/admin/enquiries')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch enquiries')
      }
      
      const result = await response.json()
      return result.data || []
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook for deleting an enquiry
export function useDeleteEnquiry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete enquiry')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] })
      toast.success('Enquiry deleted successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete enquiry')
      console.error('Delete enquiry error:', error)
    },
  })
}

// Hook for updating an enquiry status
export function useUpdateEnquiry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, status, priority, assignedTo, notes }: { 
      id: string
      status?: string
      priority?: string
      assignedTo?: string
      notes?: string
    }): Promise<void> => {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status, priority, assignedTo, notes }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update enquiry')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] })
      toast.success('Enquiry updated successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update enquiry')
      console.error('Update enquiry error:', error)
    },
  })
}
