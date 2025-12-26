import type { Meta, StoryObj } from '@storybook/react'
import { BoxplotChart } from './BoxplotChart'
import type { BoxplotChartDto } from './dto/boxplot-chart.dto'

const meta: Meta<typeof BoxplotChart> = {
  title: 'Charts/BoxplotChart',
  component: BoxplotChart,
}

export default meta

type Story = StoryObj<typeof BoxplotChart>

const sampleConfig: BoxplotChartDto = {
  title: 'Latency distribution',
  xLabels: ['API A', 'API B', 'API C', 'API D'],
  series: [
    {
      name: 'P95 (box)',
      data: [
        [12, 18, 24, 32, 55],
        [10, 16, 22, 29, 48],
        [8, 12, 18, 25, 40],
        [15, 20, 28, 36, 60],
      ],
    },
  ],
  outliers: [
    [0, 80],
    [1, 70],
    [3, 95],
  ],
}

export const Default: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
