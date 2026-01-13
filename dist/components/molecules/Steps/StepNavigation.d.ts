import * as React from 'react';
export interface StepNavigationLabels {
    prev?: string;
    next?: string;
    submit?: string;
}
export interface StepNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
    current: number;
    total: number;
    canNext?: boolean;
    canPrev?: boolean;
    isSubmitting?: boolean;
    labels?: StepNavigationLabels;
    onPrev?: () => void;
    onNext?: () => void;
    onSubmit?: () => void;
}
export declare const StepNavigation: React.ForwardRefExoticComponent<StepNavigationProps & React.RefAttributes<HTMLDivElement>>;
