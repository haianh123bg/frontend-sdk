// File: src/components/organisms/Table/Table.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { Pagination } from '../../molecules/Pagination/Pagination'
import { Select } from '../../atoms/Select/Select'
import { Scroll } from '../../atoms/Scroll/Scroll'

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
  rowStyle?: 'striped' | 'plain' | 'bordered'
  emptyState?: React.ReactNode
  onRowClick?: (row: T) => void
  stickyHeader?: boolean
  showSortIndicator?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  initialPage?: number
  onPageChange?: (page: number) => void
  /**
   * Optional controlled sorting state. If provided, Table will be controlled from the outside
   * and will call onSortingChange when header clicks change sorting.
   */
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  /**
   * Optional controlled column visibility. Useful when building external UI to toggle columns.
   * Table itself hiện tại không render UI toggle cột, mà chỉ áp dụng visibility state.
   */
  columnVisibility?: VisibilityState
  /**
   * Bật virtual scroll cho phần body khi hiển thị nhiều hàng trên 1 trang.
   * Virtual hóa áp dụng trên rowModel hiện tại (sau sort/pagination).
   */
  virtualized?: boolean
  /**
   * Chiều cao ước lượng mỗi hàng (px) dùng cho virtualizer. Mặc định ~44px.
   */
  virtualRowHeight?: number
  /**
   * Số hàng render thêm phía trên/dưới viewport để cuộn mượt hơn. Mặc định 10.
   */
  virtualOverscan?: number
  /**
   * Chiều cao tối đa của vùng body khi virtualized (px). Mặc định 420.
   */
  virtualBodyMaxHeight?: number
}

export function Table<T extends Record<string, any>>({
  className,
  columns,
  data,
  rowKey,
  size = 'md',
  striped = true,
  rowStyle,
  emptyState = 'No data available',
  onRowClick,
  stickyHeader = false,
  showSortIndicator = false,
  pageSize,
  pageSizeOptions,
  initialPage = 1,
  onPageChange,
  sorting: sortingProp,
  onSortingChange,
  columnVisibility: columnVisibilityProp,
  virtualized = false,
  virtualRowHeight = 44,
  virtualOverscan = 10,
  virtualBodyMaxHeight = 420,
  ...props
}: TableProps<T>) {
  const dispatch = useDispatchAction()
  const [sortingState, setSortingState] = React.useState<SortingState>([])

  const effectiveRowStyle: NonNullable<TableProps<T>['rowStyle']> = rowStyle ?? (striped ? 'striped' : 'plain')

  const resolvedPageSizeOptions = (pageSizeOptions && pageSizeOptions.length
    ? pageSizeOptions
    : [10, 20, 50, 100])

  const sorting = sortingProp ?? sortingState
  const [columnVisibilityState] = React.useState<VisibilityState>({})
  const columnVisibility = columnVisibilityProp ?? columnVisibilityState

  const initialPageIndex = Math.max(0, initialPage - 1)
  const initialPageSize = pageSize ?? resolvedPageSizeOptions[0]

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  })

  type TableColumnMeta = {
    align?: 'left' | 'center' | 'right'
    width?: string | number
  }

  const columnDefs = React.useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((column) => {
        const id = typeof column.key === 'string' ? (column.key as string) : String(column.key)

        return {
          id,
          accessorKey: typeof column.key === 'string' ? (column.key as string) : undefined,
          header: column.label,
          cell: (info) => {
            const originalRow = info.row.original as T
            if (column.render) {
              return column.render(originalRow)
            }
            const value = info.getValue() as React.ReactNode
            return value ?? null
          },
          enableSorting: column.sortable,
          meta: {
            align: column.align,
            width: column.width,
          } satisfies TableColumnMeta,
        } satisfies ColumnDef<T>
      }),
    [columns]
  )

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const nextSorting =
      typeof updater === 'function' ? (updater as (old: SortingState) => SortingState)(sorting) : updater

    if (!sortingProp) {
      setSortingState(nextSorting)
    }
    onSortingChange?.(nextSorting)

    const primary = nextSorting[0]
    const direction = primary ? (primary.desc ? 'desc' : 'asc') : 'none'

    if (primary) {
      dispatch(
        EventType.UI_CLICK,
        { column: primary.id, direction },
        { meta: { component: 'Table' } }
      )
    } else {
      dispatch(
        EventType.UI_CLICK,
        { column: 'all', direction },
        { meta: { component: 'Table' } }
      )
    }
  }

  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const rowModel = table.getRowModel()
  const totalPages = table.getPageCount() || 1
  const currentPage = pagination.pageIndex + 1

  React.useEffect(() => {
    onPageChange?.(currentPage)
  }, [currentPage, onPageChange])

  const changePage = (next: number) => {
    if (!Number.isFinite(next)) return
    const clamped = Math.min(Math.max(1, next), totalPages)
    table.setPageIndex(clamped - 1)
  }

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
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

  const pageSizeState = pagination.pageSize
  const showPagination = !!pageSizeState

  const handlePageSizeChange = (value: string) => {
    const next = Number(value)
    if (!Number.isFinite(next) || next <= 0) return
    table.setPageSize(next)
    table.setPageIndex(0)
  }

  // Virtualization setup (áp dụng trên rowModel sau sort/pagination)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const rowVirtualizer = useVirtualizer({
    count: virtualized ? rowModel.rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => virtualRowHeight,
    overscan: virtualOverscan,
  })

  const virtualRows = virtualized ? rowVirtualizer.getVirtualItems() : []
  const totalSize = virtualized ? rowVirtualizer.getTotalSize() : 0
  const paddingTop = virtualized && virtualRows.length > 0 ? virtualRows[0].start : 0
  const paddingBottom =
    virtualized && virtualRows.length > 0 ? totalSize - virtualRows[virtualRows.length - 1].end : 0

  // Khi virtualized, luôn cố định header trong vùng scroll
  const hasStickyHeader = stickyHeader || virtualized

  return (
    <div className="w-full rounded-2xl bg-surface overflow-hidden">
      <Scroll
        ref={scrollRef}
        direction="both"
        autoHide={virtualized}
        className="w-full"
        style={virtualized ? { maxHeight: virtualBodyMaxHeight } : undefined}
      >
        <table className={twMerge(clsx('w-full border-collapse text-left', className))} {...props}>
          <thead className={twMerge(hasStickyHeader && 'sticky top-0 z-10 bg-surface')}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) return null
                  const meta = header.column.columnDef.meta as TableColumnMeta | undefined
                  const align = meta?.align
                  const isSorted = header.column.getIsSorted()
                  let indicator: string | null = null
                  if (header.column.getCanSort() && showSortIndicator) {
                    indicator = !isSorted ? '⇅' : isSorted === 'asc' ? '↑' : '↓'
                  }
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      className={twMerge(
                        clsx(
                          'cursor-pointer select-none px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary',
                          align === 'center' && 'text-center',
                          align === 'right' && 'text-right'
                        )
                      )}
                      style={{ width: meta?.width }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {indicator && <span className="text-text-muted">{indicator}</span>}
                      </span>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rowModel.rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-text-muted">
                  {emptyState}
                </td>
              </tr>
            )}
            {rowModel.rows.length > 0 &&
              (virtualized ? (
                <>
                  {paddingTop > 0 && (
                    <tr aria-hidden style={{ height: paddingTop }}>
                      <td colSpan={columns.length} />
                    </tr>
                  )}
                  {virtualRows.map((virtualRow) => {
                    const row = rowModel.rows[virtualRow.index]
                    return (
                      <tr
                        key={rowKey(row.original as T, row.index)}
                        onClick={() => handleRowClick(row.original as T, row.index)}
                        className={twMerge(
                          clsx(
                            sizeClasses[size],
                            'px-4 text-text-primary transition-colors',
                            effectiveRowStyle === 'striped' && row.index % 2 === 1 && 'bg-surface-alt',
                            effectiveRowStyle === 'plain' && 'bg-surface',
                            effectiveRowStyle === 'bordered' && 'border-b border-slate-100',
                            onRowClick && 'cursor-pointer hover:bg-primary-50'
                          )
                        )}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const meta = cell.column.columnDef.meta as TableColumnMeta | undefined
                          const align = meta?.align
                          return (
                            <td
                              key={cell.id}
                              className={twMerge(
                                clsx(
                                  'px-4 py-3 align-middle text-sm text-text-secondary',
                                  align === 'center' && 'text-center',
                                  align === 'right' && 'text-right'
                                )
                              )}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  {paddingBottom > 0 && (
                    <tr aria-hidden style={{ height: paddingBottom }}>
                      <td colSpan={columns.length} />
                    </tr>
                  )}
                </>
              ) : (
                rowModel.rows.map((row) => (
                  <tr
                    key={rowKey(row.original as T, row.index)}
                    onClick={() => handleRowClick(row.original as T, row.index)}
                    className={twMerge(
                      clsx(
                        sizeClasses[size],
                        'px-4 text-text-primary transition-colors',
                        effectiveRowStyle === 'striped' && row.index % 2 === 1 && 'bg-surface-alt',
                        effectiveRowStyle === 'plain' && 'bg-surface',
                        effectiveRowStyle === 'bordered' && 'border-b border-slate-100',
                        onRowClick && 'cursor-pointer hover:bg-primary-50'
                      )
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as TableColumnMeta | undefined
                      const align = meta?.align
                      return (
                        <td
                          key={cell.id}
                          className={twMerge(
                            clsx(
                              'px-4 py-3 align-middle text-sm text-text-secondary',
                              align === 'center' && 'text-center',
                              align === 'right' && 'text-right'
                            )
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                ))
              ))}
          </tbody>
        </table>
      </Scroll>
      {showPagination && (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Số hàng trên trang</span>
              <Select
                className="h-8 w-[72px] text-xs"
                fullWidth={false}
                compact
                hideCaret
                options={resolvedPageSizeOptions.map((n) => ({
                  label: String(n),
                  value: String(n),
                }))}
                value={String(pageSizeState)}
                onValueChange={handlePageSizeChange}
              />
            </div>
            <span>
              Trang <span className="font-medium text-text-primary">{currentPage}</span>
            </span>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
            variant="icon"
          />
        </div>
      )}
    </div>
  )
}

Table.displayName = 'Table'
