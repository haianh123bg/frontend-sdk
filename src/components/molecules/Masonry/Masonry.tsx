// File: src/components/molecules/Masonry/Masonry.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface MasonryItem {
  id?: string
  content: React.ReactNode
}

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: { base: number; md?: number; lg?: number }
  gap?: 'sm' | 'md' | 'lg'
  items: MasonryItem[]
}

const gapClasses = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

export const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, columns = { base: 1, md: 2, lg: 3 }, gap = 'md', items, ...props }, ref) => {
    const columnClasses = clsx(
      `columns-${columns.base}`,
      columns.md && `md:columns-${columns.md}`,
      columns.lg && `lg:columns-${columns.lg}`
    )

    return (
      <div
        ref={ref}
        className={twMerge(clsx('w-full', gapClasses[gap], columnClasses, className))}
        {...props}
      >
        {items.map((item, index) => (
          <div key={item.id ?? index} className="mb-4 break-inside-avoid">
            {item.content}
          </div>
        ))}
      </div>
    )
  }
)

Masonry.displayName = 'Masonry'
