import * as React from 'react';
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    icon?: React.ElementType;
    action?: React.ReactNode;
    imageSrc?: string;
}
export declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;
