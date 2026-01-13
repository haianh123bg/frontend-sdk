import { FieldValues, Path } from 'react-hook-form';
import * as React from 'react';
export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    error?: string;
    required?: boolean;
    htmlFor?: string;
    /**
     * Khi có name và nằm trong FormProvider, FormField tự register và tự lấy lỗi.
     */
    name?: Path<TFieldValues>;
}
export declare const FormField: React.ForwardRefExoticComponent<FormFieldProps<FieldValues> & React.RefAttributes<HTMLDivElement>>;
