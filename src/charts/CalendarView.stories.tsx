// File: src/charts/CalendarView.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarView } from './CalendarView'
import type { CalendarViewDto } from './dto/calendar-view.dto'

const meta: Meta<typeof CalendarView> = {
  title: 'Charts/CalendarView',
  component: CalendarView,
}

export default meta

type Story = StoryObj<typeof CalendarView>

const sampleConfig: CalendarViewDto = {
  title: 'Daily events',
  data: [
    { date: '2024-01-01', value: 3 },
    { date: '2024-01-02', value: 1 },
    { date: '2024-01-05', value: 5 },
    { date: '2024-01-10', value: 2 },
  ],
  year: 2024,
}

export const Basic: Story = {
  args: {
    config: sampleConfig,
    height: 320,
  },
}
