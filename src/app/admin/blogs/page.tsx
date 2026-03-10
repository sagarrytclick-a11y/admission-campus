'use client'

import React, { useMemo, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction, createViewAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, FileText, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { generateSlug } from '@/lib/slug'
import { useAdminBlogs, useSaveBlog, useDeleteBlog } from '@/hooks/useAdminBlogs'
import { useBlogsAdminContext, useBlogsAdminActions, BlogsAdminProvider } from '@/context/BlogsAdminContext'
import { toast } from 'sonner'

// Blog interface
export interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Main BlogsPage component wrapped with provider
function BlogsPageContent() {
  const { state, dispatch } = useBlogsAdminContext()
  const actions = useBlogsAdminActions()

  // TanStack Query hooks
  const { data: blogs = [], isLoading: dataLoading } = useAdminBlogs()
  const saveBlogMutation = useSaveBlog()
  const deleteBlogMutation = useDeleteBlog()

  // Extract state from context
  const {
    isModalOpen,
    editingItem: editingBlog,
    deleteModalOpen,
    itemToDelete: blogToDelete,
    searchTerm,
    selectedFilters,
    currentPage,
    itemsPerPage,
    formData,
    selectedItems
  } = state

  // Auto-generate slug when title changes
  useEffect(() => {
    if (formData.title && !editingBlog) {
      actions.updateFormField('slug', generateSlug(formData.title))
    }
  }, [formData.title, editingBlog, actions])

  // Filter blogs based on search, category, and status using useMemo
  const filteredBlogs = useMemo(() => {
    let filtered = blogs

    if (selectedFilters.category && selectedFilters.category !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedFilters.category)
    }

    if (selectedFilters.status && selectedFilters.status !== 'all') {
      filtered = filtered.filter(blog => blog.is_active === (selectedFilters.status === 'published'))
    }

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [blogs, searchTerm, selectedFilters])

  // Pagination logic
  const { paginatedBlogs, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginated = filteredBlogs.slice(startIndex, endIndex)
    const pages = Math.ceil(filteredBlogs.length / itemsPerPage)
    return { paginatedBlogs: paginated, totalPages: pages }
  }, [filteredBlogs, currentPage, itemsPerPage])

  const columns = [
    {
      key: 'title' as keyof Blog,
      title: 'Title',
      render: (value: string, record: Blog) => (
        <div className="max-w-md">
          <div className="font-medium truncate">{value}</div>
          <div className="text-sm text-gray-500 truncate">
            {record.content.substring(0, 100)}...
          </div>
        </div>
      )
    },
    {
      key: 'category' as keyof Blog,
      title: 'Category',
      render: (value: string) => (
        <Badge variant="secondary">{value || 'Uncategorized'}</Badge>
      )
    },
    {
      key: 'tags' as keyof Blog,
      title: 'Tags',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
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
      key: 'is_active' as keyof Blog,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Published' : 'Draft'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Blog,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const tableActions = [
    createViewAction((blog: Blog) => {
      // Handle view action - could open in new tab or modal
      console.log('View blog:', blog)
    }),
    createEditAction((blog: Blog) => {
      actions.setEditingItem(blog)
      actions.setFormData({
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        tags: blog.tags,
        content: blog.content,
        image: blog.image,
        related_exams: blog.related_exams,
        is_active: blog.is_active
      })
      actions.openCreateModal()
    }),
    createDeleteAction((blog: Blog) => {
      actions.openDeleteModal(blog)
    })
  ]

  const handleSave = async () => {
    try {
      const isEditing = !!editingBlog
      const dataToSave = {
        ...formData,
        _id: isEditing ? editingBlog._id : undefined
      }

      await saveBlogMutation.mutateAsync(dataToSave)
      toast.success(`Blog ${isEditing ? 'updated' : 'created'} successfully`)

      actions.closeModal()
      actions.resetState({
        title: '',
        slug: '',
        category: '',
        tags: [],
        content: '',
        image: '',
        related_exams: [],
        is_active: true
      })
    } catch (error) {
      console.error('💥 Error saving blog:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save blog')
    }
  }

  const handleDelete = async () => {
    if (!blogToDelete) return

    try {
      await deleteBlogMutation.mutateAsync(blogToDelete._id)
      toast.success('Blog deleted successfully')
      actions.closeDeleteModal()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog')
    }
  }

  const formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter blog title'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      required: true,
      placeholder: 'blog-slug'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'education', label: 'Education' },
        { value: 'career', label: 'Career' },
        { value: 'study-abroad', label: 'Study Abroad' },
        { value: 'exams', label: 'Exams' },
        { value: 'tips', label: 'Tips & Tricks' }
      ],
      placeholder: 'Select category'
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter blog content'
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter image URL'
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'tags' as const,
      required: true,
      placeholder: 'Add tags'
    },
    {
      name: 'related_exams',
      label: 'Related Exams',
      type: 'tags' as const,
      placeholder: 'Add related exams'
    },
    {
      name: 'is_active',
      label: 'Published',
      type: 'checkbox' as const,
      required: true
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Blogs Management</h1>
          <p className="text-gray-600">Manage blog posts and content</p>
        </div>
        <Button onClick={actions.openCreateModal} className="flex items-center gap-2">
          <Plus size={16} />
          Add Blog
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => actions.setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={selectedFilters.category || 'all'}
          onValueChange={(value) => actions.setFilter('category', value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="career">Career</SelectItem>
            <SelectItem value="study-abroad">Study Abroad</SelectItem>
            <SelectItem value="exams">Exams</SelectItem>
            <SelectItem value="tips">Tips & Tricks</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedFilters.status || 'all'}
          onValueChange={(value) => actions.setFilter('status', value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AdminTable
        columns={columns}
        data={paginatedBlogs}
        actions={tableActions}
        loading={dataLoading}
        emptyMessage="No blogs found"
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {paginatedBlogs.length} of {filteredBlogs.length} blogs
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => actions.setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </Button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => actions.setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <AdminModal
        title={editingBlog ? 'Edit Blog' : 'Add Blog'}
        open={isModalOpen}
        onOpenChange={actions.closeModal}
        size="xl"
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={(field, value) => actions.updateFormField(field, value)}
          onSubmit={handleSave}
          loading={saveBlogMutation.isPending}
          submitLabel={editingBlog ? 'Update Blog' : 'Create Blog'}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        title="Delete Blog"
        open={deleteModalOpen}
        onOpenChange={actions.closeDeleteModal}
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete the blog "{blogToDelete?.title}"?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={actions.closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteBlogMutation.isPending}
            >
              {deleteBlogMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}

// Wrapped component with provider
export default function BlogsPage() {
  return (
    <BlogsAdminProvider>
      <BlogsPageContent />
    </BlogsAdminProvider>
  )
}
