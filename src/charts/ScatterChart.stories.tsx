import type { Meta, StoryObj } from '@storybook/react'
import { ScatterChart } from './ScatterChart'
import type { ScatterChartDto } from './dto/scatter-chart.dto'

const meta: Meta<typeof ScatterChart> = {
  title: 'Charts/ScatterChart',
  component: ScatterChart,
}

export default meta

type Story = StoryObj<typeof ScatterChart>

const sampleConfig: ScatterChartDto = {
  title: 'Height vs Weight',
  xAxisLabel: 'Height (cm)',
  yAxisLabel: 'Weight (kg)',
  series: [
    {
      name: 'Group A',
      data: [
        { x: 160, y: 55 },
        { x: 165, y: 58 },
        { x: 170, y: 62 },
        { x: 175, y: 70 },
      ],
    },
    {
      name: 'Group B',
      data: [
        { x: 155, y: 50 },
        { x: 168, y: 65 },
        { x: 172, y: 72 },
        { x: 180, y: 78 },
      ],
    },
  ],
}

export const Default: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
