// File: src/components/organisms/Table/ActiveFilters.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tag } from '../../atoms/Tag/Tag'

export interface ActiveFilterChip {
  id: string
  label: string
  value?: string
  removable?: boolean
}

export interface ActiveFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: ActiveFilterChip[]
  onRemoveFilter?: (id: string) => void
  onClearAll?: () => void
  showClearAll?: boolean
  noBackground?: boolean
}

export const ActiveFilters = React.forwardRef<HTMLDivElement, ActiveFiltersProps>(
  (
    { className, filters, onRemoveFilter, onClearAll, showClearAll = true, noBackground, ...props },
    ref
  ) => {
    if (!filters || filters.length === 0) return null

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-wrap items-center gap-2 text-xs text-text-secondary',
            !noBackground && 'rounded-2xl bg-surface px-4 py-2',
            noBackground && 'bg-transparent px-0 py-0 rounded-none',
            className
          )
        )}
        {...props}
      >
        <span className="mr-1 font-medium text-text-muted">Active filters:</span>
        {filters.map((filter) => (
          <Tag
            key={filter.id}
            size="sm"
            variant="outline"
            onClose={filter.removable === false ? undefined : () => onRemoveFilter?.(filter.id)}
          >
            {filter.label}
            {filter.value ? `: ${filter.value}` : ''}
          </Tag>
        ))}
        {showClearAll && onClearAll && (
          <button
            type="button"
            onClick={() => onClearAll?.()}
            className="ml-2 text-[11px] font-medium text-primary-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    )
  }
)

ActiveFilters.displayName = 'ActiveFilters'
