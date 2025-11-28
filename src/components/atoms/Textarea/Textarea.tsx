// File: src/components/atoms/Textarea/Textarea.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  fullWidth?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, fullWidth = true, resize = 'vertical', onChange, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        EventType.UI_CHANGE,
        { value: e.target.value },
        {
          meta: { component: 'Textarea' },
          flags: { sensitive: false },
        }
      )
      onChange?.(e)
    }

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }

    return (
      <textarea
        ref={ref}
        className={twMerge(
          clsx(
            'flex min-h-[80px] w-full rounded-xl bg-surface-alt px-3 py-2 text-sm placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200',
            resizeClasses[resize],
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

Textarea.displayName = 'Textarea'
