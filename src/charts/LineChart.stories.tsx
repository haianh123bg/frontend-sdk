import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'
import type { LineChartDto } from './dto/line-chart.dto'

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
}

export default meta

type Story = StoryObj<typeof LineChart>

const sampleConfig: LineChartDto = {
  title: 'Users over time',
  xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Active', data: [120, 132, 101, 134, 90, 230] },
    { name: 'New', data: [60, 72, 71, 74, 190, 220] },
  ],
  smooth: true,
}

export const Default: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
