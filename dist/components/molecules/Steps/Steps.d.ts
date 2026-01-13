import * as React from 'react';
export interface StepItem {
    title: string;
    description?: string;
}
type StepsBaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
export type StepsVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export interface StepsProps extends StepsBaseProps {
    items: StepItem[];
    current: number;
    onChange?: (current: number) => void;
    direction?: 'horizontal' | 'vertical';
    variant?: StepsVariant;
}
export declare const Steps: React.ForwardRefExoticComponent<StepsProps & React.RefAttributes<HTMLDivElement>>;
export {};
