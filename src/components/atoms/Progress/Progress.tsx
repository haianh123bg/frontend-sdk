// File: src/components/atoms/Progress/Progress.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  showLabel?: boolean
  type?: 'linear' | 'circular'
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  primary: 'text-primary-500 bg-primary-100',
  secondary: 'text-slate-500 bg-slate-200',
  success: 'text-green-500 bg-green-100',
  danger: 'text-red-500 bg-red-100',
}

const circularSizes = {
  sm: 32,
  md: 48,
  lg: 64,
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { value = 0, max = 100, variant = 'primary', showLabel = false, type = 'linear', size = 'md', className, ...props },
    ref
  ) => {
    const clamped = Math.min(Math.max(value, 0), max)
    const percentage = Math.round((clamped / max) * 100)

    if (type === 'circular') {
      const dimension = circularSizes[size]
      const radius = dimension / 2 - 4
      const circumference = 2 * Math.PI * radius
      const strokeDashoffset = circumference - (percentage / 100) * circumference

      return (
        <div ref={ref} className={twMerge(clsx('inline-flex flex-col items-center', className))} {...props}>
          <svg width={dimension} height={dimension} className="-rotate-90">
            <circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              className="text-slate-200"
              strokeWidth="4"
            />
            <circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              className={variantClasses[variant].split(' ')[0]}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          {showLabel && <span className="mt-1 text-xs font-medium text-text-secondary">{percentage}%</span>}
        </div>
      )
    }

    return (
      <div ref={ref} className={twMerge(clsx('flex flex-col gap-1', className))} {...props}>
        <div className={twMerge(clsx('h-2 w-full rounded-full bg-slate-200'))}>
          <div
            className={twMerge(
              clsx('h-full rounded-full transition-all', variantClasses[variant].split(' ')[0])
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && <span className="text-xs font-medium text-text-secondary">{percentage}%</span>}
      </div>
    )
  }
)

Progress.displayName = 'Progress'
