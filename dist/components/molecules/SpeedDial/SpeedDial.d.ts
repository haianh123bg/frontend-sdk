import { LucideIcon } from 'lucide-react';
import * as React from 'react';
export interface SpeedDialActionItem {
    icon: LucideIcon;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export type SpeedDialPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
    actions: SpeedDialActionItem[];
    position?: SpeedDialPosition;
    direction?: SpeedDialDirection;
    icon?: LucideIcon;
    openIcon?: LucideIcon;
}
export declare const SpeedDial: React.ForwardRefExoticComponent<SpeedDialProps & React.RefAttributes<HTMLDivElement>>;
