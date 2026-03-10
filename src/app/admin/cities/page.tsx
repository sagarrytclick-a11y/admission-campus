'use client'

import React, { useMemo, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MapPin, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateSlug } from '@/lib/slug'
import { useAdminCities, useSaveCity, useDeleteCity } from '@/hooks/useAdminCities'
import { useAdminCountries } from '@/hooks/useAdminCountries'
import { useCitiesAdminContext, useCitiesAdminActions, CitiesAdminProvider } from '@/context/CitiesAdminContext'
import { toast } from 'sonner'

// City interface
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

// Main CitiesPage component wrapped with provider
function CitiesPageContent() {
  const { state, dispatch } = useCitiesAdminContext()
  const actions = useCitiesAdminActions()

  // TanStack Query hooks
  const { data: citiesData, isLoading: citiesLoading } = useAdminCities({
    page: state.currentPage,
    limit: state.itemsPerPage,
    search: state.searchTerm
  })
  const { data: countries = [], isLoading: countriesLoading } = useAdminCountries()
  const saveCityMutation = useSaveCity()
  const deleteCityMutation = useDeleteCity()

  // Extract state from context
  const {
    isModalOpen,
    editingItem: editingCity,
    deleteModalOpen,
    itemToDelete: cityToDelete,
    searchTerm,
    selectedFilters,
    currentPage,
    itemsPerPage,
    formData
  } = state

  // Extract cities and pagination data
  const cities = citiesData?.cities || []
  const pagination = citiesData?.pagination

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name && !editingCity) {
      actions.updateFormField('slug', generateSlug(formData.name))
      actions.updateFormField('id', generateSlug(formData.name))
    }
  }, [formData.name, editingCity, actions])

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
        <Badge variant="secondary">{value?.name || 'Unknown'}</Badge>
      )
    },
    {
      key: 'features' as keyof City,
      title: 'Features',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {value && value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2} more
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'is_active' as keyof City,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
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

  const tableActions = [
    createEditAction((city: City) => {
      actions.setEditingItem(city)
      actions.setFormData({
        id: city.id,
        name: city.name,
        slug: city.slug,
        country_ref: city.country_ref._id,
        description: city.description,
        cityImage: city.cityImage,
        features: city.features,
        is_active: city.is_active
      })
      actions.openCreateModal()
    }),
    createDeleteAction((city: City) => {
      actions.openDeleteModal(city)
    })
  ]

  const handleSave = async () => {
    try {
      const isEditing = !!editingCity
      const dataToSave = {
        ...formData,
        _id: isEditing ? editingCity._id : undefined
      }

      await saveCityMutation.mutateAsync(dataToSave)
      toast.success(`City ${isEditing ? 'updated' : 'created'} successfully`)

      actions.closeModal()
      actions.resetState({
        id: '',
        name: '',
        slug: '',
        country_ref: '',
        description: '',
        cityImage: '',
        features: [],
        is_active: true
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save city')
    }
  }

  const handleDelete = async () => {
    if (!cityToDelete) return

    try {
      await deleteCityMutation.mutateAsync(cityToDelete._id)
      toast.success('City deleted successfully')
      actions.closeDeleteModal()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete city')
    }
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
      placeholder: 'Add a feature'
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
        <Button onClick={actions.openCreateModal} className="flex items-center gap-2">
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
            onChange={(e) => actions.setSearchTerm(e.target.value)}
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
        actions={tableActions}
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
                value={itemsPerPage.toString()}
                onValueChange={(value: string) => {
                  actions.setItemsPerPage(parseInt(value))
                  actions.setCurrentPage(1)
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
                onClick={() => actions.setCurrentPage(currentPage - 1)}
                disabled={!pagination.hasPrevPage || citiesLoading}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
              >
                Previous
              </Button>

              <span className="text-sm text-white">
                Page {currentPage} of {pagination.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => actions.setCurrentPage(currentPage + 1)}
                disabled={!pagination.hasNextPage || citiesLoading}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <AdminModal
        title={editingCity ? 'Edit City' : 'Add City'}
        open={isModalOpen}
        onOpenChange={actions.closeModal}
        size="xl"
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={(field, value) => actions.updateFormField(field, value)}
          onSubmit={handleSave}
          loading={saveCityMutation.isPending}
          submitLabel={editingCity ? 'Update City' : 'Create City'}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        title="Delete City"
        open={deleteModalOpen}
        onOpenChange={actions.closeDeleteModal}
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete the city "{cityToDelete?.name}"?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={actions.closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCityMutation.isPending}
            >
              {deleteCityMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}

// Wrapped component with provider
export default function CitiesPage() {
  return (
    <CitiesAdminProvider>
      <CitiesPageContent />
    </CitiesAdminProvider>
  )
}
