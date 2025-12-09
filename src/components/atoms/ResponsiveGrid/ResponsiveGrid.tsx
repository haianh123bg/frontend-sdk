import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ResponsiveCols = 1 | 2 | 3 | 4 | 5 | 6 | 12

export type ResponsiveSpan = 1 | 2 | 3 | 4 | 5 | 6 | 12

export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Partial<Record<ResponsiveBreakpoint, ResponsiveCols>>
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const breakpointPrefixes: Record<ResponsiveBreakpoint, string> = {
  xs: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
}

const gapClassesMap = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const

const breakpointsOrder: ResponsiveBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

function buildColsClasses(cols?: Partial<Record<ResponsiveBreakpoint, ResponsiveCols>>): string {
  if (!cols) return ''
  const classes: string[] = []

  // Dùng map tĩnh để Tailwind có thể generate đầy đủ CSS cho tất cả giá trị.
  const colsClassMap: Record<ResponsiveCols, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }

  for (const bp of breakpointsOrder) {
    const value = cols[bp]
    if (!value) continue
    const prefix = breakpointPrefixes[bp]
    classes.push(`${prefix}${colsClassMap[value]}`)
  }

  return classes.join(' ')
}

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ className, cols = { xs: 1 }, gap = 'md', children, ...props }, ref) => {
    const colsClasses = buildColsClasses(cols)
    const gapClasses = gapClassesMap[gap]

    return (
      <div
        ref={ref}
        className={twMerge(clsx('grid', colsClasses, gapClasses, className))}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ResponsiveGrid.displayName = 'ResponsiveGrid'

export interface ResponsiveGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: Partial<Record<ResponsiveBreakpoint, ResponsiveSpan>>
}

function buildSpanClasses(span?: Partial<Record<ResponsiveBreakpoint, ResponsiveSpan>>): string {
  if (!span) return ''
  const classes: string[] = []

  // Map tĩnh cho col-span-* để Tailwind không bị mất class do build động.
  const spanClassMap: Record<ResponsiveSpan, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    12: 'col-span-12',
  }

  for (const bp of breakpointsOrder) {
    const value = span[bp]
    if (!value) continue
    const prefix = breakpointPrefixes[bp]
    classes.push(`${prefix}${spanClassMap[value]}`)
  }

  return classes.join(' ')
}

export const ResponsiveGridItem = React.forwardRef<HTMLDivElement, ResponsiveGridItemProps>(
  ({ className, span, children, ...props }, ref) => {
    const spanClasses = buildSpanClasses(span)

    return (
      <div ref={ref} className={twMerge(clsx(spanClasses, className))} {...props}>
        {children}
      </div>
    )
  }
)

ResponsiveGridItem.displayName = 'ResponsiveGridItem'
