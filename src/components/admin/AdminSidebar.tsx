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
  Tags,
  MapPin,
  X,
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
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl border border-white/10 bg-[#0B1B33] p-2.5 text-[#0066F5] shadow-md"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/5 bg-[#0A1628] shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <Image
              src="/logo.jpg"
              className="rounded-xl bg-white p-1 object-contain"
              alt="Admission Campus"
              width={44}
              height={44}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">Admission Campus</p>
              <p className="text-[11px] font-medium text-[#0066F5]">Admin Panel</p>
            </div>
          </div>

          <nav className="admin-scroll flex-1 space-y-1 overflow-y-auto p-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#0066F5] text-white shadow-lg shadow-[#0066F5]/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-4 w-4 shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <p className="text-center text-[11px] text-slate-500">
              © {new Date().getFullYear()} Admission Campus
            </p>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
