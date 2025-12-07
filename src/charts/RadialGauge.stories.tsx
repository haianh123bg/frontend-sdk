// File: src/charts/RadialGauge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { RadialGauge } from './RadialGauge'
import type { RadialGaugeDto } from './dto/radial-gauge.dto'

const meta: Meta<typeof RadialGauge> = {
  title: 'Charts/RadialGauge',
  component: RadialGauge,
}

export default meta

type Story = StoryObj<typeof RadialGauge>

const sampleConfig: RadialGaugeDto = {
  title: 'CPU usage',
  value: 68,
  min: 0,
  max: 100,
  unit: '%',
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 260,
  },
}
