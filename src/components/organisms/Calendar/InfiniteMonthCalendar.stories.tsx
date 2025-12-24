import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { CalendarEvent } from './types'
import { InfiniteMonthCalendar, type InfiniteMonthCalendarProps } from './InfiniteMonthCalendar'

const getLocalTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

const buildSampleEvents = (): CalendarEvent[] => {
  const tz = getLocalTimeZone()
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const d = now.getDate()

  const timedStart = new Date(y, m, d, 9, 0, 0)
  const timedEnd = new Date(y, m, d, 10, 30, 0)

  const allDayStart = new Date(y, m, d + 1, 0, 0, 0)
  const allDayEndExclusive = new Date(y, m, d + 2, 0, 0, 0)

  return [
    {
      id: 'evt-1',
      title: 'Daily standup',
      start: timedStart.toISOString(),
      end: timedEnd.toISOString(),
      allDay: false,
      timezone: tz,
      color: '#0ea5e9',
    },
    {
      id: 'evt-2',
      title: 'Workshop (all day)',
      start: allDayStart.toISOString(),
      end: allDayEndExclusive.toISOString(),
      allDay: true,
      timezone: tz,
      color: '#22c55e',
    },
  ]
}

const Harness: React.FC<InfiniteMonthCalendarProps> = (args) => {
  const [events, setEvents] = React.useState<CalendarEvent[]>(() => args.defaultEvents ?? buildSampleEvents())

  return (
    <div style={{ height: 900, padding: 16 }}>
      <InfiniteMonthCalendar
        {...args}
        events={events}
        onEventsChange={setEvents}
        onVisibleRangeChange={(range) => {
          // eslint-disable-next-line no-console
          console.log('visible range', range.start.toISOString(), range.endExclusive.toISOString())
          args.onVisibleRangeChange?.(range)
        }}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/Calendar/InfiniteMonthCalendar',
  component: InfiniteMonthCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    monthsBefore: { control: { type: 'number', min: 0, max: 600, step: 1 } },
    monthsAfter: { control: { type: 'number', min: 0, max: 600, step: 1 } },
    estimateMonthHeight: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    overscan: { control: { type: 'number', min: 0, max: 12, step: 1 } },
  },
} satisfies Meta<typeof InfiniteMonthCalendar>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    height: 820,
    monthsBefore: 120,
    monthsAfter: 120,
    estimateMonthHeight: 680,
    overscan: 2,
  },
  render: (args) => <Harness {...args} />,
}
