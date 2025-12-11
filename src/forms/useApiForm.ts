import { useForm, type FieldValues, type UseFormProps } from 'react-hook-form'
import type { ZodSchema } from 'zod'
import { useZodForm } from './useZodForm'
import { useFormErrors, type ApiErrorResponse } from './hooks/useFormErrors'
import { useFormSubmit } from './hooks/useFormSubmit'

export interface UseApiFormOptions<
  TFieldValues extends FieldValues,
  TResult,
  TApiError extends ApiErrorResponse = ApiErrorResponse
> {
  schema?: ZodSchema<TFieldValues>
  formOptions?: UseFormProps<TFieldValues>
  request: (values: TFieldValues) => Promise<TResult>
  parseError?: (err: unknown) => TApiError
  onSuccess?: (data: TResult) => void
  onError?: (apiError: TApiError) => void
  onFinally?: () => void
}

export function useApiForm<
  TFieldValues extends FieldValues,
  TResult,
  TApiError extends ApiErrorResponse = ApiErrorResponse
>(options: UseApiFormOptions<TFieldValues, TResult, TApiError>) {
  const { schema, formOptions, request, parseError, onSuccess, onError, onFinally } = options

  const methods = schema
    ? useZodForm<TFieldValues>({
        schema,
        ...(formOptions
          ? (formOptions as Omit<UseFormProps<TFieldValues>, 'resolver'>)
          : ({} as Omit<UseFormProps<TFieldValues>, 'resolver'>)),
      })
    : useForm<TFieldValues>(formOptions || {})

  const { setFormErrors, formRef } = useFormErrors<TFieldValues>(methods)

  const { handleSubmit, isSubmitting, formError, data } = useFormSubmit<TFieldValues, TResult, TApiError>({
    request,
    parseError,
    onSuccess,
    onError: (apiError) => {
      const commonMessage = setFormErrors(apiError)
      onError?.(apiError)
      return commonMessage
    },
    onFinally,
  })

  return {
    methods,
    formRef,
    handleSubmit,
    isSubmitting,
    formError,
    data,
  }
}
