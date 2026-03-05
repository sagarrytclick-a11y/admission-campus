'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Plus, Tags } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory, AdminCategory } from '@/hooks/useAdminCategories'
import { generateSlug } from '@/lib/slug'
import { toast } from 'sonner'

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

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    is_active: true
  })

  // TanStack Query hooks
  const { data: categories = [], isLoading: dataLoading } = useAdminCategories()
  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()
  const deleteCategoryMutation = useDeleteCategory()

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !editingCategory) {
      const generatedSlug = generateSlug(formData.name)
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.name, editingCategory])

  const columns = [
    {
      key: 'image',
      title: 'Image',
      render: (value: string, record: AdminCategory, index: number) => (
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
      render: (value: string, record: AdminCategory, index: number) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'slug',
      title: 'Slug',
      render: (value: string, record: AdminCategory, index: number) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-900">
          {value}
        </code>
      )
    },
    {
      key: 'description',
      title: 'Description',
      render: (value: string, record: AdminCategory, index: number) => (
        <span className="text-sm text-gray-600 max-w-xs truncate block">
          {value}
        </span>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (value: boolean, record: AdminCategory, index: number) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (value: string, record: AdminCategory, index: number) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ]

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image || '',
      is_active: category.is_active
    })
    setIsModalOpen(true)
  }

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          slug: editingCategory.slug,
          name: formData.name,
          description: formData.description,
          image: formData.image,
          is_active: formData.is_active
        })
        toast.success('Category updated successfully')
      } else {
        await createCategoryMutation.mutateAsync({
          name: formData.name,
          description: formData.description,
          image: formData.image
        })
        toast.success('Category created successfully')
      }

      setIsModalOpen(false)
      setEditingCategory(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save category')
    }
  }

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return

    try {
      await deleteCategoryMutation.mutateAsync(categoryToDelete.slug)
      toast.success('Category deleted successfully')
      setDeleteModalOpen(false)
      setCategoryToDelete(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete category')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      is_active: true
    })
  }

  const openCreateModal = () => {
    setEditingCategory(null)
    resetForm()
    setIsModalOpen(true)
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
      placeholder: 'e.g., engineering, medical, management',
      description: 'URL-friendly identifier (auto-generated from name)',
      disabled: !editingCategory // Allow editing slug only when editing
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe what this category represents...',
      description: 'Brief description of the category'
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text' as const,
      required: false,
      placeholder: 'https://example.com/image.jpg',
      description: 'URL for the category image (optional)'
    },
    ...(editingCategory ? [{
      name: 'is_active',
      label: 'Active Status',
      type: 'checkbox' as const,
      description: 'Whether this category is active and available for selection'
    }] : [])
  ]

  const isLoading = dataLoading || createCategoryMutation.isPending || updateCategoryMutation.isPending || deleteCategoryMutation.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Tags className="h-8 w-8" />
            Categories
          </h1>
          <p className="text-gray-600 mt-1">
            Manage college categories that can be selected when adding colleges
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Table */}
      <AdminTable
        data={categories}
        columns={columns}
        loading={dataLoading}
        emptyMessage="No categories found"
        actions={[
          createEditAction(handleEdit),
          createDeleteAction(handleDelete)
        ]}
      />

      {/* Create/Edit Modal */}
      <AdminModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        size="lg"
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={(field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }))
          }}
          onSubmit={handleSubmit}
          loading={isLoading}
          submitLabel={editingCategory ? 'Update Category' : 'Create Category'}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Category"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the category <strong>{categoryToDelete?.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteModalOpen(false)
                setCategoryToDelete(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
