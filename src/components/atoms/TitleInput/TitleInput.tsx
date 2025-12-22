import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface TitleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  fullWidth?: boolean
}

export const TitleInput = React.forwardRef<HTMLInputElement, TitleInputProps>(
  ({ className, type, error, fullWidth = true, onChange, onBlur, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        EventType.UI_CHANGE,
        { value: e.target.value },
        {
          meta: { component: 'TitleInput', type },
          flags: { sensitive: type === 'password' || type === 'email' },
        }
      )
      onChange?.(e)
    }

    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          clsx(
            'w-full bg-transparent text-2xl font-semibold text-text-primary outline-none placeholder:text-text-muted',
            'focus-visible:outline-none',
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

TitleInput.displayName = 'TitleInput'
