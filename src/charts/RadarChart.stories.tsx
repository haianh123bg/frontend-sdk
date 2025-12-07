// File: src/charts/RadarChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart } from './RadarChart'
import type { RadarChartDto } from './dto/radar-chart.dto'

const meta: Meta<typeof RadarChart> = {
  title: 'Charts/RadarChart',
  component: RadarChart,
}

export default meta

type Story = StoryObj<typeof RadarChart>

const sampleConfig: RadarChartDto = {
  title: 'Skill matrix',
  indicators: [
    { name: 'Frontend', max: 100 },
    { name: 'Backend', max: 100 },
    { name: 'DevOps', max: 100 },
    { name: 'UI/UX', max: 100 },
    { name: 'Communication', max: 100 },
  ],
  series: [
    { name: 'Alice', values: [80, 70, 60, 75, 90] },
    { name: 'Bob', values: [60, 85, 70, 55, 80] },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
