// File: src/components/atoms/DatePicker/DatePicker.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Scroll } from '../Scroll/Scroll'
import { IconButton } from '../IconButton/IconButton'
import { Icon } from '../Icon/Icon'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export type DatePickerLocale = 'vi-VN' | 'en-US' | 'zh-CN' | 'ja-JP'

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'> {
  error?: boolean
  fullWidth?: boolean
  /**
   * Hiển thị placeholder cho trigger, ví dụ: "dd/mm/yyyy".
   */
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (date: string) => void
  /**
   * Khi bật autoOpen, calendar sẽ tự mở khi component render và không bị disabled.
   */
  autoOpen?: boolean
  /**
   * Khi bật inline, chỉ render phần calendar (như dropdown content) và không render input trigger.
   */
  inline?: boolean
  /**
   * Locale để định dạng tên tháng, mặc định là "vi-VN".
   */
  locale?: DatePickerLocale
  /**
   * Nhãn cho các thứ trong tuần.
   */
  weekdayLabels?: [string, string, string, string, string, string, string]
  /**
   * Cho phép custom formatter tên tháng.
   */
  monthLabelFormatter?: (year: number, monthIndex: number) => string
}

const formatDateLabel = (value?: string) => {
  if (!value) return ''
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

const isValidDateParts = (year: number, month: number, day: number) => {
  if (!year || !month || !day) return false
  if (month < 1 || month > 12) return false
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) return false
  return true
}

const parseDate = (value?: string) => {
  if (!value) return undefined
  const [year, month, day] = value.split('-').map(Number)
  if (!isValidDateParts(year, month, day)) return undefined
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return undefined
  return date
}

const parseInputToDate = (text: string): Date | undefined => {
  const value = text.trim()
  if (!value) return undefined

  // yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return parseDate(value)
  }

  // dd/mm/yyyy
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split('/').map(Number)
    if (!isValidDateParts(year, month, day)) return undefined
    const date = new Date(year, month - 1, day)
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return undefined
    return date
  }

  return undefined
}

const toDateString = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const getDaysInMonth = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, monthIndex: number) => {
  // Trả về index ngày đầu tháng với tuần bắt đầu từ Thứ 2 (Mon)
  // JS getDay(): 0 (Sun) - 6 (Sat) -> chuyển sang 0 (Mon) - 6 (Sun)
  const jsDay = new Date(year, monthIndex, 1).getDay()
  return (jsDay + 6) % 7
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      error,
      fullWidth = true,
      placeholder = 'dd/mm/yyyy',
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
      onChange,
      ...restProps
    },
    ref
  ) => {
    const dispatch = useDispatchAction()

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
    const selectedValue = isControlled ? value : internalValue

    const initialDate = parseDate(selectedValue) ?? new Date()
    const [viewYear, setViewYear] = React.useState(initialDate.getFullYear())
    const [viewMonth, setViewMonth] = React.useState(initialDate.getMonth()) // 0-11
    const [viewMode, setViewMode] = React.useState<'day' | 'month' | 'year'>('day')
    const [open, setOpen] = React.useState(inline)

    const [inputText, setInputText] = React.useState<string>(
      selectedValue ? formatDateLabel(selectedValue) : ''
    )

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const panelRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      setInputText(selectedValue ? formatDateLabel(selectedValue) : '')
    }, [selectedValue])

    React.useEffect(() => {
      const dt = parseDate(selectedValue)
      if (!dt) return
      setViewYear(dt.getFullYear())
      setViewMonth(dt.getMonth())
    }, [selectedValue])

    React.useEffect(() => {
      if (!open) return
      const dt = parseInputToDate(inputText) ?? parseDate(selectedValue)
      if (!dt) return
      setViewYear(dt.getFullYear())
      setViewMonth(dt.getMonth())
    }, [open, inputText, selectedValue])

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

    const handleSelectDate = (date: Date) => {
      const next = toDateString(date)

      if (!isControlled) {
        setInternalValue(next)
      }

      dispatch(
        EventType.UI_CHANGE,
        { date: next },
        { meta: { component: 'DatePicker' } }
      )

      if (onChange) {
        const event = {
          target: { value: next, name },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }

      onValueChange?.(next)
      if (!inline) {
        setOpen(false)
      }
    }

    const handleDayClick = (day: number) => {
      if (disabled) return
      const date = new Date(viewYear, viewMonth, day)
      handleSelectDate(date)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return

      // Chỉ cho phép nhập số và tự format thành dd/mm/yyyy
      const raw = e.target.value.replace(/[^0-9]/g, '')
      let next = raw

      if (next.length > 2) {
        next = `${next.slice(0, 2)}/${next.slice(2)}`
      }
      if (next.length > 5) {
        next = `${next.slice(0, 5)}/${next.slice(5, 9)}`
      }

      // Giới hạn tối đa dd/mm/yyyy (10 ký tự)
      if (next.length > 10) {
        next = next.slice(0, 10)
      }

      setInputText(next)
    }

    const commitInputValue = () => {
      if (disabled) return
      const parsed = parseInputToDate(inputText)
      if (parsed) {
        handleSelectDate(parsed)
      } else {
        // Revert to current selected value if parse fails
        setInputText(selectedValue ? formatDateLabel(selectedValue) : '')
      }
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const nextFocused = e.relatedTarget as Node | null
      if (nextFocused && panelRef.current?.contains(nextFocused)) {
        return
      }
      commitInputValue()
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        commitInputValue()
        setOpen(false)
      }
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
    const selectedDate = parseInputToDate(inputText) ?? parseDate(selectedValue)

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

    const monthNames = Array.from({ length: 12 }, (_, index) => ({
      index,
      label: formatMonthLabel(viewYear, index),
    }))

    const yearStart = viewYear - 50
    const yearEnd = viewYear + 49
    const yearOptions = Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => yearStart + i)

    return (
      <div
        ref={containerRef}
        className={twMerge(
          clsx(
            'relative text-sm',
            fullWidth ? 'w-full' : 'inline-block w-auto',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          )
        )}
      >
        {/* Hidden input to keep form compatibility */}
        <input
          ref={ref}
          type="hidden"
          name={name}
          id={id ?? name}
          value={selectedValue ?? ''}
          {...restProps}
        />

        {!inline && (
          <div
            className={twMerge(
              clsx(
                'flex h-10 items-center justify-between rounded-xl bg-surface-alt px-3 py-2',
                fullWidth ? 'w-full' : 'w-auto',
                'text-left',
                'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-100',
                'transition-all duration-200',
                !disabled && 'cursor-text',
                disabled && 'cursor-not-allowed',
                error && 'bg-red-50 text-red-700 focus-within:ring-red-100'
              )
            )}
            onClick={() => {
              if (disabled) return
              setOpen(true)
            }}
          >
            <input
              type="text"
              disabled={disabled}
              value={inputText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              className={twMerge(
                clsx(
                  'flex-1 bg-transparent text-sm',
                  'outline-none border-none',
                  !selectedValue && 'text-text-muted'
                )
              )}
            />
            <Icon
              icon={Calendar}
              variant="muted"
              size="sm"
              className={clsx('ml-2 transition-transform', open && 'rotate-180')}
            />
          </div>
        )}

        {(open || inline) && !disabled && (
          <div
            ref={panelRef}
            onMouseDown={(e) => {
              if ((e.target as HTMLElement | null)?.closest('button')) {
                e.preventDefault()
              }
            }}
            className={twMerge(
              clsx(
                // Dropdown bám theo input
                inline
                  ? 'relative w-full rounded-xl bg-transparent shadow-none outline-none'
                  : 'absolute left-0 z-50 mt-1 w-full rounded-xl bg-surface shadow-lg outline-none',
                'max-h-[80vh] overflow-hidden sm:min-w-[240px] sm:max-w-xs'
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
                    {weekdayLabels.map((d) => (
                      <div key={d} className="h-8 w-8 flex items-center justify-center text-xs font-semibold text-text-muted">
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
            </div>
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
