// File: src/components/atoms/Stack/Stack.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = 'vertical',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    }

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex',
            direction === 'vertical' ? 'flex-col' : 'flex-row',
            gapClasses[gap],
            alignClasses[align],
            justifyClasses[justify],
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Stack.displayName = 'Stack'
