import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  sticky?: boolean
  bordered?: boolean
}

export const TopNav = React.forwardRef<HTMLElement, TopNavProps>(
  ({ className, left, center, right, sticky = true, bordered = true, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={twMerge(
          clsx(
            'flex h-16 items-center gap-4 bg-background/80 px-4 sm:px-6 backdrop-blur-sm',
            sticky && 'sticky top-0 z-20',
            bordered && 'border-b border-slate-200',
            className
          )
        )}
        {...props}
      >
        <div className="flex flex-1 items-center gap-3">
          {left && <div className="flex items-center gap-2 min-w-0">{left}</div>}
        </div>
        {center && (
          <div className="hidden md:flex flex-1 items-center justify-center gap-2 min-w-0">
            {center}
          </div>
        )}
        <div className={clsx('flex items-center gap-2', center && 'flex-none')}>{right}</div>
      </header>
    )
  }
)

TopNav.displayName = 'TopNav'
