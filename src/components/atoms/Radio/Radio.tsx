// File: src/components/atoms/Radio/Radio.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, variant = 'primary', onChange, id, ...props }, ref) => {
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

    const variantClasses: Record<NonNullable<RadioProps['variant']>, string> = {
      primary:
        'checked:bg-primary-500 checked:border-primary-500 focus-visible:ring-primary-500',
      success:
        'checked:bg-green-500 checked:border-green-500 focus-visible:ring-green-500',
      warning:
        'checked:bg-amber-500 checked:border-amber-500 focus-visible:ring-amber-500',
      danger: 'checked:bg-red-500 checked:border-red-500 focus-visible:ring-red-500',
      info: 'checked:bg-blue-500 checked:border-blue-500 focus-visible:ring-blue-500',
    }

    const effectiveVariant = error
      ? 'border-red-500 checked:bg-red-500 checked:border-red-500 focus-visible:ring-red-500'
      : variantClasses[variant]

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={twMerge(
            clsx(
              'h-4 w-4 cursor-pointer rounded-full border border-slate-300 bg-transparent',
              'appearance-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200',
              effectiveVariant,
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