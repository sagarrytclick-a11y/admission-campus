'use client'

import { useQuery } from '@tanstack/react-query'
import type { AdminCity } from '@/hooks/useAdminCities'

export type PublicCity = AdminCity

const fetchCities = async (params?: {
  page?: number
  limit?: number
  country?: string
}): Promise<{
  cities: PublicCity[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCities: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}> => {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.country) searchParams.set('country', params.country)

  const url = `/api/cities${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch cities')
  }

  return {
    cities: result.data,
    pagination: result.pagination,
  }
}

/** Public cities list for homepage / filters (not the admin API). */
export function useCities(params?: {
  page?: number
  limit?: number
  country?: string
}) {
  const page = params?.page || 1
  const limit = params?.limit || 100
  const country = params?.country || ''

  return useQuery({
    queryKey: ['cities', page, limit, country],
    queryFn: () => fetchCities({ page, limit, country }),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
