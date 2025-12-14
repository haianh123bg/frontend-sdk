import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { SpreadsheetGrid, type SpreadsheetGridColumnMeta } from './SpreadsheetGrid'

type DemoRow = {
  id: string
  name: string
  email: string
  age: number
  active: boolean
}

const createData = (count: number): DemoRow[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1
    return {
      id: String(n),
      name: `User ${n}`,
      email: `user${n}@example.com`,
      age: 18 + (n % 50),
      active: n % 3 !== 0,
    }
  })

const columns: ColumnDef<DemoRow, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 240,
    meta: { align: 'left' } satisfies SpreadsheetGridColumnMeta,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 320,
    meta: { align: 'left' } satisfies SpreadsheetGridColumnMeta,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 120,
    meta: { align: 'right' } satisfies SpreadsheetGridColumnMeta,
  },
  {
    accessorKey: 'active',
    header: 'Active',
    size: 140,
    cell: (info) => (info.getValue<boolean>() ? 'TRUE' : 'FALSE'),
    meta: { align: 'center' } satisfies SpreadsheetGridColumnMeta,
  },
]

const meta = {
  title: 'Organisms/SpreadsheetGrid',
  component: SpreadsheetGrid,
  tags: ['autodocs'],
  args: {
    data: createData(40),
    columns,
    getRowId: (row: DemoRow) => row.id,
    height: 520,
    virtualized: true,
    showSortIndicator: true,
    resizableColumns: true,
  },
} satisfies Meta<typeof SpreadsheetGrid<DemoRow>>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const [data, setData] = React.useState<DemoRow[]>(() => createData(40))

    return (
      <div className="w-[min(1200px,calc(100vw-24px))]">
        <SpreadsheetGrid
          data={data}
          columns={columns}
          getRowId={(row) => row.id}
          onDataChange={setData}
          height={520}
          virtualized={false}
          showSortIndicator
          resizableColumns
        />
      </div>
    )
  },
}

export const VirtualizedLargeData: Story = {
  render: () => {
    const [data, setData] = React.useState<DemoRow[]>(() => createData(5000))

    return (
      <div className="w-[min(1200px,calc(100vw-24px))]">
        <SpreadsheetGrid
          data={data}
          columns={columns}
          getRowId={(row) => row.id}
          onDataChange={setData}
          height={520}
          virtualized
          rowHeight={40}
          overscan={12}
          showSortIndicator
          resizableColumns
        />
      </div>
    )
  },
}
