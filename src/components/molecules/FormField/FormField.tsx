// File: src/components/molecules/FormField/FormField.tsx
import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useFormContext, type FieldValues, type Path } from 'react-hook-form'

function getErrorMessage(errors: any, path?: string): string | undefined {
  if (!path) return undefined
  return path.split('.').reduce<any>((acc, key) => acc?.[key], errors)?.message
}

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  error?: string
  required?: boolean
  htmlFor?: string
  /**
   * Khi có name và nằm trong FormProvider, FormField tự register và tự lấy lỗi.
   */
  name?: Path<TFieldValues>
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error: errorProp, required, htmlFor, children, name, ...props }, ref) => {
    // Optional form context; only used when name được truyền
    const form = name ? (useFormContext<FieldValues>() as any) : null
    const resolvedError = errorProp ?? getErrorMessage(form?.formState?.errors, name)

    let childNode = children
    if (name && form?.register && React.isValidElement(children)) {
      const registered = form.register(name)
      childNode = React.cloneElement(children as React.ReactElement, {
        ...registered,
        ...children.props,
      })
    }

    return (
      <div ref={ref} className={twMerge(clsx('flex flex-col gap-1.5', className))} {...props}>
        {label && (
          <label
            htmlFor={htmlFor ?? (typeof name === 'string' ? name : undefined)}
            className="text-sm font-medium leading-none text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        {childNode}
        {resolvedError && <p className="text-xs font-medium text-red-500">{resolvedError}</p>}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
