'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

interface AdminLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader title={title} subtitle={subtitle} />
        <main className="p-4 sm:p-6 lg:p-8 text-slate-900">{children}</main>
      </div>
    </div>
  )
}
