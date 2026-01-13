import * as React from 'react';
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    footer?: React.ReactNode;
    actions?: React.ReactNode;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    media?: React.ReactNode;
    mediaPosition?: 'top' | 'left';
    highlight?: React.ReactNode;
    compact?: boolean;
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
