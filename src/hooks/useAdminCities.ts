'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AdminCity {
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

// Fetch all cities for admin with pagination and search
const fetchAdminCities = async (params?: { page?: number; limit?: number; search?: string }): Promise<{
  cities: AdminCity[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCities: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.search) searchParams.set('search', params.search);

  const url = `/api/admin/cities${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch cities');
  }

  return {
    cities: result.data,
    pagination: result.pagination
  };
}

// Create or update city
const saveCity = async (data: Partial<AdminCity> & { _id?: string }): Promise<AdminCity> => {
  const isEditing = !!data._id
  const url = isEditing ? `/api/admin/cities/${data._id}` : '/api/admin/cities'
  const method = isEditing ? 'PUT' : 'POST'

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to save city')
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to save city')
  }

  return result.data
}

// Delete city
const deleteCity = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/cities/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete city')
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete city')
  }
}

// Fetch single city by slug
const fetchCityBySlug = async (slug: string): Promise<AdminCity | null> => {
  const response = await fetch(`/api/admin/cities?search=${slug}&limit=1`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch city');
  }

  // Find the exact match
  const city = result.data.find((c: AdminCity) => c.slug === slug);
  return city || null;
}

// Hooks
export function useAdminCities(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ['admin', 'cities', params?.page || 1, params?.limit || 10, params?.search || ''],
    queryFn: () => fetchAdminCities(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useCityBySlug(slug: string) {
  return useQuery({
    queryKey: ['admin', 'city', slug],
    queryFn: () => fetchCityBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useSaveCity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'cities'] })
    },
    onError: (error) => {
      console.error('Error saving city:', error)
      throw error
    }
  })
}

export function useDeleteCity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'cities'] })
    },
    onError: (error) => {
      console.error('Error deleting city:', error)
      throw error
    }
  })
}
