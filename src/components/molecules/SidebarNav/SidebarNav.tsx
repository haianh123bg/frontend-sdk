import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface SidebarNavItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  badge?: React.ReactNode
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[]
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, items, header, footer, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={twMerge(
          clsx('flex h-full w-full flex-col gap-3 text-sm text-text-secondary', className)
        )}
        {...props}
      >
        {header && <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">{header}</div>}

        <div className="flex-1 space-y-1">
          {items.map((item) => {
            const isActive = item.active
            const Component: any = item.href ? 'a' : 'button'

            return (
              <Component
                key={item.id}
                href={item.href}
                type={item.href ? undefined : 'button'}
                onClick={item.onClick}
                disabled={item.disabled}
                className={twMerge(
                  clsx(
                    'flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )
                )}
              >
                {item.icon && <span className="text-lg text-primary-500">{item.icon}</span>}
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && <span className="ml-2 text-xs text-text-muted">{item.badge}</span>}
              </Component>
            )
          })}
        </div>

        {footer && <div className="mt-4 text-xs text-text-muted">{footer}</div>}
      </nav>
    )
  }
)

SidebarNav.displayName = 'SidebarNav'
