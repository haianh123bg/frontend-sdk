import * as React from 'react';
export interface ListItem {
    id?: string;
    title: string;
    description?: string;
    meta?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
}
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    items: ListItem[];
    align?: 'start' | 'center';
    size?: 'sm' | 'md' | 'lg';
    divider?: boolean;
    onItemClick?: (item: ListItem, index: number) => void;
    maxItems?: number;
    emptyState?: React.ReactNode;
}
export declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLUListElement>>;
