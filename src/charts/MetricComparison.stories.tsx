// File: src/charts/MetricComparison.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MetricComparison } from './MetricComparison'
import type { MetricComparisonDto } from './dto/metric-comparison.dto'

const meta: Meta<typeof MetricComparison> = {
  title: 'Charts/MetricComparison',
  component: MetricComparison,
}

export default meta

type Story = StoryObj<typeof MetricComparison>

const sampleConfig: MetricComparisonDto = {
  title: 'KPI vs Target',
  items: [
    { name: 'MRR', value: 80, target: 100 },
    { name: 'Churn', value: 4, target: 3 },
    { name: 'NPS', value: 60, target: 70 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
