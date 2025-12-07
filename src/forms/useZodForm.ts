import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema, TypeOf, infer as zInfer } from 'zod'

/**
 * Helper hook: nhận Zod schema và trả về useForm đã cấu hình resolver.
 * Preserves compatibility với các options khác của useForm.
 */
export function useZodForm<TSchema extends ZodSchema<any>>(
  params: {
    schema: TSchema
  } & Omit<UseFormProps<TypeOf<TSchema>>, 'resolver'>
): UseFormReturn<TypeOf<TSchema>>
export function useZodForm<TFieldValues extends FieldValues>(
  params: {
    schema: ZodSchema<TFieldValues>
  } & Omit<UseFormProps<TFieldValues>, 'resolver'>
): UseFormReturn<TFieldValues>
export function useZodForm<TFieldValues extends FieldValues>(
  params: { schema: ZodSchema<TFieldValues> } & Omit<UseFormProps<TFieldValues>, 'resolver'>
) {
  const { schema, ...rest } = params
  return useForm<TFieldValues>({
    ...rest,
    resolver: zodResolver(schema),
  })
}

export type InferZodForm<TSchema extends ZodSchema<any>> = TypeOf<TSchema> | zInfer<TSchema>
