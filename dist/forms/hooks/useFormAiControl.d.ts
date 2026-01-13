import { FieldValues, UseFormReturn } from 'react-hook-form';
import * as React from 'react';
export interface UseFormAiControlOptions<TFieldValues extends FieldValues> {
    instanceId: string;
    methods: UseFormReturn<TFieldValues>;
    formRef?: React.RefObject<HTMLFormElement>;
}
export declare function useFormAiControl<TFieldValues extends FieldValues>(options: UseFormAiControlOptions<TFieldValues>): void;
