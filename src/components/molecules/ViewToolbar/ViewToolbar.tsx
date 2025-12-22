import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Filter, ArrowUpDown, Settings, Search } from 'lucide-react'
import { Button } from '../../atoms/Button/Button'
import { Input } from '../../atoms/Input/Input'

export interface ViewToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilterClick?: () => void
  onSortClick?: () => void
  onSettingsClick?: () => void
  onSearch?: (term: string) => void
  filterActive?: boolean
  sortActive?: boolean
  settingsActive?: boolean
  extraActions?: React.ReactNode
}

export const ViewToolbar = React.forwardRef<HTMLDivElement, ViewToolbarProps>(
  (
    {
      className,
      onFilterClick,
      onSortClick,
      onSettingsClick,
      onSearch,
      filterActive,
      sortActive,
      settingsActive,
      extraActions,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('mb-3 flex flex-wrap items-center justify-between gap-3', className)
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {onSearch && (
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
              <Input
                placeholder="Tìm kiếm..."
                className="h-9 pl-8 text-sm"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
            {onFilterClick && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onFilterClick}
                className={clsx('h-8 w-8 px-0 text-text-secondary')}
                aria-label="Lọc"
              >
                <Filter size={16} />
              </Button>
            )}
            {onSortClick && (
              <Button
                size="sm"
                variant={sortActive ? 'primary' : 'ghost'}
                onClick={onSortClick}
                className={clsx(sortActive ? '' : 'text-text-secondary')}
              >
                <ArrowUpDown size={14} className="mr-1.5" />
                Sắp xếp
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {extraActions}
          {onSettingsClick && (
            <Button
              size="sm"
              variant={settingsActive ? 'primary' : 'ghost'}
              onClick={onSettingsClick}
              className={clsx('h-8 w-8 px-0', settingsActive ? '' : 'text-text-secondary')}
              aria-label="Cài đặt"
            >
              <Settings size={16} />
            </Button>
          )}
        </div>
      </div>
    )
  }
)

ViewToolbar.displayName = 'ViewToolbar'
