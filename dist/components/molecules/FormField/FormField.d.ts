import * as React from 'react';
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    error?: string;
    required?: boolean;
    htmlFor?: string;
}
export declare const FormField: React.ForwardRefExoticComponent<FormFieldProps & React.RefAttributes<HTMLDivElement>>;
