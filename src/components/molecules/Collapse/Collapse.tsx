// File: src/components/molecules/Collapse/Collapse.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  title?: React.ReactNode
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ className, title, defaultOpen = false, onToggle, children, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const [open, setOpen] = React.useState(defaultOpen)

    const toggle = () => {
      setOpen((prev) => {
        const next = !prev
        dispatch(EventType.UI_CLICK, { component: 'Collapse', open: next }, { meta: { component: 'Collapse' } })
        onToggle?.(next)
        return next
      })
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('rounded-2xl border border-slate-200 bg-surface transition-all', className)
        )}
        {...props}
      >
        <button
          type="button"
          onClick={toggle}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-text-primary"
        >
          <span>{title}</span>
          <span className={twMerge(clsx('text-xs text-text-muted transition-transform', open && 'rotate-180'))}>
            ▼
          </span>
        </button>
        <div
          className={twMerge(
            clsx(
              'px-4 pb-4 text-sm text-text-secondary transition-all duration-200',
              open ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
            )
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)

Collapse.displayName = 'Collapse'
