// File: src/components/atoms/DatePicker/DatePicker.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  error?: boolean
  fullWidth?: boolean
  onChange?: (date: string) => void
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, fullWidth = true, onChange, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      dispatch(
        EventType.UI_CHANGE,
        { date: value },
        { meta: { component: 'DatePicker' } }
      )
      onChange?.(value)
    }

    return (
      <input
        ref={ref}
        type="date"
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
      />
    )
  }
)

DatePicker.displayName = 'DatePicker'
