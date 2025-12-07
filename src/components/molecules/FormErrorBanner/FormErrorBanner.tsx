import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface FormErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | null
}

export const FormErrorBanner: React.FC<FormErrorBannerProps> = ({ message, className, children, ...rest }) => {
  if (!message && !children) return null

  return (
    <div
      className={twMerge(
        clsx(
          'flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700',
          className
        )
      )}
      role="alert"
      {...rest}
    >
      <span className="text-base leading-none">⚠</span>
      <div className="flex-1">
        {message && <p className="font-medium">{message}</p>}
        {children}
      </div>
    </div>
  )
}

FormErrorBanner.displayName = 'FormErrorBanner'
