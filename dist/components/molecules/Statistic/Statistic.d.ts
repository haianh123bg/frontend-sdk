import * as React from 'react';
export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    value: React.ReactNode;
    delta?: {
        value: string;
        trend?: 'up' | 'down';
    };
    icon?: React.ReactNode;
    muted?: boolean;
}
export declare const Statistic: React.ForwardRefExoticComponent<StatisticProps & React.RefAttributes<HTMLDivElement>>;
