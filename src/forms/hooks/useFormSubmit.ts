import { useCallback, useState } from 'react'

export interface UseFormSubmitOptions<TValues, TResult, TApiError = unknown> {
  request: (values: TValues) => Promise<TResult>
  parseError?: (err: unknown) => TApiError
  onSuccess?: (data: TResult) => void
  /**
   * onError có thể trả về message chung cho FormErrorBanner.
   */
  onError?: (apiError: TApiError) => string | null | void
  onFinally?: () => void
}

export function useFormSubmit<TValues, TResult, TApiError = unknown>(
  options: UseFormSubmitOptions<TValues, TResult, TApiError>
) {
  const { request, parseError, onSuccess, onError, onFinally } = options
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [data, setData] = useState<TResult | null>(null)

  const handleSubmit = useCallback(
    async (values: TValues) => {
      setIsSubmitting(true)
      setFormError(null)
      try {
        const res = await request(values)
        setData(res)
        onSuccess?.(res)
      } catch (err) {
        const apiErr = parseError ? parseError(err) : (err as TApiError)
        const commonMessage = onError?.(apiErr)
        if (commonMessage) setFormError(commonMessage)
      } finally {
        setIsSubmitting(false)
        onFinally?.()
      }
    },
    [request, parseError, onSuccess, onError, onFinally]
  )

  return { handleSubmit, isSubmitting, formError, data, setFormError }
}
