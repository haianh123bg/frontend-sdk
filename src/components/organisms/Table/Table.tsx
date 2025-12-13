// File: src/components/organisms/Table/Table.tsx
import * as React from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Plus, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnSizingState,
  type OnChangeFn,
  type PaginationState,
  type Row as TanstackRow,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { generateId } from '../../../utils/id'
import { Pagination } from '../../molecules/Pagination/Pagination'
import { Select, type SelectOption } from '../../atoms/Select/Select'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Switch } from '../../atoms/Switch/Switch'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string | number
  render?: (row: T) => React.ReactNode
  valueType?: string
  options?: { label: string; value: string }[]
}

export type TableValueTypeOption = SelectOption & { defaultValue?: unknown }

export interface TableEditableConfig<T> {
  enabled: boolean
  valueTypeOptions: TableValueTypeOption[]
  onColumnsChange: (columns: TableColumn<T>[]) => void
  onDataChange: (data: T[]) => void
  getDefaultValueForType?: (valueType: string) => unknown
  addColumnLabel?: string
  addRowLabel?: string
  columnNamePlaceholder?: string
  valueTypePlaceholder?: string
}

export interface TableRowActionsConfig {
  enabled: boolean
  allowReorder?: boolean
  allowInsertBelow?: boolean
  allowSelect?: boolean
  selectedRowKeys?: string[]
  defaultSelectedRowKeys?: string[]
  onSelectedRowKeysChange?: (keys: string[]) => void
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
  multiSort?: boolean
  editable?: TableEditableConfig<T>
  resizableColumns?: boolean
  rowActions?: TableRowActionsConfig
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
  pageSizeLabel?: string
  pageLabel?: string
  instanceId?: string
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
  multiSort = false,
  editable,
  resizableColumns = false,
  rowActions,
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
  pageSizeLabel = 'Số hàng trên trang',
  pageLabel = 'Trang',
  instanceId,
  ...props
}: TableProps<T>) {
  const dispatch = useDispatchAction()
  const autoInstanceIdRef = React.useRef<string | null>(null)
  if (!autoInstanceIdRef.current) {
    autoInstanceIdRef.current = generateId()
  }
  const effectiveInstanceId = instanceId ?? autoInstanceIdRef.current
  const [sortingState, setSortingState] = React.useState<SortingState>([])

  const isEditable = !!editable?.enabled
  const hasRowActions = !!rowActions?.enabled
  const allowInsertBelow = rowActions?.allowInsertBelow ?? true
  const allowReorder = rowActions?.allowReorder ?? true
  const allowSelect = rowActions?.allowSelect ?? true
  const [showAddColumn, setShowAddColumn] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState('')
  const [newColumnType, setNewColumnType] = React.useState<string>('')

  type EditingCell = { rowKey: string; columnId: string }
  type EditingDraft =
    | string
    | boolean
    | string[]
    | { min?: string; max?: string }
    | { start?: string; end?: string }

  const [editingCell, setEditingCell] = React.useState<EditingCell | null>(null)
  const [editingDraft, setEditingDraft] = React.useState<EditingDraft>('')
  const editingInputRef = React.useRef<HTMLInputElement | null>(null)
  const editingAnchorRef = React.useRef<HTMLElement | null>(null)
  const [editingRect, setEditingRect] = React.useState<DOMRect | null>(null)

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

  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({})
  const [hoveredResizeColumnId, setHoveredResizeColumnId] = React.useState<string | null>(null)

  type TableColumnMeta = {
    align?: 'left' | 'center' | 'right'
    width?: string | number
  }

  const getColumnId = React.useCallback((column: TableColumn<T>) => {
    return typeof column.key === 'string' ? (column.key as string) : String(column.key)
  }, [])

  const normalizeColumnKey = React.useCallback((raw: string) => {
    const cleaned = raw
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase()
    return cleaned
  }, [])

  const resolveDefaultValueForType = React.useCallback(
    (valueType: string) => {
      const normalized = (valueType ?? '').toLowerCase()
      const fromFn = editable?.getDefaultValueForType?.(valueType)
      if (fromFn !== undefined) return fromFn
      const fromOption = editable?.valueTypeOptions?.find((o) => o.value === valueType)?.defaultValue
      if (fromOption !== undefined) return fromOption
      if (normalized === 'number') return 0
      if (normalized === 'boolean') return false
      if (normalized.includes('multi')) return []
      if (normalized === 'number_range' || normalized === 'range_number') return { min: undefined, max: undefined }
      if (normalized === 'date_range' || normalized === 'datetime_range') return { start: undefined, end: undefined }
      return ''
    },
    [editable]
  )

  const rowActionsWidth = hasRowActions ? (allowSelect ? 92 : 68) : 0

  const [selectedRowKeysState, setSelectedRowKeysState] = React.useState<string[]>(
    rowActions?.defaultSelectedRowKeys ?? []
  )
  const selectedRowKeys = rowActions?.selectedRowKeys ?? selectedRowKeysState

  const setSelectedRowKeys = (next: string[]) => {
    if (rowActions?.selectedRowKeys === undefined) {
      setSelectedRowKeysState(next)
    }
    rowActions?.onSelectedRowKeysChange?.(next)
  }

  const toggleRowSelected = (key: string) => {
    const exists = selectedRowKeys.includes(key)
    const next = exists ? selectedRowKeys.filter((k) => k !== key) : [...selectedRowKeys, key]
    setSelectedRowKeys(next)
  }

  const rowActionsColCount = hasRowActions ? 1 : 0

  const canInsertRowBelow =
    hasRowActions &&
    allowInsertBelow &&
    !!editable?.enabled &&
    !!editable.onDataChange

  const canReorderRows =
    hasRowActions &&
    allowReorder &&
    !!editable?.enabled &&
    !!editable.onDataChange &&
    !virtualized &&
    sorting.length === 0

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleRowDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (!canReorderRows) return
      const { active, over } = event
      if (!over || active.id === over.id) return

      const activeId = String(active.id)
      const overId = String(over.id)

      const oldIndex = data.findIndex((row, index) => rowKey(row, index) === activeId)
      const newIndex = data.findIndex((row, index) => rowKey(row, index) === overId)
      if (oldIndex < 0 || newIndex < 0) return
      if (oldIndex === newIndex) return

      editable?.onDataChange(arrayMove(data, oldIndex, newIndex))
    },
    [canReorderRows, data, editable, rowKey]
  )


  const RowActionsCell = ({
    rowKeyValue,
    canInsert,
    showDrag,
    showSelect,
    selected,
    dragEnabled,
    onInsertBelow,
    onToggleSelect,
    setActivatorNodeRef,
    listeners,
  }: {
    rowKeyValue: string
    canInsert: boolean
    showDrag: boolean
    showSelect: boolean
    selected: boolean
    dragEnabled: boolean
    onInsertBelow: () => void
    onToggleSelect: () => void
    setActivatorNodeRef?: (node: HTMLElement | null) => void
    listeners?: Record<string, unknown>
  }) => {
    void rowKeyValue

    return (
      <div className="flex items-center gap-1">
        {canInsert && (
          <button
            type="button"
            className={twMerge(
              clsx(
                'inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-100',
                'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
              )
            )}
            onClick={(e) => {
              e.stopPropagation()
              onInsertBelow()
            }}
          >
            <Plus className="h-4 w-4 text-text-muted" />
          </button>
        )}

        {showDrag && (
          <button
            type="button"
            ref={setActivatorNodeRef as any}
            {...(listeners as any)}
            className={twMerge(
              clsx(
                'inline-flex h-6 w-6 items-center justify-center rounded-md',
                dragEnabled ? 'cursor-grab hover:bg-slate-100' : 'cursor-not-allowed opacity-40',
                'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
              )
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}

        {showSelect && (
          <div
            className={twMerge(
              clsx(
                'inline-flex h-6 w-6 items-center justify-center',
                selected ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
              )
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={selected}
              onChange={(e) => {
                e.stopPropagation()
                onToggleSelect()
              }}
            />
          </div>
        )}
      </div>
    )
  }

  const SortableRow = ({ row, rowKeyValue, children, className }: {
    row: TanstackRow<T>
    rowKeyValue: string
    children: React.ReactNode
    className?: string
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: rowKeyValue })

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.9 : undefined,
    }

    return (
      <tr
        ref={setNodeRef}
        style={style}
        className={className}
        onClick={() => handleRowClick(row.original as T, row.index)}
        {...attributes}
      >
        {hasRowActions && (
          <td className="px-2 py-3 align-middle" style={{ width: rowActionsWidth }} onClick={(e) => e.stopPropagation()}>
            <RowActionsCell
              rowKeyValue={rowKeyValue}
              canInsert={canInsertRowBelow}
              showDrag={allowReorder}
              showSelect={allowSelect}
              selected={selectedRowKeys.includes(rowKeyValue)}
              dragEnabled={canReorderRows}
              onInsertBelow={() => handleInsertRowBelow(rowKeyValue)}
              onToggleSelect={() => toggleRowSelected(rowKeyValue)}
              setActivatorNodeRef={setActivatorNodeRef}
              listeners={listeners as any}
            />
          </td>
        )}
        {children}
      </tr>
    )
  }

  const handleInsertRowBelow = (targetRowKey: string) => {
    if (!canInsertRowBelow) return

    const targetIndex = data.findIndex((row, index) => rowKey(row, index) === targetRowKey)
    if (targetIndex < 0) return

    const nextRow: Record<string, unknown> = {}
    columns.forEach((c) => {
      const id = getColumnId(c)
      const type = c.valueType ?? ''
      nextRow[id] = resolveDefaultValueForType(type)
    })

    const nextData = [...data.slice(0, targetIndex + 1), nextRow as T, ...data.slice(targetIndex + 1)]
    editable?.onDataChange(nextData)
  }

  const columnsById = React.useMemo(() => {
    return new Map(columns.map((c) => [getColumnId(c), c]))
  }, [columns, getColumnId])

  const getNormalizedType = React.useCallback((valueType?: string) => (valueType ?? '').toLowerCase(), [])

  const formatCellValue = React.useCallback(
    (column: TableColumn<T> | undefined, value: unknown) => {
      const type = getNormalizedType(column?.valueType)
      const options = column?.options
      const hasOptions = !!options?.length

      if (hasOptions) {
        if (Array.isArray(value)) {
          const values = value.filter((v): v is string => typeof v === 'string')
          const labels = values.map((v) => options?.find((o) => o.value === v)?.label ?? v)
          return labels.join(', ')
        }
        if (typeof value === 'string') {
          return options?.find((o) => o.value === value)?.label ?? value
        }
      }

      if (type === 'boolean') {
        return value ? 'Có' : 'Không'
      }

      if ((type === 'number_range' || type === 'range_number') && value && typeof value === 'object') {
        const v = value as { min?: number; max?: number }
        const min = typeof v.min === 'number' ? v.min : undefined
        const max = typeof v.max === 'number' ? v.max : undefined
        if (min === undefined && max === undefined) return ''
        if (min !== undefined && max !== undefined) return `${min} - ${max}`
        if (min !== undefined) return `>= ${min}`
        return `<= ${max}`
      }

      if ((type === 'date_range' || type === 'datetime_range') && value && typeof value === 'object') {
        const v = value as { start?: string; end?: string }
        const start = typeof v.start === 'string' ? v.start : ''
        const end = typeof v.end === 'string' ? v.end : ''
        if (!start && !end) return ''
        if (start && end) return `${start} - ${end}`
        if (start) return `>= ${start}`
        return `<= ${end}`
      }

      if (value === undefined || value === null) return ''
      return String(value)
    },
    [getNormalizedType]
  )

  React.useEffect(() => {
    if (!editingCell) return
    // focus editor after render
    if (typeof window === 'undefined') return
    const id = window.setTimeout(() => {
      editingInputRef.current?.focus()
      editingInputRef.current?.select?.()
    }, 0)
    return () => window.clearTimeout(id)
  }, [editingCell])

  React.useEffect(() => {
    if (!editingCell) return
    if (typeof window === 'undefined') return

    const update = () => {
      if (!editingAnchorRef.current) return
      setEditingRect(editingAnchorRef.current.getBoundingClientRect())
    }

    update()

    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [editingCell])

  const columnDefs = React.useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((column) => {
        const id = getColumnId(column)

        return {
          id,
          accessorKey: typeof column.key === 'string' ? (column.key as string) : undefined,
          header: column.label,
          cell: (info) => {
            const originalRow = info.row.original as T
            if (column.render) {
              return column.render(originalRow)
            }
            const raw = (originalRow as any)?.[id]
            return formatCellValue(column, raw)
          },
          enableSorting: column.sortable,
          meta: {
            align: column.align,
            width: column.width,
          } satisfies TableColumnMeta,
        } satisfies ColumnDef<T>
      }),
    [columns, formatCellValue, getColumnId]
  )

  const handleAddColumn = () => {
    if (!editable?.enabled) return
    if (!editable.onColumnsChange) return
    if (!editable.onDataChange) return

    const label = newColumnName.trim()
    if (!label) return

    const type = newColumnType || editable.valueTypeOptions[0]?.value
    if (!type) return

    const baseKey = normalizeColumnKey(label) || `field_${columns.length + 1}`
    const existing = new Set(columns.map((c) => getColumnId(c)))
    let nextKey = baseKey
    let i = 1
    while (existing.has(nextKey)) {
      nextKey = `${baseKey}_${i}`
      i += 1
    }

    const nextColumns: TableColumn<T>[] = [
      ...columns,
      {
        key: nextKey,
        label,
        sortable: false,
        valueType: type,
      } as TableColumn<T>,
    ]

    const defaultValue = resolveDefaultValueForType(type)
    const nextData = data.map((row) => ({
      ...row,
      [nextKey]: defaultValue,
    }))

    editable.onColumnsChange(nextColumns)
    editable.onDataChange(nextData)

    setNewColumnName('')
    setNewColumnType('')
    setShowAddColumn(false)
  }

  const handleAddRow = () => {
    if (!editable?.enabled) return
    if (!editable.onDataChange) return

    const nextRow: Record<string, unknown> = {}
    columns.forEach((c) => {
      const id = getColumnId(c)
      const type = c.valueType ?? ''
      nextRow[id] = resolveDefaultValueForType(type)
    })
    editable.onDataChange([...data, nextRow as T])
  }

  const commitEditCell = React.useCallback(
    (cell: EditingCell, draft: EditingDraft) => {
      if (!editable?.enabled) return
      if (!editable.onDataChange) return

      const column = columnsById.get(cell.columnId)
      const valueType = getNormalizedType(column?.valueType)
      const options = column?.options
      const hasOptions = !!options?.length
      const isMultiOptions = hasOptions && valueType.includes('multi')

      let nextValue: unknown = draft

      if (valueType === 'boolean') {
        nextValue = typeof draft === 'boolean' ? draft : Boolean(draft)
      } else if (valueType === 'number') {
        const text = typeof draft === 'string' ? draft : String(draft ?? '')
        if (text.trim() === '') {
          nextValue = ''
        } else {
          const n = Number(text)
          nextValue = Number.isFinite(n) ? n : text
        }
      } else if (valueType === 'number_range' || valueType === 'range_number') {
        const v = (draft && typeof draft === 'object' ? (draft as { min?: string; max?: string }) : {})
        const minText = typeof v.min === 'string' ? v.min : ''
        const maxText = typeof v.max === 'string' ? v.max : ''
        const min = minText.trim() ? Number(minText) : undefined
        const max = maxText.trim() ? Number(maxText) : undefined
        nextValue = {
          min: Number.isFinite(min as number) ? (min as number) : undefined,
          max: Number.isFinite(max as number) ? (max as number) : undefined,
        }
      } else if (valueType === 'date_range' || valueType === 'datetime_range') {
        const v = (draft && typeof draft === 'object' ? (draft as { start?: string; end?: string }) : {})
        nextValue = {
          start: typeof v.start === 'string' && v.start ? v.start : undefined,
          end: typeof v.end === 'string' && v.end ? v.end : undefined,
        }
      } else if (isMultiOptions) {
        if (Array.isArray(draft)) {
          nextValue = draft
        } else if (typeof draft === 'string' && draft) {
          nextValue = [draft]
        } else {
          nextValue = []
        }
      } else if (hasOptions) {
        nextValue = typeof draft === 'string' ? draft : String(draft ?? '')
      } else if (valueType === 'date' || valueType === 'datetime') {
        nextValue = typeof draft === 'string' ? draft : String(draft ?? '')
      } else {
        nextValue = typeof draft === 'string' ? draft : String(draft ?? '')
      }

      const nextData = data.map((row, index) => {
        const key = rowKey(row, index)
        if (key !== cell.rowKey) return row
        return {
          ...row,
          [cell.columnId]: nextValue,
        }
      })

      editable.onDataChange(nextData)
    },
    [columnsById, data, editable, getNormalizedType, rowKey]
  )

  const closeEditor = React.useCallback(() => {
    setEditingCell(null)
    setEditingRect(null)
    editingAnchorRef.current = null
  }, [])

  const overlayRef = React.useRef<HTMLDivElement | null>(null)

  const beginEditCell = React.useCallback(
    (params: { rowKeyValue: string; columnId: string; rawValue: unknown; anchorEl: HTMLElement }) => {
      if (!editable?.enabled) return
      if (!editable.onDataChange) return

      const col = columnsById.get(params.columnId)
      const inferredType = getNormalizedType(col?.valueType)
      const options = col?.options
      const hasOptions = !!options?.length
      const type = hasOptions && !inferredType ? 'option' : inferredType
      const isMultiOptions = hasOptions && type.includes('multi')

      if (editingCell && (editingCell.rowKey !== params.rowKeyValue || editingCell.columnId !== params.columnId)) {
        commitEditCell(editingCell, editingDraft)
      }

      editingAnchorRef.current = params.anchorEl
      setEditingRect(params.anchorEl.getBoundingClientRect())
      setEditingCell({ rowKey: params.rowKeyValue, columnId: params.columnId })

      if (type === 'boolean') {
        setEditingDraft(Boolean(params.rawValue))
        return
      }

      if (type === 'number') {
        setEditingDraft(params.rawValue === null || params.rawValue === undefined ? '' : String(params.rawValue))
        return
      }

      if (type === 'number_range' || type === 'range_number') {
        const v = (params.rawValue ?? {}) as { min?: number; max?: number }
        setEditingDraft({
          min: typeof v.min === 'number' ? String(v.min) : '',
          max: typeof v.max === 'number' ? String(v.max) : '',
        })
        return
      }

      if (type === 'date_range' || type === 'datetime_range') {
        const v = (params.rawValue ?? {}) as { start?: string; end?: string }
        setEditingDraft({
          start: typeof v.start === 'string' ? v.start : '',
          end: typeof v.end === 'string' ? v.end : '',
        })
        return
      }

      if (isMultiOptions) {
        const selected =
          Array.isArray(params.rawValue) && params.rawValue.every((x) => typeof x === 'string')
            ? (params.rawValue as string[])
            : []
        setEditingDraft(selected)
        return
      }

      if (hasOptions) {
        setEditingDraft(typeof params.rawValue === 'string' ? params.rawValue : '')
        return
      }

      setEditingDraft(params.rawValue === null || params.rawValue === undefined ? '' : String(params.rawValue))
    },
    [columnsById, commitEditCell, editable, editingCell, editingDraft, getNormalizedType]
  )

  const commitAndCloseEditing = React.useCallback(() => {
    if (!editingCell) return
    commitEditCell(editingCell, editingDraft)
    closeEditor()
  }, [closeEditor, commitEditCell, editingCell, editingDraft])

  const cancelEditing = React.useCallback(() => {
    closeEditor()
  }, [closeEditor])

  React.useEffect(() => {
    if (!editingCell) return
    if (typeof document === 'undefined') return

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (overlayRef.current && overlayRef.current.contains(target)) return
      if (editingAnchorRef.current && editingAnchorRef.current.contains(target)) return
      commitAndCloseEditing()
    }

    document.addEventListener('mousedown', handleMouseDown, true)
    return () => document.removeEventListener('mousedown', handleMouseDown, true)
  }, [commitAndCloseEditing, editingCell])

  const overlayNode = React.useMemo(() => {
    if (!editingCell || !editingRect) return null
    if (typeof document === 'undefined') return null

    const column = columnsById.get(editingCell.columnId)
    const options = column?.options
    const hasOptions = !!options?.length
    const inferredType = getNormalizedType(column?.valueType)
    const type = hasOptions && !inferredType ? 'option' : inferredType
    const isMultiOptions = hasOptions && type.includes('multi')

    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1024

    const minW =
      type === 'datetime' || type === 'date'
        ? 320
        : type === 'date_range' || type === 'datetime_range'
          ? 520
          : 240
    const maxW = type === 'date_range' || type === 'datetime_range' ? 720 : 520
    const panelWidth = Math.min(Math.max(editingRect.width, minW), Math.min(maxW, viewportW - 16))

    const left = Math.min(Math.max(0, editingRect.left), Math.max(0, viewportW - panelWidth))
    const preferredTop = editingRect.top
    const top = Math.max(0, preferredTop)

    const commit = () => commitAndCloseEditing()

    const renderOptionsSingle = () => {
      const selected = typeof editingDraft === 'string' ? editingDraft : ''
      return (
        <div className="max-h-64 overflow-auto">
          {(options ?? []).map((o) => {
            const isSelected = o.value === selected
            return (
              <button
                key={o.value}
                type="button"
                className={twMerge(
                  clsx(
                    'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-text-secondary',
                    'hover:bg-slate-50',
                    isSelected && 'bg-primary-50 font-medium'
                  )
                )}
                onClick={() => {
                  setEditingDraft(o.value)
                  commitEditCell(editingCell, o.value)
                  closeEditor()
                }}
              >
                <span className="truncate">{o.label}</span>
                <span className={clsx('text-[11px]', isSelected ? 'opacity-100' : 'opacity-0')}>✓</span>
              </button>
            )
          })}
        </div>
      )
    }

    const renderOptionsMulti = () => {
      const selected = Array.isArray(editingDraft) ? editingDraft : []
      return (
        <div className="max-h-64 overflow-auto">
          {(options ?? []).map((o) => {
            const isSelected = selected.includes(o.value)
            return (
              <button
                key={o.value}
                type="button"
                className={twMerge(
                  clsx(
                    'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-text-secondary',
                    'hover:bg-slate-50',
                    isSelected && 'bg-primary-50 font-medium'
                  )
                )}
                onClick={() => {
                  const next = isSelected ? selected.filter((v) => v !== o.value) : [...selected, o.value]
                  setEditingDraft(next)
                }}
              >
                <span className="truncate">{o.label}</span>
                <span className={clsx('text-[11px]', isSelected ? 'opacity-100' : 'opacity-0')}>✓</span>
              </button>
            )
          })}
          <div className="mt-2 flex items-center justify-end gap-2">
            <Button size="sm" onClick={commit}>Lưu</Button>
            <Button variant="secondary" size="sm" onClick={cancelEditing}>Huỷ</Button>
          </div>
        </div>
      )
    }

    const renderRangeNumber = () => {
      const v = (editingDraft && typeof editingDraft === 'object' ? (editingDraft as { min?: string; max?: string }) : {})
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              ref={editingInputRef}
              type="number"
              placeholder="Từ"
              value={typeof v.min === 'string' ? v.min : ''}
              onChange={(e) => setEditingDraft({ ...v, min: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                if (e.key === 'Escape') cancelEditing()
              }}
            />
            <Input
              type="number"
              placeholder="Đến"
              value={typeof v.max === 'string' ? v.max : ''}
              onChange={(e) => setEditingDraft({ ...v, max: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                if (e.key === 'Escape') cancelEditing()
              }}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" onClick={commit}>Lưu</Button>
            <Button variant="secondary" size="sm" onClick={cancelEditing}>Huỷ</Button>
          </div>
        </div>
      )
    }

    const renderRangeDateLike = (mode: 'date' | 'datetime') => {
      const v = (editingDraft && typeof editingDraft === 'object' ? (editingDraft as { start?: string; end?: string }) : {})
      const start = typeof v.start === 'string' ? v.start : ''
      const end = typeof v.end === 'string' ? v.end : ''

      const Picker = mode === 'date' ? DatePicker : DatetimePicker

      return (
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Picker
              inline
              value={start}
              onValueChange={(val) => setEditingDraft({ ...v, start: val || '' })}
            />
            <Picker
              inline
              value={end}
              onValueChange={(val) => setEditingDraft({ ...v, end: val || '' })}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" onClick={commit}>Lưu</Button>
            <Button variant="secondary" size="sm" onClick={cancelEditing}>Huỷ</Button>
          </div>
        </div>
      )
    }

    let editor: React.ReactNode = null

    if (type === 'boolean') {
      editor = (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-text-secondary">{column?.label ?? ''}</span>
          <Switch
            checked={typeof editingDraft === 'boolean' ? editingDraft : false}
            onChange={(checked) => {
              setEditingDraft(checked)
              commitEditCell(editingCell, checked)
              closeEditor()
            }}
          />
        </div>
      )
    } else if (type === 'date') {
      editor = (
        <DatePicker
          inline
          value={typeof editingDraft === 'string' ? editingDraft : ''}
          onValueChange={(v) => {
            setEditingDraft(v)
            commitEditCell(editingCell, v)
            closeEditor()
          }}
        />
      )
    } else if (type === 'datetime') {
      editor = (
        <DatetimePicker
          inline
          value={typeof editingDraft === 'string' ? editingDraft : ''}
          onValueChange={(v) => {
            setEditingDraft(v)
            commitEditCell(editingCell, v)
            closeEditor()
          }}
        />
      )
    } else if (type === 'number_range' || type === 'range_number') {
      editor = renderRangeNumber()
    } else if (type === 'date_range') {
      editor = renderRangeDateLike('date')
    } else if (type === 'datetime_range') {
      editor = renderRangeDateLike('datetime')
    } else if (hasOptions && isMultiOptions) {
      editor = renderOptionsMulti()
    } else if (hasOptions) {
      editor = renderOptionsSingle()
    } else {
      editor = (
        <Input
          ref={editingInputRef}
          className="h-8"
          type={type === 'number' ? 'number' : 'text'}
          value={typeof editingDraft === 'string' ? editingDraft : ''}
          onChange={(e) => setEditingDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              commit()
            }
            if (e.key === 'Escape') {
              e.preventDefault()
              cancelEditing()
            }
          }}
        />
      )
    }

    return createPortal(
      <div
        ref={overlayRef}
        tabIndex={-1}
        className="fixed z-50"
        style={{
          top,
          left,
          width: panelWidth,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            cancelEditing()
          }
        }}
      >
        <div className="rounded-2xl border border-slate-200 bg-surface p-3 shadow-xl">
          {editor}
        </div>
      </div>,
      document.body
    )
  }, [
    cancelEditing,
    closeEditor,
    columnsById,
    commitAndCloseEditing,
    commitEditCell,
    editingCell,
    editingDraft,
    editingRect,
    getNormalizedType,
  ])

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
        { column: primary.id, direction, instanceId: effectiveInstanceId },
        { meta: { component: 'Table', instanceId: effectiveInstanceId } }
      )
    } else {
      dispatch(
        EventType.UI_CLICK,
        { column: 'all', direction, instanceId: effectiveInstanceId },
        { meta: { component: 'Table', instanceId: effectiveInstanceId } }
      )
    }

    dispatch(
      'TABLE.SORT_CHANGE',
      {
        sorting: nextSorting,
        primaryColumn: primary?.id ?? null,
        direction,
        instanceId: effectiveInstanceId,
      },
      { meta: { component: 'Table', instanceId: effectiveInstanceId } }
    )
  }

  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      sorting,
      columnVisibility,
      pagination,
      columnSizing,
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    enableColumnResizing: resizableColumns,
    columnResizeMode: 'onChange',
    enableMultiSort: multiSort,
    isMultiSortEvent: multiSort ? () => true : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const rowModel = table.getRowModel()
  const rowIds = React.useMemo(() => {
    if (!canReorderRows) return []
    return rowModel.rows.map((r) => rowKey(r.original as T, r.index))
  }, [canReorderRows, rowKey, rowModel.rows])

  const visibleRowKeys = React.useMemo(() => {
    return rowModel.rows.map((r) => rowKey(r.original as T, r.index))
  }, [rowKey, rowModel.rows])

  const someVisibleSelected =
    allowSelect && visibleRowKeys.some((k) => selectedRowKeys.includes(k))

  const allVisibleSelected =
    allowSelect && visibleRowKeys.length > 0 && visibleRowKeys.every((k) => selectedRowKeys.includes(k))

  const isHeaderIndeterminate = someVisibleSelected && !allVisibleSelected

  const shouldShowHeaderCheckbox = allowSelect && selectedRowKeys.length > 0

  const toggleSelectAllVisible = () => {
    if (!allowSelect) return
    if (visibleRowKeys.length === 0) return

    if (allVisibleSelected) {
      setSelectedRowKeys(selectedRowKeys.filter((k) => !visibleRowKeys.includes(k)))
      return
    }

    const next = Array.from(new Set([...selectedRowKeys, ...visibleRowKeys]))
    setSelectedRowKeys(next)
  }
  const totalPages = table.getPageCount() || 1
  const currentPage = pagination.pageIndex + 1

  React.useEffect(() => {
    onPageChange?.(currentPage)
  }, [currentPage, onPageChange])

  const changePage = (next: number) => {
    if (!Number.isFinite(next)) return
    const clamped = Math.min(Math.max(1, next), totalPages)
    table.setPageIndex(clamped - 1)

    dispatch(
      'TABLE.PAGE_CHANGE',
      { page: clamped, pageSize: pagination.pageSize, instanceId: effectiveInstanceId },
      { meta: { component: 'Table', instanceId: effectiveInstanceId } }
    )
  }

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const handleRowClick = (row: T, index: number) => {
    if (!onRowClick) return
    const key = rowKey(row, index)
    dispatch(
      EventType.UI_CLICK,
      { rowKey: key, instanceId: effectiveInstanceId },
      { meta: { component: 'Table', instanceId: effectiveInstanceId } }
    )
    dispatch(
      'TABLE.ROW_CLICK',
      { rowKey: key, rowIndex: index, instanceId: effectiveInstanceId },
      { meta: { component: 'Table', instanceId: effectiveInstanceId } }
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

    dispatch(
      'TABLE.PAGE_SIZE_CHANGE',
      { pageSize: next, instanceId: effectiveInstanceId },
      { meta: { component: 'Table', instanceId: effectiveInstanceId } }
    )
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
    <div className="w-full rounded-2xl bg-surface">
      {overlayNode}
      {isEditable && (
        <div className="border-b border-slate-200 px-4 py-3">
          {!showAddColumn ? (
            <Button variant="ghost" size="sm" onClick={() => setShowAddColumn(true)}>
              {editable?.addColumnLabel ?? '+ Thêm cột'}
            </Button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <Input
                className="h-8"
                fullWidth={false}
                placeholder={editable?.columnNamePlaceholder ?? 'Tên thuộc tính'}
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
              />
              <Select
                className="h-8"
                fullWidth={false}
                compact
                mode="ghost"
                placeholder={editable?.valueTypePlaceholder ?? 'Kiểu giá trị'}
                options={editable.valueTypeOptions}
                value={newColumnType}
                onValueChange={setNewColumnType}
              />
              <Button size="sm" onClick={handleAddColumn}>
                Thêm
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowAddColumn(false)}>
                Huỷ
              </Button>
            </div>
          )}
        </div>
      )}
      <div
        className={clsx(
          'w-full overflow-hidden',
          showPagination ? 'rounded-t-2xl' : 'rounded-2xl'
        )}
      >
        <Scroll
          ref={scrollRef}
          direction="both"
          autoHide={virtualized}
          className="w-full"
          style={virtualized ? { maxHeight: virtualBodyMaxHeight } : undefined}
        >
          <table
            className={twMerge(clsx('w-full border-collapse text-left', resizableColumns && 'table-fixed', className))}
            style={resizableColumns ? { width: table.getTotalSize() } : undefined}
            {...props}
          >
            <thead className={twMerge(hasStickyHeader && 'sticky top-0 z-10 bg-surface')}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {hasRowActions && (
                  <th
                    key={`${headerGroup.id}::row-actions`}
                    className="group px-2 py-3"
                    style={{ width: rowActionsWidth }}
                  >
                    {allowSelect && (
                      <div className="flex items-center justify-end gap-1">
                        {canInsertRowBelow && <span className="inline-flex h-6 w-6" aria-hidden />}
                        {allowReorder && <span className="inline-flex h-6 w-6" aria-hidden />}
                        <div
                          className={twMerge(
                            clsx(
                              'inline-flex h-6 w-6 items-center justify-center',
                              shouldShowHeaderCheckbox
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                            )
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={allVisibleSelected || isHeaderIndeterminate}
                            indeterminate={isHeaderIndeterminate}
                            onChange={toggleSelectAllVisible}
                          />
                        </div>
                      </div>
                    )}
                  </th>
                )}
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) return null
                  const meta = header.column.columnDef.meta as TableColumnMeta | undefined
                  const align = meta?.align
                  const isSorted = header.column.getIsSorted()
                  let indicator: string | null = null
                  if (header.column.getCanSort() && showSortIndicator) {
                    indicator = !isSorted ? '⇅' : isSorted === 'asc' ? '↑' : '↓'
                  }
                  const isResizeHovered = hoveredResizeColumnId === header.column.id
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      className={twMerge(
                        clsx(
                          'relative cursor-pointer select-none px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary',
                          align === 'center' && 'text-center',
                          align === 'right' && 'text-right'
                        )
                      )}
                      style={{ width: resizableColumns ? header.getSize() : meta?.width }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {indicator && <span className="text-text-muted">{indicator}</span>}
                      </span>

                      {resizableColumns && header.column.getCanResize() && (
                        <>
                          <div
                            className={twMerge(
                              clsx(
                                'absolute right-0 top-0 h-full w-3 cursor-col-resize select-none touch-none',
                                isResizeHovered && 'bg-primary-100/60'
                              )
                            )}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            onMouseEnter={() => setHoveredResizeColumnId(header.column.id)}
                            onMouseLeave={() => setHoveredResizeColumnId((prev) => (prev === header.column.id ? null : prev))}
                            onClick={(e) => e.stopPropagation()}
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
                <td colSpan={columns.length + rowActionsColCount} className="px-4 py-6 text-center text-sm text-text-muted">
                  {emptyState}
                </td>
              </tr>
            )}
            {rowModel.rows.length > 0 &&
              (virtualized ? (
                <>
                  {paddingTop > 0 && (
                    <tr aria-hidden style={{ height: paddingTop }}>
                      <td colSpan={columns.length + rowActionsColCount} />
                    </tr>
                  )}
                  {virtualRows.map((virtualRow) => {
                    const row = rowModel.rows[virtualRow.index]
                    const rowKeyValue = rowKey(row.original as T, row.index)
                    const isSelected = selectedRowKeys.includes(rowKeyValue)
                    return (
                      <tr
                        key={rowKeyValue}
                        onClick={() => handleRowClick(row.original as T, row.index)}
                        className={twMerge(
                          clsx(
                            sizeClasses[size],
                            'group px-4 text-text-primary transition-colors',
                            effectiveRowStyle === 'striped' && row.index % 2 === 1 && 'bg-surface-alt',
                            effectiveRowStyle === 'plain' && 'bg-surface',
                            effectiveRowStyle === 'bordered' && 'border-b border-slate-100',
                            onRowClick && 'cursor-pointer hover:bg-primary-50',
                            isSelected && 'bg-primary-50'
                          )
                        )}
                      >
                        {hasRowActions && (
                          <td
                            className="px-2 py-3 align-middle"
                            style={{ width: rowActionsWidth }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-1">
                              {canInsertRowBelow && (
                                <button
                                  type="button"
                                  className={twMerge(
                                    clsx(
                                      'inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-100',
                                      'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                                    )
                                  )}
                                  onClick={() => handleInsertRowBelow(rowKey(row.original as T, row.index))}
                                >
                                  <Plus className="h-4 w-4 text-text-muted" />
                                </button>
                              )}
                              {allowReorder && (
                                <span
                                  className={twMerge(
                                    clsx(
                                      'inline-flex h-6 w-6 items-center justify-center rounded-md text-text-muted opacity-40',
                                      'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                                    )
                                  )}
                                >
                                  <GripVertical className="h-4 w-4" />
                                </span>
                              )}
                              {allowSelect && (
                                <div
                                  className={twMerge(
                                    clsx(
                                      'inline-flex h-6 w-6 items-center justify-center',
                                      isSelected
                                        ? 'opacity-100'
                                        : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                                    )
                                  )}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={(e) => {
                                      e.stopPropagation()
                                      toggleRowSelected(rowKeyValue)
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        {row.getVisibleCells().map((cell) => {
                          const meta = cell.column.columnDef.meta as TableColumnMeta | undefined
                          const align = meta?.align
                          const rowKeyValue = rowKey(row.original as T, row.index)
                          const columnId = cell.column.id
                          const column = columnsById.get(columnId)
                          const hasOptions = !!column?.options?.length
                          const valueType = column?.valueType ?? ''
                          const canEditCell = isEditable && (!!valueType || hasOptions)
                          const rawValue = canEditCell ? (row.original as any)?.[columnId] : undefined
                          return (
                            <td
                              key={cell.id}
                              onClick={(e) => {
                                if (!canEditCell) return
                                e.stopPropagation()
                                beginEditCell({
                                  rowKeyValue,
                                  columnId,
                                  rawValue,
                                  anchorEl: e.currentTarget,
                                })
                              }}
                              className={twMerge(
                                clsx(
                                  'px-4 py-3 align-middle text-sm text-text-secondary',
                                  canEditCell && 'cursor-text',
                                  align === 'center' && 'text-center',
                                  align === 'right' && 'text-right'
                                )
                              )}
                              style={{ width: resizableColumns ? cell.column.getSize() : meta?.width }}
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
                      <td colSpan={columns.length + rowActionsColCount} />
                    </tr>
                  )}
                </>
              ) : canReorderRows ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleRowDragEnd}>
                  <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
                    {rowModel.rows.map((row) => {
                      const rowKeyValue = rowKey(row.original as T, row.index)
                      const isSelected = selectedRowKeys.includes(rowKeyValue)
                      return (
                        <SortableRow
                          key={rowKeyValue}
                          row={row}
                          rowKeyValue={rowKeyValue}
                          className={twMerge(
                            clsx(
                              sizeClasses[size],
                              'group px-4 text-text-primary transition-colors',
                              effectiveRowStyle === 'striped' && row.index % 2 === 1 && 'bg-surface-alt',
                              effectiveRowStyle === 'plain' && 'bg-surface',
                              effectiveRowStyle === 'bordered' && 'border-b border-slate-100',
                              onRowClick && 'cursor-pointer hover:bg-primary-50',
                              isSelected && 'bg-primary-50'
                            )
                          )}
                        >
                          {row.getVisibleCells().map((cell) => {
                            const meta = cell.column.columnDef.meta as TableColumnMeta | undefined
                            const align = meta?.align
                            const columnId = cell.column.id
                            const column = columnsById.get(columnId)
                            const hasOptions = !!column?.options?.length
                            const valueType = column?.valueType ?? ''
                            const canEditCell = isEditable && (!!valueType || hasOptions)
                            const rawValue = canEditCell ? (row.original as any)?.[columnId] : undefined

                            return (
                              <td
                                key={cell.id}
                                onClick={(e) => {
                                  if (!canEditCell) return
                                  e.stopPropagation()
                                  beginEditCell({
                                    rowKeyValue,
                                    columnId,
                                    rawValue,
                                    anchorEl: e.currentTarget,
                                  })
                                }}
                                className={twMerge(
                                  clsx(
                                    'px-4 py-3 align-middle text-sm text-text-secondary',
                                    canEditCell && 'cursor-text',
                                    align === 'center' && 'text-center',
                                    align === 'right' && 'text-right'
                                  )
                                )}
                                style={{ width: resizableColumns ? cell.column.getSize() : meta?.width }}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            )
                          })}
                        </SortableRow>
                      )
                    })}
                  </SortableContext>
                </DndContext>
              ) : (
                rowModel.rows.map((row, index) => {
                  const rowKeyValue = rowKey(row.original as T, index)
                  const isSelected = selectedRowKeys.includes(rowKeyValue)
                  return (
                    <tr
                      key={rowKeyValue}
                      onClick={() => handleRowClick(row.original as T, index)}
                      className={twMerge(
                        clsx(
                          sizeClasses[size],
                          'group px-4 text-text-primary transition-colors',
                          effectiveRowStyle === 'striped' && index % 2 === 1 && 'bg-surface-alt',
                          effectiveRowStyle === 'plain' && 'bg-surface',
                          effectiveRowStyle === 'bordered' && 'border-b border-slate-100',
                          onRowClick && 'cursor-pointer hover:bg-primary-50',
                          isSelected && 'bg-primary-50'
                        )
                      )}
                    >
                      {hasRowActions && (
                        <td
                          className="px-2 py-3 align-middle"
                          style={{ width: rowActionsWidth }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            {canInsertRowBelow && (
                              <button
                                type="button"
                                className={twMerge(
                                  clsx(
                                    'inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-100',
                                    'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                                  )
                                )}
                                onClick={() => handleInsertRowBelow(rowKeyValue)}
                              >
                                <Plus className="h-4 w-4 text-text-muted" />
                              </button>
                            )}
                            {allowReorder && (
                              <span
                                className={twMerge(
                                  clsx(
                                    'inline-flex h-6 w-6 items-center justify-center rounded-md text-text-muted opacity-40',
                                    'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                                  )
                                )}
                              >
                                <GripVertical className="h-4 w-4" />
                              </span>
                            )}
                            {allowSelect && (
                              <div
                                className={twMerge(
                                  clsx(
                                    'inline-flex h-6 w-6 items-center justify-center',
                                    isSelected
                                      ? 'opacity-100'
                                      : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                                  )
                                )}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  onChange={(e) => {
                                    e.stopPropagation()
                                    toggleRowSelected(rowKeyValue)
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                      {row.getVisibleCells().map((cell) => {
                        const meta = cell.column.columnDef.meta as TableColumnMeta | undefined
                        const align = meta?.align
                        const columnId = cell.column.id
                        const column = columnsById.get(columnId)
                        const hasOptions = !!column?.options?.length
                        const valueType = column?.valueType ?? ''
                        const canEditCell = isEditable && (!!valueType || hasOptions)
                        const rawValue = canEditCell ? (row.original as any)?.[columnId] : undefined

                        return (
                          <td
                            key={cell.id}
                            onClick={(e) => {
                              if (!canEditCell) return
                              e.stopPropagation()
                              beginEditCell({
                                rowKeyValue,
                                columnId,
                                rawValue,
                                anchorEl: e.currentTarget,
                              })
                            }}
                            className={twMerge(
                              clsx(
                                'px-4 py-3 align-middle text-sm text-text-secondary',
                                canEditCell && 'cursor-text',
                                align === 'center' && 'text-center',
                                align === 'right' && 'text-right'
                              )
                            )}
                            style={{ width: resizableColumns ? cell.column.getSize() : meta?.width }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              ))}
            {isEditable && !virtualized && (
              <tr>
                <td colSpan={columns.length + rowActionsColCount} className="px-4 py-3">
                  <Button variant="ghost" size="sm" onClick={handleAddRow}>
                    {editable?.addRowLabel ?? '+ Thêm hàng'}
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </Scroll>
      </div>
      {showPagination && (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>{pageSizeLabel}</span>
              <Select
                className="h-7 w-[72px] text-xs"
                fullWidth={false}
                compact
                hideCaret
                mode="ghost"
                dropdownPlacement="bottom"
                options={resolvedPageSizeOptions.map((n) => ({
                  label: String(n),
                  value: String(n),
                }))}
                value={String(pageSizeState)}
                onValueChange={handlePageSizeChange}
              />
            </div>
            <span>
              {pageLabel} <span className="font-medium">{currentPage}</span>
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
