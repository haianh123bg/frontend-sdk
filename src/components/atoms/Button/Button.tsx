// File: src/components/atoms/Button/Button.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useDispatchAction } from '../../../bus/hooks'
import { EventType } from '../../../events/types'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, isLoading, icon, onClick, children, ...props }, ref) => {
    const dispatch = useDispatchAction()

    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
      secondary: 'bg-surface-alt text-text-primary hover:bg-slate-200 active:bg-slate-300',
      ghost: 'hover:bg-slate-100 text-text-secondary hover:text-text-primary',
      danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    }

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-8 text-base',
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(EventType.UI_CLICK, { component: 'Button', variant }, { meta: { component: 'Button' } })
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
          )
        )}
        onClick={handleClick}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {icon && (
          <span className={clsx('inline-flex shrink-0', children ? 'mr-2' : undefined)}>
            {icon}
          </span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
