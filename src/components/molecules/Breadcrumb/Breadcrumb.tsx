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
  hoverEffect?: 'underline' | 'none'
  emphasizeLast?: boolean
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
  hoverEffect = 'underline',
  emphasizeLast = false,
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
                    'relative text-sm text-text-primary font-normal transition-colors',
                    isLast
                      ? emphasizeLast
                        ? 'font-medium cursor-default'
                        : 'cursor-default'
                      : 'cursor-pointer',
                    hoverEffect === 'underline' && !isLast &&
                      "pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                  )
                )}
              >
                {item.label}
              </a>
            ) : (
              <span className="text-sm text-text-primary font-normal">{item.label}</span>
            )}
            {!isLast && <span className="text-sm text-text-primary">{separator}</span>}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
