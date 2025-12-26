import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'dark' | 'light'
  blur?: 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'md' | 'lg' | 'xl' | '2xl'
  interactive?: boolean
}

const blurMap = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur',
  lg: 'backdrop-blur-lg',
} as const

const paddingMap = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const

const roundedMap = {
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
} as const

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      tone = 'dark',
      blur = 'md',
      padding = 'md',
      rounded = 'lg',
      interactive,
      ...props
    },
    ref
  ) => {
    const toneClasses =
      tone === 'dark'
        ? 'bg-white/10 text-white ring-1 ring-inset ring-white/10'
        : 'bg-slate-950/5 text-text-primary ring-1 ring-inset ring-slate-900/10'

    const interactiveClasses =
      tone === 'dark'
        ? 'transition-colors hover:bg-white/15 active:bg-white/20'
        : 'transition-colors hover:bg-slate-950/10 active:bg-slate-950/15'

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'relative',
            blurMap[blur],
            roundedMap[rounded],
            paddingMap[padding],
            toneClasses,
            interactive && interactiveClasses,
            className
          )
        )}
        {...props}
      />
    )
  }
)

GlassPanel.displayName = 'GlassPanel'
