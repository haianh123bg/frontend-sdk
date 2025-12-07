// File: src/components/atoms/Rating/Rating.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Giá trị rating hiện tại (mode controlled). */
  value?: number
  /** Giá trị mặc định khi uncontrolled. */
  defaultValue?: number
  /** Số lượng icon tối đa, mặc định 5. */
  max?: number
  /** Chỉ hiển thị, không cho phép thay đổi. */
  readOnly?: boolean
  /** Vô hiệu hóa tương tác. */
  disabled?: boolean
  /** Cho phép click lại vào cùng giá trị để clear về 0. */
  allowClear?: boolean
  /** Kích thước icon. */
  size?: 'sm' | 'md' | 'lg'
  /** Hiển thị text giá trị (vd: 3/5). */
  showValue?: boolean
  /** Callback khi giá trị thay đổi. */
  onChange?: (value: number) => void
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value,
      defaultValue = 0,
      max = 5,
      readOnly,
      disabled,
      allowClear,
      size = 'md',
      showValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const dispatch = useDispatchAction()
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState(defaultValue)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const currentValue = isControlled ? (value as number) : internal
    const displayValue = hoverValue ?? currentValue

    const sizeClasses: Record<NonNullable<RatingProps['size']>, string> = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    const handleChange = (next: number) => {
      if (disabled || readOnly) return
      const finalValue = allowClear && next === currentValue ? 0 : next
      if (!isControlled) {
        setInternal(finalValue)
      }
      dispatch(
        EventType.UI_CHANGE,
        { value: finalValue },
        { meta: { component: 'Rating' } }
      )
      onChange?.(finalValue)
    }

    const handleMouseEnter = (next: number) => {
      if (disabled || readOnly) return
      setHoverValue(next)
    }

    const handleMouseLeave = () => {
      if (disabled || readOnly) return
      setHoverValue(null)
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center gap-1',
            disabled && 'cursor-not-allowed opacity-60',
            className
          )
        )}
        aria-disabled={disabled}
        {...rest}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1
          const active = displayValue >= starValue

          return (
            <button
              key={starValue}
              type="button"
              className={clsx(
                'p-0 border-none bg-transparent outline-none',
                (disabled || readOnly) ? 'cursor-default' : 'cursor-pointer'
              )}
              onClick={() => handleChange(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={disabled}
              aria-label={`Rating ${starValue}`}
            >
              <svg
                viewBox="0 0 20 20"
                className={clsx(
                  'transition-colors duration-150',
                  sizeClasses[size],
                  active
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300 fill-slate-100'
                )}
                aria-hidden="true"
              >
                <path d="M10 1.5l2.47 5.01 5.53.8-4 3.89.94 5.5L10 13.9l-4.94 2.8.94-5.5-4-3.9 5.53-.79L10 1.5z" />
              </svg>
            </button>
          )
        })}
        {showValue && (
          <span className="ml-1 text-xs font-medium text-text-secondary">
            {currentValue}/{max}
          </span>
        )}
      </div>
    )
  }
)

Rating.displayName = 'Rating'
