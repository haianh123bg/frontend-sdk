import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface FormWizardStep<TFieldValues extends FieldValues> {
    id: string;
    /**
     * Danh sách field cần validate ở step này.
     * Có thể để trống cho step review.
     */
    fields?: Path<TFieldValues>[];
}
export interface UseFormWizardOptions {
    /**
     * Mặc định true: tự focus vào field đầu tiên lỗi của step khi trigger.
     */
    shouldFocus?: boolean;
}
export interface UseFormWizardResult<TFieldValues extends FieldValues> {
    stepIndex: number;
    currentStep: FormWizardStep<TFieldValues>;
    steps: FormWizardStep<TFieldValues>[];
    isFirstStep: boolean;
    isLastStep: boolean;
    next: () => Promise<boolean>;
    back: () => void;
    goTo: (index: number, options?: {
        validate?: boolean;
    }) => Promise<boolean>;
    reset: () => void;
}
export declare function useFormWizard<TFieldValues extends FieldValues>(methods: UseFormReturn<TFieldValues>, steps: FormWizardStep<TFieldValues>[], options?: UseFormWizardOptions): UseFormWizardResult<TFieldValues>;
