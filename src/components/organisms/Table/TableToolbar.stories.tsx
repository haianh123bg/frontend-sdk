import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { VisibilityState } from '@tanstack/react-table'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Download, UserPlus } from 'lucide-react'
import { Table } from './Table'
import { TableToolbar, type ToolbarFilterOption } from './TableToolbar'
import { ActiveFilters, type ActiveFilterChip } from './ActiveFilters'

interface UserRow {
  id: string
  name: string
  email: string
  status: 'active' | 'invited' | 'disabled'
}

const data: UserRow[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', status: 'active' },
  { id: '2', name: 'Bob', email: 'bob@example.com', status: 'invited' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', status: 'disabled' },
]

const meta = {
  title: 'Organisms/TableToolbar',
  component: TableToolbar,
  tags: ['autodocs'],
} satisfies Meta<typeof TableToolbar>

export default meta

type Story = StoryObj<typeof meta>

const docsSourceCodeWithTable = `import { useState } from 'react'
import type { VisibilityState } from '@tanstack/react-table'
import { Download, UserPlus } from 'lucide-react'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Table } from './Table'
import { TableToolbar, type ToolbarFilterOption } from './TableToolbar'
import { ActiveFilters, type ActiveFilterChip } from './ActiveFilters'

type UserRow = {
  id: string
  name: string
  email: string
  status: 'active' | 'invited' | 'disabled'
}

const data: UserRow[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', status: 'active' },
  { id: '2', name: 'Bob', email: 'bob@example.com', status: 'invited' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', status: 'disabled' },
]

export const Example = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | undefined>()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const filtered = data.filter((row) => {
    const matchesSearch =
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || row.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status' },
  ] as const

  const visibilityItems = columns.map((col) => {
    const id = col.key as string
    const visible = columnVisibility[id] !== false
    return { id, label: col.label, visible }
  })

  const filterOptions: ToolbarFilterOption[] = [
    { label: 'All statuses', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Invited', value: 'invited' },
    { label: 'Disabled', value: 'disabled' },
  ]

  const activeFilters: ActiveFilterChip[] = [
    ...(search ? [{ id: 'search', label: 'Search', value: search } as ActiveFilterChip] : []),
    ...(statusFilter ? [{ id: 'status', label: 'Status', value: statusFilter } as ActiveFilterChip] : []),
  ]

  return (
    <div className="space-y-2">
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search users"
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        filterOptions={filterOptions}
        filterValue={statusFilter || ''}
        onFilterChange={(value) => setStatusFilter(value || undefined)}
        actions={
          <div className="flex items-center gap-2">
            <IconButton icon={Download} size="sm" />
            <IconButton icon={UserPlus} size="sm" />
          </div>
        }
        columnVisibilityItems={visibilityItems}
        onColumnVisibilityChange={(id, visible) => {
          setColumnVisibility((prev) => ({ ...prev, [id]: visible }))
        }}
      />
      <ActiveFilters
        filters={activeFilters}
        onRemoveFilter={(id) => {
          if (id === 'search') setSearch('')
          if (id === 'status') setStatusFilter(undefined)
        }}
        onClearAll={() => {
          setSearch('')
          setStatusFilter(undefined)
        }}
      />
      <Table
        columns={columns as any}
        data={filtered}
        rowKey={(row) => row.id}
        pageSize={5}
        columnVisibility={columnVisibility}
      />
    </div>
  )
}`

export const WithTable: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string | undefined>()
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const filtered = data.filter((row) => {
      const matchesSearch =
        !search ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = !statusFilter || row.status === statusFilter
      return matchesSearch && matchesStatus
    })

    const columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'status', label: 'Status' },
    ] as const

    const visibilityItems = columns.map((col) => {
      const id = col.key as string
      const visible = columnVisibility[id] !== false
      return { id, label: col.label, visible }
    })

    const filterOptions: ToolbarFilterOption[] = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'Invited', value: 'invited' },
      { label: 'Disabled', value: 'disabled' },
    ]

    const activeFilters: ActiveFilterChip[] = [
      ...(search
        ? [{ id: 'search', label: 'Search', value: search } as ActiveFilterChip]
        : []),
      ...(statusFilter
        ? [{ id: 'status', label: 'Status', value: statusFilter } as ActiveFilterChip]
        : []),
    ]

    return (
      <div className="space-y-2">
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search users"
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          filterOptions={filterOptions}
          filterValue={statusFilter || ''}
          onFilterChange={(value) => setStatusFilter(value || undefined)}
          actions={
            <div className="flex items-center gap-2">
              <IconButton icon={Download} size="sm" />
              <IconButton icon={UserPlus} size="sm" />
            </div>
          }
          columnVisibilityItems={visibilityItems}
          onColumnVisibilityChange={(id, visible) => {
            setColumnVisibility((prev) => ({
              ...prev,
              [id]: visible,
            }))
          }}
        />
        <ActiveFilters
          filters={activeFilters}
          onRemoveFilter={(id) => {
            if (id === 'search') setSearch('')
            if (id === 'status') setStatusFilter(undefined)
          }}
          onClearAll={() => {
            setSearch('')
            setStatusFilter(undefined)
          }}
        />
        <Table
          columns={columns as any}
          data={filtered}
          rowKey={(row) => row.id}
          pageSize={5}
          columnVisibility={columnVisibility}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: docsSourceCodeWithTable,
        language: 'tsx',
      },
    },
  },
}
