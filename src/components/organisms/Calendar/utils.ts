import { addDays, format, subDays } from 'date-fns'
import type { CalendarViewType } from './types'

export const getLocalTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'local'
}

export const toDateString = (date: Date, locale?: import('date-fns').Locale) => {
  return format(date, 'yyyy-MM-dd', locale ? { locale } : undefined)
}

export const toDateTimeString = (date: Date, locale?: import('date-fns').Locale) => {
  return format(date, 'yyyy-MM-dd HH:mm', locale ? { locale } : undefined)
}

export const parseDateString = (value?: string): Date | undefined => {
  if (!value) return undefined
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d, 0, 0, 0, 0)
}

export const parseDateTimeString = (value?: string): Date | undefined => {
  if (!value) return undefined
  const [datePart, timePart] = value.split(' ')
  const [y, m, d] = datePart?.split('-').map(Number) ?? []
  if (!y || !m || !d) return undefined

  let hh = 0
  let mm = 0
  if (timePart) {
    const [h, mi] = timePart.split(':').map(Number)
    hh = Number.isFinite(h) ? h : 0
    mm = Number.isFinite(mi) ? mi : 0
  }

  return new Date(y, m - 1, d, hh, mm, 0, 0)
}

export const formatRangeTitle = (start: Date, endExclusive: Date, view: CalendarViewType, locale?: import('date-fns').Locale) => {
  const opt = locale ? { locale } : undefined

  if (view === 'month') {
    return format(start, 'MMMM yyyy', opt)
  }

  const end = subDays(endExclusive, 1)

  if (view === 'day') {
    return format(start, 'PPP', opt)
  }

  if (start.getFullYear() !== end.getFullYear()) {
    return `${format(start, 'PPP', opt)} - ${format(end, 'PPP', opt)}`
  }

  if (start.getMonth() !== end.getMonth()) {
    return `${format(start, 'MMM d', opt)} - ${format(end, 'MMM d, yyyy', opt)}`
  }

  return `${format(start, 'MMM d', opt)} - ${format(end, 'd, yyyy', opt)}`
}

export const normalizeEnd = (start: Date, end: Date | null, allDay: boolean) => {
  if (end && end.getTime() > start.getTime()) return end

  if (allDay) {
    return addDays(start, 1)
  }

  return new Date(start.getTime() + 60 * 60 * 1000)
}
