// File: src/components/atoms/Grid/Grid.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type GridSizeValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type GridSizeConfig = GridSizeValue | Partial<Record<GridBreakpoint, GridSizeValue>>

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean
  spacing?: 0 | 1 | 2 | 3 | 4
  size?: GridSizeConfig
}

const breakpointPrefixes: Record<GridBreakpoint, string> = {
  xs: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
}

const sizeClassMap: Record<GridSizeValue, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
}

const spacingClassMap: Record<NonNullable<GridProps['spacing']>, string> = {
  0: 'gap-0',
  1: 'gap-2',
  2: 'gap-4',
  3: 'gap-6',
  4: 'gap-8',
}

const breakpointsOrder: GridBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

const _gridColSpanSafelist = [
  'col-span-1','col-span-2','col-span-3','col-span-4','col-span-5','col-span-6','col-span-7','col-span-8','col-span-9','col-span-10','col-span-11','col-span-12',
  'sm:col-span-1','sm:col-span-2','sm:col-span-3','sm:col-span-4','sm:col-span-5','sm:col-span-6','sm:col-span-7','sm:col-span-8','sm:col-span-9','sm:col-span-10','sm:col-span-11','sm:col-span-12',
  'md:col-span-1','md:col-span-2','md:col-span-3','md:col-span-4','md:col-span-5','md:col-span-6','md:col-span-7','md:col-span-8','md:col-span-9','md:col-span-10','md:col-span-11','md:col-span-12',
  'lg:col-span-1','lg:col-span-2','lg:col-span-3','lg:col-span-4','lg:col-span-5','lg:col-span-6','lg:col-span-7','lg:col-span-8','lg:col-span-9','lg:col-span-10','lg:col-span-11','lg:col-span-12',
  'xl:col-span-1','xl:col-span-2','xl:col-span-3','xl:col-span-4','xl:col-span-5','xl:col-span-6','xl:col-span-7','xl:col-span-8','xl:col-span-9','xl:col-span-10','xl:col-span-11','xl:col-span-12',
  '2xl:col-span-1','2xl:col-span-2','2xl:col-span-3','2xl:col-span-4','2xl:col-span-5','2xl:col-span-6','2xl:col-span-7','2xl:col-span-8','2xl:col-span-9','2xl:col-span-10','2xl:col-span-11','2xl:col-span-12',
]

void _gridColSpanSafelist

function buildSizeClasses(size?: GridSizeConfig): string {
  if (!size) return ''
  const sizeObj: Partial<Record<GridBreakpoint, GridSizeValue>> =
    typeof size === 'number' ? { xs: size } : size
  const classes: string[] = []

  for (const bp of breakpointsOrder) {
    const value = sizeObj[bp]
    if (!value) continue
    const prefix = breakpointPrefixes[bp]
    classes.push(`${prefix}${sizeClassMap[value]}`)
  }

  return classes.join(' ')
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ container, spacing = 0, size, className, children, ...props }, ref) => {
    const classes: string[] = []

    if (container) {
      classes.push('grid', 'grid-cols-12', spacingClassMap[spacing])
    }

    const sizeClasses = buildSizeClasses(size)
    if (sizeClasses) {
      classes.push(sizeClasses)
    }

    return (
      <div ref={ref} className={twMerge(clsx(classes, className))} {...props}>
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'
