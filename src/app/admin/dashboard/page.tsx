"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Globe, GraduationCap, FileText, MoreHorizontal, ChevronRight, Activity, FileCheck, Loader2, MapPin, Tag, MessageSquare } from 'lucide-react'
import { useAdminDashboardStats } from '@/hooks/useAdminDashboard'
import { useAdminCountries, useAdminColleges } from '@/hooks/useAdminColleges'
import { useAdminBlogs } from '@/hooks/useAdminBlogs'
import { useAdminCities } from '@/hooks/useAdminCities'
import { useAdminCategories } from '@/hooks/useAdminCategories'
import { useAdminEnquiries } from '@/hooks/useAdminEnquiries'
import { useDashboardAdminContext, DashboardAdminProvider } from '@/context/DashboardAdminContext'
import { dummyCountries, dummyColleges, dummyBlogs } from '@/data/dummyData'

function DashboardPageContent() {
  // TanStack Query hooks
  const { data: dbStats = { countries: 0, colleges: 0, blogs: 0, exams: 0 }, isLoading: statsLoading, error: statsError } = useAdminDashboardStats()
  const { data: countries = [], isLoading: countriesLoading } = useAdminCountries()
  const { data: colleges = [], isLoading: collegesLoading } = useAdminColleges()
  const { data: blogs = [], isLoading: blogsLoading } = useAdminBlogs()
  const { data: citiesData, isLoading: citiesLoading } = useAdminCities({ page: 1, limit: 1000 })
  const { data: categories = [], isLoading: categoriesLoading } = useAdminCategories()
  const { data: enquiries = [], isLoading: enquiriesLoading } = useAdminEnquiries()
  
  // Overall loading state
  const loading = statsLoading || countriesLoading || collegesLoading || blogsLoading || citiesLoading || categoriesLoading || enquiriesLoading
  
  // Fallback to dummy data if there are errors
  const displayCountries = countries.length > 0 ? countries : dummyCountries
  const displayColleges = colleges.length > 0 ? colleges : dummyColleges
  const displayBlogs = blogs.length > 0 ? blogs : dummyBlogs
  const displayCities = citiesData?.cities || []
  const displayCategories = categories.length > 0 ? categories : []
  const displayEnquiries = enquiries.length > 0 ? enquiries : []
  
  // Calculate pending enquiries
  const pendingEnquiries = displayEnquiries.filter((enquiry: any) => enquiry.status === 'pending' || enquiry.status === 'new').length
  
  const displayStats = dbStats.countries > 0 || dbStats.colleges > 0 || dbStats.blogs > 0 || dbStats.exams > 0 
    ? dbStats 
    : {
        countries: dummyCountries.length,
        colleges: dummyColleges.length,
        blogs: dummyBlogs.length,
        exams: 12,
        cities: displayCities.length,
        categories: displayCategories.length,
        pendingEnquiries: pendingEnquiries
      }

  const stats = [
    {
      title: 'Total Countries',
      value: displayStats.countries,
      description: 'Active destinations',
      icon: Globe,
      color: 'text-[#0066F5]',
      bgColor: 'bg-[#E8F1FF]'
    },
    {
      title: 'Total Colleges',
      value: displayStats.colleges,
      description: 'Educational institutions',
      icon: GraduationCap,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Total Exams',
      value: displayStats.exams,
      description: 'Standardized tests',
      icon: FileCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Blog Posts',
      value: displayStats.blogs,
      description: 'Published content',
      icon: FileText,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50'
    },
    {
      title: 'Total Cities',
      value: displayCities.length,
      description: 'Study locations',
      icon: MapPin,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Categories',
      value: displayCategories.length,
      description: 'Content categories',
      icon: Tag,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Pending Enquiries',
      value: pendingEnquiries,
      description: 'Awaiting response',
      icon: MessageSquare,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ]

  // Mocking recent activity (This would also ideally come from DB)
  const recentActivity = [
    { type: 'country', action: 'Added new country', target: 'Australia', time: '2 hours ago', icon: Globe },
    { type: 'exam', action: 'Updated exam', target: 'TOEFL', time: '5 hours ago', icon: FileCheck },
    { type: 'blog', action: 'Published blog', target: 'Top 10 Universities', time: '1 day ago', icon: FileText },
    { type: 'college', action: 'Added new college', target: 'University of Melbourne', time: '2 days ago', icon: GraduationCap }
  ]

  const quickActions = [
    { title: 'Add Country', description: 'Add a new study destination', icon: Globe, href: '/admin/countries', color: 'bg-blue-500 hover:bg-blue-600' },
    { title: 'Add College', description: 'Add a new educational institution', icon: GraduationCap, href: '/admin/colleges', color: 'bg-green-500 hover:bg-green-600' },
    { title: 'Add Exam', description: 'Add a new standardized test', icon: FileCheck, href: '/admin/exams', color: 'bg-orange-500 hover:bg-orange-600' },
    { title: 'Create Blog', description: 'Write a new blog post', icon: FileText, href: '/admin/blogs', color: 'bg-purple-500 hover:bg-purple-600' }
  ]

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200 border border-slate-200 shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <Card className="xl:col-span-2 border border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-slate-900">
                <Activity className="h-5 w-5 text-blue-400" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 sm:h-80">
                <div className="space-y-3 pr-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                      <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                        <activity.icon className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm text-slate-900">{activity.action}</span>
                          <span className="text-slate-500 text-sm truncate">"{activity.target}"</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <a key={index} href={action.href} className="block p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-105 transition-transform`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 text-sm">
                        <div className="font-medium text-slate-900">{action.title}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview Section (Countries, Blogs, Colleges Dialogs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Example: Active Countries Card */}
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-slate-900">Active Countries</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900"><MoreHorizontal className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-slate-200">
                  <DialogHeader><DialogTitle className="text-slate-900">Active Countries List</DialogTitle></DialogHeader>
                  <ScrollArea className="h-80">
                    {displayCountries.map((c: any) => (
                      <div key={(c as any)._id || (c as any).id} className="flex justify-between p-2 border-b border-slate-200 text-slate-900">{c.name} <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{(c as any).is_active !== false ? 'Active' : 'Inactive'}</Badge></div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                  {displayCountries.slice(0, 5).map((country: any) => (
                    <div key={(country as any)._id || (country as any).id} className="flex items-center justify-between text-sm text-slate-900">
                      <span>{country.flag || ''} {country.name}</span>
                      <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-600">{(country as any).is_active !== false ? 'Active' : 'Inactive'}</Badge>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>

          {/* Recent Blogs Card */}
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-slate-900">Recent Blogs</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900"><MoreHorizontal className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white border-slate-200">
                  <DialogHeader><DialogTitle className="text-slate-900">All Blog Posts</DialogTitle></DialogHeader>
                  <ScrollArea className="h-80">
                    {displayBlogs.map((blog: any) => (
                      <div key={(blog as any)._id || (blog as any).id} className="p-3 border-b border-slate-200">
                        <h3 className="font-medium text-sm text-slate-900">{blog.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{blog.content?.substring(0, 100)}...</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">{blog.category}</Badge>
                          <span className="text-xs text-gray-500">{new Date(blog.createdAt || (blog as any).created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {displayBlogs.slice(0, 4).map((blog: any) => (
                  <div key={(blog as any)._id || (blog as any).id} className="space-y-1 p-2 rounded-lg hover:bg-white transition-colors">
                    <div className="text-sm font-medium line-clamp-1 text-slate-900">{blog.title}</div>
                    <div className="text-xs text-slate-500">{blog.category}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Colleges Card */}
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-slate-900">Top Colleges</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900"><MoreHorizontal className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white border-slate-200">
                  <DialogHeader><DialogTitle className="text-slate-900">All Active Colleges</DialogTitle></DialogHeader>
                  <ScrollArea className="h-80">
                    {displayColleges.map((college: any) => (
                      <div key={(college as any)._id || (college as any).id} className="p-3 border-b border-slate-200">
                        <h3 className="font-medium text-sm text-slate-900">{college.name}</h3>
                        <p className="text-xs text-slate-500">{(college as any).country_ref?.name || (college as any).country}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-emerald-600">${(college as any).fees?.toLocaleString()}/year</span>
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">{(college as any).is_active !== false ? 'Active' : 'Inactive'}</Badge>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {displayColleges.slice(0, 4).map((college: any) => (
                  <div key={(college as any)._id || (college as any).id} className="space-y-1 p-2 rounded-lg hover:bg-white transition-colors">
                    <div className="text-sm font-medium truncate text-slate-900">{college.name}</div>
                    <div className="text-xs text-slate-500">${(college as any).fees?.toLocaleString()}/year</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardAdminProvider>
      <DashboardPageContent />
    </DashboardAdminProvider>
  )
}