'use client'

import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Eye } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Column<T> {
  key: string
  title: string
  render?: (value: any, record: T, index: number) => ReactNode
  width?: string
}

interface Action<T> {
  label: string
  icon?: ReactNode
  onClick: (record: T, index: number) => void
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  disabled?: boolean
}

interface AdminTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function AdminTable<T = Record<string, unknown>>({
  data,
  columns,
  actions,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
        <div className="text-base font-semibold text-slate-800 mb-1">{emptyMessage}</div>
        <div className="text-sm text-slate-500">No records found</div>
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50 hover:bg-slate-50">
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  {column.title}
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="w-28 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record, index) => (
              <TableRow
                key={index}
                className="border-slate-100 hover:bg-[#F8FAFC]"
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className="px-4 py-3 text-sm text-slate-800"
                  >
                    {(() => {
                      try {
                        const value = (record as any)[column.key]

                        if (column.render) {
                          const rendered = column.render(value, record, index)
                          return typeof rendered === 'object' &&
                            rendered !== null &&
                            !Array.isArray(rendered) &&
                            !(rendered as any).$$typeof
                            ? JSON.stringify(rendered)
                            : rendered
                        }

                        if (value === undefined || value === null) {
                          return <span className="text-slate-400">N/A</span>
                        }

                        if (value instanceof Date) {
                          return value.toLocaleDateString()
                        }

                        if (typeof value === 'object') {
                          const displayValue =
                            value.title || value.name || value.label
                          if (displayValue && typeof displayValue === 'string') {
                            return displayValue
                          }
                          return (
                            <span className="font-mono text-xs text-slate-500">
                              {JSON.stringify(value)}
                            </span>
                          )
                        }

                        return String(value)
                      } catch {
                        return <span className="text-red-500">Render Error</span>
                      }
                    })()}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || 'ghost'}
                          size="sm"
                          onClick={() => action.onClick(record, index)}
                          disabled={action.disabled}
                          className="h-8 w-8 text-slate-600 hover:bg-[#E8F1FF] hover:text-[#0066F5]"
                        >
                          {action.icon || action.label}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export const createEditAction = <T,>(
  onEdit: (record: T, index: number) => void
): Action<T> => ({
  label: 'Edit',
  icon: <Pencil className="h-4 w-4" />,
  onClick: onEdit,
  variant: 'ghost',
})

export const createDeleteAction = <T,>(
  onDelete: (record: T, index: number) => void
): Action<T> => ({
  label: 'Delete',
  icon: <Trash2 className="h-4 w-4" />,
  onClick: onDelete,
  variant: 'ghost',
})

export const createViewAction = <T,>(
  onView: (record: T, index: number) => void
): Action<T> => ({
  label: 'View',
  icon: <Eye className="h-4 w-4" />,
  onClick: onView,
  variant: 'ghost',
})
