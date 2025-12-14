// File: src/components/atoms/Checkbox/Checkbox.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, variant = 'primary', indeterminate, onChange, id, checked, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const generatedId = React.useId()
    const checkboxId = id || generatedId
    const localRef = React.useRef<HTMLInputElement | null>(null)

    const checkedProps = checked !== undefined ? { checked } : {}

    React.useEffect(() => {
      if (!localRef.current) return
      localRef.current.indeterminate = !!indeterminate
    }, [indeterminate])

    const setRefs = (node: HTMLInputElement | null) => {
      localRef.current = node
      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
        return
      }
      ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        EventType.UI_CHANGE,
        { checked: e.target.checked, value: e.target.value },
        { meta: { component: 'Checkbox' } }
      )
      onChange?.(e)
    }

    const accentClasses: Record<NonNullable<CheckboxProps['variant']>, string> = {
      primary: 'accent-primary-500 focus-visible:ring-primary-500',
      success: 'accent-green-500 focus-visible:ring-green-500',
      warning: 'accent-amber-500 focus-visible:ring-amber-500',
      danger: 'accent-red-500 focus-visible:ring-red-500',
      info: 'accent-blue-500 focus-visible:ring-blue-500',
    }

    const effectiveAccent = error ? 'accent-red-500 focus-visible:ring-red-500' : accentClasses[variant]

    // Biến thể primary: dùng box custom với nền gradient + icon check trắng khi checked
    if (variant === 'primary') {
      return (
        <div className="flex items-center gap-2">
          <label htmlFor={checkboxId} className="flex items-center gap-2 cursor-pointer select-none">
            <span className="relative inline-flex items-center justify-center">
              <input
                ref={setRefs}
                type="checkbox"
                id={checkboxId}
                className={twMerge(
                  clsx(
                    'peer sr-only',
                    'focus-visible:outline-none',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                  )
                )}
                onChange={handleChange}
                {...checkedProps}
                {...props}
              />
              <span
                className={clsx(
                  'h-4 w-4 rounded border border-slate-300 bg-surface-alt',
                  'transition-all duration-200',
                  'peer-checked:bg-[linear-gradient(135deg,#0EA5E9,#0284C7)]',
                  'peer-checked:border-transparent',
                  indeterminate && 'bg-[linear-gradient(135deg,#0EA5E9,#0284C7)] border-transparent',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-500',
                  'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
                  error && 'border-red-500'
                )}
              />
              <svg
                viewBox="0 0 16 16"
                className={clsx(
                  'pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity duration-150',
                  'peer-checked:opacity-100',
                  indeterminate && 'opacity-100'
                )}
                aria-hidden="true"
              >
                {indeterminate ? (
                  <line
                    x1="4"
                    y1="8"
                    x2="12"
                    y2="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                ) : (
                  <polyline
                    points="3.5 8.5 6.5 11.5 12.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </span>
            {label && (
              <span className="text-sm font-medium text-text-primary">{label}</span>
            )}
          </label>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <input
          ref={setRefs}
          type="checkbox"
          id={checkboxId}
          className={twMerge(
            clsx(
              'h-4 w-4 cursor-pointer rounded bg-surface-alt border border-slate-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200',
              effectiveAccent,
              error && 'border-red-500',
              className
            )
          )}
          onChange={handleChange}
          {...checkedProps}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="cursor-pointer text-sm font-medium text-text-primary select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
