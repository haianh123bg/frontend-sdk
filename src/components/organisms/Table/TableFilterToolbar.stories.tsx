import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Users, Flag } from 'lucide-react'
import { Select } from '../../atoms/Select/Select'
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

export const Basic: Story = {
  args: {
    fields: [],
    filters: [],
    // onFiltersChange sẽ bị override trong render, nhưng cần giá trị mặc định để satisfy type
    onFiltersChange: () => {},
    renderFieldEditor: () => null,
    formatValue: () => '',
  },
  render: (args) => {
    const [filters, setFilters] = React.useState<TableFilterInstance[]>([])

    const fields: TableFilterFieldDefinition[] = React.useMemo(
      () => [
        {
          id: 'status',
          label: 'Status',
          icon: Flag,
        },
        {
          id: 'assignee',
          label: 'Assignee',
          icon: Users,
        },
      ],
      []
    )

    const formatValue = React.useCallback(
      (field: TableFilterFieldDefinition, value: unknown) => {
        if (field.id === 'status') {
          const found = statusOptions.find((o) => o.value === value)
          return found?.label ?? String(value ?? '')
        }
        if (field.id === 'assignee') {
          const found = assigneeOptions.find((o) => o.value === value)
          return found?.label ?? String(value ?? '')
        }
        return String(value ?? '')
      },
      []
    )

    const renderFieldEditor = React.useCallback(
      ({ field, filter, onChange }: {
        field: TableFilterFieldDefinition
        filter: TableFilterInstance
        onChange: (value: unknown) => void
      }) => {
        if (field.id === 'status') {
          return (
            <Select
              options={statusOptions}
              value={(filter.value as string) ?? ''}
              onValueChange={onChange as (v: string) => void}
              placeholder="Chọn trạng thái"
              compact
            />
          )
        }
        if (field.id === 'assignee') {
          return (
            <Select
              options={assigneeOptions}
              value={(filter.value as string) ?? ''}
              onValueChange={onChange as (v: string) => void}
              placeholder="Chọn người phụ trách"
              compact
            />
          )
        }
        return null
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
          renderFieldEditor={renderFieldEditor}
          formatValue={formatValue}
          buttonLabel="Bộ lọc"
          searchPlaceholder="Lọc theo trường..."
          emptyLabel="Không tìm thấy trường phù hợp"
          appliedFiltersLabel="bộ lọc đang áp dụng"
          clearAllLabel="Xoá tất cả"
        />
        <pre className="rounded bg-surface-alt p-3 text-xs text-text-secondary">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
    )
  },
}
