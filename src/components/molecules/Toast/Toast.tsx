// File: src/components/molecules/Toast/Toast.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { X } from 'lucide-react'

export interface ToastProps {
  message: string
  variant?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
  className?: string
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ message, variant = 'info', duration = 3000, onClose, className }, ref) => {
    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    const variants = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex items-center justify-between gap-4 rounded-xl px-4 py-3 shadow-lg',
            'animate-in slide-in-from-top-5',
            variants[variant],
            className
          )
        )}
      >
        <span className="text-sm font-medium">{message}</span>
        {onClose && (
          <IconButton
            onClick={onClose}
            icon={X}
            size="xs"
            variant="default"
            disableHover
            aria-label="Close"
          />
        )}
      </div>
    )
  }
)

Toast.displayName = 'Toast'
