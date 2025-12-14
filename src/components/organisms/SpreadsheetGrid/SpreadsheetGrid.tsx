import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnSizingState,
  type OnChangeFn,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Input } from '../../atoms/Input/Input'

export type SpreadsheetGridAlign = 'left' | 'center' | 'right'

export type SpreadsheetGridColumnMeta = {
  align?: SpreadsheetGridAlign
  width?: number
  editableKey?: string
}

export type SpreadsheetGridActiveCell = {
  rowIndex: number
  columnId: string
}

const parseClipboardGrid = (text: string) => {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const rows = normalized.split('\n')
  const trimmed = rows.length > 1 && rows[rows.length - 1] === '' ? rows.slice(0, -1) : rows
  return trimmed.map((line) => line.split('\t'))
}

export interface SpreadsheetGridProps<T extends Record<string, any>> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: ColumnDef<T, any>[]
  onDataChange?: (next: T[]) => void
  getRowId?: (row: T, index: number) => string

  height?: number
  virtualized?: boolean
  rowHeight?: number
  overscan?: number

  sortable?: boolean
  multiSort?: boolean
  showSortIndicator?: boolean
  resizableColumns?: boolean

  showRowNumbers?: boolean
  rowNumberWidth?: number

  editable?: boolean
  onActiveCellChange?: (cell: SpreadsheetGridActiveCell | null) => void
}

const indexToColumnLetter = (index: number) => {
  let n = index
  let s = ''
  while (n >= 0) {
    s = String.fromCharCode((n % 26) + 65) + s
    n = Math.floor(n / 26) - 1
  }
  return s
}

const setValueAtPath = (obj: any, path: string, value: any) => {
  const parts = String(path)
    .split('.')
    .map((p) => p.trim())
    .filter(Boolean)

  if (parts.length === 0) return obj

  const next = Array.isArray(obj) ? [...obj] : { ...obj }
  let cur: any = next

  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i]
    const prev = cur?.[key]

    let clone: any
    if (Array.isArray(prev)) clone = [...prev]
    else if (prev && typeof prev === 'object') clone = { ...prev }
    else clone = {}

    cur[key] = clone
    cur = clone
  }

  cur[parts[parts.length - 1]] = value
  return next
}

const coerceValue = (prevValue: unknown, text: string) => {
  if (typeof prevValue === 'number') {
    const n = Number(text)
    return Number.isFinite(n) ? n : text
  }
  if (typeof prevValue === 'boolean') {
    const t = text.trim().toLowerCase()
    if (t === 'true' || t === '1' || t === 'yes') return true
    if (t === 'false' || t === '0' || t === 'no') return false
    return Boolean(text)
  }
  return text
}

export function SpreadsheetGrid<T extends Record<string, any>>({
  className,
  data,
  columns,
  onDataChange,
  getRowId,
  height = 520,
  virtualized = true,
  rowHeight = 40,
  overscan = 12,
  sortable = true,
  multiSort = true,
  showSortIndicator = true,
  resizableColumns = true,
  showRowNumbers = true,
  rowNumberWidth = 56,
  editable = true,
  onActiveCellChange,
  ...props
}: SpreadsheetGridProps<T>) {
  const [sortingState, setSortingState] = React.useState<SortingState>([])
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({})
  const [columnVisibilityState, setColumnVisibilityState] = React.useState<VisibilityState>({})
  const [hoveredResizeColumnId, setHoveredResizeColumnId] = React.useState<string | null>(null)

  const [activeCellState, setActiveCellState] = React.useState<SpreadsheetGridActiveCell | null>(null)
  const [editingCell, setEditingCell] = React.useState<SpreadsheetGridActiveCell | null>(null)
  const [editingValue, setEditingValue] = React.useState<string>('')

  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const editorRef = React.useRef<HTMLInputElement | null>(null)

  const setActiveCell = React.useCallback(
    (next: SpreadsheetGridActiveCell | null) => {
      setActiveCellState(next)
      onActiveCellChange?.(next)
    },
    [onActiveCellChange]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      columnSizing,
      columnVisibility: columnVisibilityState,
    },
    onSortingChange: sortable ? (updater) => setSortingState((prev) => (typeof updater === 'function' ? updater(prev) : updater)) : undefined,
    onColumnSizingChange: resizableColumns ? setColumnSizing : undefined,
    onColumnVisibilityChange: setColumnVisibilityState as OnChangeFn<VisibilityState>,
    enableSorting: sortable,
    enableMultiSort: sortable && multiSort,
    isMultiSortEvent: sortable && multiSort ? (e) => (e as any)?.shiftKey : undefined,
    enableColumnResizing: resizableColumns,
    columnResizeMode: 'onChange',
    getRowId: getRowId ? (row, index) => getRowId(row as T, index) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
  })

  const rowModel = table.getRowModel()
  const visibleColumns = table.getVisibleLeafColumns()

  const rowVirtualizer = useVirtualizer({
    count: virtualized ? rowModel.rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan,
  })

  const virtualRows = virtualized ? rowVirtualizer.getVirtualItems() : []
  const totalSize = virtualized ? rowVirtualizer.getTotalSize() : 0
  const paddingTop = virtualized && virtualRows.length > 0 ? virtualRows[0].start : 0
  const paddingBottom =
    virtualized && virtualRows.length > 0 ? totalSize - virtualRows[virtualRows.length - 1].end : 0

  const resolveEditKey = React.useCallback((column: Column<T, any>) => {
    const accessorKey = (column.columnDef as any)?.accessorKey
    if (typeof accessorKey === 'string') return accessorKey

    const meta = column.columnDef.meta as SpreadsheetGridColumnMeta | undefined
    if (meta?.editableKey) return meta.editableKey

    if (typeof column.id === 'string' && column.id) return column.id

    return undefined
  }, [])

  const canEditCell = React.useCallback(
    (column: Column<T, any>) => {
      if (!editable) return false
      if (typeof onDataChange !== 'function') return false
      return typeof resolveEditKey(column) === 'string'
    },
    [editable, onDataChange, resolveEditKey]
  )

  const setCellValue = React.useCallback(
    (cell: SpreadsheetGridActiveCell, nextText: string) => {
      if (typeof onDataChange !== 'function') return
      const row = rowModel.rows[cell.rowIndex]
      if (!row) return

      const column = table.getColumn(cell.columnId)
      if (!column) return

      const editKey = resolveEditKey(column)
      if (!editKey) return

      const originalIndex = row.index
      const prevRow = data[originalIndex]
      const prevValue = (prevRow as any)?.[editKey]
      const nextValue = coerceValue(prevValue, nextText)

      const nextRow = setValueAtPath(prevRow, editKey, nextValue) as T
      const nextData = data.map((r, i) => (i === originalIndex ? nextRow : r))
      onDataChange(nextData)
    },
    [data, onDataChange, resolveEditKey, rowModel.rows, table]
  )

  const beginEdit = React.useCallback(
    (cell: SpreadsheetGridActiveCell) => {
      const row = rowModel.rows[cell.rowIndex]
      if (!row) return
      const column = table.getColumn(cell.columnId)
      if (!column) return
      if (!canEditCell(column)) return

      const editKey = resolveEditKey(column)
      if (!editKey) return

      const raw = (row.original as any)?.[editKey]
      setEditingValue(raw === undefined || raw === null ? '' : String(raw))
      setEditingCell(cell)
    },
    [canEditCell, resolveEditKey, rowModel.rows, table]
  )

  const commitEdit = React.useCallback(() => {
    if (!editingCell) return
    setCellValue(editingCell, editingValue)
    setEditingCell(null)
  }, [editingCell, editingValue, setCellValue])

  const cancelEdit = React.useCallback(() => {
    setEditingCell(null)
  }, [])

  React.useEffect(() => {
    if (!editingCell) return
    if (typeof window === 'undefined') return
    const id = window.setTimeout(() => {
      editorRef.current?.focus()
      editorRef.current?.select()
    }, 0)
    return () => window.clearTimeout(id)
  }, [editingCell])

  React.useEffect(() => {
    if (!activeCellState) return

    if (virtualized) {
      rowVirtualizer.scrollToIndex(activeCellState.rowIndex, { align: 'auto' })
    }

    if (typeof window === 'undefined') return

    const id = window.requestAnimationFrame(() => {
      const el = scrollRef.current?.querySelector(
        `[data-spreadsheet-cell="${activeCellState.rowIndex}:${activeCellState.columnId}"]`
      ) as HTMLElement | null

      el?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })

    return () => window.cancelAnimationFrame(id)
  }, [activeCellState, rowVirtualizer, virtualized])

  const moveActiveCell = React.useCallback(
    (deltaRow: number, deltaCol: number) => {
      const colIds = visibleColumns.map((c) => c.id)
      if (colIds.length === 0) return

      const current = activeCellState
      const rowCount = rowModel.rows.length
      if (rowCount === 0) return

      const startRow = current?.rowIndex ?? 0
      const startColId = current?.columnId ?? colIds[0]
      const startColIndex = Math.max(0, colIds.indexOf(startColId))

      const nextRow = Math.min(Math.max(0, startRow + deltaRow), rowCount - 1)
      const nextColIndex = Math.min(Math.max(0, startColIndex + deltaCol), colIds.length - 1)
      const next = { rowIndex: nextRow, columnId: colIds[nextColIndex] }
      setActiveCell(next)
    },
    [activeCellState, rowModel.rows.length, setActiveCell, visibleColumns]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editingCell) return

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveActiveCell(-1, 0)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      moveActiveCell(1, 0)
      return
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      moveActiveCell(0, -1)
      return
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      moveActiveCell(0, 1)
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      moveActiveCell(0, e.shiftKey ? -1 : 1)
      return
    }

    if (e.key === 'Enter' || e.key === 'F2') {
      e.preventDefault()
      if (activeCellState) beginEdit(activeCellState)
      return
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!activeCellState) return
      e.preventDefault()
      const column = table.getColumn(activeCellState.columnId)
      if (!column || !canEditCell(column)) return
      setCellValue(activeCellState, '')
      return
    }

    if (
      activeCellState &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault()
      beginEdit(activeCellState)
      setEditingValue(e.key)
      return
    }
  }

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!activeCellState) return
    const row = rowModel.rows[activeCellState.rowIndex]
    if (!row) return

    const value = row.getValue(activeCellState.columnId)
    const text = value === undefined || value === null ? '' : String(value)
    e.clipboardData.setData('text/plain', text)
    e.preventDefault()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!activeCellState) return
    const column = table.getColumn(activeCellState.columnId)
    if (!column || !canEditCell(column)) return

    const text = e.clipboardData.getData('text/plain')
    const grid = parseClipboardGrid(text)

    if (grid.length <= 1 && (grid[0]?.length ?? 0) <= 1) {
      setCellValue(activeCellState, grid[0]?.[0] ?? '')
      e.preventDefault()
      return
    }

    const colIds = visibleColumns.map((c) => c.id)
    const startColIndex = colIds.indexOf(activeCellState.columnId)
    const startRowIndex = activeCellState.rowIndex

    if (startColIndex < 0) return

    let nextData = data

    for (let r = 0; r < grid.length; r += 1) {
      const targetRowIndex = startRowIndex + r
      const rowModelRow = rowModel.rows[targetRowIndex]
      if (!rowModelRow) continue

      for (let c = 0; c < grid[r].length; c += 1) {
        const colIndex = startColIndex + c
        const colId = colIds[colIndex]
        if (!colId) continue

        const col = table.getColumn(colId)
        if (!col) continue
        if (!canEditCell(col)) continue

        const editKey = resolveEditKey(col)
        if (!editKey) continue

        const originalIndex = rowModelRow.index
        const prevRow = nextData[originalIndex]
        const prevValue = (prevRow as any)?.[editKey]
        const nextValue = coerceValue(prevValue, grid[r][c] ?? '')
        const nextRow = setValueAtPath(prevRow, editKey, nextValue) as T
        nextData = nextData.map((row, idx) => (idx === originalIndex ? nextRow : row))
      }
    }

    onDataChange?.(nextData)
    e.preventDefault()
  }

  const hasStickyHeader = true
  const tableWidth = table.getTotalSize() + (showRowNumbers ? rowNumberWidth : 0)

  return (
    <div
      ref={rootRef}
      className={twMerge(clsx('w-full rounded-2xl bg-surface', className))}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onCopy={handleCopy}
      onPaste={handlePaste}
      onMouseDown={() => rootRef.current?.focus()}
      {...props}
    >
      <Scroll
        ref={scrollRef}
        direction="both"
        autoHide
        className="w-full rounded-2xl"
        style={{ maxHeight: height }}
      >
        <table
          className="w-full table-fixed border-collapse text-left"
          style={{ width: tableWidth }}
        >
          <thead className={twMerge(clsx(hasStickyHeader && 'sticky top-0 z-20 bg-surface'))}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {showRowNumbers && (
                  <th
                    className="sticky left-0 z-30 border-b border-r border-slate-200 bg-surface px-2 py-2 text-xs font-semibold text-text-muted"
                    style={{ width: rowNumberWidth }}
                  />
                )}
                {headerGroup.headers.map((header, headerIndex) => {
                  if (header.isPlaceholder) return null

                  const meta = header.column.columnDef.meta as SpreadsheetGridColumnMeta | undefined
                  const align = meta?.align
                  const isSorted = header.column.getIsSorted()
                  const isResizeHovered = hoveredResizeColumnId === header.column.id
                  const letter = indexToColumnLetter(headerIndex)

                  const indicator =
                    header.column.getCanSort() && showSortIndicator
                      ? !isSorted
                        ? '⇅'
                        : isSorted === 'asc'
                          ? '↑'
                          : '↓'
                      : null

                  const isActiveColumn = activeCellState?.columnId === header.column.id

                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      className={twMerge(
                        clsx(
                          'relative select-none border-b border-r border-slate-200 px-3 py-2 text-xs text-text-secondary',
                          'bg-surface',
                          header.column.getCanSort() && 'cursor-pointer hover:bg-slate-50',
                          align === 'center' && 'text-center',
                          align === 'right' && 'text-right',
                          isActiveColumn && 'bg-primary-50'
                        )
                      )}
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-text-muted">{letter}</span>
                        <span className="inline-flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {indicator && <span className="text-text-muted">{indicator}</span>}
                        </span>
                      </div>

                      {resizableColumns && header.column.getCanResize() && (
                        <>
                          <div
                            className={twMerge(
                              clsx(
                                'absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none',
                                isResizeHovered && 'bg-primary-100/60'
                              )
                            )}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            onMouseEnter={() => setHoveredResizeColumnId(header.column.id)}
                            onMouseLeave={() =>
                              setHoveredResizeColumnId((prev) => (prev === header.column.id ? null : prev))
                            }
                            onClick={(ev) => ev.stopPropagation()}
                          />
                          {isResizeHovered && (
                            <div className="pointer-events-none absolute right-0 top-0 h-[200vh] w-px bg-primary-400" />
                          )}
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {rowModel.rows.length === 0 && (
              <tr>
                <td
                  className="px-4 py-8 text-center text-sm text-text-muted"
                  colSpan={visibleColumns.length + (showRowNumbers ? 1 : 0)}
                >
                  No data
                </td>
              </tr>
            )}

            {rowModel.rows.length > 0 &&
              (virtualized ? (
                <>
                  {paddingTop > 0 && (
                    <tr aria-hidden style={{ height: paddingTop }}>
                      <td colSpan={visibleColumns.length + (showRowNumbers ? 1 : 0)} />
                    </tr>
                  )}

                  {virtualRows.map((virtualRow) => {
                    const row = rowModel.rows[virtualRow.index]
                    if (!row) return null

                    return (
                      <tr key={row.id} style={{ height: rowHeight }}>
                        {showRowNumbers && (
                          <td
                            className="sticky left-0 z-10 border-b border-r border-slate-200 bg-surface px-2 text-xs text-text-muted"
                            style={{ width: rowNumberWidth }}
                          >
                            {virtualRow.index + 1}
                          </td>
                        )}

                        {row.getVisibleCells().map((cell) => {
                          const meta = cell.column.columnDef.meta as SpreadsheetGridColumnMeta | undefined
                          const align = meta?.align

                          const isActive =
                            activeCellState?.rowIndex === virtualRow.index &&
                            activeCellState?.columnId === cell.column.id

                          const isEditing =
                            editingCell?.rowIndex === virtualRow.index &&
                            editingCell?.columnId === cell.column.id

                          return (
                            <td
                              key={cell.id}
                              data-spreadsheet-cell={`${virtualRow.index}:${cell.column.id}`}
                              className={twMerge(
                                clsx(
                                  'relative border-b border-r border-slate-200 bg-surface px-3 text-sm text-text-primary',
                                  'hover:bg-slate-50',
                                  align === 'center' && 'text-center',
                                  align === 'right' && 'text-right',
                                  isActive && 'bg-primary-50',
                                  isActive && 'outline outline-2 outline-primary-500 outline-offset-[-2px]'
                                )
                              )}
                              onClick={() => setActiveCell({ rowIndex: virtualRow.index, columnId: cell.column.id })}
                              onDoubleClick={() => beginEdit({ rowIndex: virtualRow.index, columnId: cell.column.id })}
                            >
                              {isEditing ? (
                                <Input
                                  ref={editorRef}
                                  fullWidth
                                  className="h-8 rounded-md bg-white px-2 py-1"
                                  value={editingValue}
                                  onChange={(ev) => setEditingValue(ev.target.value)}
                                  onBlur={commitEdit}
                                  onKeyDown={(ev) => {
                                    if (ev.key === 'Enter') {
                                      ev.preventDefault()
                                      commitEdit()
                                    }
                                    if (ev.key === 'Escape') {
                                      ev.preventDefault()
                                      cancelEdit()
                                    }
                                  }}
                                />
                              ) : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}

                  {paddingBottom > 0 && (
                    <tr aria-hidden style={{ height: paddingBottom }}>
                      <td colSpan={visibleColumns.length + (showRowNumbers ? 1 : 0)} />
                    </tr>
                  )}
                </>
              ) : (
                rowModel.rows.map((row, rowIndex) => (
                  <tr key={row.id} style={{ height: rowHeight }}>
                    {showRowNumbers && (
                      <td
                        className="sticky left-0 z-10 border-b border-r border-slate-200 bg-surface px-2 text-xs text-text-muted"
                        style={{ width: rowNumberWidth }}
                      >
                        {rowIndex + 1}
                      </td>
                    )}

                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as SpreadsheetGridColumnMeta | undefined
                      const align = meta?.align

                      const isActive =
                        activeCellState?.rowIndex === rowIndex && activeCellState?.columnId === cell.column.id

                      const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === cell.column.id

                      return (
                        <td
                          key={cell.id}
                          data-spreadsheet-cell={`${rowIndex}:${cell.column.id}`}
                          className={twMerge(
                            clsx(
                              'relative border-b border-r border-slate-200 bg-surface px-3 text-sm text-text-primary',
                              'hover:bg-slate-50',
                              align === 'center' && 'text-center',
                              align === 'right' && 'text-right',
                              isActive && 'bg-primary-50',
                              isActive && 'outline outline-2 outline-primary-500 outline-offset-[-2px]'
                            )
                          )}
                          onClick={() => setActiveCell({ rowIndex, columnId: cell.column.id })}
                          onDoubleClick={() => beginEdit({ rowIndex, columnId: cell.column.id })}
                        >
                          {isEditing ? (
                            <Input
                              ref={editorRef}
                              fullWidth
                              className="h-8 rounded-md bg-white px-2 py-1"
                              value={editingValue}
                              onChange={(ev) => setEditingValue(ev.target.value)}
                              onBlur={commitEdit}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                  ev.preventDefault()
                                  commitEdit()
                                }
                                if (ev.key === 'Escape') {
                                  ev.preventDefault()
                                  cancelEdit()
                                }
                              }}
                            />
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))
              ))}
          </tbody>
        </table>
      </Scroll>
    </div>
  )
}
