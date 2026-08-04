import { AdminCity } from '@/hooks/useAdminCities'

// Utility functions for city data processing
export const filterIndianCities = (cities: AdminCity[]): AdminCity[] => {
  return cities?.filter(city => city.country_ref.slug === 'india') || []
}

export const getCitiesByCountry = (cities: AdminCity[], countrySlug: string): AdminCity[] => {
  return cities?.filter(city => city.country_ref.slug === countrySlug) || []
}

export const getActiveCities = (cities: AdminCity[]): AdminCity[] => {
  return cities?.filter(city => city.is_active) || []
}

export const sortCitiesByName = (cities: AdminCity[]): AdminCity[] => {
  return [...cities].sort((a, b) => a.name.localeCompare(b.name))
}

export const searchCities = (cities: AdminCity[], searchTerm: string): AdminCity[] => {
  if (!searchTerm.trim()) return cities

  const term = searchTerm.toLowerCase()
  return cities.filter(city =>
    city.name.toLowerCase().includes(term) ||
    city.slug.toLowerCase().includes(term) ||
    city.description.toLowerCase().includes(term) ||
    city.features.some(feature => feature.toLowerCase().includes(term))
  )
}

// Constants for responsive design breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Get items per view based on window width
export const getItemsPerView = (windowWidth: number): number => {
  if (windowWidth < BREAKPOINTS.sm) return 1
  if (windowWidth < BREAKPOINTS.lg) return 2
  if (windowWidth < BREAKPOINTS.xl) return 3
  return 4
}

// Calculate max index for slider
export const calculateMaxIndex = (totalItems: number, itemsPerView: number): number => {
  return Math.max(0, totalItems - itemsPerView)
}

// Validate city data
export const validateCity = (city: any): city is AdminCity => {
  return (
    city &&
    typeof city._id === 'string' &&
    typeof city.name === 'string' &&
    typeof city.slug === 'string' &&
    city.country_ref &&
    typeof city.country_ref.slug === 'string'
  )
}

// Format city display name
export const formatCityName = (city: AdminCity): string => {
  return city.name.charAt(0).toUpperCase() + city.name.slice(1).toLowerCase()
}

// Get city image URL with fallback
export const getCityImageUrl = (city: AdminCity): string | null => {
  return city.cityImage || null
}

// Generate city link
export const generateCityLink = (city: AdminCity): string => {
  return `/colleges/city/${city.slug}`
}
