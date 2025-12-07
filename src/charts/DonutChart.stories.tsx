// File: src/charts/DonutChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { DonutChart } from './DonutChart'
import type { DonutChartDto } from './dto/donut-chart.dto'

const meta: Meta<typeof DonutChart> = {
  title: 'Charts/DonutChart',
  component: DonutChart,
}

export default meta

type Story = StoryObj<typeof DonutChart>

const sampleConfig: DonutChartDto = {
  title: 'Traffic source',
  data: [
    { value: 1048, name: 'Search' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Ads' },
    { value: 300, name: 'Referral' },
  ],
  innerRadiusPercent: 55,
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 320,
  },
}
