import * as React from 'react'
import { parseISO } from 'date-fns'
import { addDays, subDays } from 'date-fns'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { ColorPicker } from '../../atoms/ColorPicker/ColorPicker'
import { TitleInput } from '../../atoms/TitleInput/TitleInput'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { DatetimePicker } from '../../atoms/DatetimePicker/DatetimePicker'
import { CornerPanel } from '../../molecules/CornerPanel/CornerPanel'
import type { CalendarEvent } from './types'
import { parseDateString, parseDateTimeString, toDateString, toDateTimeString } from './utils'

export interface EventDialogValue {
  id?: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  timezone: string
  color?: string
}

export interface EventDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  value: EventDialogValue
  dateFnsLocale?: import('date-fns').Locale
  onCancel: () => void
  onSave: (value: EventDialogValue) => void
  onDelete?: () => void
}

export const EventDialog: React.FC<EventDialogProps> = ({
  open,
  mode,
  value,
  dateFnsLocale,
  onCancel,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = React.useState(value.title)
  const [allDay, setAllDay] = React.useState(value.allDay)
  const [start, setStart] = React.useState<Date>(value.start)
  const [end, setEnd] = React.useState<Date>(value.end)
  const [color, setColor] = React.useState<string | undefined>(value.color)

  React.useEffect(() => {
    setTitle(value.title)
    setAllDay(value.allDay)
    setStart(value.start)
    setEnd(value.end)
    setColor(value.color)
  }, [value])

  const startDateValue = React.useMemo(() => toDateString(start, dateFnsLocale), [start, dateFnsLocale])
  const endDateValue = React.useMemo(() => {
    if (!allDay) return toDateString(end, dateFnsLocale)
    return toDateString(subDays(end, 1), dateFnsLocale)
  }, [allDay, end, dateFnsLocale])

  const startDateTimeValue = React.useMemo(() => toDateTimeString(start, dateFnsLocale), [start, dateFnsLocale])
  const endDateTimeValue = React.useMemo(() => toDateTimeString(end, dateFnsLocale), [end, dateFnsLocale])

  return (
    <CornerPanel
      open={open}
      onClose={onCancel}
      title={mode === 'create' ? 'Tạo sự kiện' : 'Chỉnh sửa sự kiện'}
      position="top-right"
      size="lg"
      animation="slide-in"
      fullHeight
      noBorder
      className="p-5"
    >
      <div className="space-y-4">
        <div>
          <div className="mb-1 text-xs font-semibold text-text-muted">Tiêu đề</div>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thêm tiêu đề"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Checkbox
            checked={allDay}
            onChange={(e) => {
              const nextAllDay = e.target.checked
              setAllDay(nextAllDay)

              if (nextAllDay) {
                const nextStart = new Date(start)
                nextStart.setHours(0, 0, 0, 0)
                setStart(nextStart)

                const currentExclusiveEnd = end
                const currentInclusiveEnd = subDays(currentExclusiveEnd, 1)
                const normalizedInclusive = currentInclusiveEnd.getTime() < nextStart.getTime()
                  ? nextStart
                  : currentInclusiveEnd
                setEnd(addDays(normalizedInclusive, 1))
              }
            }}
            label="Cả ngày"
          />
          <div className="text-xs text-text-muted">{value.timezone}</div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-semibold text-text-muted">Bắt đầu</div>
            {allDay ? (
              <DatePicker
                value={startDateValue}
                onValueChange={(v) => {
                  const next = parseDateString(v)
                  if (!next) return
                  setStart(next)

                  const currentInclusiveEnd = subDays(end, 1)
                  if (currentInclusiveEnd.getTime() < next.getTime()) {
                    setEnd(addDays(next, 1))
                  }
                }}
              />
            ) : (
              <DatetimePicker
                value={startDateTimeValue}
                onValueChange={(v) => {
                  const next = parseDateTimeString(v)
                  if (!next) return
                  setStart(next)
                }}
              />
            )}
          </div>

          <div>
            <div className="mb-1 text-xs font-semibold text-text-muted">Kết thúc</div>
            {allDay ? (
              <DatePicker
                value={endDateValue}
                onValueChange={(v) => {
                  const next = parseDateString(v)
                  if (!next) return
                  setEnd(addDays(next, 1))
                }}
              />
            ) : (
              <DatetimePicker
                value={endDateTimeValue}
                onValueChange={(v) => {
                  const next = parseDateTimeString(v)
                  if (!next) return
                  setEnd(next)
                }}
              />
            )}
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold text-text-muted">Màu</div>
          <ColorPicker
            value={color ?? '#0ea5e9'}
            onChange={(c) => setColor(c)}
          />
        </div>

        <div className="flex flex-wrap justify-end gap-2 pt-2">
          {mode === 'edit' && onDelete && (
            <Button variant="danger" onClick={onDelete}>
              Xóa
            </Button>
          )}
          <Button variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onSave({
                ...value,
                title: title.trim() || 'Sự kiện',
                start,
                end,
                allDay,
                color,
              })
            }}
          >
            Lưu
          </Button>
        </div>
      </div>
    </CornerPanel>
  )
}

EventDialog.displayName = 'EventDialog'

export const eventToDialogValue = (event: CalendarEvent): EventDialogValue => {
  const start = parseISO(event.start)
  const end = parseISO(event.end)

  return {
    id: event.id,
    title: event.title,
    start,
    end,
    allDay: event.allDay,
    timezone: event.timezone,
    color: event.color,
  }
}
