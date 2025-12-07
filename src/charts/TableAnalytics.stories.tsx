// File: src/charts/TableAnalytics.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TableAnalytics } from './TableAnalytics'
import type { TableAnalyticsDto } from './dto/table-analytics.dto'

interface RowData {
  id: string
  metric: string
  value: number
}

const meta: Meta<typeof TableAnalytics<RowData>> = {
  title: 'Charts/TableAnalytics',
  component: TableAnalytics<RowData>,
}

export default meta

type Story = StoryObj<typeof TableAnalytics<RowData>>

const sampleConfig: TableAnalyticsDto<RowData> = {
  title: 'Metrics table',
  columns: [
    { key: 'metric', label: 'Metric', align: 'left' },
    { key: 'value', label: 'Value', align: 'right' },
  ],
  rows: [
    { id: '1', metric: 'MRR', value: 10000 },
    { id: '2', metric: 'Active users', value: 2500 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
  },
}
