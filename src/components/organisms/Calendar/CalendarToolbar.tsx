import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../atoms/Button/Button'
import { IconButton } from '../../atoms/IconButton/IconButton'
import type { CalendarViewType } from './types'

export interface CalendarToolbarProps {
  title: string
  view: CalendarViewType
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onViewChange: (view: CalendarViewType) => void
  isToday?: boolean
  className?: string
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  title,
  view,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  isToday,
  className
}) => {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onToday} disabled={!!isToday}>
            Hôm nay
          </Button>
          <div className="flex items-center">
            <IconButton icon={ChevronLeft} size="xs" onClick={onPrev} />
            <IconButton icon={ChevronRight} size="xs" onClick={onNext} />
          </div>
          <div className="ml-1 text-sm font-semibold text-text-primary">{title}</div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={view === 'month' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onViewChange('month')}
          >
            Tháng
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onViewChange('week')}
          >
            Tuần
          </Button>
          <Button
            variant={view === 'day' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onViewChange('day')}
          >
            Ngày
          </Button>
        </div>
      </div>
    </div>
  )
}

CalendarToolbar.displayName = 'CalendarToolbar'
