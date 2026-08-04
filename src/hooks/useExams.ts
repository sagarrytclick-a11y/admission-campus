import { useQuery } from '@tanstack/react-query'

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  hero_section?: {
    title: string
    subtitle?: string
    image?: string
  }
  is_active: boolean
  display_order: number
}

const fetchExams = async (): Promise<Exam[]> => {
  try {
    const response = await fetch('/api/exams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
    })
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch exams')
    }
    
    return result.data || []
  } catch (error) {
    throw error
  }
}

export function useExams() {
  const result = useQuery({
    queryKey: ['exams'],
    queryFn: fetchExams,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false, // Disable to prevent unwanted refetches
    refetchOnReconnect: true,
    refetchOnMount: 'always', // Always refetch on mount
    initialData: [], // Start with empty array
  })

  return result
}
