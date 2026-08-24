'use client'

import React, { useMemo, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { ComprehensiveCollegeForm } from '@/components/admin/ComprehensiveCollegeForm'
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
import { Plus, GraduationCap, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { dummyCountries } from '@/data/dummyData'
import { generateSlug } from '@/lib/slug'
import { useAdminColleges, useAdminCountries, useSaveCollege, useDeleteCollege, AdminCollege } from '@/hooks/useAdminColleges'
import { useCollegesAdminContext, useCollegesAdminActions, CollegesAdminProvider } from '@/context/CollegesAdminContext'
import { toast } from 'sonner'

interface AdminCountry {
  _id: string
  name: string
  slug: string
  flag: string
}

function AdminCollegesPageContent() {
  const { state, dispatch } = useCollegesAdminContext()
  const {
    openCreateModal,
    closeModal,
    setEditingItem,
    openDeleteModal,
    closeDeleteModal,
    setSearchTerm,
    setFilter,
    setCurrentPage,
    updateFormField,
    setFormData
  } = useCollegesAdminActions()
  
  const {
    isModalOpen,
    editingItem: editingAdminCollege,
    deleteModalOpen,
    itemToDelete: collegeToDelete,
    searchTerm,
    selectedFilters,
    currentPage,
    itemsPerPage,
    formData
  } = state
  
  const selectedCountry = selectedFilters.country || 'all'
  
  // TanStack Query hooks
  const { data: colleges = [], isLoading: dataLoading, error: collegesError } = useAdminColleges()
  const { data: countries = dummyCountries } = useAdminCountries()
  const saveCollegeMutation = useSaveCollege()
  const deleteCollegeMutation = useDeleteCollege()
  
  // Initialize form data with default values
  useEffect(() => {
    setFormData({
      // Basic Info
      name: 'Default AdminCollege Name',
      slug: 'default-college-name',
      country_ref: '',
      city: '',
      exams: [],
      categories: [],
      banner_url: '',
      is_active: true,
      establishment_year: '2024',
      
      // Overview
      overview_title: 'Overview',
      overview_description: 'This is a default overview description for the college with comprehensive information about programs, facilities, and academic excellence.',
      
      // Key Highlights
      key_highlights_title: 'Key Highlights',
      key_highlights_description: 'Key highlights description featuring the main advantages and features of the institution.',
      key_highlights_features: ['Excellent Faculty', 'Modern Infrastructure', 'Research Opportunities'],
      
      // Why Choose Us
      why_choose_us_title: 'Why Choose Us',
      why_choose_us_description: 'Why choose us description explaining the unique benefits and advantages of selecting this institution.',
      why_choose_us_features: [
        { title: 'Quality Education', description: 'We provide high-quality education with experienced faculty' },
        { title: 'Affordable Fees', description: 'Competitive fee structure for all programs' }
      ],
      
      // Ranking & Recognition
      ranking_title: 'Ranking & Recognition',
      ranking_description: 'Ranking description highlighting the institution position and achievements.',
      country_ranking: '#1 in Country',
      world_ranking: 'Top 500 Global',
      accreditation: ['NAAC Accreditation', 'ISO Certified'],
      
      // Admission Process
      admission_process_title: 'Admission Process',
      admission_process_description: 'Admission process description explaining the step-by-step procedure for enrollment.',
      admission_process_steps: ['Online Application', 'Document Verification', 'Interview Process'],
      
      // Documents Required
      documents_required_title: 'Documents Required',
      documents_required_description: 'Documents required description listing all necessary paperwork for admission.',
      documents_required_documents: ['High School Transcript', 'ID Proof', 'Passport Copy'],
      
      // Fees Structure
      fees_structure_title: 'Fees Structure',
      fees_structure_description: 'Fees structure description detailing the cost breakdown for various programs.',
      fees_structure_courses: [
        { course_name: 'Computer Science', duration: '4 Years', annual_tuition_fee: '$15,000' },
        { course_name: 'Business Administration', duration: '2 Years', annual_tuition_fee: '$12,000' }
      ],
      
      // Campus Highlights
      campus_highlights_title: 'Campus Highlights',
      campus_highlights_description: 'Campus highlights description showcasing the facilities and environment.',
      campus_highlights_highlights: ['Modern Library', 'Sports Complex', 'Hostel Facilities']
    })
  }, [])

  // Filter colleges based on search and country using useMemo
  const filteredAdminColleges = useMemo(() => {
    let filtered = colleges

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(college => {
        if (!college.country_ref) return false
        const countrySlug = typeof college.country_ref === 'string' 
          ? college.country_ref 
          : college.country_ref?.slug
        return countrySlug === selectedCountry
      })
    }

    if (searchTerm) {
      const query = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(college => {
        const name = college.name?.toLowerCase() ?? ''
        const slug = college.slug?.toLowerCase() ?? ''
        const city = typeof college.city === 'string'
          ? college.city.toLowerCase()
          : ''
        return name.includes(query) || slug.includes(query) || city.includes(query)
      })
    }

    return filtered
  }, [colleges, searchTerm, selectedCountry])

  // Pagination logic
  const paginatedAdminColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAdminColleges.slice(startIndex, endIndex)
  }, [filteredAdminColleges, currentPage])

  const totalPages = Math.ceil(filteredAdminColleges.length / itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 })
  }, [searchTerm, selectedCountry, dispatch])

  const columns = [
    {
      key: 'name',
      title: 'AdminCollege Name',
      render: (value: string, record: AdminCollege) => {
        const countryName = !record.country_ref 
          ? 'No country'
          : typeof record.country_ref === 'string' 
            ? record.country_ref 
            : record.country_ref?.name || 'Unknown country'
        const cityLabel = typeof record.city === 'string' ? record.city : ''
        
        return (
          <div>
            <div className="font-medium">{value || 'Unnamed college'}</div>
            <div className="text-sm text-gray-500">{countryName}</div>
            {cityLabel && (
              <div className="text-xs text-blue-600">{cityLabel}</div>
            )}
          </div>
        )
      }
    },
    {
      key: 'exams',
      title: 'Exams',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 2).map((exam, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {exam}
            </Badge>
          ))}
          {value?.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'fees',
      title: 'Fees',
      render: (value: number, record: AdminCollege) => {
        const courses = record.fees_structure?.courses
        if (courses && courses.length > 0) {
          return courses[0].annual_tuition_fee || 'N/A'
        }
        return value ? `$${value.toLocaleString()}/year` : 'N/A'
      }
    },
    {
      key: 'duration',
      title: 'Duration',
      render: (value: string, record: AdminCollege) => {
        const courses = record.fees_structure?.courses
        if (courses && courses.length > 0) {
          return courses[0].duration || 'N/A'
        }
        return value || 'N/A'
      }
    },
    {
      key: 'banner_url',
      title: 'Banner',
      render: (value: string) => {
        if (!value) return 'N/A'
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            View Banner
          </a>
        )
      }
    },
    {
      key: 'establishment_year',
      title: 'Est. Year',
      render: (value: string) => value || '-'
    },
    {
      key: 'ranking',
      title: 'Ranking',
      render: (value: string) => {
        if (!value || value === 'N/A' || value === 'n/a') return value || '-'
        
        // Check if it's a simple string that's not JSON
        if (typeof value === 'string' && !value.startsWith('{') && !value.startsWith('[')) {
          return value
        }
        
        try {
          const rankingData = typeof value === 'string' ? JSON.parse(value.trim()) : value
          
          return (
            <div className="space-y-1">
              {rankingData.country_ranking && (
                <div className="text-sm">
                  <span className="text-gray-500">Country:</span> #{rankingData.country_ranking}
                </div>
              )}
              {rankingData.world_ranking && (
                <div className="text-sm">
                  <span className="text-gray-500">World:</span> #{rankingData.world_ranking}
                </div>
              )}
              {rankingData?.accreditation && Array.isArray(rankingData.accreditation) && rankingData.accreditation.length > 0 && (
                <div className="text-xs text-slate-500">
                  {rankingData.accreditation.length} accreditation(s)
                </div>
              )}
            </div>
          )
        } catch (error) {
          return <span className="text-xs text-slate-500">Invalid data</span>
        }
      }
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((college: AdminCollege) => {
      
      
      setEditingItem(college)
      
      // Properly extract all existing data when editing
      const extractedRanking = typeof college.ranking === 'object' && college.ranking !== null 
        ? college.ranking 
        : {
            title: 'Ranking & Recognition',
            description: '',
            country_ranking: college.ranking || '',
            world_ranking: '',
            accreditation: []
          }
      
      const extractedFeesStructure = college.fees_structure || {
        title: "Fees Structure",
        description: "",
        courses: college.fees ? [{
          course_name: "Program",
          duration: college.duration || "N/A",
          annual_tuition_fee: `$${college.fees.toLocaleString()}`
        }] : []
      }
      
      // Initialize form with ALL existing college data
      setFormData({
        // Basic Info
        name: college.name || '',
        slug: college.slug || '',
        country_ref: typeof college.country_ref === 'string' ? college.country_ref : college.country_ref?.slug || '',
        city: college.city || '',
        exams: college.exams || [],
        categories: college.categories || [],
        banner_url: college.banner_url || '',
        is_active: college.is_active !== undefined ? college.is_active : true,
        establishment_year: college.establishment_year || '',

        // Overview - load existing data
        overview_title: college.overview?.title || 'Overview',
        overview_description: college.overview?.description || college.about_content || '',

        // Key Highlights - load existing data
        key_highlights_title: college.key_highlights?.title || 'Key Highlights',
        key_highlights_description: college.key_highlights?.description || '',
        key_highlights_features: college.key_highlights?.features || [],

        // Why Choose Us - load existing data
        why_choose_us_title: college.why_choose_us?.title || 'Why Choose Us',
        why_choose_us_description: college.why_choose_us?.description || '',
        why_choose_us_features: college.why_choose_us?.features || [],

        // Ranking & Recognition - load existing data
        ranking_title: extractedRanking.title || 'Ranking & Recognition',
        ranking_description: extractedRanking.description || '',
        country_ranking: extractedRanking.country_ranking || '',
        world_ranking: extractedRanking.world_ranking || '',
        accreditation: extractedRanking.accreditation || [],

        // Admission Process - load existing data
        admission_process_title: college.admission_process?.title || 'Admission Process',
        admission_process_description: college.admission_process?.description || '',
        admission_process_steps: college.admission_process?.steps || [],

        // Documents Required - load existing data
        documents_required_title: college.documents_required?.title || 'Documents Required',
        documents_required_description: college.documents_required?.description || '',
        documents_required_documents: college.documents_required?.documents || [],

        // Fees Structure - load existing data
        fees_structure_title: extractedFeesStructure.title || 'Fees Structure',
        fees_structure_description: extractedFeesStructure.description || '',
        fees_structure_courses: extractedFeesStructure.courses || [],

        // Campus Highlights - load existing data
        campus_highlights_title: college.campus_highlights?.title || 'Campus Highlights',
        campus_highlights_description: college.campus_highlights?.description || '',
        campus_highlights_highlights: college.campus_highlights?.highlights || [],
      })
    openCreateModal()
    }),
    createDeleteAction((college: AdminCollege) => {
      openDeleteModal(college)
    })
  ]

  const handleAdminCollege = () => {
    setEditingItem(null)
    setFormData({
      // Basic Info
      name: '',
      slug: '',
      country_ref: '',
      city: '',
      exams: [] as string[],
      categories: [] as string[],
      banner_url: '',
      is_active: true,
      establishment_year: '',

      // Overview
      overview_title: 'Overview',
      overview_description: '',

      // Key Highlights
      key_highlights_title: 'Key Highlights',
      key_highlights_description: '',
      key_highlights_features: [] as string[],

      // Why Choose Us
      why_choose_us_title: 'Why Choose Us',
      why_choose_us_description: '',
      why_choose_us_features: [] as { title: string; description: string }[],

      // Ranking & Recognition
      ranking_title: 'Ranking & Recognition',
      ranking_description: '',
      country_ranking: '',
      world_ranking: '',
      accreditation: [] as string[],

      // Admission Process
      admission_process_title: 'Admission Process',
      admission_process_description: '',
      admission_process_steps: [] as string[],

      // Documents Required
      documents_required_title: 'Documents Required',
      documents_required_description: '',
      documents_required_documents: [] as string[],

      // Fees Structure
      fees_structure_title: 'Fees Structure',
      fees_structure_description: '',
      fees_structure_courses: [] as { course_name: string; duration: string; annual_tuition_fee: string }[],

      // Campus Highlights
      campus_highlights_title: 'Campus Highlights',
      campus_highlights_description: '',
      campus_highlights_highlights: [] as string[],
    })
    openCreateModal()
  }

  const handleSaveAdminCollege = async () => {
    
    
    // Collect all missing fields
    const missingFields = []
    
    // Enhanced validation for both ADD and EDIT
    
    // Basic Info validation
    if (!formData.name || formData.name.trim() === '') {
      missingFields.push('AdminCollege Name')
    }
    
    if (!formData.slug || formData.slug.trim() === '') {
      missingFields.push('AdminCollege Slug')
    }
    
    if (!formData.country_ref || formData.country_ref === '') {
      missingFields.push('Country')
    }
    
    // City validation for India
    if (formData.country_ref?.toLowerCase() === 'india' && (!formData.city || formData.city.trim() === '')) {
      missingFields.push('City (required for Indian colleges)')
    }
    
    if (!formData.establishment_year || formData.establishment_year.trim() === '') {
      missingFields.push('Establishment Year')
    }
    
    if (!formData.banner_url || formData.banner_url.trim() === '') {
      missingFields.push('Banner URL')
    }
    
    if (!formData.exams || formData.exams.length === 0) {
      missingFields.push('Exams')
    }
    
    if (!formData.categories || formData.categories.length === 0) {
      missingFields.push('Categories')
    }
    
    // Image URL validation (optional but if provided, should be valid)
    if (formData.banner_url && formData.banner_url.trim() !== '') {
      try {
        new URL(formData.banner_url)
      } catch {
        missingFields.push('Invalid Banner URL')
      }
    }
    
    // Overview validation
    if (!formData.overview_title || formData.overview_title.trim() === '') {
      missingFields.push('Overview Title')
    }
    
    if (!formData.overview_description || formData.overview_description.trim() === '') {
      missingFields.push('Overview Description')
    }
    
    // Key Highlights validation
    if (!formData.key_highlights_title || formData.key_highlights_title.trim() === '') {
      missingFields.push('Key Highlights Title')
    }
    
    if (!formData.key_highlights_description || formData.key_highlights_description.trim() === '') {
      missingFields.push('Key Highlights Description')
    }
    
    if (!formData.key_highlights_features || formData.key_highlights_features.length === 0) {
      missingFields.push('Key Highlights Features')
    }
    
    // Why Choose Us validation
    if (!formData.why_choose_us_title || formData.why_choose_us_title.trim() === '') {
      missingFields.push('Why Choose Us Title')
    }
    
    if (!formData.why_choose_us_description || formData.why_choose_us_description.trim() === '') {
      missingFields.push('Why Choose Us Description')
    }
    
    if (!formData.why_choose_us_features || formData.why_choose_us_features.length === 0) {
      missingFields.push('Why Choose Us Features')
    }
    
    // Ranking validation
    if (!formData.ranking_title || formData.ranking_title.trim() === '') {
      missingFields.push('Ranking Title')
    }
    
    if (!formData.ranking_description || formData.ranking_description.trim() === '') {
      missingFields.push('Ranking Description')
    }
    
    if (!formData.country_ranking || formData.country_ranking.trim() === '') {
      missingFields.push('Country Ranking')
    }
    
    if (!formData.world_ranking || formData.world_ranking.trim() === '') {
      missingFields.push('World Ranking')
    }
    
    if (!formData.accreditation || formData.accreditation.length === 0) {
      missingFields.push('Accreditation')
    }
    
    // Admission Process validation
    if (!formData.admission_process_title || formData.admission_process_title.trim() === '') {
      missingFields.push('Admission Process Title')
    }
    
    if (!formData.admission_process_description || formData.admission_process_description.trim() === '') {
      missingFields.push('Admission Process Description')
    }
    
    if (!formData.admission_process_steps || formData.admission_process_steps.length === 0) {
      missingFields.push('Admission Process Steps')
    }
    
    // Documents Required validation
    if (!formData.documents_required_title || formData.documents_required_title.trim() === '') {
      missingFields.push('Documents Required Title')
    }
    
    if (!formData.documents_required_description || formData.documents_required_description.trim() === '') {
      missingFields.push('Documents Required Description')
    }
    
    if (!formData.documents_required_documents || formData.documents_required_documents.length === 0) {
      missingFields.push('Required Documents')
    }
    
    // Fees Structure validation
    if (!formData.fees_structure_title || formData.fees_structure_title.trim() === '') {
      missingFields.push('Fees Structure Title')
    }
    
    if (!formData.fees_structure_description || formData.fees_structure_description.trim() === '') {
      missingFields.push('Fees Structure Description')
    }
    
    if (!formData.fees_structure_courses || formData.fees_structure_courses.length === 0) {
      missingFields.push('Fee Courses')
    }
    
    // Campus Highlights validation
    if (!formData.campus_highlights_title || formData.campus_highlights_title.trim() === '') {
      missingFields.push('Campus Highlights Title')
    }
    
    if (!formData.campus_highlights_description || formData.campus_highlights_description.trim() === '') {
      missingFields.push('Campus Highlights Description')
    }
    
    if (!formData.campus_highlights_highlights || formData.campus_highlights_highlights.length === 0) {
      missingFields.push('Campus Highlights')
    }
    
    
    // Show alert for missing fields (works for both ADD and EDIT)
    if (missingFields.length > 0) {
      const alertMessage = `Please fill in the following required fields:\n\n${missingFields.map((field, index) => `${index + 1}. ${field}`).join('\n')}`
      alert(alertMessage)
      return
    }

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        country_ref: formData.country_ref,
        city: formData.city || undefined,
        exams: formData.exams,
        categories: formData.categories,
        banner_url: formData.banner_url,
        is_active: formData.is_active,

        // Comprehensive structure
        overview: {
          title: formData.overview_title,
          description: formData.overview_description
        },
        key_highlights: {
          title: formData.key_highlights_title,
          description: formData.key_highlights_description,
          features: formData.key_highlights_features
        },
        why_choose_us: {
          title: formData.why_choose_us_title,
          description: formData.why_choose_us_description,
          features: formData.why_choose_us_features
        },
        ranking: {
          title: formData.ranking_title,
          description: formData.ranking_description,
          country_ranking: formData.country_ranking,
          world_ranking: formData.world_ranking,
          accreditation: formData.accreditation
        },
        admission_process: {
          title: formData.admission_process_title,
          description: formData.admission_process_description,
          steps: formData.admission_process_steps
        },
        documents_required: {
          title: formData.documents_required_title,
          description: formData.documents_required_description,
          documents: formData.documents_required_documents
        },
        fees_structure: {
          title: formData.fees_structure_title,
          description: formData.fees_structure_description,
          courses: formData.fees_structure_courses
        },
        campus_highlights: {
          title: formData.campus_highlights_title,
          description: formData.campus_highlights_description,
          highlights: formData.campus_highlights_highlights
        },

        // Legacy fields for backward compatibility
        about_content: formData.overview_description,
        establishment_year: formData.establishment_year,
        
        // Include ID for editing
        ...(editingAdminCollege && { _id: editingAdminCollege._id })
      }
      
      
      
      await saveCollegeMutation.mutateAsync(payload)
      
      toast.success(editingAdminCollege ? 'AdminCollege updated successfully!' : 'AdminCollege created successfully!')
      closeModal()
      setEditingItem(null)
      
    } catch (error) {
      
      toast.error('Error saving college: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteAdminCollege = async () => {
    if (!collegeToDelete) return
    
    try {
      await deleteCollegeMutation.mutateAsync(collegeToDelete._id)
      toast.success('AdminCollege deleted successfully!')
      closeDeleteModal()
    } catch (error) {
      toast.error('Error deleting college')
    }
  }

  return (
    <div>
    <div className="space-y-6">
      {/* Filters and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">All Colleges</h2>
            <p className="text-sm text-gray-500">
              {filteredAdminColleges.length} of {colleges.length} colleges
            </p>
          </div>
          <Button onClick={handleAdminCollege} className="flex items-center space-x-1">
            <Plus className="h-4 w-4" />
            <span>Add College</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input
                placeholder="Search by college name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Select value={selectedCountry} onValueChange={(value) => setFilter('country', value)}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {dummyCountries.map((country) => (
                  <SelectItem key={country.id} value={country.slug}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* AdminColleges Table */}
        <AdminTable
          data={paginatedAdminColleges}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No colleges found. Add your first college to get started."
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAdminColleges.length)} of {filteredAdminColleges.length} colleges
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={(open) => !open && closeModal()}
          title={editingAdminCollege ? 'Edit AdminCollege' : 'Add New AdminCollege'}
          description={editingAdminCollege ? 'Update college information' : 'Add a new college to the system'}
          onConfirm={handleSaveAdminCollege}
          loading={saveCollegeMutation.isPending}
          size="xl"
        >
          <ComprehensiveCollegeForm
            data={formData}
            countries={countries.map((c, index) => ({ 
              ...c, 
              _id: (c as any)._id || (c as any).id || `country-${index}` 
            }))}
            onChange={(field: string, value: any) => {
              updateFormField(field, value)
              // Auto-generate slug when name changes and slug is empty or being edited for the first time
              if (field === 'name' && (!formData.slug || formData.slug === generateSlug(formData.name))) {
                updateFormField('slug', generateSlug(value as string))
              }
            }}
            onSubmit={handleSaveAdminCollege}
            loading={saveCollegeMutation.isPending}
          />
        </AdminModal>

        {/* Delete Confirmation Modal */}
        <AdminModal
          open={deleteModalOpen}
          onOpenChange={(open) => !open && closeDeleteModal()}
          title="Delete AdminCollege"
          description={`Are you sure you want to delete "${collegeToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteAdminCollege}
          loading={deleteCollegeMutation.isPending}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <GraduationCap className="h-4 w-4" />
            <span>{collegeToDelete?.name}</span>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}

export default function AdminCollegesPage() {
  return (
    <CollegesAdminProvider>
      <AdminCollegesPageContent />
    </CollegesAdminProvider>
  )
}
