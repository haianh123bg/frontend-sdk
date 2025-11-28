// File: src/components/atoms/Select/Select.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  placeholder?: string
  error?: boolean
  fullWidth?: boolean
  onChange?: (value: string) => void
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, fullWidth = true, onChange, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value
      dispatch(
        EventType.UI_CHANGE,
        { value },
        { meta: { component: 'Select' } }
      )
      onChange?.(value)
    }

    return (
      <select
        ref={ref}
        className={twMerge(
          clsx(
            'flex h-10 w-full rounded-xl bg-surface-alt px-3 py-2 text-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200',
            'cursor-pointer',
            error && 'ring-2 ring-red-500 focus-visible:ring-red-500',
            fullWidth ? 'w-full' : 'w-auto',
            className
          )
        )}
        onChange={handleChange}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = 'Select'
