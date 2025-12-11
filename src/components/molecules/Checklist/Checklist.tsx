import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'

export interface ChecklistItem {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  completed?: boolean
  disabled?: boolean
}

export interface ChecklistProps extends React.HTMLAttributes<HTMLUListElement> {
  items: ChecklistItem[]
  onItemToggle?: (id: string, completed: boolean) => void
  showProgress?: boolean
  dense?: boolean
}

export const Checklist = React.forwardRef<HTMLUListElement, ChecklistProps>(
  ({ className, items, onItemToggle, showProgress = false, dense = false, ...props }, ref) => {
    const completedCount = React.useMemo(
      () => items.filter((item) => item.completed).length,
      [items]
    )

    return (
      <div className="flex w-full flex-col gap-2">
        {showProgress && (
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Checklist</span>
            <span>
              {completedCount}/{items.length} hoàn thành
            </span>
          </div>
        )}
        <ul
          ref={ref}
          className={twMerge(
            clsx(
              'flex w-full flex-col gap-2 rounded-2xl bg-surface-alt p-3',
              dense && 'gap-1 p-2',
              className
            )
          )}
          {...props}
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <Checkbox
                checked={!!item.completed}
                disabled={item.disabled}
                onChange={(e) => onItemToggle?.(item.id, e.target.checked)}
                className="mt-0.5"
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <div
                  className={clsx(
                    'text-sm font-medium',
                    item.completed ? 'text-text-muted line-through' : 'text-text-primary'
                  )}
                >
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs text-text-muted">{item.description}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

Checklist.displayName = 'Checklist'
