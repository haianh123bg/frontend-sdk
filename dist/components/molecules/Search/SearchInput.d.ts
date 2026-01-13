import { InputProps } from '../../atoms/Input/Input';
import * as React from 'react';
export interface SearchInputProps extends Omit<InputProps, 'onChange' | 'defaultValue'> {
    /**
     * Giá trị điều khiển từ bên ngoài (thường là state search hiện tại).
     */
    value?: string;
    /**
     * Callback khi search được "commit" (sau debounce hoặc khi nhấn Enter).
     */
    onSearch?: (value: string) => void;
    /**
     * Thời gian debounce (ms). Mặc định 1000ms. Đặt 0 để tắt debounce.
     */
    debounceMs?: number;
    /**
     * Giá trị khởi tạo khi không dùng controlled value.
     */
    initialValue?: string;
}
export declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;
