// File: src/components/organisms/Table/TableToolbar.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'
import { Tag } from '../../atoms/Tag/Tag'

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  selectedCount?: number
  onClearSelection?: () => void
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  (
    {
      className,
      searchPlaceholder = 'Search...',
      searchValue,
      onSearchChange,
      selectedCount = 0,
      onClearSelection,
      filters,
      actions,
      ...props
    },
    ref
  ) => {
    const showSelection = selectedCount > 0

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-col gap-3 border-b border-slate-200 bg-surface px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between',
            className
          )
        )}
        {...props}
      >
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 max-w-xs"
            />
            {filters}
          </div>
          {showSelection && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Tag variant="default">{selectedCount} selected</Tag>
              {onClearSelection && (
                <button
                  type="button"
                  onClick={onClearSelection}
                  className="text-primary-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {!actions && (
            <Button variant="secondary" size="sm">
              Export
            </Button>
          )}
        </div>
      </div>
    )
  }
)

TableToolbar.displayName = 'TableToolbar'
