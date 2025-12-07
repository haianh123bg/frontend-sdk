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
  const setFormErrors = useCallback(
    (apiError: ApiErrorResponse) => {
      if (apiError.fieldErrors) {
        apiError.fieldErrors.forEach((err) => {
          methods.setError(err.field as Path<TFieldValues>, { type: 'server', message: err.message })
        })
      }
      return apiError.message || null
    },
    [methods]
  )

  return { setFormErrors, formRef }
}
