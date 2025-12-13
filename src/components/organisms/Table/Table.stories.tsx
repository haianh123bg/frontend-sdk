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

type EditableRow = {
  id: string
  name: string
  email: string
  role: string
  [key: string]: any
}

type AllTypesRow = {
  id: string
  text: string
  number: number
  boolean: boolean
  date: string
  datetime: string
  option: string
  multi: string[]
  numberRange: { min?: number; max?: number }
  dateRange: { start?: string; end?: string }
  datetimeRange: { start?: string; end?: string }
  [key: string]: any
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

const docsSourceCode = `import * as React from 'react'
import { Table, type TableColumn } from './Table'

type UserRow = {
  id: string
  name: string
  email: string
  role: string
}

const data: UserRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
]

const columns: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]

export const Example = () => {
  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      striped
      size="md"
      pageSize={3}
      pageSizeOptions={[3, 5, 10]}
      showSortIndicator
    />
  )
}`

const meta = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        code: docsSourceCode,
        language: 'tsx',
      },
    },
  },
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

const docsSourceCodeVirtualizedLargeData = `import * as React from 'react'
import type { VisibilityState } from '@tanstack/react-table'
import { Table, type TableColumn } from './Table'
import { TableToolbar } from './TableToolbar'

type UserRow = {
  id: string
  name: string
  email: string
  role: string
}

const columns: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]

export const Example = ({ largeData }: { largeData: UserRow[] }) => {
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
          setColumnVisibility((prev) => ({ ...prev, [id]: visible }))
        }}
      />
      <Table
        columns={columns}
        data={filtered}
        rowKey={(row) => row.id}
        pageSize={100}
        pageSizeOptions={[50, 100, 200, 500, 1000]}
        columnVisibility={columnVisibility}
        virtualized
        virtualRowHeight={44}
        virtualBodyMaxHeight={420}
      />
    </div>
  )
}`

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
  parameters: {
    docs: {
      source: {
        code: docsSourceCodeVirtualizedLargeData,
        language: 'tsx',
      },
    },
  },
}

const docsSourceCodeEditableSpreadsheet = `import * as React from 'react'
import { Table, type TableColumn } from './Table'

type EditableRow = {
  id: string
  name: string
  email: string
  role: string
  [key: string]: any
}

const initialColumns: TableColumn<EditableRow>[] = [
  { key: 'id', label: 'ID', valueType: 'text' },
  { key: 'name', label: 'Name', valueType: 'text' },
  { key: 'email', label: 'Email', valueType: 'text' },
  { key: 'role', label: 'Role', valueType: 'text' },
]

const initialData: EditableRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
]

export const Example = () => {
  const [columns, setColumns] = React.useState<TableColumn<EditableRow>[]>(initialColumns)
  const [data, setData] = React.useState<EditableRow[]>(initialData)
  const nextIdRef = React.useRef(3)

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row, index) => row.id ?? String(index)}
      pageSize={50}
      pageSizeOptions={[50]}
      editable={{
        enabled: true,
        valueTypeOptions: [
          { label: 'Text', value: 'text', defaultValue: '' },
          { label: 'Number', value: 'number', defaultValue: 0 },
          { label: 'Boolean', value: 'boolean', defaultValue: false },
        ],
        onColumnsChange: setColumns,
        onDataChange: (next) => {
          setData(() => {
            const normalized = next.map((row) => {
              if (row?.id) return row
              const id = String(nextIdRef.current++)
              return { ...row, id }
            })
            return normalized
          })
        },
      }}
    />
  )
}`

export const EditableSpreadsheet: Story = {
  render: () => {
    const initialColumns: TableColumn<EditableRow>[] = [
      { key: 'id', label: 'ID', sortable: false, valueType: 'text' },
      { key: 'name', label: 'Name', sortable: true, valueType: 'text' },
      { key: 'email', label: 'Email', sortable: true, valueType: 'text' },
      { key: 'role', label: 'Role', sortable: true, valueType: 'text' },
    ]

    const initialData: EditableRow[] = data.map((row) => ({ ...row }))

    const [editableColumns, setEditableColumns] = React.useState<TableColumn<EditableRow>[]>(initialColumns)
    const [editableData, setEditableData] = React.useState<EditableRow[]>(initialData)
    const nextIdRef = React.useRef(100)

    return (
      <Table
        columns={editableColumns}
        data={editableData}
        rowKey={(row, index) => row.id ?? String(index)}
        pageSize={50}
        pageSizeOptions={[50]}
        showSortIndicator
        editable={{
          enabled: true,
          valueTypeOptions: [
            { label: 'Text', value: 'text', defaultValue: '' },
            { label: 'Number', value: 'number', defaultValue: 0 },
            { label: 'Boolean', value: 'boolean', defaultValue: false },
          ],
          addColumnLabel: '+ Thêm cột',
          addRowLabel: '+ Thêm hàng',
          columnNamePlaceholder: 'Tên thuộc tính',
          valueTypePlaceholder: 'Kiểu giá trị',
          onColumnsChange: setEditableColumns,
          onDataChange: (next) => {
            setEditableData(() => {
              const normalized = next.map((row) => {
                if (row?.id) return row
                const id = String(nextIdRef.current++)
                return { ...row, id }
              })
              return normalized
            })
          },
        }}
      />
    )
  },
  parameters: {
    docs: {
      source: {
        code: docsSourceCodeEditableSpreadsheet,
        language: 'tsx',
      },
    },
  },
}

const docsSourceCodeEditableAllTypes = `import * as React from 'react'
import { Table, type TableColumn } from './Table'

type Row = {
  id: string
  text: string
  number: number
  boolean: boolean
  date: string
  datetime: string
  option: string
  multi: string[]
  numberRange: { min?: number; max?: number }
  dateRange: { start?: string; end?: string }
  datetimeRange: { start?: string; end?: string }
}

export const Example = () => {
  const [columns, setColumns] = React.useState<TableColumn<Row>[]>([
    { key: 'id', label: 'ID', valueType: 'text' },
    { key: 'text', label: 'Text', valueType: 'text' },
    { key: 'number', label: 'Number', valueType: 'number' },
    { key: 'boolean', label: 'Boolean', valueType: 'boolean' },
    { key: 'date', label: 'Date', valueType: 'date' },
    { key: 'datetime', label: 'Datetime', valueType: 'datetime' },
    {
      key: 'option',
      label: 'Option',
      valueType: 'option',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
    {
      key: 'multi',
      label: 'Multi',
      valueType: 'multi',
      options: [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
      ],
    },
    { key: 'numberRange', label: 'Number Range', valueType: 'number_range' },
    { key: 'dateRange', label: 'Date Range', valueType: 'date_range' },
    { key: 'datetimeRange', label: 'Datetime Range', valueType: 'datetime_range' },
  ])

  const [data, setData] = React.useState<Row[]>([
    {
      id: '1',
      text: 'Hello',
      number: 10,
      boolean: true,
      date: '2025-01-01',
      datetime: '2025-01-01 08:30',
      option: 'admin',
      multi: ['red', 'blue'],
      numberRange: { min: 1, max: 5 },
      dateRange: { start: '2025-01-01', end: '2025-01-15' },
      datetimeRange: { start: '2025-01-01 08:30', end: '2025-01-02 12:00' },
    },
  ])

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      pageSize={50}
      pageSizeOptions={[50]}
      resizableColumns
      editable={{
        enabled: true,
        valueTypeOptions: [
          { label: 'Text', value: 'text', defaultValue: '' },
          { label: 'Number', value: 'number', defaultValue: 0 },
          { label: 'Boolean', value: 'boolean', defaultValue: false },
          { label: 'Date', value: 'date', defaultValue: '' },
          { label: 'Datetime', value: 'datetime', defaultValue: '' },
          { label: 'Number Range', value: 'number_range', defaultValue: { min: undefined, max: undefined } },
          { label: 'Date Range', value: 'date_range', defaultValue: { start: undefined, end: undefined } },
          { label: 'Datetime Range', value: 'datetime_range', defaultValue: { start: undefined, end: undefined } },
        ],
        onColumnsChange: setColumns,
        onDataChange: setData,
      }}
    />
  )
}`

export const EditableAllTypes: Story = {
  render: () => {
    const initialColumns: TableColumn<AllTypesRow>[] = [
      { key: 'id', label: 'ID', valueType: 'text' },
      { key: 'text', label: 'Text', valueType: 'text' },
      { key: 'number', label: 'Number', valueType: 'number' },
      { key: 'boolean', label: 'Boolean', valueType: 'boolean' },
      { key: 'date', label: 'Date', valueType: 'date' },
      { key: 'datetime', label: 'Datetime', valueType: 'datetime' },
      {
        key: 'option',
        label: 'Option',
        valueType: 'option',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ],
      },
      {
        key: 'multi',
        label: 'Multi',
        valueType: 'multi',
        options: [
          { label: 'Red', value: 'red' },
          { label: 'Green', value: 'green' },
          { label: 'Blue', value: 'blue' },
        ],
      },
      { key: 'numberRange', label: 'Number Range', valueType: 'number_range' },
      { key: 'dateRange', label: 'Date Range', valueType: 'date_range' },
      { key: 'datetimeRange', label: 'Datetime Range', valueType: 'datetime_range' },
    ]

    const [editableColumns, setEditableColumns] = React.useState<TableColumn<AllTypesRow>[]>(initialColumns)
    const [editableData, setEditableData] = React.useState<AllTypesRow[]>([
      {
        id: '1',
        text: 'Hello',
        number: 10,
        boolean: true,
        date: '2025-01-01',
        datetime: '2025-01-01 08:30',
        option: 'admin',
        multi: ['red', 'blue'],
        numberRange: { min: 1, max: 5 },
        dateRange: { start: '2025-01-01', end: '2025-01-15' },
        datetimeRange: { start: '2025-01-01 08:30', end: '2025-01-02 12:00' },
      },
    ])

    const nextIdRef = React.useRef(2)

    return (
      <Table
        columns={editableColumns}
        data={editableData}
        rowKey={(row, index) => row.id ?? String(index)}
        pageSize={50}
        pageSizeOptions={[50]}
        resizableColumns
        rowActions={{ enabled: true, allowInsertBelow: true, allowReorder: true }}
        editable={{
          enabled: true,
          valueTypeOptions: [
            { label: 'Text', value: 'text', defaultValue: '' },
            { label: 'Number', value: 'number', defaultValue: 0 },
            { label: 'Boolean', value: 'boolean', defaultValue: false },
            { label: 'Date', value: 'date', defaultValue: '' },
            { label: 'Datetime', value: 'datetime', defaultValue: '' },
            { label: 'Number Range', value: 'number_range', defaultValue: { min: undefined, max: undefined } },
            { label: 'Date Range', value: 'date_range', defaultValue: { start: undefined, end: undefined } },
            { label: 'Datetime Range', value: 'datetime_range', defaultValue: { start: undefined, end: undefined } },
          ],
          onColumnsChange: setEditableColumns,
          onDataChange: (next) => {
            setEditableData(() => {
              const normalized = next.map((row) => {
                if (row?.id) return row
                const id = String(nextIdRef.current++)
                return { ...row, id }
              })
              return normalized
            })
          },
        }}
      />
    )
  },
  parameters: {
    docs: {
      source: {
        code: docsSourceCodeEditableAllTypes,
        language: 'tsx',
      },
    },
  },
}
