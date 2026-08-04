'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Globe, 
  GraduationCap, 
  FileText,
  FileCheck,
  MessageSquare,
  Menu,
  ShieldCheck,
  Tags,
  MapPin,
  X
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Countries', href: '/admin/countries', icon: Globe },
  { name: 'Cities', href: '/admin/cities', icon: MapPin },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Colleges', href: '/admin/colleges', icon: GraduationCap },
  { name: 'Exams', href: '/admin/exams', icon: FileCheck },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  // { name: 'RBAC', href: '/admin/rbac', icon: ShieldCheck },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-800 shadow-md border border-gray-700"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-gray-700",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b flex items-center  gap-3 border-gray-700">
            {/* <p className="text-lg font-bold text-white">Admission Campus</p>
            <p className="text-sm text-center text-gray-400">Admin CMS</p> */}
            <Image src="/logo.jpg" className='bg-white rounded-full p-1' alt="Admission Campus" width={60} height={60} />
            <p className='text-white text-[14px] whitespace-nowrap font-bold'>Admission Campus</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600 text-white border-r-2 border-blue-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              © 2026 Admission Campus 
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
