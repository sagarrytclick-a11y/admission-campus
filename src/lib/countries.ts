export async function getCountryBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/countries/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    const result = await response.json()
    return result.success ? result.data : null
  } catch (error) {
    return null
  }
}

export async function getAllCountries() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/countries`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return []
    }
    
    const result = await response.json()
    return result.success ? result.data : []
  } catch (error) {
    return []
  }
}
