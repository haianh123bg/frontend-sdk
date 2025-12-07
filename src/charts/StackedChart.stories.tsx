// File: src/charts/StackedChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { StackedChart } from './StackedChart'
import type { StackedChartDto } from './dto/stacked-chart.dto'

const meta: Meta<typeof StackedChart> = {
  title: 'Charts/StackedChart',
  component: StackedChart,
}

export default meta

type Story = StoryObj<typeof StackedChart>

const verticalConfig: StackedChartDto = {
  title: 'Sessions by channel',
  xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  series: [
    { name: 'Organic', data: [120, 132, 101, 134, 90] },
    { name: 'Paid', data: [60, 72, 71, 74, 190] },
  ],
  orientation: 'vertical',
}

export const Vertical: Story = {
  args: {
    config: verticalConfig,
    height: 360,
  },
}
