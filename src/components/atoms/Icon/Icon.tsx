// File: src/components/atoms/Icon/Icon.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    const sizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    }

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge(clsx('inline-block', sizes[size], className))}
        {...props}
      >
        {children}
      </svg>
    )
  }
)

Icon.displayName = 'Icon'
