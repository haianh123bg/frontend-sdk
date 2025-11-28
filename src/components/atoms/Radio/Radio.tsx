// File: src/components/atoms/Radio/Radio.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, onChange, id, ...props }, ref) => {
    const dispatch = useDispatchAction()
    const generatedId = React.useId()
    const radioId = id || generatedId

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        EventType.UI_CHANGE,
        { checked: e.target.checked, value: e.target.value },
        { meta: { component: 'Radio' } }
      )
      onChange?.(e)
    }

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={twMerge(
            clsx(
              'h-4 w-4 cursor-pointer rounded-full bg-surface-alt text-primary-500',
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
            htmlFor={radioId}
            className="cursor-pointer text-sm font-medium text-text-primary select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
