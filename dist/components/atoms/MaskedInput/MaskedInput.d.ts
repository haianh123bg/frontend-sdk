import * as React from 'react';
export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    mask: string;
    placeholderChar?: string;
    onChange?: (value: string, rawValue: string) => void;
    error?: boolean;
}
export declare const MaskedInput: React.ForwardRefExoticComponent<MaskedInputProps & React.RefAttributes<HTMLInputElement>>;
