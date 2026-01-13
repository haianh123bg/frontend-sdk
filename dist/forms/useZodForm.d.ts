import { UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { ZodSchema, TypeOf, infer as zInfer } from 'zod';

/**
 * Helper hook: nhận Zod schema và trả về useForm đã cấu hình resolver.
 * Preserves compatibility với các options khác của useForm.
 */
export declare function useZodForm<TSchema extends ZodSchema<any>>(params: {
    schema: TSchema;
} & Omit<UseFormProps<TypeOf<TSchema>>, 'resolver'>): UseFormReturn<TypeOf<TSchema>>;
export declare function useZodForm<TFieldValues extends FieldValues>(params: {
    schema: ZodSchema<TFieldValues>;
} & Omit<UseFormProps<TFieldValues>, 'resolver'>): UseFormReturn<TFieldValues>;
export type InferZodForm<TSchema extends ZodSchema<any>> = TypeOf<TSchema> | zInfer<TSchema>;
