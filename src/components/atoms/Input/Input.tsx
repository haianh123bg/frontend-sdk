// File: src/components/atoms/Input/Input.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, fullWidth = true, onChange, onBlur, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(EventType.UI_CHANGE, { value: e.target.value }, { 
        meta: { component: 'Input', type },
        flags: { sensitive: type === 'password' || type === 'email' } 
      })
      onChange?.(e)
    }

    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          clsx(
            'flex h-10 w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200',
            error && 'ring-2 ring-red-500 focus-visible:ring-red-500',
            fullWidth ? 'w-full' : 'w-auto',
            className
          )
        )}
        onChange={handleChange}
        onBlur={onBlur}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'