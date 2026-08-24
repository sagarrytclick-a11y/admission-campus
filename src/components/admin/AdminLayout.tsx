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
    <div className="admin-panel min-h-screen bg-[#07111F] text-white scheme-dark [&_[data-slot=badge]]:!border-white/20 [&_[data-slot=badge]]:!bg-[#0066F5]/20 [&_[data-slot=badge]]:!text-white [&_input]:text-white [&_input]:placeholder:text-slate-500 [&_textarea]:text-white [&_textarea]:placeholder:text-slate-500 [&_label]:text-slate-200 [&_[data-slot=tabs-trigger]]:text-slate-300">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title={title} subtitle={subtitle} />
        <main className="p-4 sm:p-6 lg:p-8 text-white">{children}</main>
      </div>
    </div>
  )
}
