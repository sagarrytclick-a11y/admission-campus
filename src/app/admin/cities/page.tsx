'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MapPin, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateSlug } from '@/lib/slug'
import { useAdminCities, useSaveCity, useDeleteCity } from '@/hooks/useAdminCities'
import { useAdminCountries } from '@/hooks/useAdminCountries'
import { toast } from 'sonner'

export interface City {
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

export default function CitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [cityToDelete, setCityToDelete] = useState<City | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Search state
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [formData, setFormData] = useState<{
    id: string
    name: string
    slug: string
    country_ref: string
    description: string
    cityImage: string
    features: string[]
    is_active: boolean
  }>({
    id: '',
    name: '',
    slug: '',
    country_ref: '',
    description: '',
    cityImage: '',
    features: [],
    is_active: true
  })

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setCurrentPage(1) // Reset to first page when searching
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // TanStack Query hooks
  const { data: citiesData, isLoading: citiesLoading } = useAdminCities({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchTerm
  })

  // Extract cities and pagination data
  const cities = citiesData?.cities || []
  const pagination = citiesData?.pagination
  const { data: countries = [], isLoading: countriesLoading } = useAdminCountries()
  const saveCityMutation = useSaveCity()
  const deleteCityMutation = useDeleteCity()

  const columns = [
    {
      key: 'name' as keyof City,
      title: 'City Name',
      render: (value: string, record: City) => (
        <div className="flex items-center space-x-2">
          <MapPin size={16} />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'country_ref' as keyof City,
      title: 'Country',
      render: (value: any) => (
        <span className="text-sm text-white">{value?.name || 'N/A'}</span>
      )
    },
    {
      key: 'is_active' as keyof City,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof City,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((city: City) => {
      setEditingCity(city)
      setFormData({
        id: city.id,
        name: city.name,
        slug: city.slug,
        country_ref: city.country_ref._id,
        description: city.description,
        cityImage: (city as any).cityImage || '',
        features: city.features.length > 0 ? city.features : [''],
        is_active: city.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((city: City) => {
      setCityToDelete(city)
      setDeleteModalOpen(true)
    })
  ]

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error('City name is required')
      return
    }
    if (!formData.country_ref) {
      toast.error('Country selection is required')
      return
    }
    if (!formData.description.trim()) {
      toast.error('Description is required')
      return
    }
    if (!formData.cityImage.trim()) {
      toast.error('City image URL is required')
      return
    }
    if (!formData.features || formData.features.length === 0 || formData.features.every(f => !f.trim())) {
      toast.error('At least one feature is required')
      return
    }

    try {
      // Find the selected country object
      const selectedCountry = countries.find(country => country._id === formData.country_ref)

      if (!selectedCountry) {
        toast.error('Selected country not found')
        return
      }

      await saveCityMutation.mutateAsync({
        _id: editingCity?._id,
        id: formData.id,
        name: formData.name.trim(),
        slug: formData.slug,
        country_ref: {
          _id: selectedCountry._id,
          name: selectedCountry.name,
          slug: selectedCountry.slug
        },
        description: formData.description.trim(),
        cityImage: formData.cityImage.trim(),
        features: formData.features.filter(f => f.trim() !== ''),
        is_active: formData.is_active
      })
      toast.success(editingCity ? 'City updated successfully' : 'City created successfully')
      setIsModalOpen(false)
      setEditingCity(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save city')
    }
  }

  const handleDelete = async () => {
    if (!cityToDelete) return

    try {
      await deleteCityMutation.mutateAsync(cityToDelete._id)
      toast.success('City deleted successfully')
      setDeleteModalOpen(false)
      setCityToDelete(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete city')
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      slug: '',
      country_ref: '',
      description: '',
      cityImage: '',
      features: [],
      is_active: true
    })
  }

  const handleFormChange = (field: string, value: unknown) => {
    setFormData(prev => {
      if (field.includes('.')) {
        // Handle nested fields like stats.colleges
        const [parent, child] = field.split('.')
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev] as any,
            [child]: value
          }
        }
      }

      // Special handling for name field - auto-generate slug and id
      if (field === 'name') {
        const nameValue = value as string
        return {
          ...prev,
          name: nameValue,
          slug: generateSlug(nameValue),
          id: generateSlug(nameValue)
        }
      }

      return {
        ...prev,
        [field]: value
      }
    })
  }

  const formFields = [
    {
      name: 'name',
      label: 'City Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter city name'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      required: true,
      placeholder: 'city-slug'
    },
    {
      name: 'country_ref',
      label: 'Country',
      type: 'select' as const,
      required: true,
      options: countries.map(country => ({
        value: country._id,
        label: country.name
      })),
      placeholder: 'Select country'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter city description'
    },
    {
      name: 'cityImage',
      label: 'City Image URL',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter city image URL',
      description: 'Enter the URL of the city image'
    },
    {
      name: 'features',
      label: 'Features',
      type: 'tags' as const,
      required: true,
      placeholder: 'Enter feature'
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox' as const,
      required: true
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Cities Management</h1>
          <p className="text-gray-600">Manage cities and their configurations</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add City
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 mt-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search cities by name or slug..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        {(searchTerm || citiesLoading) && (
          <div className="text-sm text-gray-600">
            {citiesLoading ? 'Searching...' : `Found ${pagination?.totalCities || 0} cities`}
          </div>
        )}
      </div>
  

      <AdminTable
        columns={columns}
        data={cities}
        actions={actions}
        loading={citiesLoading}
        emptyMessage="No cities found"
      />

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Showing {cities.length} of {pagination.totalCities} cities
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Page Size Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value: string) => {
                  setPageSize(parseInt(value))
                  setCurrentPage(1) // Reset to first page when changing page size
                }}
              >
                <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="5" className="text-white hover:bg-gray-600">5</SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-gray-600">10</SelectItem>
                  <SelectItem value="20" className="text-white hover:bg-gray-600">20</SelectItem>
                  <SelectItem value="50" className="text-white hover:bg-gray-600">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!pagination.hasPrevPage || citiesLoading}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!pagination.hasNextPage || citiesLoading}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
      </div>
      )}

      <AdminModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) {
            setEditingCity(null)
            resetForm()
          }
        }}
        title={editingCity ? 'Edit City' : 'Add City'}
        onConfirm={handleSave}
        confirmText={editingCity ? 'Update' : 'Create'}
        loading={saveCityMutation.isPending}
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={handleFormChange}
        />
      </AdminModal>

      <AdminModal
        open={deleteModalOpen}
        onOpenChange={(open) => {
          setDeleteModalOpen(open)
          if (!open) {
            setCityToDelete(null)
          }
        }}
        title="Delete City"
        onConfirm={handleDelete}
        confirmText="Delete"
        loading={deleteCityMutation.isPending}
      >
        <p>Are you sure you want to delete "{cityToDelete?.name}"? This action cannot be undone.</p>
      </AdminModal>
    </div>

   
  )
}
