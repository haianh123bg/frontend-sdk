import { useCallback, useRef } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export interface ApiFieldError {
  field: string
  message: string
}

export interface ApiErrorResponse {
  message?: string
  fieldErrors?: ApiFieldError[]
}

/**
 * Hook tiện ích: map lỗi API vào react-hook-form qua setError.
 * Trả về lỗi chung (nếu có) để hiển thị banner.
 */
export function useFormErrors<TFieldValues extends FieldValues>(methods: UseFormReturn<TFieldValues>) {
  const formRef = useRef<HTMLFormElement | null>(null)

  const focusFirstErrorField = useCallback((fieldErrors?: ApiFieldError[]) => {
    if (!fieldErrors || fieldErrors.length === 0) return
    const root = formRef.current
    if (!root) return

    const first = fieldErrors[0]
    if (!first?.field) return

    const element = root.querySelector<HTMLElement>(`[name="${first.field}"]`)
    if (element && typeof element.focus === 'function') {
      element.focus()
      if (typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }
  }, [])

  const setFormErrors = useCallback(
    (apiError: ApiErrorResponse) => {
      if (apiError.fieldErrors) {
        apiError.fieldErrors.forEach((err) => {
          methods.setError(err.field as Path<TFieldValues>, { type: 'server', message: err.message })
        })
      }

      focusFirstErrorField(apiError.fieldErrors)

      return apiError.message || null
    },
    [methods, focusFirstErrorField]
  )

  return { setFormErrors, formRef }
}
