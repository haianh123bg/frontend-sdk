import * as React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { type DateClickArg, type EventResizeDoneArg } from '@fullcalendar/interaction'
import type { DatesSetArg, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core'
import { isSameDay } from 'date-fns'
import { generateId } from '../../../utils/id'
import type { CalendarEvent, CalendarProps, CalendarViewType } from './types'
import { CalendarToolbar } from './CalendarToolbar'
import { EventDialog, type EventDialogValue, eventToDialogValue } from './EventDialog'
import { formatRangeTitle, getLocalTimeZone, normalizeEnd } from './utils'
import './Calendar.css'

const mapView = (type: string): CalendarViewType => {
  if (type === 'dayGridMonth') return 'month'
  if (type === 'timeGridDay') return 'day'
  return 'week'
}

const toFullCalendarView = (view: CalendarViewType) => {
  if (view === 'month') return 'dayGridMonth'
  if (view === 'day') return 'timeGridDay'
  return 'timeGridWeek'
}

export const Calendar: React.FC<CalendarProps> = ({
  events,
  defaultEvents,
  onEventsChange,
  initialView = 'week',
  height = '100%',
  className,
  style,
  dateFnsLocale,
  editable = true,
  selectable = true,
  nowIndicator = true,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
}) => {
  const isControlled = events !== undefined
  const [internalEvents, setInternalEvents] = React.useState<CalendarEvent[]>(defaultEvents ?? [])

  const effectiveEvents = isControlled ? (events ?? []) : internalEvents

  const commitEvents = React.useCallback(
    (next: CalendarEvent[]) => {
      if (!isControlled) {
        setInternalEvents(next)
      }
      onEventsChange?.(next)
    },
    [isControlled, onEventsChange]
  )

  const calendarRef = React.useRef<FullCalendar | null>(null)

  const [currentView, setCurrentView] = React.useState<CalendarViewType>(initialView)
  const [currentTitle, setCurrentTitle] = React.useState<string>('')
  const [isToday, setIsToday] = React.useState(false)

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogMode, setDialogMode] = React.useState<'create' | 'edit'>('create')
  const [dialogValue, setDialogValue] = React.useState<EventDialogValue>(() => {
    const now = new Date()
    const start = now
    const end = new Date(now.getTime() + 60 * 60 * 1000)

    return {
      title: '',
      start,
      end,
      allDay: false,
      timezone: getLocalTimeZone(),
      color: '#0ea5e9',
    }
  })

  const eventInputs = React.useMemo<EventInput[]>(
    () =>
      effectiveEvents.map((e) => ({
        id: e.id,
        title: e.title,
        start: e.start,
        end: e.end,
        allDay: e.allDay,
        backgroundColor: e.color,
        borderColor: e.color,
        extendedProps: {
          timezone: e.timezone,
        },
      })),
    [effectiveEvents]
  )

  const openCreateDialog = React.useCallback(
    (start: Date, end: Date, allDay: boolean) => {
      setDialogMode('create')
      setDialogValue({
        title: '',
        start,
        end,
        allDay,
        timezone: getLocalTimeZone(),
        color: '#0ea5e9',
      })
      setDialogOpen(true)
    },
    []
  )

  const openEditDialog = React.useCallback((event: CalendarEvent) => {
    setDialogMode('edit')
    setDialogValue(eventToDialogValue(event))
    setDialogOpen(true)
  }, [])

  const handleDatesSet = React.useCallback(
    (arg: DatesSetArg) => {
      const view = mapView(arg.view.type)
      setCurrentView(view)
      setCurrentTitle(formatRangeTitle(arg.start, arg.end, view, dateFnsLocale))
      setIsToday(isSameDay(arg.view.calendar.getDate(), new Date()))
    },
    [dateFnsLocale]
  )

  const handleDateClick = React.useCallback(
    (arg: DateClickArg) => {
      const start = arg.date
      const end = arg.allDay ? new Date(start.getTime() + 24 * 60 * 60 * 1000) : new Date(start.getTime() + 60 * 60 * 1000)
      openCreateDialog(start, end, arg.allDay)
    },
    [openCreateDialog]
  )

  const handleEventClick = React.useCallback(
    (arg: EventClickArg) => {
      const start = arg.event.start
      if (!start) return

      const timezone =
        typeof (arg.event.extendedProps as any)?.timezone === 'string'
          ? ((arg.event.extendedProps as any).timezone as string)
          : getLocalTimeZone()

      const end = normalizeEnd(start, arg.event.end, !!arg.event.allDay)

      const current: CalendarEvent = {
        id: arg.event.id,
        title: arg.event.title,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: !!arg.event.allDay,
        timezone,
        color: (arg.event.backgroundColor as string) || undefined,
      }

      openEditDialog(current)
    },
    [openEditDialog]
  )

  const upsertEvent = React.useCallback(
    async (nextEvent: CalendarEvent) => {
      const next = effectiveEvents.some((e) => e.id === nextEvent.id)
        ? effectiveEvents.map((e) => (e.id === nextEvent.id ? nextEvent : e))
        : [nextEvent, ...effectiveEvents]

      commitEvents(next)

      if (effectiveEvents.some((e) => e.id === nextEvent.id)) {
        await onEventUpdate?.(nextEvent)
      } else {
        await onEventCreate?.(nextEvent)
      }
    },
    [commitEvents, effectiveEvents, onEventCreate, onEventUpdate]
  )

  const removeEvent = React.useCallback(
    async (eventId: string) => {
      const next = effectiveEvents.filter((e) => e.id !== eventId)
      commitEvents(next)
      await onEventDelete?.(eventId)
    },
    [commitEvents, effectiveEvents, onEventDelete]
  )

  const handleEventDrop = React.useCallback(
    async (arg: EventDropArg) => {
      const start = arg.event.start
      if (!start) return

      const timezone =
        typeof (arg.event.extendedProps as any)?.timezone === 'string'
          ? ((arg.event.extendedProps as any).timezone as string)
          : getLocalTimeZone()

      const end = normalizeEnd(start, arg.event.end, !!arg.event.allDay)

      await upsertEvent({
        id: arg.event.id,
        title: arg.event.title,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: !!arg.event.allDay,
        timezone,
        color: (arg.event.backgroundColor as string) || undefined,
      })
    },
    [upsertEvent]
  )

  const handleEventResize = React.useCallback(
    async (arg: EventResizeDoneArg) => {
      const start = arg.event.start
      if (!start) return

      const timezone =
        typeof (arg.event.extendedProps as any)?.timezone === 'string'
          ? ((arg.event.extendedProps as any).timezone as string)
          : getLocalTimeZone()

      const end = normalizeEnd(start, arg.event.end, !!arg.event.allDay)

      await upsertEvent({
        id: arg.event.id,
        title: arg.event.title,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: !!arg.event.allDay,
        timezone,
        color: (arg.event.backgroundColor as string) || undefined,
      })
    },
    [upsertEvent]
  )

  const handleDialogSave = React.useCallback(
    async (value: EventDialogValue) => {
      const id = value.id ?? generateId()
      const start = value.start
      const end = normalizeEnd(start, value.end, value.allDay)

      await upsertEvent({
        id,
        title: value.title,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: value.allDay,
        timezone: value.timezone,
        color: value.color,
      })

      setDialogOpen(false)
    },
    [upsertEvent]
  )

  const api = calendarRef.current?.getApi()

  return (
    <div
      className={className}
      style={style}
    >
      <div className="rounded-2xl bg-surface p-3 shadow-soft">
        <CalendarToolbar
          title={currentTitle}
          view={currentView}
          isToday={isToday}
          onPrev={() => api?.prev()}
          onNext={() => api?.next()}
          onToday={() => api?.today()}
          onViewChange={(v) => api?.changeView(toFullCalendarView(v))}
        />
      </div>

      <div className="mt-3 rounded-2xl bg-surface p-3 shadow-soft">
        <div className="rai-calendar" style={{ height }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={toFullCalendarView(initialView)}
            headerToolbar={false}
            height={height}
            events={eventInputs}
            editable={editable}
            selectable={selectable}
            nowIndicator={nowIndicator}
            selectMirror
            dayMaxEvents
            stickyHeaderDates
            expandRows
            scrollTime="08:00:00"
            slotDuration="00:30:00"
            slotLabelInterval="01:00"
            allDaySlot
            datesSet={handleDatesSet}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
          />
        </div>
      </div>

      <EventDialog
        open={dialogOpen}
        mode={dialogMode}
        value={dialogValue}
        dateFnsLocale={dateFnsLocale}
        onCancel={() => setDialogOpen(false)}
        onSave={handleDialogSave}
        onDelete={
          dialogMode === 'edit' && dialogValue.id
            ? () => {
                const id = dialogValue.id
                if (!id) return
                void removeEvent(id)
                setDialogOpen(false)
              }
            : undefined
        }
      />
    </div>
  )
}

Calendar.displayName = 'Calendar'
