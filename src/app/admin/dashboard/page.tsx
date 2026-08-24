"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { DashboardAdminProvider } from '@/context/DashboardAdminContext'
import { dummyCountries, dummyColleges, dummyBlogs } from '@/data/dummyData'

const cardClass =
  'border border-white/10 bg-[#0E1C33] shadow-none text-white hover:border-[#0066F5]/40 transition-colors'

function DashboardPageContent() {
  const { data: dbStats = { countries: 0, colleges: 0, blogs: 0, exams: 0 }, isLoading: statsLoading } = useAdminDashboardStats()
  const { data: countries = [], isLoading: countriesLoading } = useAdminCountries()
  const { data: colleges = [], isLoading: collegesLoading } = useAdminColleges()
  const { data: blogs = [], isLoading: blogsLoading } = useAdminBlogs()
  const { data: citiesData, isLoading: citiesLoading } = useAdminCities({ page: 1, limit: 1000 })
  const { data: categories = [], isLoading: categoriesLoading } = useAdminCategories()
  const { data: enquiries = [], isLoading: enquiriesLoading } = useAdminEnquiries()

  const loading =
    statsLoading ||
    countriesLoading ||
    collegesLoading ||
    blogsLoading ||
    citiesLoading ||
    categoriesLoading ||
    enquiriesLoading

  const displayCountries = countries.length > 0 ? countries : dummyCountries
  const displayColleges = colleges.length > 0 ? colleges : dummyColleges
  const displayBlogs = blogs.length > 0 ? blogs : dummyBlogs
  const displayCities = citiesData?.cities || []
  const displayCategories = categories.length > 0 ? categories : []
  const displayEnquiries = enquiries.length > 0 ? enquiries : []

  const pendingEnquiries = displayEnquiries.filter(
    (enquiry: any) => enquiry.status === 'pending' || enquiry.status === 'new'
  ).length

  const displayStats =
    dbStats.countries > 0 || dbStats.colleges > 0 || dbStats.blogs > 0 || dbStats.exams > 0
      ? dbStats
      : {
          countries: dummyCountries.length,
          colleges: dummyColleges.length,
          blogs: dummyBlogs.length,
          exams: 12,
        }

  const stats = [
    { title: 'Total Countries', value: displayStats.countries, description: 'Active destinations', icon: Globe },
    { title: 'Total Colleges', value: displayStats.colleges, description: 'Educational institutions', icon: GraduationCap },
    { title: 'Total Exams', value: displayStats.exams, description: 'Standardized tests', icon: FileCheck },
    { title: 'Blog Posts', value: displayStats.blogs, description: 'Published content', icon: FileText },
    { title: 'Total Cities', value: displayCities.length, description: 'Study locations', icon: MapPin },
    { title: 'Categories', value: displayCategories.length, description: 'Content categories', icon: Tag },
    { title: 'Pending Enquiries', value: pendingEnquiries, description: 'Awaiting response', icon: MessageSquare },
  ]

  const recentActivity = [
    { action: 'Added new country', target: 'Australia', time: '2 hours ago', icon: Globe },
    { action: 'Updated exam', target: 'TOEFL', time: '5 hours ago', icon: FileCheck },
    { action: 'Published blog', target: 'Top 10 Universities', time: '1 day ago', icon: FileText },
    { action: 'Added new college', target: 'University of Melbourne', time: '2 days ago', icon: GraduationCap },
  ]

  const quickActions = [
    { title: 'Add Country', icon: Globe, href: '/admin/countries' },
    { title: 'Add College', icon: GraduationCap, href: '/admin/colleges' },
    { title: 'Add Exam', icon: FileCheck, href: '/admin/exams' },
    { title: 'Create Blog', icon: FileText, href: '/admin/blogs' },
  ]

  if (loading) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0066F5]" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        {stats.map((stat) => (
          <Card key={stat.title} className={cardClass}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
              <div className="rounded-xl bg-[#0066F5]/15 p-2">
                <stat.icon className="h-4 w-4 text-[#0066F5]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
              <p className="mt-1 text-xs text-slate-400">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
        <Card className={`xl:col-span-2 ${cardClass}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Activity className="h-5 w-5 text-[#0066F5]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 sm:h-80">
              <div className="space-y-3 pr-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.target}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                  >
                    <div className="shrink-0 rounded-lg bg-[#0066F5]/15 p-2">
                      <activity.icon className="h-4 w-4 text-[#0066F5]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-medium text-white">{activity.action}</span>
                        <span className="truncate text-sm text-slate-400">&quot;{activity.target}&quot;</span>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="group block rounded-xl border border-white/10 p-3 transition-all hover:border-[#0066F5] hover:bg-[#0066F5]/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#0066F5] p-2 text-white transition-transform group-hover:scale-105">
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 text-sm font-medium text-white">{action.title}</div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <Card className={cardClass}>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg text-white">Active Countries</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:bg-white/5 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="border-white/10 bg-[#0E1C33] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Active Countries List</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-80">
                  {displayCountries.map((c: any) => (
                    <div
                      key={c._id || c.id}
                      className="flex justify-between border-b border-white/10 p-2 text-white"
                    >
                      {c.name}
                      <Badge className="border-[#0066F5]/30 bg-[#0066F5]/15 text-[#66A3FF]">
                        {c.is_active !== false ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  ))}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {displayCountries.slice(0, 5).map((country: any) => (
                <div
                  key={country._id || country.id}
                  className="flex items-center justify-between text-sm text-white"
                >
                  <span>
                    {country.flag || ''} {country.name}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-white/15 text-[10px] text-slate-300"
                  >
                    {country.is_active !== false ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg text-white">Recent Blogs</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:bg-white/5 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-white/10 bg-[#0E1C33] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">All Blog Posts</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-80">
                  {displayBlogs.map((blog: any) => (
                    <div key={blog._id || blog.id} className="border-b border-white/10 p-3">
                      <h3 className="text-sm font-medium text-white">{blog.title}</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {blog.content?.substring(0, 100)}...
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge className="bg-[#0066F5]/15 text-[#66A3FF] text-xs">{blog.category}</Badge>
                        <span className="text-xs text-slate-500">
                          {new Date(blog.createdAt || blog.created_at).toLocaleDateString()}
                        </span>
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
                <div
                  key={blog._id || blog.id}
                  className="space-y-1 rounded-lg p-2 transition-colors hover:bg-white/5"
                >
                  <div className="line-clamp-1 text-sm font-medium text-white">{blog.title}</div>
                  <div className="text-xs text-slate-400">{blog.category}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg text-white">Top Colleges</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:bg-white/5 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-white/10 bg-[#0E1C33] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">All Active Colleges</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-80">
                  {displayColleges.map((college: any) => (
                    <div key={college._id || college.id} className="border-b border-white/10 p-3">
                      <h3 className="text-sm font-medium text-white">{college.name}</h3>
                      <p className="text-xs text-slate-400">
                        {college.country_ref?.name || college.country}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#66A3FF]">
                          ${college.fees?.toLocaleString()}/year
                        </span>
                        <Badge className="border-[#0066F5]/30 bg-[#0066F5]/15 text-[#66A3FF] text-xs">
                          {college.is_active !== false ? 'Active' : 'Inactive'}
                        </Badge>
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
                <div
                  key={college._id || college.id}
                  className="space-y-1 rounded-lg p-2 transition-colors hover:bg-white/5"
                >
                  <div className="truncate text-sm font-medium text-white">{college.name}</div>
                  <div className="text-xs text-[#66A3FF]">
                    ${college.fees?.toLocaleString?.() ?? college.fees}/year
                  </div>
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
