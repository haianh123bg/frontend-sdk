import { LucideIcon } from 'lucide-react';
import * as React from 'react';
type SwitchVariant = 'primary' | 'success' | 'warning' | 'danger';
type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    variant?: SwitchVariant;
    size?: SwitchSize;
    innerIcon?: LucideIcon;
    innerStyle?: 'default' | 'solid';
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export {};
