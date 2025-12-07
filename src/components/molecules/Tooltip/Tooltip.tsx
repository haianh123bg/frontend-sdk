// File: src/components/molecules/Tooltip/Tooltip.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  className,
}) => {
  const [visible, setVisible] = React.useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowPositionClasses = {
    top: 'left-1/2 top-full -translate-x-1/2 -translate-y-1/2',
    bottom: 'left-1/2 bottom-full -translate-x-1/2 translate-y-1/2',
    left: 'top-1/2 left-full -translate-y-1/2 -translate-x-1/2',
    right: 'top-1/2 right-full -translate-y-1/2 translate-x-1/2',
  }

  const variantClasses: Record<
    NonNullable<TooltipProps['variant']>,
    { container: string; arrow: string }
  > = {
    default: {
      container: 'bg-slate-900 text-white',
      arrow: 'bg-slate-900',
    },
    success: {
      container: 'bg-emerald-600 text-white',
      arrow: 'bg-emerald-600',
    },
    error: {
      container: 'bg-rose-600 text-white',
      arrow: 'bg-rose-600',
    },
    warning: {
      container: 'bg-amber-400 text-slate-900',
      arrow: 'bg-amber-400',
    },
    info: {
      container: 'bg-sky-600 text-white',
      arrow: 'bg-sky-600',
    },
  }

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, {
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
      })}
      {visible && (
        <div
          className={twMerge(
            clsx(
              'absolute z-50 whitespace-nowrap rounded-lg px-3 py-2 text-sm',
              'pointer-events-none',
              variantClasses[variant].container,
              positionClasses[position],
              className
            )
          )}
        >
          {content}
          <div
            className={clsx(
              'pointer-events-none absolute h-2 w-2 rotate-45',
              variantClasses[variant].arrow,
              arrowPositionClasses[position]
            )}
          />
        </div>
      )}
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
