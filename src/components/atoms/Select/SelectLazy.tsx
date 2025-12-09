import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { SelectOption, SelectProps as BaseSelectProps } from './Select'

export interface FetchOptionsParams {
  page: number
  pageSize: number
  /**
   * Từ khóa tìm kiếm gửi xuống server (nếu hỗ trợ).
   */
  search?: string
}

export interface FetchOptionsResult {
  data: SelectOption[]
  hasMore: boolean
}

export interface SelectLazyProps extends Omit<BaseSelectProps, 'options' | 'onValueChange'> {
  /**
   * Function to fetch options asynchronously.
   */
  fetchOptions: (params: FetchOptionsParams) => Promise<FetchOptionsResult>
  /**
   * Number of items to load per page.
   * @default 20
   */
  pageSize?: number
  /**
   * Thời gian debounce cho tìm kiếm (ms).
   * @default 400
   */
  debounceMs?: number
  /**
   * Bật/tắt ô tìm kiếm phía trên dropdown.
   * @default true
   */
  enableSearch?: boolean
  searchPlaceholder?: string
  emptyText?: string
  loadingText?: string
  onValueChange?: (value: string) => void
}

export const SelectLazy = React.forwardRef<HTMLInputElement, SelectLazyProps>(
  (
    {
      className,
      fetchOptions,
      pageSize = 20,
      placeholder,
      error,
      fullWidth = true,
      disabled = false,
      value,
      defaultValue = '',
      onValueChange,
      enableSearch = true,
      debounceMs = 400,
      searchPlaceholder = 'Tìm kiếm...',
      emptyText = 'No options',
      loadingText = 'Loading...',
      name,
      id,
      onChange,
      ...rest
    },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const listRef = React.useRef<HTMLUListElement | null>(null)

    // Lazy Loading State
    const [options, setOptions] = React.useState<SelectOption[]>([])
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(1)
    const [hasMore, setHasMore] = React.useState(true)
    const [initialized, setInitialized] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

    // Search state
    const [searchTerm, setSearchTerm] = React.useState('')
    const [debouncedSearch, setDebouncedSearch] = React.useState('')

    const selectedValue = value ?? internalValue
    // Note: If the selected value is not in the currently loaded options, 
    // the label might not show correctly unless we preload it or handle it separately.
    const selectedOption = options.find((o) => o.value === selectedValue)

    const loadOptions = React.useCallback(
      async (pageToLoad: number, isNew: boolean = false, search: string = debouncedSearch) => {
        if (loading) return
        setLoading(true)
        try {
          const res = await fetchOptions({ page: pageToLoad, pageSize, search })
          setOptions((prev) => (isNew ? res.data : [...prev, ...res.data]))
          setHasMore(res.hasMore)
          setPage(pageToLoad)
          setErrorMessage(null)
        } catch (err) {
          console.error('Failed to load options', err)
          setErrorMessage('Không tải được dữ liệu')
        } finally {
          setLoading(false)
          setInitialized(true)
        }
      },
      [debouncedSearch, fetchOptions, pageSize, loading]
    )

    // Debounce search term
    React.useEffect(() => {
      const handle = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), debounceMs)
      return () => window.clearTimeout(handle)
    }, [searchTerm, debounceMs])

    // Initial load when opened
    React.useEffect(() => {
      if (open && !initialized && !loading) {
        loadOptions(1, true)
      }
    }, [open, initialized, loadOptions, loading])

    // Reload when search changes
    React.useEffect(() => {
      if (!open) return
      loadOptions(1, true, debouncedSearch)
    }, [debouncedSearch, open, loadOptions])

    const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      // Threshold of 20px from bottom
      if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore && !loading) {
        loadOptions(page + 1)
      }
    }

    const handleSelect = (next: string) => {
      if (disabled) return
      if (value === undefined) {
        setInternalValue(next)
      }
      dispatch(
        EventType.UI_CHANGE,
        { value: next },
        { meta: { component: 'SelectLazy' } }
      )
      if (onChange) {
        const event = {
          target: { value: next, name },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
      onValueChange?.(next)
      setOpen(false)
    }

    React.useEffect(() => {
      if (!open) return
      const handleClickOutside = (event: MouseEvent) => {
        if (!containerRef.current) return
        if (!containerRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    return (
      <div
        ref={containerRef}
        className={twMerge(
          clsx(
            'relative text-sm',
            fullWidth ? 'w-full' : 'w-auto',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          )
        )}
        {...rest}
      >
        <input
          ref={ref}
          type="hidden"
          name={name}
          id={id ?? name}
          value={selectedValue ?? ''}
        />
        <button
          type="button"
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={twMerge(
            clsx(
              'flex h-10 w-full items-center justify-between rounded-xl bg-surface-alt px-3 py-2',
              'text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
              'transition-all duration-200',
              !disabled && 'cursor-pointer',
              error && 'bg-red-50 text-red-700 focus-visible:ring-red-100'
            )
          )}
        >
          <span className={clsx('truncate', !selectedOption && 'text-text-muted')}>
            {selectedOption?.label ?? (selectedValue || placeholder || 'Select...')}
          </span>
          <span
            className={clsx(
              'ml-2 text-xs text-text-muted transition-transform',
              open && 'rotate-180'
            )}
          >
            ▼
          </span>
        </button>

        {open && !disabled && (
          <div className="absolute z-50 mt-1 w-full rounded-xl bg-surface shadow-lg outline-none overflow-hidden">
            {enableSearch && (
              <div className="border-b border-slate-100 bg-surface px-3 py-2">
                <input
                  type="search"
                  className={twMerge(
                    'h-8 w-full rounded-lg bg-surface-alt px-3 text-sm',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100'
                  )}
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            <ul
              ref={listRef}
              onScroll={handleScroll}
              className="max-h-60 overflow-auto py-1 text-sm scrollbar-thin scrollbar-thumb-gray-200"
            >
              {placeholder && (
                <li className="px-3 py-2 text-text-muted opacity-50">{placeholder}</li>
              )}
              
              {errorMessage && (
                <li className="px-3 py-2 text-center text-xs text-red-600">{errorMessage}</li>
              )}

              {options.length === 0 && !loading && !errorMessage && (
                <li className="px-3 py-2 text-center text-text-muted">
                  {emptyText}
                </li>
              )}

              {options.map((option) => {
                const isSelected = option.value === selectedValue
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      disabled={option.disabled}
                      onClick={() => handleSelect(option.value)}
                      className={twMerge(
                        clsx(
                          'flex w-full items-center justify-between px-3 py-2 text-left',
                          'transition-colors',
                          !option.disabled && 'hover:bg-slate-50 cursor-pointer',
                          option.disabled && 'cursor-not-allowed text-text-muted',
                          isSelected && 'bg-primary-50 text-primary-700'
                        )
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && <span className="ml-2 text-xs text-primary-600">●</span>}
                    </button>
                  </li>
                )
              })}
              
              {loading && (
                <li className="px-3 py-2 text-center text-xs text-text-muted animate-pulse">
                  {loadingText}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }
)

SelectLazy.displayName = 'SelectLazy'
