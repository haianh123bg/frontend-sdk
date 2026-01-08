/**
 * CanvasGrid Stories
 */

import type { Meta, StoryObj } from '@storybook/react'
import { CanvasGrid } from './CanvasGrid'
import { UITypes } from './types'
import type { ColumnType, Row, TableType, ViewType } from './types'

const meta: Meta<typeof CanvasGrid> = {
  title: 'Organisms/CanvasGrid',
  component: CanvasGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CanvasGrid>

// Sample data
const sampleColumns: ColumnType[] = [
  {
    id: 'id',
    title: 'ID',
    uidt: UITypes.Number,
    width: 100,
    pk: true,
    system: true,
  },
  {
    id: 'title',
    title: 'Title',
    uidt: UITypes.SingleLineText,
    width: 200,
    required: true,
  },
  {
    id: 'description',
    title: 'Description',
    uidt: UITypes.LongText,
    width: 300,
  },
  {
    id: 'status',
    title: 'Status',
    uidt: UITypes.SingleSelect,
    width: 150,
    meta: {
      options: [
        { title: 'Todo', color: '#f59e0b' },
        { title: 'In Progress', color: '#3b82f6' },
        { title: 'Done', color: '#10b981' },
      ],
    },
  },
  {
    id: 'priority',
    title: 'Priority',
    uidt: UITypes.SingleSelect,
    width: 120,
    meta: {
      options: [
        { title: 'Low', color: '#10b981' },
        { title: 'Medium', color: '#f59e0b' },
        { title: 'High', color: '#ef4444' },
      ],
    },
  },
  {
    id: 'due_date',
    title: 'Due Date',
    uidt: UITypes.Date,
    width: 150,
  },
  {
    id: 'completed',
    title: 'Completed',
    uidt: UITypes.Checkbox,
    width: 100,
  },
  {
    id: 'rating',
    title: 'Rating',
    uidt: UITypes.Rating,
    width: 150,
  },
  {
    id: 'progress',
    title: 'Progress',
    uidt: UITypes.Percent,
    width: 120,
  },
  {
    id: 'budget',
    title: 'Budget',
    uidt: UITypes.Currency,
    width: 140,
  },
]

const generateSampleData = (count: number): Map<number, Row> => {
  const data = new Map<number, Row>()

  for (let i = 0; i < count; i++) {
    data.set(i, {
      row: {
        id: i + 1,
        title: `Task ${i + 1}`,
        description: `This is a detailed description for task ${i + 1}`,
        status: ['Todo', 'In Progress', 'Done'][Math.floor(Math.random() * 3)],
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        due_date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
        completed: Math.random() > 0.5,
        rating: Math.floor(Math.random() * 5) + 1,
        progress: Math.floor(Math.random() * 101),
        budget: Math.random() * 10000,
      },
      oldRow: {},
      rowMeta: {
        rowIndex: i,
        isNew: false,
        isDirty: false,
      },
    })
  }

  return data
}

const sampleMeta: TableType = {
  id: 'table-1',
  title: 'Tasks',
  columns: sampleColumns,
  views: [],
}

const sampleView: ViewType = {
  id: 'view-1',
  title: 'All Tasks',
  type: 'grid' as any,
  column_order: sampleColumns.map((c) => c.id),
}

export const Default: Story = {
  args: {
    meta: sampleMeta,
    view: sampleView,
    data: generateSampleData(50),
    totalRows: 50,
    loadData: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return Array.from(generateSampleData(50).values())
    },
    updateOrSaveRow: async (row: Row, property?: string) => {
      console.log('Saving row:', row, 'property:', property)
      await new Promise((resolve) => setTimeout(resolve, 500))
      return row
    },
    addEmptyRow: () => {
      const newRow: Row = {
        row: {
          id: Date.now(),
          title: '',
          description: '',
          status: 'Todo',
          priority: 'Medium',
        },
        oldRow: {},
        rowMeta: {
          isNew: true,
          isDirty: false,
        },
      }
      return newRow
    },
    deleteRow: async (rowIndex: number) => {
      console.log('Deleting row:', rowIndex)
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
  },
}

export const LargeDataset: Story = {
  args: {
    ...Default.args,
    data: generateSampleData(10000),
    totalRows: 10000,
    rowHeightEnum: 1, // Small row height for better density
  },
}

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
}

export const DenseRows: Story = {
  args: {
    ...Default.args,
    rowHeightEnum: 1, // Small
  },
}

export const SpaciousRows: Story = {
  args: {
    ...Default.args,
    rowHeightEnum: 6, // Extra large
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    data: new Map(),
    totalRows: 0,
    loadData: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      return Array.from(generateSampleData(50).values())
    },
  },
}
