import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { VisibilityState } from '@tanstack/react-table'
import { Table, type TableColumn } from './Table'
import { TableToolbar } from './TableToolbar'

interface UserRow {
  id: string
  name: string
  email: string
  role: string
}

const data: UserRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: '5', name: 'Evan Stone', email: 'evan@example.com', role: 'Editor' },
  { id: '6', name: 'Fiona Apple', email: 'fiona@example.com', role: 'Viewer' },
]

const columns: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]

const meta = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    columns,
    data,
    rowKey: (row: UserRow) => row.id,
    striped: true,
    size: 'md',
    pageSize: 3,
    pageSizeOptions: [3, 5, 10],
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    rowStyle: {
      control: 'radio',
      options: ['striped', 'plain', 'bordered'],
    },
    striped: {
      control: 'boolean',
    },
    stickyHeader: {
      control: 'boolean',
    },
    showSortIndicator: {
      control: 'boolean',
    },
    pageSize: {
      control: { type: 'number', min: 0, step: 1 },
    },
    pageSizeOptions: {
      control: 'object',
    },
  },
} satisfies Meta<typeof Table<UserRow>>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const WithPagination: Story = {
  args: {
    pageSize: 3,
    pageSizeOptions: [3, 5, 10, 20],
  },
}

export const StickyHeader: Story = {
  args: {
    stickyHeader: true,
    pageSize: 3,
    pageSizeOptions: [3, 5, 10, 20],
  },
}

export const LargeRowsNoSortIcon: Story = {
  args: {
    size: 'lg',
    rowStyle: 'striped',
    showSortIndicator: false,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
  },
}

export const PlainRows: Story = {
  args: {
    rowStyle: 'plain',
    striped: false,
    pageSize: 5,
  },
}

export const BorderedRows: Story = {
  args: {
    rowStyle: 'bordered',
    striped: false,
    pageSize: 5,
  },
}

export const EmptyState: Story = {
  args: {
    data: [],
    emptyState: 'No users found',
  },
}

// ---- Virtualized large-data example dùng trực tiếp Table ----

const largeData: UserRow[] = Array.from({ length: 10000 }, (_, index) => {
  const id = index + 1
  const roles = ['Admin', 'Editor', 'Viewer'] as const
  return {
    id: String(id),
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: roles[id % roles.length],
  }
})

export const VirtualizedLargeData: Story = {
  render: () => {
    const [search, setSearch] = React.useState('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const filtered = largeData.filter((row) => {
      if (!search) return true
      const term = search.toLowerCase()
      return (
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.role.toLowerCase().includes(term)
      )
    })

    const visibilityItems = columns.map((col) => {
      const id = col.key as string
      const visible = columnVisibility[id] !== false
      return { id, label: col.label, visible }
    })

    return (
      <div className="space-y-2">
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search users"
          columnVisibilityItems={visibilityItems}
          onColumnVisibilityChange={(id, visible) => {
            setColumnVisibility((prev) => ({
              ...prev,
              [id]: visible,
            }))
          }}
        />
        <Table
          columns={columns}
          data={filtered}
          rowKey={(row: UserRow) => row.id}
          striped
          size="md"
          pageSize={100}
          pageSizeOptions={[50, 100, 200, 500, 1000]}
          columnVisibility={columnVisibility}
          virtualized
          virtualRowHeight={44}
          virtualBodyMaxHeight={420}
        />
      </div>
    )
  },
}
