// File: src/components/molecules/Breadcrumb/Breadcrumb.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={twMerge(clsx('flex items-center gap-2', className))}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <React.Fragment key={index}>
            {item.href || item.onClick ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className={twMerge(
                  clsx(
                    'text-sm transition-colors',
                    isLast
                      ? 'font-medium text-text-primary cursor-default'
                      : 'text-text-secondary hover:text-text-primary cursor-pointer'
                  )
                )}
              >
                {item.label}
              </a>
            ) : (
              <span className="text-sm font-medium text-text-primary">{item.label}</span>
            )}
            {!isLast && <span className="text-text-muted">{separator}</span>}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
