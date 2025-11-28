// File: src/components/atoms/Card/Card.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  footer?: React.ReactNode
  actions?: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, subtitle, footer, actions, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-col gap-4 rounded-2xl bg-surface p-0 shadow-none ring-1 ring-transparent',
            className
          )
        )}
        {...props}
      >
        {(title || subtitle || actions) && (
          <div className="flex items-start justify-between gap-3 px-5 pt-5">
            <div>
              {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
              {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        <div className={twMerge(clsx('text-sm text-text-primary', paddingMap[padding]))}>{children}</div>
        {footer && <div className="px-5 pb-5 text-sm text-text-secondary">{footer}</div>}
      </div>
    )
  }
)

Card.displayName = 'Card'
