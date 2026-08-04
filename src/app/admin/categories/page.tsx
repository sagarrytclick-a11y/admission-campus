'use client'

import React, { useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Plus, Tags } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { generateSlug } from '@/lib/slug'
import { useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useAdminCategories'
import { useCategoriesAdminContext, useCategoriesAdminActions, CategoriesAdminProvider } from '@/context/CategoriesAdminContext'
import { toast } from 'sonner'

// Category interface
export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Main CategoriesPage component wrapped with provider
function CategoriesPageContent() {
  const { state, dispatch } = useCategoriesAdminContext()
  const actions = useCategoriesAdminActions()

  // TanStack Query hooks
  const { data: categories = [], isLoading: dataLoading } = useAdminCategories()
  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()
  const deleteCategoryMutation = useDeleteCategory()

  // Extract state from context
  const {
    isModalOpen,
    editingItem: editingCategory,
    deleteModalOpen,
    itemToDelete: categoryToDelete,
    formData
  } = state

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !editingCategory) {
      actions.updateFormField('slug', generateSlug(formData.name))
    }
  }, [formData.name, editingCategory, actions])

  const columns = [
    {
      key: 'image',
      title: 'Image',
      render: (value: string, record: Category, index: number) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
          {value ? (
            <img 
              src={value} 
              alt={record.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/48x48/f3f4f6/6b7280?text=No+Image'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      )
    },
    {
      key: 'name',
      title: 'Name',
      render: (value: string, record: Category, index: number) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'slug',
      title: 'Slug',
      render: (value: string, record: Category, index: number) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-900">
          {value}
        </code>
      )
    },
    {
      key: 'description',
      title: 'Description',
      render: (value: string, record: Category, index: number) => (
        <span className="text-sm text-white max-w-xs truncate block">
          {value}
        </span>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (value: boolean, record: Category, index: number) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (value: string, record: Category, index: number) => (
        <span className="text-sm text-white">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ]

  const tableActions = [
    createEditAction((category: Category) => {
      actions.setEditingItem(category)
      actions.setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        is_active: category.is_active
      })
      actions.openCreateModal()
    }),
    createDeleteAction((category: Category) => {
      actions.openDeleteModal(category)
    })
  ]

  const handleSave = async () => {
    try {
      const isEditing = !!editingCategory

      if (isEditing) {
        // Update existing category - needs slug + all other fields
        await updateCategoryMutation.mutateAsync({
          slug: editingCategory.slug,
          name: formData.name,
          description: formData.description,
          image: formData.image,
          is_active: formData.is_active
        })
      } else {
        // Create new category - doesn't need slug
        await createCategoryMutation.mutateAsync({
          name: formData.name,
          description: formData.description,
          image: formData.image
        })
      }

      toast.success(`Category ${isEditing ? 'updated' : 'created'} successfully`)

      actions.closeModal()
      actions.resetState({
        name: '',
        slug: '',
        description: '',
        image: '',
        is_active: true
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save category')
    }
  }

  const handleDelete = async () => {
    if (!categoryToDelete) return

    try {
      await deleteCategoryMutation.mutateAsync(categoryToDelete.slug)
      toast.success('Category deleted successfully')
      actions.closeDeleteModal()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete category')
    }
  }

  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Engineering, Medical, Management',
      description: 'Display name for the category'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      required: true,
      placeholder: 'category-slug',
      description: 'URL-friendly identifier'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe this category...',
      description: 'Brief description of the category'
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text' as const,
      placeholder: 'https://example.com/image.jpg',
      description: 'Category image URL'
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox' as const,
      required: true
    }
  ]

  const isLoading = dataLoading || createCategoryMutation.isPending || updateCategoryMutation.isPending || deleteCategoryMutation.isPending

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <p className="text-gray-600">Manage blog categories and their configurations</p>
        </div>
        <Button onClick={actions.openCreateModal} className="flex items-center gap-2">
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      <AdminTable
        columns={columns}
        data={categories}
        actions={tableActions}
        loading={dataLoading}
        emptyMessage="No categories found"
      />

      {/* Create/Edit Modal */}
      <AdminModal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        open={isModalOpen}
        onOpenChange={actions.closeModal}
        size="xl"
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={(field, value) => actions.updateFormField(field, value)}
          onSubmit={handleSave}
          loading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
          submitLabel={editingCategory ? 'Update Category' : 'Create Category'}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        title="Delete Category"
        open={deleteModalOpen}
        onOpenChange={actions.closeDeleteModal}
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete the category "{categoryToDelete?.name}"?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={actions.closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}

// Wrapped component with provider
export default function CategoriesPage() {
  return (
    <CategoriesAdminProvider>
      <CategoriesPageContent />
    </CategoriesAdminProvider>
  )
}
