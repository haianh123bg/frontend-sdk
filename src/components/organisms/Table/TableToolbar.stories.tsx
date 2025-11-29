import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Select } from '../../atoms/Select/Select'
import { Table } from './Table'
import { TableToolbar } from './TableToolbar'

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

export const WithTable: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string | undefined>()
    const [selectedIds, setSelectedIds] = useState<string[]>([])

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

    return (
      <div className="space-y-2">
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search users"
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          filters={
            <Select
              className="h-9 w-[140px]"
              placeholder="All statuses"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value || undefined)}
              options={[
                { label: 'All statuses', value: '' },
                { label: 'Active', value: 'active' },
                { label: 'Invited', value: 'invited' },
                { label: 'Disabled', value: 'disabled' },
              ]}
            />
          }
          actions={
            <>
              <Button size="sm" variant="secondary">
                Export
              </Button>
              <Button size="sm">Add user</Button>
            </>
          }
        />
        <Table
          columns={columns as any}
          data={filtered}
          rowKey={(row) => row.id}
          pageSize={5}
        />
      </div>
    )
  },
}
