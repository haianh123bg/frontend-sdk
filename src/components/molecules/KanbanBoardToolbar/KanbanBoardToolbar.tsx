import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface KanbanBoardToolbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  locale?: string
  count?: number
  extra?: React.ReactNode
  actions?: React.ReactNode
}

export const KanbanBoardToolbar = React.forwardRef<HTMLDivElement, KanbanBoardToolbarProps>(
  ({ className, title = 'Board', locale, count, extra, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('mb-3 flex items-center justify-between gap-3', className)
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-sm font-semibold text-text-primary">
              {title}
            </h2>
            {typeof count === 'number' && (
              <span className="text-xs text-text-muted">{count}</span>
            )}
          </div>
          {locale && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase text-text-muted">
              {locale}
            </span>
          )}
          {extra && <div className="ml-2 flex items-center gap-2">{extra}</div>}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    )
  }
)

KanbanBoardToolbar.displayName = 'KanbanBoardToolbar'
