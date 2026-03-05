'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, X, GraduationCap, Globe, Award, FileText, Users, Building, DollarSign, Calendar, CheckCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CITY_OPTIONS } from '@/lib/cities'
import { FORM_DEFAULTS, FORM_PLACEHOLDERS } from "@/lib/constants/formDefaults";
import { useAdminCategories } from '@/hooks/useAdminCategories'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface ComprehensiveCollegeFormData {
  // Basic Info
  name: string
  slug: string
  country_ref: string
  city?: string
  exams: string[]
  categories: string[]
  banner_url?: string
  is_active: boolean
  establishment_year?: string

  // Overview
  overview_title: string
  overview_description: string

  // Key Highlights
  key_highlights_title: string
  key_highlights_description: string
  key_highlights_features: string[]

  // Why Choose Us
  why_choose_us_title: string
  why_choose_us_description: string
  why_choose_us_features: { title: string; description: string }[]

  // Ranking & Recognition
  ranking_title: string
  ranking_description: string
  country_ranking: string
  world_ranking: string
  accreditation: string[]

  // Admission Process
  admission_process_title: string
  admission_process_description: string
  admission_process_steps: string[]

  // Documents Required
  documents_required_title: string
  documents_required_description: string
  documents_required_documents: string[]

  // Fees Structure
  fees_structure_title: string
  fees_structure_description: string
  fees_structure_courses: { course_name: string; duration: string; annual_tuition_fee: string }[]

  // Campus Highlights
  campus_highlights_title: string
  campus_highlights_description: string
  campus_highlights_highlights: string[]
}

interface ComprehensiveCollegeFormProps {
  data: Partial<ComprehensiveCollegeFormData>
  countries: Country[]
  onChange: (field: string, value: any) => void
  onSubmit: (data: ComprehensiveCollegeFormData) => void
  loading?: boolean
}

export function ComprehensiveCollegeForm({ data, countries, onChange, onSubmit, loading = false }: ComprehensiveCollegeFormProps) {
  const [newExam, setNewExam] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newWhyChooseFeature, setNewWhyChooseFeature] = useState({ title: '', description: '' })
  const [newAccreditation, setNewAccreditation] = useState('')
  const [newAdmissionStep, setNewAdmissionStep] = useState('')
  const [newDocument, setNewDocument] = useState('')
  const [newCampusHighlight, setNewCampusHighlight] = useState('')
  const [newCourse, setNewCourse] = useState({ course_name: '', duration: '', annual_tuition_fee: '' })

  // Fetch dynamic categories
  const { data: categories = [], isLoading: categoriesLoading } = useAdminCategories()

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const requiredFields = [
      data.name?.trim(),
      data.slug?.trim(),
      data.country_ref,
      // Only require city if country is India
      data.country_ref === 'india' ? data.city?.trim() : true,
      data.overview_description?.trim(),
      data.key_highlights_description?.trim(),
      data.key_highlights_features?.length,
      data.why_choose_us_description?.trim(),
      data.why_choose_us_features?.length,
      data.ranking_description?.trim(),
      (data.country_ranking?.trim() || data.world_ranking?.trim()),
      data.admission_process_description?.trim(),
      data.admission_process_steps?.length,
      data.documents_required_description?.trim(),
      data.documents_required_documents?.length,
      data.fees_structure_description?.trim(),
      data.fees_structure_courses?.length,
      data.campus_highlights_description?.trim(),
      data.campus_highlights_highlights?.length,
      data.exams?.length
    ]
    
    const completedFields = requiredFields.filter(field => field && field !== 0).length
    return Math.round((completedFields / requiredFields.length) * 100)
  }

  const completionPercentage = calculateCompletion()

  const addTag = (tag: string, array: string[], fieldName: string, setter: (value: string) => void) => {
    if (tag.trim()) {
      onChange(fieldName, [...array, tag.trim()])
      setter('')
    }
  }

  const removeTag = (index: number, array: string[], fieldName: string) => {
    onChange(fieldName, array.filter((_, i) => i !== index))
  }

  const addFeatureObject = (feature: { title: string; description: string }, array: any[], fieldName: string, setter: (value: { title: string; description: string }) => void) => {
    if (feature.title.trim() && feature.description.trim()) {
      onChange(fieldName, [...array, { title: feature.title.trim(), description: feature.description.trim() }])
      setter({ title: '', description: '' })
    }
  }

  const removeFeatureObject = (index: number, array: any[], fieldName: string) => {
    onChange(fieldName, array.filter((_, i) => i !== index))
  }

  const addCourse = (course: { course_name: string; duration: string; annual_tuition_fee: string }, array: any[], fieldName: string, setter: (value: { course_name: string; duration: string; annual_tuition_fee: string }) => void) => {
    if (course.course_name.trim() && course.duration.trim() && course.annual_tuition_fee.trim()) {
      onChange(fieldName, [...array, { 
        course_name: course.course_name.trim(), 
        duration: course.duration.trim(), 
        annual_tuition_fee: course.annual_tuition_fee.trim() 
      }])
      setter({ course_name: '', duration: '', annual_tuition_fee: '' })
    }
  }

  const removeCourse = (index: number, array: any[], fieldName: string) => {
    onChange(fieldName, array.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Form Completion Indicator */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Form Completion</span>
          <span className={`text-sm font-bold ${completionPercentage === 100 ? 'text-green-400' : completionPercentage >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              completionPercentage === 100 ? 'bg-green-600' : completionPercentage >= 70 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        {completionPercentage < 100 && (
          <p className="text-xs text-gray-400 mt-2">
            Please complete all required fields marked with *
          </p>
        )}
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
          <TabsTrigger value="campus">Campus</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="mb-3 block text-gray-200">College Name *</Label>
                  <Input
                    id="name"
                    value={data.name || ''}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder={FORM_PLACEHOLDERS.college_name}
                    disabled={loading}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="slug" className="mb-3 block text-gray-200">Slug *</Label>
                  <Input
                    id="slug"
                    value={data.slug || ''}
                    onChange={(e) => onChange('slug', e.target.value)}
                    placeholder={FORM_PLACEHOLDERS.slug}
                    disabled={loading}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country" className="mb-3 block text-gray-200">Country *</Label>
                <Select value={data.country_ref || ''} onValueChange={(value) => onChange('country_ref', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder={FORM_PLACEHOLDERS.country} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {countries.map((country, index) => (
                      <SelectItem key={country._id || `country-${index}`} value={country.slug} className="text-white hover:bg-gray-600">
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Conditional City Field - Only show for India */}
              {data.country_ref === 'india' && (
                <div>
                  <Label htmlFor="city" className="mb-3 block text-gray-200">City *</Label>
                  <Select value={data.city || ''} onValueChange={(value) => onChange('city', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select a metro city" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {CITY_OPTIONS.map((city: { value: string; label: string }) => (
                        <SelectItem key={city.value} value={city.value} className="text-white hover:bg-gray-600">
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(!data.city || data.city.trim() === '') && (
                    <p className="text-sm text-red-400 mt-1">City is required for Indian colleges</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="banner_url" className="mb-3 block text-gray-200">Banner URL</Label>
                <Input
                  id="banner_url"
                  value={data.banner_url || ''}
                  onChange={(e) => onChange('banner_url', e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="establishment_year" className="mb-3 block text-gray-200">Establishment Year</Label>
                <Input
                  id="establishment_year"
                  value={data.establishment_year || ''}
                  onChange={(e) => onChange('establishment_year', e.target.value)}
                  placeholder="e.g., 1850"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label className="mb-3 block text-gray-200">Required Exams *</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newExam}
                    onChange={(e) => setNewExam(e.target.value)}
                    placeholder="Add exam (e.g., SAT, TOEFL)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newExam, data.exams || [], 'exams', setNewExam))}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newExam, data.exams || [], 'exams', setNewExam)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.exams || []).map((exam, index) => (
                    <div className='flex items-center bg-gray-700 rounded-lg px-3 py-1 gap-3 border border-gray-600' key={index}>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-gray-600 text-white">
                        {exam}
                      </Badge>
                      <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-white" onClick={(e) => { e.stopPropagation(); removeTag(index, data.exams || [], 'exams'); }} />
                    </div>
                  ))}
                </div>
                {(!data.exams || data.exams.length === 0) && (
                  <p className="text-sm text-red-400">At least one exam is required</p>
                )}
              </div>

              <div>
                <Label className="mb-3 block text-gray-200">College Categories *</Label>
                {categoriesLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="ml-2 text-gray-400">Loading categories...</span>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center p-4 border border-gray-600 rounded-lg">
                    <p className="text-gray-400">No categories available. Please add categories first.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.slug} className="flex items-start space-x-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-700">
                        <Checkbox
                          id={category.slug}
                          checked={(data.categories || []).includes(category.slug)}
                          onCheckedChange={(checked) => {
                            const currentCategories = data.categories || [];
                            if (checked) {
                              onChange('categories', [...currentCategories, category.slug]);
                            } else {
                              onChange('categories', currentCategories.filter(cat => cat !== category.slug));
                            }
                          }}
                        />
                        <Label htmlFor={category.slug} className="text-gray-200">
                          <div className="flex flex-col">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-xs text-gray-400">{category.description}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {(!data.categories || data.categories.length === 0) && !categoriesLoading && (
                  <p className="text-sm text-red-400">At least one category is required</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5" />
                Overview Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="overview_title" className="mb-3 block text-gray-200">Overview Title</Label>
                <Input
                  id="overview_title"
                  value={data.overview_title || 'Overview'}
                  onChange={(e) => onChange('overview_title', e.target.value)}
                  placeholder="Overview"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="overview_description" className="mb-3 block text-gray-200">Overview Description *</Label>
                <Textarea
                  id="overview_description"
                  value={data.overview_description || ''}
                  onChange={(e) => onChange('overview_description', e.target.value)}
                  placeholder="Our institution is a globally recognized center for academic excellence..."
                  rows={4}
                  disabled={loading}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                {!data.overview_description?.trim() && (
                  <p className="text-sm text-red-400 mt-1">Overview description is required</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Highlights */}
        <TabsContent value="highlights" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="key_highlights_title" className="mb-3 block text-gray-200">Key Highlights Title</Label>
                <Input
                  id="key_highlights_title"
                  value={data.key_highlights_title || 'Key Highlights'}
                  onChange={(e) => onChange('key_highlights_title', e.target.value)}
                  placeholder="Key Highlights"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="key_highlights_description" className="mb-3 block text-gray-200">Key Highlights Description</Label>
                <Textarea
                  id="key_highlights_description"
                  value={data.key_highlights_description || ''}
                  onChange={(e) => onChange('key_highlights_description', e.target.value)}
                  placeholder="The institution stands out for its academic quality..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Key Features</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add key feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newFeature, data.key_highlights_features || [], 'key_highlights_features', setNewFeature))}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newFeature, data.key_highlights_features || [], 'key_highlights_features', setNewFeature)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.key_highlights_features || []).map((feature, index) => (
                    <div className='flex items-center bg-gray-700 rounded-lg px-3 py-1 gap-3 border border-gray-600' key={index}>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-gray-600 text-white">
                        {feature}
                      </Badge>
                      <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-white" onClick={(e) => { e.stopPropagation(); removeTag(index, data.key_highlights_features || [], 'key_highlights_features'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5" />
                Why Choose Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="why_choose_us_title" className="mb-3 block text-gray-200">Why Choose Us Title</Label>
                <Input
                  id="why_choose_us_title"
                  value={data.why_choose_us_title || 'Why Choose Us'}
                  onChange={(e) => onChange('why_choose_us_title', e.target.value)}
                  placeholder="Why Choose Us"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="why_choose_us_description" className="mb-3 block text-gray-200">Why Choose Us Description</Label>
                <Textarea
                  id="why_choose_us_description"
                  value={data.why_choose_us_description || ''}
                  onChange={(e) => onChange('why_choose_us_description', e.target.value)}
                  placeholder="Choosing the right institution is a crucial decision..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Features (Title - Description)</Label>
                <div className="space-y-3 mb-3">
                  <Input
                    placeholder="Feature title"
                    value={newWhyChooseFeature.title}
                    onChange={(e) => setNewWhyChooseFeature({ ...newWhyChooseFeature, title: e.target.value })}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Input
                    placeholder="Feature description"
                    value={newWhyChooseFeature.description}
                    onChange={(e) => setNewWhyChooseFeature({ ...newWhyChooseFeature, description: e.target.value })}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addFeatureObject(newWhyChooseFeature, data.why_choose_us_features || [], 'why_choose_us_features', setNewWhyChooseFeature)}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {(data.why_choose_us_features || []).map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                      <div>
                        <div className="font-medium text-white">{feature.title}</div>
                        <div className="text-sm text-gray-400">{feature.description}</div>
                      </div>
                      <X className="h-4 w-4 cursor-pointer text-red-400 hover:text-red-300" onClick={(e) => { e.stopPropagation(); removeFeatureObject(index, data.why_choose_us_features || [], 'why_choose_us_features'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admission */}
        <TabsContent value="admission" className="space-y-4">
          {/* Ranking & Recognition */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5" />
                Ranking & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ranking_title" className="mb-3 block text-gray-200">Ranking Title</Label>
                <Input
                  id="ranking_title"
                  value={data.ranking_title || 'Ranking & Recognition'}
                  onChange={(e) => onChange('ranking_title', e.target.value)}
                  placeholder="Ranking & Recognition"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="ranking_description" className="mb-3 block text-gray-200">Ranking Description</Label>
                <Textarea
                  id="ranking_description"
                  value={data.ranking_description || ''}
                  onChange={(e) => onChange('ranking_description', e.target.value)}
                  placeholder="The institution is consistently ranked among the top educational institutions..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country_ranking" className="mb-3 block text-gray-200">Country Ranking</Label>
                  <Input
                    id="country_ranking"
                    value={data.country_ranking || ''}
                    onChange={(e) => onChange('country_ranking', e.target.value)}
                    placeholder="e.g., Top 10 nationally"
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="world_ranking" className="mb-3 block text-gray-200">World Ranking</Label>
                  <Input
                    id="world_ranking"
                    value={data.world_ranking || ''}
                    onChange={(e) => onChange('world_ranking', e.target.value)}
                    placeholder="e.g., Top 500 globally"
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Accreditation</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newAccreditation}
                    onChange={(e) => setNewAccreditation(e.target.value)}
                    placeholder="Add accreditation body"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newAccreditation, data.accreditation || [], 'accreditation', setNewAccreditation))}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newAccreditation, data.accreditation || [], 'accreditation', setNewAccreditation)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.accreditation || []).map((acc, index) => (
                    <div className='flex items-center bg-gray-700 rounded-lg px-3 py-1 gap-3 border border-gray-600' key={index}>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-gray-600 text-white">
                        {acc}
                      </Badge>
                      <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-white" onClick={(e) => { e.stopPropagation(); removeTag(index, data.accreditation || [], 'accreditation'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admission Process */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                Admission Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="admission_process_title" className="mb-3 block text-gray-200">Admission Process Title</Label>
                <Input
                  id="admission_process_title"
                  value={data.admission_process_title || 'Admission Process'}
                  onChange={(e) => onChange('admission_process_title', e.target.value)}
                  placeholder="Admission Process"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="admission_process_description" className="mb-3 block text-gray-200">Admission Process Description</Label>
                <Textarea
                  id="admission_process_description"
                  value={data.admission_process_description || ''}
                  onChange={(e) => onChange('admission_process_description', e.target.value)}
                  placeholder="Our admission process is designed to be transparent and straightforward..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Admission Steps</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newAdmissionStep}
                    onChange={(e) => setNewAdmissionStep(e.target.value)}
                    placeholder="Add admission step"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newAdmissionStep, data.admission_process_steps || [], 'admission_process_steps', setNewAdmissionStep))}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newAdmissionStep, data.admission_process_steps || [], 'admission_process_steps', setNewAdmissionStep)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.admission_process_steps || []).map((step, index) => (
                    <div className='flex items-center bg-gray-700 rounded-lg px-3 py-1 gap-3 border border-gray-600' key={index}>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-gray-600 text-white">
                        {step}
                      </Badge>
                      <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-white" onClick={(e) => { e.stopPropagation(); removeTag(index, data.admission_process_steps || [], 'admission_process_steps'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Required */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5" />
                Documents Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="documents_required_title" className="mb-3 block text-gray-200">Documents Required Title</Label>
                <Input
                  id="documents_required_title"
                  value={data.documents_required_title || 'Documents Required'}
                  onChange={(e) => onChange('documents_required_title', e.target.value)}
                  placeholder="Documents Required"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="documents_required_description" className="mb-3 block text-gray-200">Documents Required Description</Label>
                <Textarea
                  id="documents_required_description"
                  value={data.documents_required_description || ''}
                  onChange={(e) => onChange('documents_required_description', e.target.value)}
                  placeholder="Applicants must submit the following documents..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Required Documents</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Add required document"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newDocument, data.documents_required_documents || [], 'documents_required_documents', setNewDocument))}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newDocument, data.documents_required_documents || [], 'documents_required_documents', setNewDocument)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.documents_required_documents || []).map((doc, index) => (
                    <div className='flex items-center bg-gray-700 rounded-lg px-3 py-1 gap-3 border border-gray-600' key={index}>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-gray-600 text-white">
                        {doc}
                      </Badge>
                      <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-white" onClick={(e) => { e.stopPropagation(); removeTag(index, data.documents_required_documents || [], 'documents_required_documents'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fees Structure */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5" />
                Fees Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fees_structure_title" className="mb-3 block text-gray-200">Fees Structure Title</Label>
                <Input
                  id="fees_structure_title"
                  value={data.fees_structure_title || 'Fees Structure'}
                  onChange={(e) => onChange('fees_structure_title', e.target.value)}
                  placeholder="Fees Structure"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="fees_structure_description" className="mb-3 block text-gray-200">Fees Structure Description</Label>
                <Textarea
                  id="fees_structure_description"
                  value={data.fees_structure_description || ''}
                  onChange={(e) => onChange('fees_structure_description', e.target.value)}
                  placeholder="The fee structure is designed to be transparent and competitive..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Courses</Label>
                <div className="space-y-2 mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      placeholder="Course name"
                      value={newCourse.course_name}
                      onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
                      disabled={loading}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Input
                      placeholder="Duration"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      disabled={loading}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Input
                      placeholder="Annual fee"
                      value={newCourse.annual_tuition_fee}
                      onChange={(e) => setNewCourse({ ...newCourse, annual_tuition_fee: e.target.value })}
                      disabled={loading}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => addCourse(newCourse, data.fees_structure_courses || [], 'fees_structure_courses', setNewCourse)}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
                <div className="space-y-2">
                  {(data.fees_structure_courses || []).map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-600 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                        <div className="font-medium text-white">{course.course_name}</div>
                        <div className="text-sm text-gray-400">{course.duration}</div>
                        <div className="text-sm font-medium text-white">{course.annual_tuition_fee}</div>
                      </div>
                      <X className="h-4 w-4 cursor-pointer text-red-400 hover:text-red-300 ml-2" onClick={(e) => { e.stopPropagation(); removeCourse(index, data.fees_structure_courses || [], 'fees_structure_courses'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campus */}
        <TabsContent value="campus" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Building className="h-5 w-5" />
                Campus Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="campus_highlights_title" className="mb-3 block text-gray-200">Campus Highlights Title</Label>
                <Input
                  id="campus_highlights_title"
                  value={data.campus_highlights_title || 'Campus Highlights'}
                  onChange={(e) => onChange('campus_highlights_title', e.target.value)}
                  placeholder="Campus Highlights"
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="campus_highlights_description" className="mb-3 block text-gray-200">Campus Highlights Description</Label>
                <Textarea
                  id="campus_highlights_description"
                  value={data.campus_highlights_description || ''}
                  onChange={(e) => onChange('campus_highlights_description', e.target.value)}
                  placeholder="Our campus provides an ideal environment for learning and personal growth..."
                  rows={3}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="mb-3 block text-gray-200">Campus Highlights</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newCampusHighlight}
                    onChange={(e) => setNewCampusHighlight(e.target.value)}
                    placeholder="Add campus highlight"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newCampusHighlight, data.campus_highlights_highlights || [], 'campus_highlights_highlights', setNewCampusHighlight))}
                    disabled={loading}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newCampusHighlight, data.campus_highlights_highlights || [], 'campus_highlights_highlights', setNewCampusHighlight)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.campus_highlights_highlights || []).map((highlight, index) => (
                    <div className='flex items-center bg-gray-700 rounded-lg px-3 py-1 gap-3 border border-gray-600' key={index}>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-gray-600 text-white">
                        {highlight}
                      </Badge>
                      <X className="h-3 w-3 cursor-pointer text-gray-400 hover:text-white" onClick={(e) => { e.stopPropagation(); removeTag(index, data.campus_highlights_highlights || [], 'campus_highlights_highlights'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
