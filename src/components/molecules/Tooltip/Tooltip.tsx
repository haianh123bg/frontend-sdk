// File: src/components/molecules/Tooltip/Tooltip.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  const [visible, setVisible] = React.useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
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
              'absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white',
              'pointer-events-none',
              positionClasses[position],
              className
            )
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
