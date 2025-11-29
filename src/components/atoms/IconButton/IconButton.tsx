// File: src/components/atoms/IconButton/IconButton.tsx
import * as React from 'react'
import { type LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { Icon } from '../Icon/Icon'

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'

const buttonSizeStyles: Record<IconButtonSize, string> = {
  xs: 'h-8 w-8',
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
  lg: 'h-11 w-11',
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  size?: IconButtonSize
  variant?: 'default' | 'primary' | 'muted'
  disableHover?: boolean
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'sm', variant = 'muted', className, disableHover = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'flex items-center justify-center rounded-full transition-colors',
          !disableHover && 'hover:bg-slate-100',
          buttonSizeStyles[size],
          className
        )}
        {...props}
      >
        <Icon icon={icon} size={size} variant={variant} />
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
