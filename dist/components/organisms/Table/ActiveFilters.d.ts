import * as React from 'react';
export interface ActiveFilterChip {
    id: string;
    label: string;
    value?: string;
    removable?: boolean;
}
export interface ActiveFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
    filters: ActiveFilterChip[];
    onRemoveFilter?: (id: string) => void;
    onClearAll?: () => void;
    showClearAll?: boolean;
    noBackground?: boolean;
}
export declare const ActiveFilters: React.ForwardRefExoticComponent<ActiveFiltersProps & React.RefAttributes<HTMLDivElement>>;
