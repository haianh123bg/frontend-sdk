import { LucideIcon } from 'lucide-react';
import * as React from 'react';
export type IconVariant = 'default' | 'primary' | 'muted' | 'error' | 'success' | 'warning' | 'info' | 'white';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    icon: LucideIcon;
    variant?: IconVariant;
    size?: IconSize;
}
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
