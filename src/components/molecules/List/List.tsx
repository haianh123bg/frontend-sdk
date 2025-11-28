// File: src/components/molecules/List/List.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface ListItem {
  id?: string
  title: string
  description?: string
  meta?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: ListItem[]
  align?: 'start' | 'center'
  size?: 'sm' | 'md' | 'lg'
  divider?: boolean
  onItemClick?: (item: ListItem, index: number) => void
  maxItems?: number
  emptyState?: React.ReactNode
}

const sizeClasses = {
  sm: 'gap-1 text-xs',
  md: 'gap-1.5 text-sm',
  lg: 'gap-2 text-base',
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      items,
      align = 'start',
      size = 'md',
      divider = true,
      onItemClick,
      maxItems,
      emptyState = 'No items to display',
      ...props
    },
    ref
  ) => {
    const dispatch = useDispatchAction()

    const handleClick = (item: ListItem, index: number) => {
      if (!onItemClick) return
      dispatch(EventType.UI_CLICK, { itemId: item.id ?? index }, { meta: { component: 'List' } })
      onItemClick(item, index)
    }

    const visibleItems = React.useMemo(() => {
      if (!maxItems) return items
      return items.slice(0, maxItems)
    }, [items, maxItems])

    return (
      <ul
        ref={ref}
        className={twMerge(
          clsx('flex w-full flex-col', align === 'center' && 'items-center', className)
        )}
        {...props}
      >
        {visibleItems.length === 0 && (
          <li className="w-full px-4 py-6 text-center text-sm text-text-muted">{emptyState}</li>
        )}
        {visibleItems.map((item, index) => (
          <li
            key={item.id ?? index}
            onClick={() => handleClick(item, index)}
            className={twMerge(
              clsx(
                'flex w-full items-start gap-3 rounded-2xl px-4 py-3 transition-colors',
                divider && index !== visibleItems.length - 1 && 'border-b border-slate-200',
                onItemClick && 'cursor-pointer hover:bg-primary-50'
              )
            )}
          >
            {item.icon && <span className="text-primary-500">{item.icon}</span>}
            <div className={twMerge(clsx('flex flex-1 flex-col', sizeClasses[size]))}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-text-primary">{item.title}</p>
                {item.meta && <span className="text-xs text-text-muted">{item.meta}</span>}
              </div>
              {item.description && <p className="text-text-secondary">{item.description}</p>}
            </div>
            {item.actions && <div className="flex items-center gap-2">{item.actions}</div>}
          </li>
        ))}
      </ul>
    )
  }
)

List.displayName = 'List'
