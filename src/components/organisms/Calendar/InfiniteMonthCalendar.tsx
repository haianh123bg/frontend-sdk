import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns'
import { Button } from '../../atoms/Button/Button'
import { Scroll } from '../../atoms/Scroll/Scroll'
import { generateId } from '../../../utils/id'
import type { CalendarEvent } from './types'
import { EventDialog, type EventDialogValue, eventToDialogValue } from './EventDialog'
import { getLocalTimeZone, normalizeEnd } from './utils'

export interface InfiniteMonthCalendarVisibleRange {
  start: Date
  endExclusive: Date
}

export interface InfiniteMonthCalendarProps {
  events?: CalendarEvent[]
  defaultEvents?: CalendarEvent[]
  onEventsChange?: (events: CalendarEvent[]) => void

  height?: number | string
  className?: string
  style?: React.CSSProperties

  dateFnsLocale?: import('date-fns').Locale
  initialMonth?: Date | string

  monthsBefore?: number
  monthsAfter?: number
  estimateMonthHeight?: number
  overscan?: number

  onVisibleRangeChange?: (range: InfiniteMonthCalendarVisibleRange) => void

  onEventCreate?: (event: CalendarEvent) => void | Promise<void>
  onEventUpdate?: (event: CalendarEvent) => void | Promise<void>
  onEventDelete?: (eventId: string) => void | Promise<void>
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const resolveInitialMonth = (value?: Date | string) => {
  if (!value) return startOfMonth(new Date())
  if (value instanceof Date) return startOfMonth(value)
  const d = parseISO(value)
  return startOfMonth(d)
}

const getWeekStartsOn = (locale?: import('date-fns').Locale): 0 | 1 | 2 | 3 | 4 | 5 | 6 => {
  const raw = (locale as any)?.options?.weekStartsOn
  if (typeof raw === 'number' && raw >= 0 && raw <= 6) return raw as 0 | 1 | 2 | 3 | 4 | 5 | 6
  return 1
}

const dayKey = (date: Date) => format(date, 'yyyy-MM-dd')

const buildEventMap = (events: CalendarEvent[]) => {
  const map = new Map<string, CalendarEvent[]>()

  for (const e of events) {
    const start = parseISO(e.start)
    const end = parseISO(e.end)

    if (e.allDay) {
      const lastInclusive = subDays(end, 1)
      let cur = new Date(start)
      cur.setHours(0, 0, 0, 0)

      const last = new Date(lastInclusive)
      last.setHours(0, 0, 0, 0)

      while (cur.getTime() <= last.getTime()) {
        const k = dayKey(cur)
        const arr = map.get(k)
        if (arr) arr.push(e)
        else map.set(k, [e])
        cur = addDays(cur, 1)
      }
      continue
    }

    const k = dayKey(start)
    const arr = map.get(k)
    if (arr) arr.push(e)
    else map.set(k, [e])
  }

  for (const [k, arr] of map.entries()) {
    map.set(
      k,
      [...arr].sort((a, b) => {
        const as = parseISO(a.start).getTime()
        const bs = parseISO(b.start).getTime()
        return as - bs
      })
    )
  }

  return map
}

export const InfiniteMonthCalendar: React.FC<InfiniteMonthCalendarProps> = ({
  events,
  defaultEvents,
  onEventsChange,
  height = 840,
  className,
  style,
  dateFnsLocale,
  initialMonth,
  monthsBefore = 120,
  monthsAfter = 120,
  estimateMonthHeight = 640,
  overscan = 2,
  onVisibleRangeChange,
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

  const baseMonth = React.useMemo(() => resolveInitialMonth(initialMonth), [initialMonth])
  const totalMonths = monthsBefore + monthsAfter + 1
  const centerIndex = monthsBefore
  const weekStartsOn = React.useMemo(() => getWeekStartsOn(dateFnsLocale), [dateFnsLocale])

  const monthForIndex = React.useCallback(
    (index: number) => addMonths(baseMonth, index - centerIndex),
    [baseMonth, centerIndex]
  )

  const eventsByDay = React.useMemo(() => buildEventMap(effectiveEvents), [effectiveEvents])

  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const monthVirtualizer = useVirtualizer({
    count: totalMonths,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateMonthHeight,
    overscan,
  })

  const virtualMonths = monthVirtualizer.getVirtualItems()
  const totalSize = monthVirtualizer.getTotalSize()

  const [currentTitle, setCurrentTitle] = React.useState<string>(() => format(baseMonth, 'MMMM yyyy', dateFnsLocale ? { locale: dateFnsLocale } : undefined))

  React.useEffect(() => {
    if (!virtualMonths.length) return
    const mid = virtualMonths[Math.floor(virtualMonths.length / 2)]
    const month = monthForIndex(mid.index)
    setCurrentTitle(format(month, 'MMMM yyyy', dateFnsLocale ? { locale: dateFnsLocale } : undefined))
  }, [dateFnsLocale, monthForIndex, virtualMonths])

  const lastRangeRef = React.useRef<string>('')
  React.useEffect(() => {
    if (!onVisibleRangeChange) return
    if (!virtualMonths.length) return

    const first = monthForIndex(virtualMonths[0].index)
    const last = monthForIndex(virtualMonths[virtualMonths.length - 1].index)
    const start = startOfMonth(first)
    const endExclusive = addMonths(startOfMonth(last), 1)

    const key = `${start.toISOString()}::${endExclusive.toISOString()}`
    if (key === lastRangeRef.current) return
    lastRangeRef.current = key

    onVisibleRangeChange({ start, endExclusive })
  }, [monthForIndex, onVisibleRangeChange, virtualMonths])

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

  const openCreateDialog = React.useCallback((date: Date) => {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = addDays(start, 1)

    setDialogMode('create')
    setDialogValue({
      title: '',
      start,
      end,
      allDay: true,
      timezone: getLocalTimeZone(),
      color: '#0ea5e9',
    })
    setDialogOpen(true)
  }, [])

  const openEditDialog = React.useCallback((event: CalendarEvent) => {
    setDialogMode('edit')
    setDialogValue(eventToDialogValue(event))
    setDialogOpen(true)
  }, [])

  const upsertEvent = React.useCallback(
    async (nextEvent: CalendarEvent) => {
      const exists = effectiveEvents.some((e) => e.id === nextEvent.id)
      const next = exists
        ? effectiveEvents.map((e) => (e.id === nextEvent.id ? nextEvent : e))
        : [nextEvent, ...effectiveEvents]

      commitEvents(next)

      if (exists) {
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

  const today = React.useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const scrollToToday = React.useCallback(() => {
    const nowMonth = startOfMonth(new Date())
    const diffMonths = (nowMonth.getFullYear() - baseMonth.getFullYear()) * 12 + (nowMonth.getMonth() - baseMonth.getMonth())
    const targetIndex = clamp(centerIndex + diffMonths, 0, totalMonths - 1)
    monthVirtualizer.scrollToIndex(targetIndex, { align: 'start' })
  }, [baseMonth, centerIndex, monthVirtualizer, totalMonths])

  React.useEffect(() => {
    requestAnimationFrame(() => {
      monthVirtualizer.scrollToIndex(centerIndex, { align: 'start' })
    })
  }, [centerIndex, monthVirtualizer])

  return (
    <div className={className} style={style}>
      <div className="rounded-2xl bg-surface p-3 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold text-text-primary">{currentTitle}</div>
          <Button variant="secondary" size="sm" onClick={scrollToToday}>
            Hôm nay
          </Button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-surface shadow-soft">
        <Scroll
          ref={scrollRef}
          direction="vertical"
          autoHide
          style={{ height }}
          className="relative"
        >
          <div style={{ height: totalSize }} className="relative w-full">
            {virtualMonths.map((vMonth) => {
              const month = monthForIndex(vMonth.index)
              const monthStart = startOfMonth(month)

              const gridStart = startOfWeek(monthStart, { weekStartsOn })
              const days: Date[] = []
              for (let i = 0; i < 42; i += 1) {
                days.push(addDays(gridStart, i))
              }

              const monthLabel = format(monthStart, 'MMMM yyyy', dateFnsLocale ? { locale: dateFnsLocale } : undefined)

              return (
                <div
                  key={vMonth.key}
                  data-index={vMonth.index}
                  ref={(el) => {
                    if (el) monthVirtualizer.measureElement(el)
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${vMonth.start}px)`,
                  }}
                  className="px-3 pb-6 pt-3"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold text-text-primary">{monthLabel}</div>
                  </div>

                  <div className="grid grid-cols-7 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
                    {Array.from({ length: 7 }).map((_, idx) => {
                      const date = addDays(startOfWeek(new Date(2024, 0, 1), { weekStartsOn }), idx)
                      const label = format(date, 'EEE', dateFnsLocale ? { locale: dateFnsLocale } : undefined)
                      return (
                        <div
                          key={`dow-${idx}`}
                          className="bg-surface px-2 py-2 text-xs font-semibold uppercase tracking-wide text-text-muted"
                        >
                          {label}
                        </div>
                      )
                    })}

                    {days.map((day) => {
                      const inMonth = isSameMonth(day, monthStart)
                      const isToday = isSameDay(day, today)
                      const k = dayKey(day)
                      const list = eventsByDay.get(k) ?? []
                      const visible = list.slice(0, 3)
                      const hiddenCount = Math.max(0, list.length - visible.length)

                      return (
                        <button
                          key={k}
                          type="button"
                          className={
                            'min-h-[104px] bg-surface px-2 py-2 text-left transition-colors hover:bg-slate-50 focus:outline-none ' +
                            (inMonth ? '' : 'opacity-55 ') +
                            (isToday ? 'ring-2 ring-primary-500 ring-inset ' : '')
                          }
                          onClick={() => openCreateDialog(day)}
                        >
                          <div className="flex items-start justify-between">
                            <div className={"text-xs font-semibold " + (inMonth ? 'text-text-primary' : 'text-text-muted')}>
                              {format(day, 'd', dateFnsLocale ? { locale: dateFnsLocale } : undefined)}
                            </div>
                          </div>

                          <div className="mt-1 flex flex-col gap-1">
                            {visible.map((ev) => (
                              <div
                                key={ev.id}
                                className="w-full truncate rounded-md px-2 py-1 text-[11px] font-medium text-white"
                                style={{ backgroundColor: ev.color ?? '#0ea5e9' }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openEditDialog(ev)
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    openEditDialog(ev)
                                  }
                                }}
                              >
                                {ev.title}
                              </div>
                            ))}

                            {hiddenCount > 0 && (
                              <div className="text-[11px] font-medium text-text-muted">+{hiddenCount} nữa</div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </Scroll>
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

InfiniteMonthCalendar.displayName = 'InfiniteMonthCalendar'
