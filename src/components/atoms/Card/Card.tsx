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
  media?: React.ReactNode
  mediaPosition?: 'top' | 'left'
  highlight?: React.ReactNode
  compact?: boolean
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      title,
      subtitle,
      footer,
      actions,
      padding = 'md',
      media,
      mediaPosition = 'top',
      highlight,
      compact = false,
      children,
      ...props
    },
    ref
  ) => {
    const renderHeader = () => {
      if (!title && !subtitle && !actions && !highlight) return null
      return (
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div className="space-y-1">
            {highlight && <div className="text-xs font-semibold text-primary-500">{highlight}</div>}
            {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )
    }

    const renderBody = () => (
      <div
        className={twMerge(
          clsx('text-sm text-text-primary', paddingMap[padding], compact && 'text-xs')
        )}
      >
        {children}
      </div>
    )

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
        {media && mediaPosition === 'top' && (
          <div className="overflow-hidden rounded-t-2xl bg-surface-alt">{media}</div>
        )}
        {mediaPosition === 'left' && media ? (
          <div className="flex flex-col gap-4 p-5 lg:flex-row">
            <div className="w-full rounded-2xl bg-surface-alt p-3 lg:w-1/3">{media}</div>
            <div className="flex-1 space-y-4">
              {renderHeader()}
              {renderBody()}
            </div>
          </div>
        ) : (
          <>
            {renderHeader()}
            {renderBody()}
          </>
        )}
        {footer && <div className="px-5 pb-5 text-sm text-text-secondary">{footer}</div>}
      </div>
    )
  }
)

Card.displayName = 'Card'
