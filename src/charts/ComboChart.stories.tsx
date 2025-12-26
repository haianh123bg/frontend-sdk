import type { Meta, StoryObj } from '@storybook/react'
import { ComboChart } from './ComboChart'
import type { ComboChartDto } from './dto/combo-chart.dto'

const meta: Meta<typeof ComboChart> = {
  title: 'Charts/ComboChart',
  component: ComboChart,
}

export default meta

type Story = StoryObj<typeof ComboChart>

const sampleConfig: ComboChartDto = {
  title: 'Revenue & Margin',
  xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  leftAxisLabel: 'Revenue',
  rightAxisLabel: 'Margin %',
  barSeries: [{ name: 'Revenue', data: [120, 132, 101, 134, 90, 230] }],
  lineSeries: [{ name: 'Margin %', data: [18, 22, 16, 24, 19, 26] }],
}

export const Default: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
