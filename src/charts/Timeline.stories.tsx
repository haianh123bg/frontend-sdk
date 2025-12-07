// File: src/charts/Timeline.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'
import type { TimelineDto } from './dto/timeline.dto'

const meta: Meta<typeof Timeline> = {
  title: 'Charts/Timeline',
  component: Timeline,
}

export default meta

type Story = StoryObj<typeof Timeline>

const sampleConfig: TimelineDto = {
  title: 'Signups over time',
  data: [
    { time: 'Jan', value: 20 },
    { time: 'Feb', value: 35 },
    { time: 'Mar', value: 50 },
    { time: 'Apr', value: 40 },
  ],
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 320,
  },
}
