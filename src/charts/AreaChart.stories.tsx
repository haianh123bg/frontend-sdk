// File: src/charts/AreaChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart } from './AreaChart'
import type { AreaChartDto } from './dto/area-chart.dto'

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
}

export default meta

type Story = StoryObj<typeof AreaChart>

const sampleConfig: AreaChartDto = {
  title: 'Revenue over time',
  xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Product A', data: [120, 132, 101, 134, 90, 230] },
    { name: 'Product B', data: [220, 182, 191, 234, 290, 330] },
  ],
  stacked: true,
}

export const Stacked: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
