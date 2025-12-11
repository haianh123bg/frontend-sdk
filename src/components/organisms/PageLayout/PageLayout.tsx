import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: 'full' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  padded?: boolean
}

const maxWidthClasses: Record<NonNullable<PageLayoutProps['maxWidth']>, string> = {
  full: 'max-w-full',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

export const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, children, sidebar, header, footer, maxWidth = '7xl', padded = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx('flex min-h-screen w-full bg-background text-text-primary', className)
        )}
        {...props}
      >
        {sidebar && (
          <aside className="hidden w-64 flex-col gap-4 bg-surface p-6 lg:flex">
            {sidebar}
          </aside>
        )}

        <div className="flex flex-1 flex-col">
          {header && (
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/80 px-6 backdrop-blur-sm border-b border-slate-200">
              {header}
            </header>
          )}

          <main
            className={twMerge(
              clsx('flex-1', padded && 'p-6')
            )}
          >
            <div className={twMerge(clsx('mx-auto w-full', maxWidthClasses[maxWidth]))}>
              {children}
            </div>
          </main>

          {footer && (
            <footer className="border-t border-slate-200 bg-surface px-6 py-4 text-xs text-text-muted">
              <div className={twMerge(clsx('mx-auto w-full', maxWidthClasses[maxWidth]))}>
                {footer}
              </div>
            </footer>
          )}
        </div>
      </div>
    )
  }
)

PageLayout.displayName = 'PageLayout'
