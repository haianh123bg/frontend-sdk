import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Calendar } from './Calendar'
import type { CalendarEvent, CalendarProps } from './types'

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

  const afternoonStart = new Date(y, m, d + 2, 14, 0, 0)
  const afternoonEnd = new Date(y, m, d + 2, 16, 0, 0)

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
    {
      id: 'evt-3',
      title: 'Design review',
      start: afternoonStart.toISOString(),
      end: afternoonEnd.toISOString(),
      allDay: false,
      timezone: tz,
      color: '#a855f7',
    },
  ]
}

const CalendarStoryHarness: React.FC<CalendarProps> = (args) => {
  const [events, setEvents] = React.useState<CalendarEvent[]>(() => args.defaultEvents ?? buildSampleEvents())

  return (
    <div style={{ height: 840, padding: 16 }}>
      <Calendar
        {...args}
        events={events}
        onEventsChange={setEvents}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialView: { control: 'select', options: ['month', 'week', 'day'] },
    editable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    nowIndicator: { control: 'boolean' },
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Week: Story = {
  args: {
    initialView: 'week',
    height: '780px',
    editable: true,
    selectable: true,
    nowIndicator: true,
  },
  render: (args) => <CalendarStoryHarness {...args} />,
}

export const Month: Story = {
  args: {
    initialView: 'month',
    height: '780px',
    editable: true,
    selectable: true,
    nowIndicator: true,
  },
  render: (args) => <CalendarStoryHarness {...args} />,
}

export const Day: Story = {
  args: {
    initialView: 'day',
    height: '780px',
    editable: true,
    selectable: true,
    nowIndicator: true,
  },
  render: (args) => <CalendarStoryHarness {...args} />,
}
