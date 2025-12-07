// File: src/charts/FunnelChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { FunnelChart } from './FunnelChart'
import type { FunnelChartDto } from './dto/funnel-chart.dto'

const meta: Meta<typeof FunnelChart> = {
  title: 'Charts/FunnelChart',
  component: FunnelChart,
}

export default meta

type Story = StoryObj<typeof FunnelChart>

const sampleConfig: FunnelChartDto = {
  title: 'Signup funnel',
  data: [
    { name: 'Visited', value: 1000 },
    { name: 'Signed up', value: 600 },
    { name: 'Activated', value: 300 },
    { name: 'Subscribed', value: 120 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 360,
  },
}
