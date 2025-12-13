import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Users, Flag, Hash, Calendar, Clock, ToggleRight, Tags } from 'lucide-react'
import { TableFilterToolbar, type TableFilterFieldDefinition, type TableFilterInstance } from './TableFilterToolbar'

const meta = {
  title: 'Organisms/TableFilterToolbar',
  component: TableFilterToolbar,
  tags: ['autodocs'],
} satisfies Meta<typeof TableFilterToolbar>

export default meta

type Story = StoryObj<typeof meta>

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

const docsSourceCode = `import * as React from 'react'
import { Users, Flag, Hash, Calendar, Clock, ToggleRight, Tags } from 'lucide-react'
import { TableFilterToolbar, type TableFilterFieldDefinition, type TableFilterInstance } from './TableFilterToolbar'

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

const i18n = {
  buttonLabel: 'Bộ lọc',
  searchPlaceholder: 'Lọc theo trường...',
  emptyLabel: 'Không tìm thấy trường phù hợp',
  appliedFiltersLabel: 'bộ lọc đang áp dụng',
  clearAllLabel: 'Xoá tất cả',
  yesLabel: 'Có',
  noLabel: 'Không',
} as const

export const Example: React.FC = () => {
  const [filters, setFilters] = React.useState<TableFilterInstance[]>([])

  const fields: TableFilterFieldDefinition[] = [
    { id: 'status', label: 'Status', icon: Flag, type: 'select', options: statusOptions },
    { id: 'assignee', label: 'Assignee', icon: Users, type: 'multi_select', options: assigneeOptions, meta: { multiple: true } },
    { id: 'tags', label: 'Tags', icon: Tags, type: 'multi', options: tagOptions },
    { id: 'active', label: 'Active', icon: ToggleRight, type: 'boolean' },
    { id: 'amount', label: 'Amount', icon: Hash, type: 'number' },
    { id: 'created_date', label: 'Created date', icon: Calendar, type: 'date' },
    { id: 'due_datetime', label: 'Due datetime', icon: Clock, type: 'datetime' },
  ]

  return (
    <TableFilterToolbar
      fields={fields}
      filters={filters}
      onFiltersChange={setFilters}
      i18n={i18n}
      formatValue={(field, value) => String(value ?? '')}
    />
  )
}`

export const Basic: Story = {
  args: {
    fields: [],
    filters: [],
    // onFiltersChange sẽ bị override trong render, nhưng cần giá trị mặc định để satisfy type
    onFiltersChange: () => {},
    i18n,
  },
  render: (args) => {
    const [filters, setFilters] = React.useState<TableFilterInstance[]>([])

    const fields: TableFilterFieldDefinition[] = React.useMemo(
      () => [
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
          type: 'multi_select',
          options: assigneeOptions,
          meta: {
            multiple: true,
            operators: [
              { id: 'in', label: 'Bao gồm', valueType: 'multi' },
              { id: 'not_in', label: 'Không bao gồm', valueType: 'multi' },
              { id: 'empty', label: 'Trống', valueType: 'none' },
              { id: 'not_empty', label: 'Không trống', valueType: 'none' },
            ],
            defaultOperator: 'in',
          },
        },
        {
          id: 'tags',
          label: 'Tags',
          icon: Tags,
          type: 'multi',
          options: tagOptions,
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
        {
          id: 'score',
          label: 'Score',
          icon: Hash,
          type: 'number_range',
        },
      ],
      []
    )

    const formatValue = React.useCallback(
      (field: TableFilterFieldDefinition, value: unknown) => {
        if (field.type === 'number_range') {
          const v = (value ?? {}) as { min?: number; max?: number }
          const min = typeof v.min === 'number' && !Number.isNaN(v.min) ? v.min : undefined
          const max = typeof v.max === 'number' && !Number.isNaN(v.max) ? v.max : undefined
          if (min === undefined && max === undefined) return ''
          if (min !== undefined && max !== undefined) return `${min} - ${max}`
          if (min !== undefined) return `>= ${min}`
          return `<= ${max}`
        }

        if (field.type === 'date' || field.type === 'datetime') {
          if (value && typeof value === 'object') {
            const v = value as { start?: string; end?: string }
            const start = typeof v.start === 'string' ? v.start : ''
            const end = typeof v.end === 'string' ? v.end : ''
            if (!start && !end) return ''
            if (start && end) return `${start} - ${end}`
            if (start) return `>= ${start}`
            return `<= ${end}`
          }
        }

        if (field.options?.length) {
          if (Array.isArray(value)) {
            const values = value.filter((v): v is string => typeof v === 'string')
            const labels = values
              .map((v) => field.options?.find((o) => o.value === v)?.label ?? v)
              .filter(Boolean)
            return labels.join(', ')
          }
          if (typeof value === 'string') {
            return field.options.find((o) => o.value === value)?.label ?? value
          }
        }

        if (typeof value === 'boolean') return value ? 'Có' : 'Không'

        return String(value ?? '')
      },
      []
    )

    return (
      <div className="space-y-3 rounded-2xl bg-surface p-4">
        <TableFilterToolbar
          {...args}
          fields={fields}
          filters={filters}
          onFiltersChange={setFilters}
          i18n={i18n}
          formatValue={formatValue}
        />
        <pre className="rounded bg-surface-alt p-3 text-xs text-text-secondary">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: docsSourceCode,
        language: 'tsx',
      },
    },
  },
}
