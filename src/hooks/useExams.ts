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
  console.log('Fetching exams from API...')
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
    
    console.log('API Response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('API Response data:', result)
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch exams')
    }
    
    console.log('Returning exams data:', result.data?.length || 0, 'exams')
    return result.data || []
  } catch (error) {
    console.error('Error fetching exams:', error)
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

  console.log('useExams result:', {
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    dataLength: result.data?.length || 0,
    status: result.status
  })

  return result
}
