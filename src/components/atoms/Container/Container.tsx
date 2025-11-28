// File: src/components/atoms/Container/Container.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = 'xl', padding = true, children, ...props }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('mx-auto w-full', maxWidthClasses[maxWidth], padding && 'px-4 sm:px-6 lg:px-8', className)
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'
