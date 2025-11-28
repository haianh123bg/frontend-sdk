// File: src/components/atoms/Heading/Heading.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size, children, ...props }, ref) => {
    // Default sizes based on heading level
    const defaultSizes = {
      h1: '3xl',
      h2: '2xl',
      h3: 'xl',
      h4: 'lg',
      h5: 'md',
      h6: 'sm',
    }

    const actualSize = (size || defaultSizes[Component]) as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    }

    return (
      <Component
        ref={ref as any}
        className={twMerge(
          clsx('font-bold text-text-primary', sizeClasses[actualSize], className)
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

// Convenience exports
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>((props, ref) => (
  <Heading ref={ref} as="h1" {...props} />
))
H1.displayName = 'H1'

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>((props, ref) => (
  <Heading ref={ref} as="h2" {...props} />
))
H2.displayName = 'H2'

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>((props, ref) => (
  <Heading ref={ref} as="h3" {...props} />
))
H3.displayName = 'H3'

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>((props, ref) => (
  <Heading ref={ref} as="h4" {...props} />
))
H4.displayName = 'H4'

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>((props, ref) => (
  <Heading ref={ref} as="h5" {...props} />
))
H5.displayName = 'H5'

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'as'>>((props, ref) => (
  <Heading ref={ref} as="h6" {...props} />
))
H6.displayName = 'H6'
