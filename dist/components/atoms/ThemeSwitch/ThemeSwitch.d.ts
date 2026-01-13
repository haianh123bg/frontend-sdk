import * as React from 'react';
export interface ThemeSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    toggleSize?: number | string;
    onCheckedChange?: (checked: boolean) => void;
}
export declare const ThemeSwitch: React.ForwardRefExoticComponent<ThemeSwitchProps & React.RefAttributes<HTMLInputElement>>;
