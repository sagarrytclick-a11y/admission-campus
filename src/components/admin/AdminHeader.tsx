'use client'

import { Bell, Search, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast.success('Logged out successfully')
        router.push('/login')
        router.refresh()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Something went wrong during logout')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-gray-800 py-3 shadow-sm border-b border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Page Title */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
            </div> */}

            {/* Notifications */}
            {/* <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button> */}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full text-gray-300 hover:text-white hover:bg-gray-700">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Admin" />
                    <AvatarFallback className="bg-gray-600 text-white">AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
                <DropdownMenuLabel className="font-normal text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">Super Admin</p>
                    {/* <p className="text-xs leading-none text-gray-400">
                      admin@admissioncampus.com
                    </p> */}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
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
      </div>
    </header>
  )
}
