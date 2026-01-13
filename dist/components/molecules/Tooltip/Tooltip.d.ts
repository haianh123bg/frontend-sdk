import * as React from 'react';
export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    className?: string;
}
export declare const Tooltip: React.FC<TooltipProps>;
