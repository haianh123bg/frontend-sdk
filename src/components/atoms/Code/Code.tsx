// File: src/components/atoms/Code/Code.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  block?: boolean
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, block = false, children, ...props }, ref) => {
    if (block) {
      return (
        <pre
          ref={ref as any}
          className={twMerge(
            clsx(
              'overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-50',
              'font-mono',
              className
            )
          )}
          {...props}
        >
          <code>{children}</code>
        </pre>
      )
    }

    return (
      <code
        ref={ref as any}
        className={twMerge(
          clsx(
            'rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-900',
            className
          )
        )}
        {...props}
      >
        {children}
      </code>
    )
  }
)

Code.displayName = 'Code'
