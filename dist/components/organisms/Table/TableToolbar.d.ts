import * as React from 'react';
export interface ColumnVisibilityItem {
    id: string;
    label: string;
    visible: boolean;
    disabled?: boolean;
}
export interface ToolbarFilterOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    selectedCount?: number;
    onClearSelection?: () => void;
    filters?: React.ReactNode;
    actions?: React.ReactNode;
    filterOptions?: ToolbarFilterOption[];
    filterValue?: string;
    onFilterChange?: (value: string | undefined) => void;
    filterPlaceholder?: string;
    columnVisibilityItems?: ColumnVisibilityItem[];
    onColumnVisibilityChange?: (id: string, visible: boolean) => void;
    noBackground?: boolean;
}
export declare const TableToolbar: React.ForwardRefExoticComponent<TableToolbarProps & React.RefAttributes<HTMLDivElement>>;
