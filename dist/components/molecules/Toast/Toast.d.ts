import * as React from 'react';
export interface ToastProps {
    message: string;
    variant?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose?: () => void;
    className?: string;
}
export declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;
