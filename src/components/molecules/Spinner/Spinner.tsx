// File: src/components/molecules/Spinner/Spinner.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', variant = 'primary', ...props }, ref) => {
    const sizes = {
      xs: 'h-3 w-3 border',
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-2',
      xl: 'h-12 w-12 border-4',
    }

    const variants = {
      primary: 'border-primary-500 border-t-transparent',
      secondary: 'border-slate-500 border-t-transparent',
      white: 'border-white border-t-transparent',
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'inline-block animate-spin rounded-full',
            sizes[size],
            variants[variant],
            className
          )
        )}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'
