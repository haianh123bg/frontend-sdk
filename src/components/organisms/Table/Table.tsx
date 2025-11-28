// File: src/components/organisms/Table/Table.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string | number
  render?: (row: T) => React.ReactNode
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: (row: T, index: number) => string
  size?: 'sm' | 'md' | 'lg'
  striped?: boolean
  emptyState?: React.ReactNode
  onRowClick?: (row: T) => void
  stickyHeader?: boolean
  pageSize?: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

type SortState<T> = {
  column: TableColumn<T>
  direction: 'asc' | 'desc'
} | null

export function Table<T extends Record<string, any>>({
  className,
  columns,
  data,
  rowKey,
  size = 'md',
  striped = true,
  emptyState = 'No data available',
  onRowClick,
  stickyHeader = false,
  pageSize,
  initialPage = 1,
  onPageChange,
  ...props
}: TableProps<T>) {
  const dispatch = useDispatchAction()
  const [sortState, setSortState] = React.useState<SortState<T>>(null)
  const [page, setPage] = React.useState(initialPage)

  const sortedData = React.useMemo(() => {
    if (!sortState) return data
    const { column, direction } = sortState
    return [...data].sort((a, b) => {
      const aValue = typeof column.key === 'string' ? a[column.key as keyof T] : undefined
      const bValue = typeof column.key === 'string' ? b[column.key as keyof T] : undefined
      if (aValue === bValue) return 0
      if (aValue == null) return direction === 'asc' ? -1 : 1
      if (bValue == null) return direction === 'asc' ? 1 : -1
      if (aValue > bValue) return direction === 'asc' ? 1 : -1
      return direction === 'asc' ? -1 : 1
    })
  }, [data, sortState])

  const totalPages = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
      onPageChange?.(totalPages)
    }
  }, [totalPages, page, onPageChange])

  const paginatedData = React.useMemo(() => {
    if (!pageSize) return sortedData
    const start = (page - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, page, pageSize])

  const changePage = (next: number) => {
    if (!pageSize) return
    const clamped = Math.min(Math.max(1, next), totalPages)
    setPage(clamped)
    onPageChange?.(clamped)
  }

  const toggleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return
    setSortState((prev) => {
      if (!prev || prev.column.key !== column.key) {
        dispatch(EventType.UI_CLICK, { column: column.key, direction: 'asc' }, { meta: { component: 'Table' } })
        return { column, direction: 'asc' }
      }
      const nextDirection = prev.direction === 'asc' ? 'desc' : null
      if (!nextDirection) {
        dispatch(EventType.UI_CLICK, { column: column.key, direction: 'none' }, { meta: { component: 'Table' } })
        return null
      }
      dispatch(EventType.UI_CLICK, { column: column.key, direction: nextDirection }, { meta: { component: 'Table' } })
      return { column, direction: nextDirection }
    })
  }

  const sizeClasses = {
    sm: 'text-xs py-2',
    md: 'text-sm py-3',
    lg: 'text-base py-4',
  }

  const handleRowClick = (row: T, index: number) => {
    if (!onRowClick) return
    dispatch(
      EventType.UI_CLICK,
      { rowKey: rowKey(row, index) },
      { meta: { component: 'Table' } }
    )
    onRowClick(row)
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-surface">
      <div className="w-full overflow-x-auto">
        <table className={twMerge(clsx('w-full border-collapse text-left', className))} {...props}>
          <thead className={twMerge(stickyHeader && 'sticky top-0 z-10 bg-surface')}>
            <tr>
              {columns.map((column) => {
                const isSorted = sortState?.column.key === column.key
                let indicator: string | null = null
                if (column.sortable) {
                  indicator = isSorted
                    ? sortState?.direction === 'asc'
                      ? '↑'
                      : '↓'
                    : '⇅'
                }
                return (
                  <th
                    key={column.key as string}
                    onClick={() => toggleSort(column)}
                    className={twMerge(
                      clsx(
                        'cursor-pointer select-none px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )
                    )}
                    style={{ width: column.width }}
                  >
                    <span className="inline-flex items-center gap-1">
                      {column.label}
                      {indicator && <span className="text-text-muted">{indicator}</span>}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-text-muted">
                  {emptyState}
                </td>
              </tr>
            )}
            {paginatedData.map((row, index) => (
              <tr
                key={rowKey(row, index)}
                onClick={() => handleRowClick(row, index)}
                className={twMerge(
                  clsx(
                    sizeClasses[size],
                    'px-4 text-text-primary transition-colors',
                    striped && index % 2 === 1 && 'bg-surface-alt',
                    onRowClick && 'cursor-pointer hover:bg-primary-50'
                  )
                )}
              >
                {columns.map((column) => {
                  let content: React.ReactNode = null
                  if (column.render) {
                    content = column.render(row)
                  } else if (typeof column.key === 'string') {
                    content = row[column.key as keyof T] as React.ReactNode
                  }
                  return (
                    <td
                      key={column.key as string}
                      className={twMerge(
                        clsx(
                          'px-4 align-middle text-sm text-text-secondary',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )
                      )}
                    >
                      {content}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageSize && sortedData.length > pageSize && (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-text-muted">
          <span>
            Page {page} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changePage(page - 1)}
              className="rounded-full px-3 py-1 text-text-secondary hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => changePage(page + 1)}
              className="rounded-full px-3 py-1 text-text-secondary hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Table.displayName = 'Table'
