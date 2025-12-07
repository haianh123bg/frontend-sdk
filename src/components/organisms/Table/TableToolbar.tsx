// File: src/components/organisms/Table/TableToolbar.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Tag } from '../../atoms/Tag/Tag'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { MenuDropdown } from '../../molecules/MenuDropdown/MenuDropdown'
import { SearchInput } from '../../molecules/Search/SearchInput'
import { Columns3, Download, Filter, Search } from 'lucide-react'

export interface ColumnVisibilityItem {
  id: string
  label: string
  visible: boolean
  disabled?: boolean
}

export interface ToolbarFilterOption {
  label: string
  value: string
  disabled?: boolean
}

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  selectedCount?: number
  onClearSelection?: () => void
  filters?: React.ReactNode
  actions?: React.ReactNode
  filterOptions?: ToolbarFilterOption[]
  filterValue?: string
  onFilterChange?: (value: string | undefined) => void
  filterPlaceholder?: string
  columnVisibilityItems?: ColumnVisibilityItem[]
  onColumnVisibilityChange?: (id: string, visible: boolean) => void
  noBackground?: boolean
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
      filterOptions,
      filterValue,
      onFilterChange,
      filterPlaceholder = 'All statuses',
      columnVisibilityItems,
      onColumnVisibilityChange,
      noBackground,
      ...props
    },
    ref
  ) => {
    const showSelection = selectedCount > 0
    const hasColumnVisibility =
      Array.isArray(columnVisibilityItems) && columnVisibilityItems.length > 0 && !!onColumnVisibilityChange
    const hasSearch = typeof onSearchChange === 'function' || typeof searchValue !== 'undefined'
    const hasFilterOptions =
      Array.isArray(filterOptions) && filterOptions.length > 0 && typeof onFilterChange === 'function'
    const effectiveFilterValue = filterValue ?? ''
    const selectedFilterOption = hasFilterOptions
      ? filterOptions!.find((o) => o.value === effectiveFilterValue) ?? filterOptions![0]
      : undefined
    const selectedFilterLabel = selectedFilterOption?.label ?? filterPlaceholder
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
    const [isFilterOpen, setIsFilterOpen] = React.useState(false)
    const [isColumnsOpen, setIsColumnsOpen] = React.useState(false)
    const searchInputRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isSearchOpen])

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between',
            !noBackground && 'rounded-2xl bg-surface px-4 py-3 shadow-sm',
            noBackground && 'bg-transparent px-0 py-0 shadow-none rounded-none',
            className
          )
        )}
        {...props}
      >
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              {hasSearch && (
                <>
                  <IconButton
                    icon={Search}
                    size="sm"
                    onClick={() => setIsSearchOpen((prev) => !prev)}
                  />
                  {isSearchOpen && (
                    <div className="min-w-[200px]">
                      <SearchInput
                        ref={searchInputRef}
                        value={searchValue}
                        onSearch={(value) => onSearchChange?.(value)}
                        placeholder={searchPlaceholder}
                        fullWidth={false}
                        className="h-9 w-56"
                      />
                    </div>
                  )}
                </>
              )}
              {hasFilterOptions
                ? (
                    <div className="relative">
                      <IconButton
                        icon={Filter}
                        size="sm"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                      />
                      {isFilterOpen && (
                        <MenuDropdown
                          label={selectedFilterLabel}
                          options={filterOptions!}
                          value={effectiveFilterValue}
                          onChange={(next) => {
                            onFilterChange?.(next || undefined)
                            setIsFilterOpen(false)
                          }}
                        />
                      )}
                    </div>
                  )
                : filters && (
                    <>
                      <IconButton
                        icon={Filter}
                        size="sm"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                      />
                      {isFilterOpen && <div className="min-w-[160px]">{filters}</div>}
                    </>
                  )}
            </div>
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
          {hasColumnVisibility && (
            <div className="relative">
              <IconButton
                icon={Columns3}
                size="sm"
                onClick={() => setIsColumnsOpen((prev) => !prev)}
              />
              {isColumnsOpen && (
                <MenuDropdown
                  label="Columns"
                  options={columnVisibilityItems!.map((item) => ({
                    label: item.label,
                    value: item.id,
                    disabled: item.disabled,
                  }))}
                  renderOption={(option) => {
                    const item = columnVisibilityItems!.find((col) => col.id === option.value)
                    if (!item) return null
                    return (
                      <label className="flex w-full cursor-pointer items-center gap-2 px-4 py-1.5 text-sm text-text-secondary">
                        <Checkbox
                          checked={item.visible}
                          disabled={item.disabled}
                          onChange={(e) =>
                            onColumnVisibilityChange?.(item.id, e.target.checked)
                          }
                        />
                        <span>{item.label}</span>
                      </label>
                    )
                  }}
                />
              )}
            </div>
          )}
          {actions}
          {!actions && <IconButton icon={Download} size="sm" />}
        </div>
      </div>
    )
  }
)

TableToolbar.displayName = 'TableToolbar'
