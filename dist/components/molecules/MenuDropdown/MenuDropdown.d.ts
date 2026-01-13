import * as React from 'react';
export interface MenuDropdownOption {
    label?: string;
    value: string;
    disabled?: boolean;
}
export interface MenuDropdownRenderState {
    selected: boolean;
}
export interface MenuDropdownProps {
    label: string;
    options: MenuDropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    headerRight?: React.ReactNode;
    /**
     * Tuỳ biến render cho từng option. Nếu truyền renderOption, component sẽ
     * giao toàn quyền render + handle click cho caller (onChange sẽ không được dùng tự động).
     */
    renderOption?: (option: MenuDropdownOption, state: MenuDropdownRenderState) => React.ReactNode;
    /**
     * Vị trí ưu tiên theo chiều dọc: top hoặc bottom (mặc định bottom).
     */
    side?: 'top' | 'bottom';
    /**
     * Căn theo chiều ngang: start (trái) hoặc end (phải). Mặc định start.
     */
    align?: 'start' | 'end';
    /**
     * Khoảng cách theo chiều dọc giữa trigger và dropdown (px).
     */
    sideOffset?: number;
    /**
     * Tự động điều chỉnh để dropdown không tràn khỏi viewport.
     */
    autoPosition?: boolean;
}
export declare const MenuDropdown: React.FC<MenuDropdownProps>;
