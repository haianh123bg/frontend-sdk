// File: src/charts/WaterfallChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { WaterfallChart } from './WaterfallChart'
import type { WaterfallChartDto } from './dto/waterfall-chart.dto'

const meta: Meta<typeof WaterfallChart> = {
  title: 'Charts/WaterfallChart',
  component: WaterfallChart,
}

export default meta

type Story = StoryObj<typeof WaterfallChart>

const sampleConfig: WaterfallChartDto = {
  title: 'Profit breakdown',
  data: [
    { label: 'Revenue', value: 500 },
    { label: 'COGS', value: -200 },
    { label: 'Marketing', value: -100 },
    { label: 'Operations', value: -80 },
    { label: 'Net profit', value: 120 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
