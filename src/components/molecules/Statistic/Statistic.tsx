// File: src/components/molecules/Statistic/Statistic.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  delta?: {
    value: string
    trend?: 'up' | 'down'
  }
  icon?: React.ReactNode
  muted?: boolean
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  ({ className, label, value, delta, icon, muted = false, ...props }, ref) => {
    const trendColor = delta?.trend === 'down' ? 'text-red-500' : 'text-green-500'
    const trendSymbol = delta?.trend === 'down' ? '↓' : '↑'

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-col gap-2 rounded-2xl bg-surface px-4 py-4',
            muted && 'bg-surface-alt',
            className
          )
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-muted">{label}</p>
          {icon && <span className="text-primary-500">{icon}</span>}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold text-text-primary">{value}</p>
            {delta && (
              <p className={twMerge(clsx('text-xs font-medium', trendColor))}>
                {trendSymbol} {delta.value}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Statistic.displayName = 'Statistic'
