'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface AdminHeaderProps {
  title: string
  subtitle?: string
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        toast.success('Logged out successfully')
        router.push('/login')
        router.refresh()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to logout')
      }
    } catch {
      toast.error('Something went wrong during logout')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4 py-3">
          <div className="min-w-0 flex-1 pl-12 lg:pl-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-0.5 truncate text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 gap-2 rounded-xl px-2 text-slate-700 hover:bg-slate-100"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Admin" />
                  <AvatarFallback className="bg-[#E8F1FF] text-[#0066F5] text-xs font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-semibold sm:inline">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-slate-200 bg-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-slate-900">Super Admin</p>
                  <p className="text-xs text-slate-500">Admission Campus</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-slate-700 focus:bg-slate-100"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? 'Logging out...' : 'Log out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
