import type { Meta, StoryObj } from '@storybook/react'
import { GenericComboChart } from './GenericComboChart'
import type { GenericComboChartDto } from './dto/generic-combo-chart.dto'

const meta: Meta<typeof GenericComboChart> = {
  title: 'Charts/GenericComboChart',
  component: GenericComboChart,
}

export default meta

type Story = StoryObj<typeof GenericComboChart>

const sampleConfig: GenericComboChartDto = {
  title: 'Revenue & Margin (generic)',
  xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  yAxes: [{ label: 'Revenue', position: 'left' }, { label: 'Margin %', position: 'right', min: 0, max: 40 }],
  series: [
    {
      name: 'Revenue',
      type: 'bar',
      yAxisIndex: 0,
      data: [120, 132, 101, 134, 90, 230],
    },
    {
      name: 'Margin %',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      data: [18, 22, 16, 24, 19, 26],
    },
    {
      name: 'Forecast',
      type: 'line',
      yAxisIndex: 0,
      smooth: true,
      data: [110, 120, 115, 140, 130, 210],
    },
  ],
}

export const Default: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
