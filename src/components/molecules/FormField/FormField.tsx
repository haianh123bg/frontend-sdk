// File: src/components/molecules/FormField/FormField.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  required?: boolean
  htmlFor?: string
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, required, htmlFor, children, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge(clsx('flex flex-col gap-1.5', className))} {...props}>
        {label && (
          <label
            htmlFor={htmlFor}
            className="text-sm font-medium leading-none text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        {children}
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
