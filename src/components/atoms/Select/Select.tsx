// File: src/components/atoms/Select/Select.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'
import { Scroll, type ScrollProps } from '../Scroll/Scroll'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'> {
  options: SelectOption[]
  placeholder?: string
  error?: boolean
  fullWidth?: boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
  compact?: boolean
  hideCaret?: boolean
  mode?: 'filled' | 'ghost'
  variant?: 'filled' | 'ghost'
  dropdownPlacement?: 'bottom' | 'top'
  /**
   * Khi bật autoOpen, dropdown sẽ tự mở khi component render và không bị disabled.
   * Hữu ích cho các trường hợp muốn hiển thị menu ngay sau khi người dùng trigger từ bên ngoài.
   */
  autoOpen?: boolean
  dropdownScrollProps?: Omit<ScrollProps, 'direction' | 'children'>
  onValueChange?: (value: string) => void
}

export const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      className,
      options,
      placeholder,
      error,
      fullWidth = true,
      disabled = false,
      value,
      defaultValue = '',
      compact = false,
      hideCaret = false,
      mode,
      variant: variantProp = 'filled',
      dropdownPlacement = 'bottom',
      autoOpen = false,
      dropdownScrollProps,
      onValueChange,
      name,
      id,
      onChange,
      ...inputProps
    },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    const selectedValue = value ?? internalValue
    const selectedOption = options.find((o) => o.value === selectedValue)

    const variant = mode ?? variantProp

    const dropdownScrollAutoHide = dropdownScrollProps?.autoHide ?? true
    const dropdownScrollClassName = dropdownScrollProps?.className
    const { autoHide: _autoHide, className: _className, ...dropdownScrollRest } =
      dropdownScrollProps ?? {}

    const handleSelect = (next: string) => {
      if (disabled) return
      if (value === undefined) {
        setInternalValue(next)
      }
      dispatch(
        EventType.UI_CHANGE,
        { value: next },
        { meta: { component: 'Select' } }
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

    React.useEffect(() => {
      if (autoOpen && !open && !disabled) {
        setOpen(true)
      }
    }, [autoOpen, open, disabled])

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
      >
        <input
          ref={ref}
          type="hidden"
          name={name}
          id={id ?? name}
          value={selectedValue ?? ''}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={twMerge(
            clsx(
              'flex w-full items-center justify-between',
              variant === 'filled' && 'rounded-xl bg-surface-alt px-3 py-2',
              variant === 'ghost' && 'rounded-lg bg-transparent px-1 py-1 hover:bg-slate-50',
              'text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
              'transition-all duration-200',
              !disabled && 'cursor-pointer',
              error && 'bg-red-50 text-red-700 focus-visible:ring-red-100',
              compact && variant === 'filled' && 'h-8 rounded-lg px-2 text-xs',
              compact && variant === 'ghost' && 'h-7 text-xs'
            )
          )}
        >
          <span className={clsx('truncate', !selectedOption && 'text-text-muted')}>
            {selectedOption?.label ?? placeholder ?? 'Select...'}
          </span>
          {!hideCaret && (
            <span
              className={clsx(
                'ml-2 text-xs text-text-muted transition-transform',
                open && 'rotate-180'
              )}
            >
              ▼
            </span>
          )}
        </button>

        {open && !disabled && (
          <div
            className={twMerge(
              clsx(
                'absolute z-50 rounded-xl bg-surface shadow-lg outline-none overflow-hidden',
                dropdownPlacement === 'top' ? 'bottom-full mb-1' : 'mt-1',
                // giữ tối thiểu bằng trigger nhưng cho phép nở theo nội dung
                'min-w-full w-max max-w-[min(420px,calc(100vw-24px))]'
              )
            )}
          >
            <Scroll
              direction="vertical"
              autoHide={dropdownScrollAutoHide}
              className={twMerge('max-h-60 py-1 text-sm', dropdownScrollClassName)}
              {...dropdownScrollRest}
            >
              <ul>
                {placeholder && (
                  <li className="px-3 py-2 text-text-muted">
                    {placeholder}
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
                            isSelected && 'bg-primary-50'
                          )
                        )}
                      >
                        <span className="whitespace-nowrap">{option.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Scroll>
          </div>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
