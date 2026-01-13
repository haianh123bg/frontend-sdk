import { SelectOption, SelectProps as BaseSelectProps } from './Select';
import * as React from 'react';
export interface FetchOptionsParams {
    page: number;
    pageSize: number;
    /**
     * Từ khóa tìm kiếm gửi xuống server (nếu hỗ trợ).
     */
    search?: string;
}
export interface FetchOptionsResult {
    data: SelectOption[];
    hasMore: boolean;
}
export interface SelectLazyProps extends Omit<BaseSelectProps, 'options' | 'onValueChange'> {
    /**
     * Function to fetch options asynchronously.
     */
    fetchOptions: (params: FetchOptionsParams) => Promise<FetchOptionsResult>;
    /**
     * Number of items to load per page.
     * @default 20
     */
    pageSize?: number;
    /**
     * Thời gian debounce cho tìm kiếm (ms).
     * @default 400
     */
    debounceMs?: number;
    /**
     * Bật/tắt ô tìm kiếm phía trên dropdown.
     * @default true
     */
    enableSearch?: boolean;
    searchPlaceholder?: string;
    emptyText?: string;
    loadingText?: string;
    onValueChange?: (value: string) => void;
}
export declare const SelectLazy: React.ForwardRefExoticComponent<SelectLazyProps & React.RefAttributes<HTMLInputElement>>;
