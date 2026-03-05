'use client'

import React, { useState, useMemo } from 'react'
import { AdminTable, createViewAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
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
import { MessageSquare, Search, Eye, Mail, Phone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdminEnquiries, useDeleteEnquiry, useUpdateEnquiry } from '@/hooks/useAdminEnquiries'
import { Enquiry } from '@/hooks/useAdminEnquiries'

export default function EnquiriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  // API hooks
  const { data: enquiries = [], isLoading: dataLoading } = useAdminEnquiries()
  const deleteEnquiryMutation = useDeleteEnquiry()
  const updateEnquiryMutation = useUpdateEnquiry()

  // Status update handler
  const handleStatusUpdate = async (enquiryId: string, newStatus: string) => {
    // Optimistically update local state for real-time UI feedback
    if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as Enquiry['status'] })
    }
    
    try {
      await updateEnquiryMutation.mutateAsync({ id: enquiryId, status: newStatus })
    } catch (error) {
      console.error('Failed to update status:', error)
      // Revert on error - refetch will restore correct data
    }
  }

  // Filter enquiries based on search, status, and priority using useMemo
  const filteredEnquiries = useMemo(() => {
    let filtered = enquiries

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((enquiry: Enquiry) => enquiry.status === selectedStatus)
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter((enquiry: Enquiry) => enquiry.priority === selectedPriority)
    }

    if (searchTerm) {
      filtered = filtered.filter((enquiry: Enquiry) => 
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [enquiries, searchTerm, selectedStatus, selectedPriority])

  // Pagination logic
  const { paginatedEnquiries, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginated = filteredEnquiries.slice(startIndex, endIndex)
    const pages = Math.ceil(filteredEnquiries.length / itemsPerPage)
    return { paginatedEnquiries: paginated, totalPages: pages }
  }, [filteredEnquiries, currentPage])

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, selectedPriority])

  const columns = [
    {
      key: 'name' as keyof Enquiry,
      title: 'Contact',
      render: (value: string, record: Enquiry) => (
        <div className="max-w-md">
          <div className="font-medium text-white">{value}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
          <div className="text-sm text-gray-500">{record.phone}</div>
        </div>
      )
    },
    {
      key: 'subject' as keyof Enquiry,
      title: 'Subject',
      render: (value: string) => (
        <div className="max-w-xs">
          <div className="font-medium text-white line-clamp-2">{value}</div>
        </div>
      )
    },
    {
      key: 'priority' as keyof Enquiry,
      title: 'Priority',
      render: (value: string) => {
        const colors = {
          urgent: 'bg-red-100 text-red-800 border-red-200',
          high: 'bg-orange-100 text-orange-800 border-orange-200',
          medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          low: 'bg-green-100 text-green-800 border-green-200'
        }
        return (
          <Badge className={`border ${colors[value as keyof typeof colors] || colors.low}`}>
            {value}
          </Badge>
        )
      }
    },
    {
      key: 'status' as keyof Enquiry,
      title: 'Status',
      render: (value: string) => {
        const colors = {
          pending: 'bg-gray-100 text-gray-800 border-gray-200',
          contacted: 'bg-blue-100 text-blue-800 border-blue-200',
          resolved: 'bg-green-100 text-green-800 border-green-200',
          closed: 'bg-slate-100 text-slate-800 border-slate-200'
        }
        return (
          <Badge className={`border ${colors[value as keyof typeof colors] || colors.pending}`}>
            {value}
          </Badge>
        )
      }
    },
    {
      key: 'createdAt' as keyof Enquiry,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString('en-US')}</div>
            <div className="text-gray-500">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        )
      }
    }
  ]

  const actions = [
    createViewAction((enquiry: Enquiry) => {
      setSelectedEnquiry(enquiry)
      setIsModalOpen(true)
    }),
    createDeleteAction((enquiry: Enquiry) => {
      setEnquiryToDelete(enquiry)
      setDeleteModalOpen(true)
    })
  ]

  const handleDeleteEnquiry = async () => {
    if (!enquiryToDelete) return
    
    try {
      await deleteEnquiryMutation.mutateAsync(enquiryToDelete._id)
      setDeleteModalOpen(false)
      setEnquiryToDelete(null)
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-400">Enquiries</h1>
          <p className="text-gray-600">Manage student enquiries and support requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <AdminTable
        data={paginatedEnquiries}
        columns={columns}
        actions={actions}
        loading={false}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-12">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} enquiries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* View Enquiry Modal */}
      <AdminModal
        open={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
        title="Enquiry Details"
        size="lg"
        showFooter={false}
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Name</label>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-white" />
                  <span>{selectedEnquiry.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white" />
                  <span>{selectedEnquiry.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Phone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white" />
                  <span className="text-white">{selectedEnquiry.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Source</label>
                <Badge variant="outline" className="text-white border-white/50">{selectedEnquiry.source}</Badge>
              </div>
            </div>

            {/* Enquiry Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Subject</label>
                <div className="mt-1 p-3 rounded-lg">
                  {selectedEnquiry.subject}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-white">Message</label>
                <div className="mt-1 p-3  rounded-lg whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select 
                  value={selectedEnquiry.status} 
                  onValueChange={(value) => handleStatusUpdate(selectedEnquiry._id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <Badge className={
                  selectedEnquiry.priority === 'urgent' ? 'bg-red-100 text-red-800 border-red-200' :
                  selectedEnquiry.priority === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                  selectedEnquiry.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  'bg-green-100 text-green-800 border-green-200'
                }>
                  {selectedEnquiry.priority}
                </Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Assigned To</label>
                <div>{selectedEnquiry.assignedTo || 'Unassigned'}</div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated: {new Date(selectedEnquiry.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={deleteModalOpen}
        onOpenChange={(open) => !open && setDeleteModalOpen(false)}
        title="Delete Enquiry"
        size="sm"
        showFooter={false}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this enquiry? This action cannot be undone.
          </p>
          {enquiryToDelete && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">{enquiryToDelete.name}</div>
              <div className="text-sm text-gray-600">{enquiryToDelete.subject}</div>
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteEnquiry}
            >
              Delete Enquiry
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
