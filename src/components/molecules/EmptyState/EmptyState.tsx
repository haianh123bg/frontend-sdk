import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { PackageOpen } from 'lucide-react'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ElementType
  action?: React.ReactNode
  imageSrc?: string
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title = 'No data', description = 'There is no data to display here.', icon: Icon, imageSrc, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center',
            className
          )
        )}
        {...props}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
          {imageSrc ? (
            <img src={imageSrc} alt="" className="h-10 w-10 object-contain opacity-80" />
          ) : Icon ? (
            <Icon className="h-8 w-8 text-slate-400" />
          ) : (
            <PackageOpen className="h-8 w-8 text-slate-400" />
          )}
        </div>
        
        <h3 className="mb-1 text-lg font-semibold text-slate-900">{title}</h3>
        
        {description && (
          <p className="mb-6 max-w-sm text-sm text-slate-500">
            {description}
          </p>
        )}

        {action && <div className="mt-2">{action}</div>}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'
