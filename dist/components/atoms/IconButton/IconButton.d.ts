import { LucideIcon } from 'lucide-react';
import * as React from 'react';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon;
    size?: IconButtonSize;
    variant?: 'default' | 'primary' | 'muted';
    disableHover?: boolean;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
