// File: src/components/molecules/StatisticGroup/StatisticGroup.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Statistic, StatisticProps } from '../Statistic/Statistic'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface StatisticItem extends Omit<StatisticProps, 'className'> {
  id?: string
}

export interface StatisticGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: StatisticItem[]
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  onSelect?: (item: StatisticItem) => void
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapClasses = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

export const StatisticGroup = React.forwardRef<HTMLDivElement, StatisticGroupProps>(
  ({ className, items, columns = 3, gap = 'md', onSelect, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const handleSelect = (item: StatisticItem) => {
      if (!onSelect) return
      dispatch(EventType.UI_CLICK, { statId: item.id ?? item.label }, { meta: { component: 'StatisticGroup' } })
      onSelect(item)
    }

    return (
      <div
        ref={ref}
        className={twMerge(clsx('grid', columnClasses[columns], gapClasses[gap], className))}
        {...props}
      >
        {items.map((item, index) => (
          <button
            key={item.id ?? index}
            type="button"
            onClick={() => handleSelect(item)}
            className={twMerge(
              clsx(
                'text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                onSelect && 'hover:-translate-y-1'
              )
            )}
            disabled={!onSelect}
          >
            <Statistic {...item} className={onSelect ? 'pointer-events-none' : undefined} />
          </button>
        ))}
      </div>
    )
  }
)

StatisticGroup.displayName = 'StatisticGroup'
