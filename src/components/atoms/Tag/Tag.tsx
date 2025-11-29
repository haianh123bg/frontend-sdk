import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClose?: (e: React.MouseEvent) => void
  disabled?: boolean
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', size = 'md', onClose, disabled, children, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-100 text-slate-700 border border-transparent',
      primary: 'bg-primary-50 text-primary-700 border border-primary-100',
      success: 'bg-green-50 text-green-700 border border-green-100',
      warning: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
      danger: 'bg-red-50 text-red-700 border border-red-100',
      info: 'bg-blue-50 text-blue-700 border border-blue-100',
      outline: 'bg-transparent text-slate-600 border border-slate-300',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
      lg: 'px-3 py-1.5 text-base gap-2',
    }

    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center rounded-md font-medium transition-colors',
            disabled && 'opacity-50 pointer-events-none',
            variants[variant],
            sizes[size],
            className
          )
        )}
        {...props}
      >
        {children}
        {onClose && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose(e)
            }}
            className="rounded-full p-0.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-1"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'
