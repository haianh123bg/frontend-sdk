// File: src/components/atoms/Checkbox/Checkbox.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, onChange, id, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const generatedId = React.useId()
    const checkboxId = id || generatedId

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        EventType.UI_CHANGE,
        { checked: e.target.checked, value: e.target.value },
        { meta: { component: 'Checkbox' } }
      )
      onChange?.(e)
    }

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={twMerge(
            clsx(
              'h-4 w-4 cursor-pointer rounded bg-surface-alt text-primary-500',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200',
              error && 'ring-2 ring-red-500',
              className
            )
          )}
          onChange={handleChange}
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
