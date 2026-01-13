export interface UseFormSubmitOptions<TValues, TResult, TApiError = unknown> {
    request: (values: TValues) => Promise<TResult>;
    parseError?: (err: unknown) => TApiError;
    onSuccess?: (data: TResult) => void;
    /**
     * onError có thể trả về message chung cho FormErrorBanner.
     */
    onError?: (apiError: TApiError) => string | null | void;
    onFinally?: () => void;
}
export declare function useFormSubmit<TValues, TResult, TApiError = unknown>(options: UseFormSubmitOptions<TValues, TResult, TApiError>): {
    handleSubmit: (values: TValues) => Promise<void>;
    isSubmitting: boolean;
    formError: string | null;
    data: TResult | null;
    setFormError: import('react').Dispatch<import('react').SetStateAction<string | null>>;
};
