// File: src/components/atoms/Divider/Divider.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: React.ReactNode
  align?: 'start' | 'center' | 'end'
  dashed?: boolean
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, align = 'center', dashed, ...props }, ref) => {
    const lineClass = clsx('border-slate-200', dashed && 'border-dashed')

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={twMerge(
            clsx('mx-2 self-stretch border-l', lineClass, className)
          )}
          {...props}
        />
      )
    }

    // horizontal
    const renderLine = (side: 'left' | 'right') => (
      <div
        className={clsx(
          'flex-1 border-t',
          lineClass,
          label && align === 'center' && (side === 'left' ? 'mr-3' : 'ml-3'),
          label && align === 'end' && side === 'left' && 'mr-3',
          label && align === 'start' && side === 'right' && 'ml-3'
        )}
      />
    )

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={twMerge(clsx('flex w-full items-center', className))}
        {...props}
      >
        {!label && (
          <div className={clsx('h-px w-full border-t', lineClass)} />
        )}
        {label && (
          <>
            {(align === 'center' || align === 'end') && renderLine('left')}
            <span className="text-xs font-medium text-text-muted">{label}</span>
            {(align === 'center' || align === 'start') && renderLine('right')}
          </>
        )}
      </div>
    )
  }
)

Divider.displayName = 'Divider'
