import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface DescriptionListItem {
  label: React.ReactNode
  value: React.ReactNode
  span?: 1 | 2 | 3
}

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: DescriptionListItem[]
  columns?: 1 | 2 | 3
  dense?: boolean
}

const columnClasses: Record<NonNullable<DescriptionListProps['columns']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}

export const DescriptionList = React.forwardRef<HTMLDivElement, DescriptionListProps>(
  ({ className, items, columns = 2, dense = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('w-full', className)
        )}
        {...props}
      >
        <dl
          className={twMerge(
            clsx(
              'grid gap-x-6 gap-y-3',
              columnClasses[columns],
              dense && 'gap-y-2'
            )
          )}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={twMerge(
                clsx(
                  'flex flex-col gap-0.5',
                  item.span === 2 && 'sm:col-span-2',
                  item.span === 3 && 'lg:col-span-3'
                )
              )}
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                {item.label}
              </dt>
              <dd className="text-sm text-text-primary">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }
)

DescriptionList.displayName = 'DescriptionList'
