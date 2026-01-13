import { FieldValues, UseFormProps } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { ApiErrorResponse } from './hooks/useFormErrors';

export interface UseApiFormOptions<TFieldValues extends FieldValues, TResult, TApiError extends ApiErrorResponse = ApiErrorResponse> {
    schema?: ZodSchema<TFieldValues>;
    formOptions?: UseFormProps<TFieldValues>;
    request: (values: TFieldValues) => Promise<TResult>;
    parseError?: (err: unknown) => TApiError;
    onSuccess?: (data: TResult) => void;
    onError?: (apiError: TApiError) => void;
    onFinally?: () => void;
}
export declare function useApiForm<TFieldValues extends FieldValues, TResult, TApiError extends ApiErrorResponse = ApiErrorResponse>(options: UseApiFormOptions<TFieldValues, TResult, TApiError>): {
    methods: import('react-hook-form').UseFormReturn<TFieldValues, any, TFieldValues>;
    formRef: import('react').MutableRefObject<HTMLFormElement | null>;
    handleSubmit: (values: TFieldValues) => Promise<void>;
    isSubmitting: boolean;
    formError: string | null;
    data: TResult | null;
};
