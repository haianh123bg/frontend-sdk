import type * as React from 'react'

export type CalendarViewType = 'month' | 'week' | 'day'

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
  timezone: string
  color?: string
}

export interface CalendarProps {
  events?: CalendarEvent[]
  defaultEvents?: CalendarEvent[]
  onEventsChange?: (events: CalendarEvent[]) => void

  initialView?: CalendarViewType
  height?: number | string
  className?: string
  style?: React.CSSProperties

  dateFnsLocale?: import('date-fns').Locale

  editable?: boolean
  selectable?: boolean
  nowIndicator?: boolean

  onEventCreate?: (event: CalendarEvent) => void | Promise<void>
  onEventUpdate?: (event: CalendarEvent) => void | Promise<void>
  onEventDelete?: (eventId: string) => void | Promise<void>
}
