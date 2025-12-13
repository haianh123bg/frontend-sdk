import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Users, Flag, Hash, Calendar, Clock, ToggleRight, Tags } from 'lucide-react'
import type { SortingState } from '@tanstack/react-table'
import { Table, type TableColumn } from './Table'
import {
  TableFilterToolbar,
  type TableFilterFieldDefinition,
  type TableFilterInstance,
} from './TableFilterToolbar'
import { useTableFilterToolbarBinding } from './useTableFilterToolbarBinding'

type Row = {
  id: string
  name: string
  status: 'todo' | 'in_progress' | 'done'
  assignee: string
  tags: string[]
  active: boolean
  amount: number
  created_date: string
  due_datetime: string
}

const statusOptions = [
  { label: 'To-do', value: 'todo' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]

const assigneeOptions = [
  { label: 'Hải Anh', value: 'hai-anh' },
  { label: 'Nguyễn Văn A', value: 'nguyen-a' },
  { label: 'Trần Thị B', value: 'tran-b' },
]

const tagOptions = [
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Chore', value: 'chore' },
]

const rows: Row[] = [
  {
    id: '1',
    name: 'Redesign landing page',
    status: 'in_progress',
    assignee: 'hai-anh',
    tags: ['feature'],
    active: true,
    amount: 1200,
    created_date: '2025-12-01',
    due_datetime: '2025-12-20 10:00',
  },
  {
    id: '2',
    name: 'Fix payment callback',
    status: 'todo',
    assignee: 'nguyen-a',
    tags: ['bug'],
    active: true,
    amount: 300,
    created_date: '2025-11-28',
    due_datetime: '2025-12-15 18:00',
  },
  {
    id: '3',
    name: 'Cleanup legacy flags',
    status: 'done',
    assignee: 'tran-b',
    tags: ['chore'],
    active: false,
    amount: 50,
    created_date: '2025-10-10',
    due_datetime: '2025-10-20 09:30',
  },
  {
    id: '4',
    name: 'Implement advanced search',
    status: 'todo',
    assignee: 'hai-anh',
    tags: ['feature', 'chore'],
    active: true,
    amount: 800,
    created_date: '2025-12-05',
    due_datetime: '2025-12-25 12:00',
  },
  {
    id: '5',
    name: 'Investigate slow queries',
    status: 'in_progress',
    assignee: 'tran-b',
    tags: ['bug', 'chore'],
    active: true,
    amount: 5000,
    created_date: '2025-11-12',
    due_datetime: '2025-12-30 17:00',
  },
]

const columns: TableColumn<Row>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (row) => statusOptions.find((o) => o.value === row.status)?.label ?? row.status,
  },
  {
    key: 'assignee',
    label: 'Assignee',
    sortable: true,
    render: (row) => assigneeOptions.find((o) => o.value === row.assignee)?.label ?? row.assignee,
  },
  {
    key: 'tags',
    label: 'Tags',
    render: (row) => row.tags.map((t) => tagOptions.find((o) => o.value === t)?.label ?? t).join(', '),
  },
  { key: 'active', label: 'Active', sortable: true, render: (row) => (row.active ? 'Yes' : 'No') },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'created_date', label: 'Created', sortable: true },
  { key: 'due_datetime', label: 'Due', sortable: true },
]

const i18n = {
  buttonLabel: 'Bộ lọc',
  searchPlaceholder: 'Lọc theo trường...',
  emptyLabel: 'Không tìm thấy trường phù hợp',
  appliedFiltersLabel: 'bộ lọc đang áp dụng',
  clearAllLabel: 'Xoá tất cả',
  yesLabel: 'Có',
  noLabel: 'Không',
  rangeFromPlaceholder: 'Từ',
  rangeToPlaceholder: 'Đến',
  rangeGtePrefix: '>=',
  rangeLtePrefix: '<=',
  rangeSeparator: ' - ',
  operators: {
    from: 'Ngày bắt đầu',
    to: 'Ngày kết thúc',
    between: 'Trong khoảng',
    empty: 'Trống',
    notEmpty: 'Không trống',
    eq: 'Là',
    neq: 'Không phải là',
    gt: 'Lớn hơn',
    gte: 'Lớn hơn hoặc bằng',
    lt: 'Nhỏ hơn',
    lte: 'Nhỏ hơn hoặc bằng',
    contains: 'Chứa',
    notContains: 'Không chứa',
    startsWith: 'Bắt đầu bằng',
    endsWith: 'Kết thúc bằng',
    is: 'Là',
    isNot: 'Không phải là',
    in: 'Bao gồm',
    notIn: 'Không bao gồm',
  },
} as const

const fields: TableFilterFieldDefinition[] = [
  {
    id: 'status',
    label: 'Status',
    icon: Flag,
    type: 'select',
    options: statusOptions,
    meta: {
      operators: [
        { id: 'eq', label: 'Là', valueType: 'single' },
        { id: 'neq', label: 'Không phải là', valueType: 'single' },
        { id: 'empty', label: 'Trống', valueType: 'none' },
        { id: 'not_empty', label: 'Không trống', valueType: 'none' },
      ],
      defaultOperator: 'eq',
    },
  },
  {
    id: 'assignee',
    label: 'Assignee',
    icon: Users,
    type: 'select',
    options: assigneeOptions,
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: Tags,
    type: 'multi_select',
    options: tagOptions,
    meta: { multiple: true },
  },
  {
    id: 'active',
    label: 'Active',
    icon: ToggleRight,
    type: 'boolean',
  },
  {
    id: 'amount',
    label: 'Amount',
    icon: Hash,
    type: 'number',
  },
  {
    id: 'created_date',
    label: 'Created date',
    icon: Calendar,
    type: 'date',
  },
  {
    id: 'due_datetime',
    label: 'Due datetime',
    icon: Clock,
    type: 'datetime',
  },
]

const normalizeText = (value: unknown) => (value ?? '').toString().toLowerCase()

const isEmptyValue = (value: unknown) => {
  if (value === undefined || value === null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  return false
}

const toComparableNumber = (value: unknown) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return NaN

    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
      const ts = Date.parse(trimmed.replace(' ', 'T'))
      return Number.isFinite(ts) ? ts : NaN
    }

    const n = Number(trimmed)
    return Number.isFinite(n) ? n : NaN
  }
  return NaN
}

const applyFilters = (data: Row[], filters: TableFilterInstance[], defs: TableFilterFieldDefinition[]) => {
  if (!filters.length) return data

  return data.filter((row) => {
    return filters.every((filter) => {
      const field = defs.find((f) => f.id === filter.fieldId)
      if (!field) return true

      const operator = filter.operator
      const rowValue = (row as any)[filter.fieldId]
      const filterValue = filter.value

      if (!operator) return true

      if (operator === 'empty') return isEmptyValue(rowValue)
      if (operator === 'not_empty') return !isEmptyValue(rowValue)

      if (operator === 'eq') return rowValue === filterValue
      if (operator === 'neq') return rowValue !== filterValue

      if (operator === 'is') return rowValue === filterValue
      if (operator === 'is_not') return rowValue !== filterValue

      if (operator === 'contains') return normalizeText(rowValue).includes(normalizeText(filterValue))
      if (operator === 'not_contains') return !normalizeText(rowValue).includes(normalizeText(filterValue))
      if (operator === 'starts_with') return normalizeText(rowValue).startsWith(normalizeText(filterValue))
      if (operator === 'ends_with') return normalizeText(rowValue).endsWith(normalizeText(filterValue))

      if (operator === 'in') {
        const values = Array.isArray(filterValue) ? filterValue : [filterValue]
        if (Array.isArray(rowValue)) {
          return rowValue.some((v) => values.includes(v))
        }
        return values.includes(rowValue)
      }

      if (operator === 'not_in') {
        const values = Array.isArray(filterValue) ? filterValue : [filterValue]
        if (Array.isArray(rowValue)) {
          return !rowValue.some((v) => values.includes(v))
        }
        return !values.includes(rowValue)
      }

      if (operator === 'gt' || operator === 'gte' || operator === 'lt' || operator === 'lte') {
        const left = toComparableNumber(rowValue)
        const right = toComparableNumber(filterValue)
        if (!Number.isFinite(left) || !Number.isFinite(right)) return true
        if (operator === 'gt') return left > right
        if (operator === 'gte') return left >= right
        if (operator === 'lt') return left < right
        return left <= right
      }

      if (operator === 'from' || operator === 'to') {
        const left = toComparableNumber(rowValue)
        const right = toComparableNumber(filterValue)
        if (!Number.isFinite(left) || !Number.isFinite(right)) return true
        return operator === 'from' ? left >= right : left <= right
      }

      if (operator === 'between' && filterValue && typeof filterValue === 'object') {
        const v = filterValue as Record<string, unknown>
        const left = toComparableNumber(rowValue)
        const start = toComparableNumber(v.start ?? v.min)
        const end = toComparableNumber(v.end ?? v.max)
        if (!Number.isFinite(left)) return true

        const hasStart = Number.isFinite(start)
        const hasEnd = Number.isFinite(end)
        if (!hasStart && !hasEnd) return true
        if (hasStart && hasEnd) return left >= start && left <= end
        if (hasStart) return left >= start
        return left <= end
      }

      return true
    })
  })
}

const formatValue = (field: TableFilterFieldDefinition, value: unknown) => {
  if (field.id === 'status' && typeof value === 'string') {
    return statusOptions.find((o) => o.value === value)?.label ?? value
  }

  if (field.id === 'assignee' && typeof value === 'string') {
    return assigneeOptions.find((o) => o.value === value)?.label ?? value
  }

  if (field.id === 'tags') {
    const values = Array.isArray(value) ? value : typeof value === 'string' ? [value] : []
    return values
      .map((v) => tagOptions.find((o) => o.value === v)?.label ?? v)
      .filter(Boolean)
      .join(', ')
  }

  if (field.type === 'number_range' && value && typeof value === 'object') {
    const v = value as { min?: number; max?: number }
    const min = typeof v.min === 'number' && !Number.isNaN(v.min) ? v.min : undefined
    const max = typeof v.max === 'number' && !Number.isNaN(v.max) ? v.max : undefined
    if (min === undefined && max === undefined) return ''
    if (min !== undefined && max !== undefined) return `${min} - ${max}`
    if (min !== undefined) return `>= ${min}`
    return `<= ${max}`
  }

  if ((field.type === 'date' || field.type === 'datetime') && value && typeof value === 'object') {
    const v = value as { start?: string; end?: string }
    const start = typeof v.start === 'string' ? v.start : ''
    const end = typeof v.end === 'string' ? v.end : ''
    if (!start && !end) return ''
    if (start && end) return `${start} - ${end}`
    if (start) return `>= ${start}`
    return `<= ${end}`
  }

  if (typeof value === 'boolean') return value ? i18n.yesLabel : i18n.noLabel

  return String(value ?? '')
}

const TableWithFilterToolbarDemo: React.FC = () => {
  const [filters, setFilters] = React.useState<TableFilterInstance[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const toolbar = useTableFilterToolbarBinding<Row>({
    columns,
    filterFields: fields,
    filterInstances: filters,
    onFilterInstancesChange: setFilters,
    sorting,
    onSortingChange: setSorting,
    sortOperatorLabels: { asc: 'Tăng dần', desc: 'Giảm dần' },
  })

  const filteredRows = React.useMemo(() => applyFilters(rows, filters, fields), [filters])

  return (
    <div className="space-y-3 rounded-2xl bg-surface p-4">
      <TableFilterToolbar
        fields={toolbar.fields}
        filters={toolbar.filters}
        onFiltersChange={toolbar.onFiltersChange}
        i18n={i18n}
        formatValue={formatValue}
      />
      <Table
        columns={columns}
        data={filteredRows}
        rowKey={(row: Row) => row.id}
        striped
        size="md"
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        stickyHeader
        showSortIndicator
        multiSort
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  )
}

const docsSourceCode = `import * as React from 'react'
import type { SortingState } from '@tanstack/react-table'
import { Table, type TableColumn } from './Table'
import {
  TableFilterToolbar,
  type TableFilterFieldDefinition,
  type TableFilterInstance,
} from './TableFilterToolbar'
import { useTableFilterToolbarBinding } from './useTableFilterToolbarBinding'

type Row = {
  id: string
  name: string
  status: 'todo' | 'in_progress' | 'done'
  assignee: string
  tags: string[]
  active: boolean
  amount: number
  created_date: string
  due_datetime: string
}

const columns: TableColumn<Row>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'assignee', label: 'Assignee', sortable: true },
]

const fields: TableFilterFieldDefinition[] = [
  { id: 'status', label: 'Status', type: 'select', options: [] },
  { id: 'assignee', label: 'Assignee', type: 'select', options: [] },
]

export const Example: React.FC<{ rows: Row[] }> = ({ rows }) => {
  const [filters, setFilters] = React.useState<TableFilterInstance[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const toolbar = useTableFilterToolbarBinding<Row>({
    columns,
    filterFields: fields,
    filterInstances: filters,
    onFilterInstancesChange: setFilters,
    sorting,
    onSortingChange: setSorting,
  })

  return (
    <div className="space-y-3 rounded-2xl bg-surface p-4">
      <TableFilterToolbar
        fields={toolbar.fields}
        filters={toolbar.filters}
        onFiltersChange={toolbar.onFiltersChange}
      />
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        stickyHeader
        showSortIndicator
        multiSort
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  )
}`

const meta: Meta<typeof TableWithFilterToolbarDemo> = {
  title: 'Organisms/Table/TableWithFilterToolbar',
  component: TableWithFilterToolbarDemo,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TableWithFilterToolbarDemo>

export const Default: Story = {
  render: () => <TableWithFilterToolbarDemo />,
  parameters: {
    docs: {
      source: {
        code: docsSourceCode,
        language: 'tsx',
      },
    },
  },
}
