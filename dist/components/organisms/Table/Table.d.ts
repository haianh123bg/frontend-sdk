import { SortingState, VisibilityState } from '@tanstack/react-table';
import { SelectOption } from '../../atoms/Select/Select';
import * as React from 'react';
export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string | number;
    render?: (row: T) => React.ReactNode;
    valueType?: string;
    options?: {
        label: string;
        value: string;
    }[];
}
export type TableValueTypeOption = SelectOption & {
    defaultValue?: unknown;
};
export interface TableEditableConfig<T> {
    enabled: boolean;
    valueTypeOptions: TableValueTypeOption[];
    onColumnsChange: (columns: TableColumn<T>[]) => void;
    onDataChange: (data: T[]) => void;
    getDefaultValueForType?: (valueType: string) => unknown;
    addColumnLabel?: string;
    addRowLabel?: string;
    columnNamePlaceholder?: string;
    valueTypePlaceholder?: string;
}
export interface TableRowActionsConfig {
    enabled: boolean;
    allowReorder?: boolean;
    allowInsertBelow?: boolean;
    allowSelect?: boolean;
    selectedRowKeys?: string[];
    defaultSelectedRowKeys?: string[];
    onSelectedRowKeysChange?: (keys: string[]) => void;
}
export interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
    columns: TableColumn<T>[];
    data: T[];
    rowKey: (row: T, index: number) => string;
    size?: 'sm' | 'md' | 'lg';
    striped?: boolean;
    rowStyle?: 'striped' | 'plain' | 'bordered';
    emptyState?: React.ReactNode;
    onRowClick?: (row: T) => void;
    stickyHeader?: boolean;
    showSortIndicator?: boolean;
    multiSort?: boolean;
    editable?: TableEditableConfig<T>;
    resizableColumns?: boolean;
    rowActions?: TableRowActionsConfig;
    pageSize?: number;
    pageSizeOptions?: number[];
    initialPage?: number;
    onPageChange?: (page: number) => void;
    /**
     * Optional controlled sorting state. If provided, Table will be controlled from the outside
     * and will call onSortingChange when header clicks change sorting.
     */
    sorting?: SortingState;
    onSortingChange?: (sorting: SortingState) => void;
    /**
     * Optional controlled column visibility. Useful when building external UI to toggle columns.
     * Table itself hiện tại không render UI toggle cột, mà chỉ áp dụng visibility state.
     */
    columnVisibility?: VisibilityState;
    /**
     * Bật virtual scroll cho phần body khi hiển thị nhiều hàng trên 1 trang.
     * Virtual hóa áp dụng trên rowModel hiện tại (sau sort/pagination).
     */
    virtualized?: boolean;
    /**
     * Chiều cao ước lượng mỗi hàng (px) dùng cho virtualizer. Mặc định ~44px.
     */
    virtualRowHeight?: number;
    /**
     * Số hàng render thêm phía trên/dưới viewport để cuộn mượt hơn. Mặc định 10.
     */
    virtualOverscan?: number;
    /**
     * Chiều cao tối đa của vùng body khi virtualized (px). Mặc định 420.
     */
    virtualBodyMaxHeight?: number;
    pageSizeLabel?: string;
    pageLabel?: string;
    instanceId?: string;
}
export declare function Table<T extends Record<string, any>>({ className, columns, data, rowKey, size, striped, rowStyle, emptyState, onRowClick, stickyHeader, showSortIndicator, multiSort, editable, resizableColumns, rowActions, pageSize, pageSizeOptions, initialPage, onPageChange, sorting: sortingProp, onSortingChange, columnVisibility: columnVisibilityProp, virtualized, virtualRowHeight, virtualOverscan, virtualBodyMaxHeight, pageSizeLabel, pageLabel, instanceId, ...props }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
export declare namespace Table {
    var displayName: string;
}
