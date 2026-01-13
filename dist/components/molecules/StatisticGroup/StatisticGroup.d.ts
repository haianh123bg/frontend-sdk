import { StatisticProps } from '../Statistic/Statistic';
import * as React from 'react';
export interface StatisticItem extends Omit<StatisticProps, 'className'> {
    id?: string;
}
export interface StatisticGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    items: StatisticItem[];
    columns?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
    onSelect?: (item: StatisticItem) => void;
}
export declare const StatisticGroup: React.ForwardRefExoticComponent<StatisticGroupProps & React.RefAttributes<HTMLDivElement>>;
