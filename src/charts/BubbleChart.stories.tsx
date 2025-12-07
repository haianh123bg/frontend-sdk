// File: src/charts/BubbleChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { BubbleChart } from './BubbleChart'
import type { BubbleChartDto } from './dto/bubble-chart.dto'

const meta: Meta<typeof BubbleChart> = {
  title: 'Charts/BubbleChart',
  component: BubbleChart,
}

export default meta

type Story = StoryObj<typeof BubbleChart>

const sampleConfig: BubbleChartDto = {
  title: 'Revenue vs Users',
  xAxisLabel: 'Users (k)',
  yAxisLabel: 'Revenue (k$)',
  series: [
    {
      name: 'Product',
      data: [
        { x: 10, y: 20, size: 20 },
        { x: 15, y: 35, size: 25 },
        { x: 25, y: 50, size: 30 },
      ],
    },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
