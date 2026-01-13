import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface ApiFieldError {
    field: string;
    message: string;
}
export interface ApiErrorResponse {
    message?: string;
    fieldErrors?: ApiFieldError[];
}
/**
 * Hook tiện ích: map lỗi API vào react-hook-form qua setError.
 * Trả về lỗi chung (nếu có) để hiển thị banner.
 */
export declare function useFormErrors<TFieldValues extends FieldValues>(methods: UseFormReturn<TFieldValues>): {
    setFormErrors: (apiError: ApiErrorResponse) => string | null;
    formRef: import('react').MutableRefObject<HTMLFormElement | null>;
};
