// File: src/charts/ParetoChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ParetoChart } from './ParetoChart'
import type { ParetoChartDto } from './dto/pareto-chart.dto'

const meta: Meta<typeof ParetoChart> = {
  title: 'Charts/ParetoChart',
  component: ParetoChart,
}

export default meta

type Story = StoryObj<typeof ParetoChart>

const sampleConfig: ParetoChartDto = {
  title: 'Defects by cause',
  data: [
    { category: 'UI', value: 30 },
    { category: 'Backend', value: 50 },
    { category: 'Infra', value: 20 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
