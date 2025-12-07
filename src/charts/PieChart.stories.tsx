// File: src/charts/PieChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { PieChart } from './PieChart'
import type { PieChartDto } from './dto/pie-chart.dto'

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
}

export default meta

type Story = StoryObj<typeof PieChart>

const sampleConfig: PieChartDto = {
  title: 'User segments',
  data: [
    { name: 'Free', value: 40 },
    { name: 'Pro', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Enterprise', value: 15 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 320,
  },
}
