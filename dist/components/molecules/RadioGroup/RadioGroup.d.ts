import * as React from 'react';
export interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    error?: boolean;
}
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
