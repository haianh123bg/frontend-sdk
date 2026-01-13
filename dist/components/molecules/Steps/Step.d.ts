import * as React from 'react';
export type StepStatus = 'completed' | 'current' | 'waiting';
export type StepVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
    title: string;
    description?: string;
    status?: StepStatus;
    direction?: 'horizontal' | 'vertical';
    isLast?: boolean;
    variant?: StepVariant;
}
export declare const Step: React.ForwardRefExoticComponent<StepProps & React.RefAttributes<HTMLDivElement>>;
