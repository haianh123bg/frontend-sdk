// File: src/components/atoms/Skeleton/Skeleton.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
  width?: number | string
  height?: number | string
  animate?: boolean
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rect', width = '100%', height = 16, animate = true, style, ...props }, ref) => {
    const borderRadius = variant === 'circle' ? '9999px' : '12px'
    const inlineStyles: React.CSSProperties = {
      width,
      height,
      borderRadius,
      ...style,
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'bg-slate-200',
            animate && 'animate-pulse',
            variant === 'text' && 'h-4',
            className
          )
        )}
        style={inlineStyles}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
