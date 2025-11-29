// File: src/components/atoms/Progress/Progress.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'composite'
  showLabel?: boolean
  type?: 'linear' | 'circular'
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  primary: { stroke: 'text-primary-500', bg: 'bg-primary-100', fill: 'bg-primary-500' },
  secondary: { stroke: 'text-slate-500', bg: 'bg-slate-200', fill: 'bg-slate-500' },
  success: { stroke: 'text-green-500', bg: 'bg-green-100', fill: 'bg-green-500' },
  danger: { stroke: 'text-red-500', bg: 'bg-red-100', fill: 'bg-red-500' },
  composite: { stroke: 'text-slate-500', bg: 'bg-slate-100', fill: 'bg-transparent' },
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
    const getCompositeLabelColor = () => {
      if (percentage <= 25) return 'text-red-600'
      if (percentage <= 50) return 'text-amber-500'
      if (percentage <= 75) return 'text-lime-600'
      return 'text-emerald-600'
    }
    const getCompositeStrokeColor = () => {
      if (percentage <= 25) return 'text-red-600'
      if (percentage <= 50) return 'text-amber-500'
      if (percentage <= 75) return 'text-lime-600'
      return 'text-emerald-600'
    }
    const getCompositeGradient = () => {
      if (percentage <= 25) {
        return 'linear-gradient(90deg, #dc2626 0%, #f97316 100%)'
      }
      if (percentage <= 50) {
        return 'linear-gradient(90deg, #dc2626 0%, #f97316 55%, #facc15 100%)'
      }
      if (percentage <= 75) {
        return 'linear-gradient(90deg, #dc2626 0%, #f97316 45%, #facc15 80%, #a3e635 100%)'
      }
      return 'linear-gradient(90deg, #dc2626 0%, #f97316 35%, #facc15 65%, #a3e635 90%, #22c55e 100%)'
    }

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
              className={variant === 'composite' ? getCompositeStrokeColor() : variantClasses[variant].stroke}
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
        <div className={twMerge(clsx('h-2 w-full rounded-full', variantClasses[variant].bg))}>
          <div
            className={twMerge(
              clsx('h-full rounded-full transition-all', variant === 'composite' ? '' : variantClasses[variant].fill)
            )}
            style={{
              width: `${percentage}%`,
              backgroundImage: variant === 'composite' ? getCompositeGradient() : undefined,
            }}
          />
        </div>
        {showLabel && (
          <span className={clsx('text-xs font-medium', variant === 'composite' ? getCompositeLabelColor() : 'text-text-secondary')}>
            {percentage}%
          </span>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'
