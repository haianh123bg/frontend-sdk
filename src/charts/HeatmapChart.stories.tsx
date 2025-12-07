// File: src/charts/HeatmapChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { HeatmapChart } from './HeatmapChart'
import type { HeatmapDto } from './dto/heatmap.dto'

const meta: Meta<typeof HeatmapChart> = {
  title: 'Charts/HeatmapChart',
  component: HeatmapChart,
}

export default meta

type Story = StoryObj<typeof HeatmapChart>

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const hours = ['8h', '10h', '12h', '14h', '16h']

const sampleValues: number[][] = [
  [5, 1, 0, 2, 3],
  [3, 2, 1, 4, 2],
  [0, 3, 5, 2, 1],
  [2, 4, 3, 1, 0],
  [1, 0, 2, 3, 4],
]

const sampleConfig: HeatmapDto = {
  title: 'Activity heatmap',
  xLabels: hours,
  yLabels: days,
  values: sampleValues,
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
