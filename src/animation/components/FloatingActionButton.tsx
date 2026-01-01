import * as React from 'react'
import { m, type HTMLMotionProps } from 'framer-motion'
import { clsx } from 'clsx'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '../../components/atoms/Icon/Icon'
import { motionSprings } from '../tokens'

export interface FloatingActionButtonProps extends HTMLMotionProps<'button'> {
  icon: LucideIcon
  label?: string
  variant?: 'primary' | 'danger'
}

const variantClasses: Record<NonNullable<FloatingActionButtonProps['variant']>, string> = {
  primary: 'bg-primary-500 text-white shadow-primary-200/60',
  danger: 'bg-red-500 text-white shadow-red-200/70',
}

export const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ icon, label, variant = 'primary', className, ...props }, ref) => {
    return (
      <m.button
        ref={ref}
        type="button"
        className={clsx(
          'inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-colors',
          variantClasses[variant],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={motionSprings.snappy as any}
        {...props}
      >
        <Icon icon={icon} variant="white" size="md" />
        {label && <span>{label}</span>}
      </m.button>
    )
  }
)

FloatingActionButton.displayName = 'FloatingActionButton'
