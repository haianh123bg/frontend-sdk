import * as React from 'react';
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    showValue?: boolean;
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    onChange?: (value: number) => void;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;
