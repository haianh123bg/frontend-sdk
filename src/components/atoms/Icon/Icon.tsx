// File: src/components/atoms/Icon/Icon.tsx
import * as React from 'react'
import { type LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type IconVariant = 'default' | 'primary' | 'muted' | 'error' | 'success' | 'warning' | 'info' | 'white'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: LucideIcon
  variant?: IconVariant
  size?: IconSize
}

const variantStyles: Record<IconVariant, string> = {
  default: 'text-text',
  primary: 'text-primary-500',
  muted: 'text-text-muted',
  error: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  white: 'text-white',
}

const sizeStyles: Record<IconSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={twMerge(clsx(variantStyles[variant], sizeStyles[size], className))}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'
