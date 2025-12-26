import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'
import type { BarChartDto } from './dto/bar-chart.dto'

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
}

export default meta

type Story = StoryObj<typeof BarChart>

const sampleConfig: BarChartDto = {
  title: 'Orders by day',
  xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  series: [
    { name: 'Orders', data: [120, 132, 101, 134, 90] },
    { name: 'Returns', data: [12, 18, 9, 14, 10] },
  ],
  orientation: 'vertical',
  stacked: false,
}

export const Default: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
