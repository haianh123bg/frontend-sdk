import * as React from 'react';
export interface DescriptionListItem {
    label: React.ReactNode;
    value: React.ReactNode;
    span?: 1 | 2 | 3;
}
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDivElement> {
    items: DescriptionListItem[];
    columns?: 1 | 2 | 3;
    dense?: boolean;
}
export declare const DescriptionList: React.ForwardRefExoticComponent<DescriptionListProps & React.RefAttributes<HTMLDivElement>>;
