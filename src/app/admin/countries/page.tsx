'use client'

import React, { useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Globe, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { generateSlug } from '@/lib/slug'
import { useAdminCountries, useSaveCountry, useDeleteCountry } from '@/hooks/useAdminCountries'
import { useCountriesAdminContext, useCountriesAdminActions, CountriesAdminProvider } from '@/context/CountriesAdminContext'
import { toast } from 'sonner'

// Country interface
export interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Main CountriesPage component wrapped with provider
function CountriesPageContent() {
  const { state, dispatch } = useCountriesAdminContext()
  const actions = useCountriesAdminActions()

  // TanStack Query hooks
  const { data: countries = [], isLoading: dataLoading } = useAdminCountries()
  const saveCountryMutation = useSaveCountry()
  const deleteCountryMutation = useDeleteCountry()

  // Extract state from context
  const {
    isModalOpen,
    editingItem: editingCountry,
    deleteModalOpen,
    itemToDelete: countryToDelete,
    searchTerm,
    selectedFilters,
    currentPage,
    itemsPerPage,
    formData
  } = state

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name && !editingCountry) {
      actions.updateFormField('slug', generateSlug(formData.name))
    }
  }, [formData.name, editingCountry, actions])

  const columns = [
    {
      key: 'name' as keyof Country,
      title: 'Country Name',
      render: (value: string, record: Country) => (
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{record.flag}</span>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'slug' as keyof Country,
      title: 'Slug'
    },
    {
      key: 'is_active' as keyof Country,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Country,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const tableActions = [
    createEditAction((country: Country) => {
      actions.setEditingItem(country)
      actions.setFormData({
        name: country.name,
        slug: country.slug,
        flag: country.flag,
        description: country.description,
        meta_title: country.meta_title,
        meta_description: country.meta_description,
        is_active: country.is_active
      })
      actions.openCreateModal()
    }),
    createDeleteAction((country: Country) => {
      actions.openDeleteModal(country)
    })
  ]

  const handleSave = async () => {
    try {
      const isEditing = !!editingCountry
      const dataToSave = {
        ...formData,
        _id: isEditing ? editingCountry._id : undefined
      }

      await saveCountryMutation.mutateAsync(dataToSave)
      toast.success(`Country ${isEditing ? 'updated' : 'created'} successfully`)

      actions.closeModal()
      actions.resetState({
        name: '',
        slug: '',
        flag: '',
        description: '',
        meta_title: '',
        meta_description: '',
        is_active: true
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save country')
    }
  }

  const handleDelete = async () => {
    if (!countryToDelete) return

    try {
      await deleteCountryMutation.mutateAsync(countryToDelete._id)
      toast.success('Country deleted successfully')
      actions.closeDeleteModal()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete country')
    }
  }

  const formFields = [
    {
      name: 'name',
      label: 'Country Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter country name'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      required: true,
      placeholder: 'country-slug'
    },
    {
      name: 'flag',
      label: 'Flag Emoji',
      type: 'text' as const,
      placeholder: '🇺🇸',
      description: 'Enter the flag emoji (e.g., 🇺🇸, 🇬🇧, 🇨🇦)'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter country description'
    },
    {
      name: 'meta_title',
      label: 'Meta Title',
      type: 'text' as const,
      placeholder: 'Meta title for SEO'
    },
    {
      name: 'meta_description',
      label: 'Meta Description',
      type: 'textarea' as const,
      placeholder: 'Meta description for SEO'
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
          <h1 className="text-2xl font-bold">Countries Management</h1>
          <p className="text-gray-600">Manage countries and their configurations</p>
        </div>
        <Button onClick={actions.openCreateModal} className="flex items-center gap-2">
          <Plus size={16} />
          Add Country
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 mt-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => actions.setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={countries}
        actions={tableActions}
        loading={dataLoading}
        emptyMessage="No countries found"
      />

      {/* Create/Edit Modal */}
      <AdminModal
        title={editingCountry ? 'Edit Country' : 'Add Country'}
        open={isModalOpen}
        onOpenChange={actions.closeModal}
        size="xl"
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={(field, value) => actions.updateFormField(field, value)}
          onSubmit={handleSave}
          loading={saveCountryMutation.isPending}
          submitLabel={editingCountry ? 'Update Country' : 'Create Country'}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        title="Delete Country"
        open={deleteModalOpen}
        onOpenChange={actions.closeDeleteModal}
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete the country "{countryToDelete?.name}"?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={actions.closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCountryMutation.isPending}
            >
              {deleteCountryMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}

// Wrapped component with provider
export default function CountriesPage() {
  return (
    <CountriesAdminProvider>
      <CountriesPageContent />
    </CountriesAdminProvider>
  )
}
