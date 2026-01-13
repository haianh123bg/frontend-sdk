import { ScrollProps } from '../Scroll/Scroll';
import * as React from 'react';
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'> {
    options: SelectOption[];
    placeholder?: string;
    error?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    value?: string;
    defaultValue?: string;
    compact?: boolean;
    hideCaret?: boolean;
    mode?: 'filled' | 'ghost';
    variant?: 'filled' | 'ghost';
    dropdownPlacement?: 'bottom' | 'top';
    /**
     * Khi bật autoOpen, dropdown sẽ tự mở khi component render và không bị disabled.
     * Hữu ích cho các trường hợp muốn hiển thị menu ngay sau khi người dùng trigger từ bên ngoài.
     */
    autoOpen?: boolean;
    dropdownScrollProps?: Omit<ScrollProps, 'direction' | 'children'>;
    onValueChange?: (value: string) => void;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLInputElement>>;
