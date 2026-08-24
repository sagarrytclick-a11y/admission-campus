'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type AdminPaginationProps = {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  itemLabel?: string
  itemsPerPageOptions?: number[]
  onItemsPerPageChange?: (count: number) => void
  disabled?: boolean
  className?: string
  /** Show bar even when only one page (useful with page-size selector) */
  alwaysShow?: boolean
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const count = Math.min(5, totalPages)
  return Array.from({ length: count }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (currentPage <= 3) return i + 1
    if (currentPage >= totalPages - 2) return totalPages - 4 + i
    return currentPage - 2 + i
  })
}

export function AdminPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = 'items',
  itemsPerPageOptions = [5, 10, 20, 50],
  onItemsPerPageChange,
  disabled = false,
  className,
  alwaysShow = false,
}: AdminPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage) || 1)
  const safePage = Math.min(Math.max(1, currentPage), totalPages)
  const from = totalItems === 0 ? 0 : (safePage - 1) * itemsPerPage + 1
  const to = Math.min(safePage * itemsPerPage, totalItems)

  if (!alwaysShow && totalPages <= 1 && !onItemsPerPageChange) {
    return null
  }

  if (totalItems === 0 && !alwaysShow) {
    return null
  }

  const pageBtn =
    'h-8 border-white/15 bg-transparent text-slate-200 hover:bg-white/10 hover:text-white disabled:opacity-40'
  const pageBtnActive =
    'h-8 w-8 border-transparent bg-[#0066F5] p-0 text-white hover:bg-[#0047B3] hover:text-white'
  const pageBtnIdle =
    'h-8 w-8 border-white/15 bg-transparent p-0 text-slate-200 hover:bg-white/10 hover:text-white'

  return (
    <div
      className={cn(
        'mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <p className="text-sm text-slate-400">
        Showing{' '}
        <span className="font-medium text-white">{from}</span> to{' '}
        <span className="font-medium text-white">{to}</span> of{' '}
        <span className="font-medium text-white">{totalItems}</span> {itemLabel}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Per page</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value, 10))}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[72px] border-white/15 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#0E1C33] text-white">
                {itemsPerPageOptions.map((n) => (
                  <SelectItem
                    key={n}
                    value={String(n)}
                    className="!text-white focus:!bg-[#0066F5] focus:!text-white"
                  >
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, safePage - 1))}
            disabled={disabled || safePage <= 1}
            className={cn(pageBtn, 'gap-1 px-2.5')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers(safePage, totalPages).map((pageNum) => (
              <Button
                key={pageNum}
                type="button"
                variant={safePage === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                disabled={disabled}
                className={safePage === pageNum ? pageBtnActive : pageBtnIdle}
              >
                {pageNum}
              </Button>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
            disabled={disabled || safePage >= totalPages}
            className={cn(pageBtn, 'gap-1 px-2.5')}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
