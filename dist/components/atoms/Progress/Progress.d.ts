import * as React from 'react';
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'composite';
    showLabel?: boolean;
    type?: 'linear' | 'circular';
    size?: 'sm' | 'md' | 'lg';
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
