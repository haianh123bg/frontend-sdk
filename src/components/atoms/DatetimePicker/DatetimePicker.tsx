// File: src/components/atoms/DatetimePicker/DatetimePicker.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Scroll } from '../Scroll/Scroll'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { DatePickerLocale } from '../DatePicker/DatePicker'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface DatetimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'> {
  error?: boolean
  fullWidth?: boolean
  placeholder?: string
  value?: string // yyyy-MM-dd HH:mm
  defaultValue?: string // yyyy-MM-dd HH:mm
  onValueChange?: (value: string) => void
  /**
   * Khi bật autoOpen, dropdown sẽ tự mở khi component render và không bị disabled.
   */
  autoOpen?: boolean
  /**
   * Khi bật inline, chỉ render phần panel chọn ngày/giờ và không render button trigger.
   */
  inline?: boolean
  locale?: DatePickerLocale
  weekdayLabels?: [string, string, string, string, string, string, string]
  monthLabelFormatter?: (year: number, monthIndex: number) => string
  hourLabel?: string
  minuteLabel?: string
}

const parseDateTime = (value?: string) => {
  if (!value) return undefined
  const [datePart, timePart] = value.split(' ')
  if (!datePart) return undefined
  const [year, month, day] = datePart.split('-').map(Number)
  if (!year || !month || !day) return undefined

  let hours = 0
  let minutes = 0
  if (timePart) {
    const [h, m] = timePart.split(':').map(Number)
    hours = Number.isFinite(h) ? h : 0
    minutes = Number.isFinite(m) ? m : 0
  }

  return new Date(year, month - 1, day, hours, minutes)
}

const toDateTimeString = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
}

const formatLabel = (value?: string) => {
  const dt = parseDateTime(value)
  if (!dt) return ''
  const day = String(dt.getDate()).padStart(2, '0')
  const month = String(dt.getMonth() + 1).padStart(2, '0')
  const year = dt.getFullYear()
  const hh = String(dt.getHours()).padStart(2, '0')
  const mm = String(dt.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hh}:${mm}`
}

const getDaysInMonth = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, monthIndex: number) => {
  const jsDay = new Date(year, monthIndex, 1).getDay()
  return (jsDay + 6) % 7
}

export const DatetimePicker = React.forwardRef<HTMLInputElement, DatetimePickerProps>(
  (
    {
      className,
      error,
      fullWidth = true,
      placeholder = 'dd/mm/yyyy hh:mm',
      value,
      defaultValue,
      disabled,
      onValueChange,
      autoOpen = false,
      inline = false,
      name,
      id,
      locale = 'vi-VN',
      weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      monthLabelFormatter,
      hourLabel = 'Giờ',
      minuteLabel = 'Phút',
      onChange,
      ...restProps
    },
    ref
  ) => {
    const dispatch = useDispatchAction()

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
    const selectedValue = isControlled ? value : internalValue

    const initial = parseDateTime(selectedValue) ?? new Date()
    const [viewYear, setViewYear] = React.useState(initial.getFullYear())
    const [viewMonth, setViewMonth] = React.useState(initial.getMonth())
    const [viewMode, setViewMode] = React.useState<'day' | 'month' | 'year'>('day')
    const [hours, setHours] = React.useState(initial.getHours())
    const [minutes, setMinutes] = React.useState(initial.getMinutes())
    const [open, setOpen] = React.useState(inline)

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (!open) return
      if (inline) return
      const handleClickOutside = (event: MouseEvent) => {
        if (!containerRef.current) return
        if (!containerRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, inline])

    React.useEffect(() => {
      if (inline) return
      if (autoOpen && !open && !disabled) {
        setOpen(true)
      }
    }, [autoOpen, open, disabled, inline])

    React.useEffect(() => {
      const dt = parseDateTime(selectedValue)
      if (!dt) return
      setViewYear(dt.getFullYear())
      setViewMonth(dt.getMonth())
      setHours(dt.getHours())
      setMinutes(dt.getMinutes())
    }, [selectedValue])

    const handleChange = (nextDate: Date) => {
      nextDate.setHours(hours)
      nextDate.setMinutes(minutes)
      const next = toDateTimeString(nextDate)

      if (!isControlled) {
        setInternalValue(next)
      }

      dispatch(
        EventType.UI_CHANGE,
        { datetime: next },
        { meta: { component: 'DatetimePicker' } }
      )

      if (onChange) {
        const event = {
          target: { value: next, name },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }

      onValueChange?.(next)
    }

    const handleDayClick = (day: number) => {
      if (disabled) return
      const nextDate = new Date(viewYear, viewMonth, day)
      handleChange(nextDate)
    }

    const handleTimeChange = (nextHours: number, nextMinutes: number) => {
      if (disabled) return
      setHours(nextHours)
      setMinutes(nextMinutes)

      const base = parseDateTime(selectedValue) ?? new Date(viewYear, viewMonth, 1)
      base.setHours(nextHours)
      base.setMinutes(nextMinutes)
      const next = toDateTimeString(base)

      if (!isControlled) {
        setInternalValue(next)
      }

      dispatch(
        EventType.UI_CHANGE,
        { datetime: next },
        { meta: { component: 'DatetimePicker' } }
      )

      if (onChange) {
        const event = {
          target: { value: next, name },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }

      onValueChange?.(next)
    }

    const goToPrevious = () => {
      if (viewMode === 'day') {
        const nextMonth = viewMonth - 1
        if (nextMonth < 0) {
          setViewMonth(11)
          setViewYear((y) => y - 1)
        } else {
          setViewMonth(nextMonth)
        }
      } else if (viewMode === 'month') {
        setViewYear((y) => y - 1)
      } else {
        setViewYear((y) => y - 12)
      }
    }

    const goToNext = () => {
      if (viewMode === 'day') {
        const nextMonth = viewMonth + 1
        if (nextMonth > 11) {
          setViewMonth(0)
          setViewYear((y) => y + 1)
        } else {
          setViewMonth(nextMonth)
        }
      } else if (viewMode === 'month') {
        setViewYear((y) => y + 1)
      } else {
        setViewYear((y) => y + 12)
      }
    }

    const daysInMonth = getDaysInMonth(viewYear, viewMonth)
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

    const weeks: (number | null)[][] = []
    let currentDay = 1 - firstDay
    while (currentDay <= daysInMonth) {
      const week: (number | null)[] = []
      for (let i = 0; i < 7; i++) {
        if (currentDay < 1 || currentDay > daysInMonth) {
          week.push(null)
        } else {
          week.push(currentDay)
        }
        currentDay++
      }
      weeks.push(week)
    }

    const selectedDate = parseDateTime(selectedValue)

    const defaultMonthFormatter = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { month: 'long' }),
      [locale]
    )

    const formatMonthLabel = React.useCallback(
      (year: number, monthIndex: number) => {
        if (monthLabelFormatter) {
          return monthLabelFormatter(year, monthIndex)
        }
        return defaultMonthFormatter.format(new Date(year, monthIndex, 1))
      },
      [defaultMonthFormatter, monthLabelFormatter]
    )

    const monthLabel = formatMonthLabel(viewYear, viewMonth)

    const monthNames = React.useMemo(
      () =>
        Array.from({ length: 12 }, (_, index) => ({
          index,
          label: formatMonthLabel(viewYear, index),
        })),
      [formatMonthLabel, viewYear]
    )

    const yearStart = viewYear - 50
    const yearEnd = viewYear + 49
    const yearOptions = Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => yearStart + i)

    const hourOptions = Array.from({ length: 24 }, (_, i) => i)
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i) // 0-59 phút

    return (
      <div
        ref={containerRef}
        className={twMerge(
          clsx(
            'relative text-sm',
            fullWidth ? 'w-full' : 'w-auto',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          )
        )}
      >
        <input
          ref={ref}
          type="hidden"
          name={name}
          id={id ?? name}
          value={selectedValue ?? ''}
          {...restProps}
        />

        {!inline && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setOpen((prev) => !prev)}
            className={twMerge(
              clsx(
                'flex h-10 w-full items-center justify-between rounded-xl bg-surface-alt px-3 py-2',
                'text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
                'transition-all duration-200',
                !disabled && 'cursor-pointer',
                error && 'bg-red-50 text-red-700 focus-visible:ring-red-100'
              )
            )}
          >
            <span className={clsx('truncate', !selectedValue && 'text-text-muted')}>
              {selectedValue ? formatLabel(selectedValue) : placeholder}
            </span>
            <Icon icon={Clock} variant="muted" size="sm" className="ml-2" />
          </button>
        )}

        {(open || inline) && !disabled && (
          <div
            className={twMerge(
              clsx(
                // Dropdown bám theo input
                inline
                  ? 'relative w-full rounded-xl bg-transparent shadow-none outline-none'
                  : 'absolute left-0 z-50 mt-1 w-full rounded-xl bg-surface shadow-lg outline-none',
                'max-h-[80vh] overflow-hidden sm:min-w-[280px] sm:max-w-md'
              )
            )}
          >
            <div className="flex items-center justify-between px-3 pt-2 text-xs text-text-muted">
              <IconButton icon={ChevronLeft} size="xs" variant="muted" onClick={goToPrevious} />
              <div className="flex items-center gap-1 text-sm">
                <button
                  type="button"
                  className="rounded px-2 py-1 text-text hover:bg-slate-50"
                  onClick={() => setViewMode((mode) => (mode === 'month' ? 'day' : 'month'))}
                >
                  {monthLabel}
                </button>
                <button
                  type="button"
                  className="rounded px-2 py-1 text-text-muted hover:bg-slate-50"
                  onClick={() => setViewMode((mode) => (mode === 'year' ? 'day' : 'year'))}
                >
                  {viewYear}
                </button>
              </div>
              <IconButton icon={ChevronRight} size="xs" variant="muted" onClick={goToNext} />
            </div>

            <div className="px-3 pb-2 pt-1 text-[11px] text-text-muted">
              {viewMode === 'day' && (
                <>
                  <div className="grid grid-cols-7 justify-items-center">
                    {weekdayLabels.map((d, index) => (
                      <div key={`${d}-${index}`} className="h-8 w-8 flex items-center justify-center text-xs font-semibold text-text-muted">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 text-xs justify-items-center">
                    {weeks.map((week, i) => (
                      <React.Fragment key={i}>
                        {week.map((day, j) => {
                          if (!day) {
                            return <div key={j} className="h-8 w-8" />
                          }

                          const isSelected =
                            selectedDate &&
                            selectedDate.getFullYear() === viewYear &&
                            selectedDate.getMonth() === viewMonth &&
                            selectedDate.getDate() === day

                          return (
                            <button
                              key={j}
                              type="button"
                              onClick={() => handleDayClick(day)}
                              className={twMerge(
                                clsx(
                                  'flex h-7 w-7 items-center justify-center rounded-full text-text',
                                  'transition-colors',
                                  'hover:bg-slate-50',
                                  isSelected && 'bg-primary-500 text-white hover:bg-primary-500'
                                )
                              )}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}

              {viewMode === 'month' && (
                <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-text">
                  {monthNames.map((month) => {
                    const isCurrent = month.index === viewMonth
                    return (
                      <button
                        key={month.index}
                        type="button"
                        onClick={() => {
                          setViewMonth(month.index)
                          setViewMode('day')
                        }}
                        className={twMerge(
                          clsx(
                            'rounded-lg px-2 py-2 text-center transition-colors hover:bg-slate-50',
                            isCurrent && 'bg-primary-500 text-white hover:bg-primary-500'
                          )
                        )}
                      >
                        {month.label}
                      </button>
                    )
                  })}
                </div>
              )}

              {viewMode === 'year' && (
                <Scroll autoHide direction="vertical" className="max-h-56 pt-1 text-xs text-text">
                  <div className="grid grid-cols-3 gap-2 pr-1">
                    {yearOptions.map((year) => {
                      const isCurrent = year === viewYear
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            setViewYear(year)
                            setViewMode('day')
                          }}
                          className={twMerge(
                            clsx(
                              'rounded-lg px-2 py-2 text-center transition-colors hover:bg-slate-50',
                              isCurrent && 'bg-primary-500 text-white hover:bg-primary-500'
                            )
                          )}
                        >
                          {year}
                        </button>
                      )
                    })}
                  </div>
                </Scroll>
              )}

              <div className="mt-3 flex flex-col gap-2 pt-1 text-xs text-text">
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-[11px] text-text-muted">{hourLabel}</span>
                  <Scroll
                    autoHide
                    direction="horizontal"
                    className="flex-1 overflow-y-hidden rounded-full bg-surface-alt px-2 py-2 text-center text-xs"
                  >
                    <div className="flex gap-1">
                      {hourOptions.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => handleTimeChange(h, minutes)}
                          className={twMerge(
                            clsx(
                              'inline-flex h-8 aspect-square items-center justify-center rounded-full text-[11px] transition-colors',
                              h === hours
                                ? 'bg-primary-500 text-white'
                                : 'hover:bg-slate-50 text-text'
                            )
                          )}
                        >
                          {String(h).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </Scroll>
                </div>

                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-[11px] text-text-muted">{minuteLabel}</span>
                  <Scroll
                    autoHide
                    direction="horizontal"
                    className="flex-1 overflow-y-hidden rounded-full bg-surface-alt px-2 py-2 text-center text-xs"
                  >
                    <div className="flex gap-1">
                      {minuteOptions.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleTimeChange(hours, m)}
                          className={twMerge(
                            clsx(
                              'inline-flex h-8 aspect-square items-center justify-center rounded-full text-[11px] transition-colors',
                              m === minutes
                                ? 'bg-primary-500 text-white'
                                : 'hover:bg-slate-50 text-text'
                            )
                          )}
                        >
                          {String(m).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </Scroll>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

DatetimePicker.displayName = 'DatetimePicker'
