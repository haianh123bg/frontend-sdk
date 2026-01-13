import { MenuDropdownOption, MenuDropdownRenderState } from './MenuDropdown';
import * as React from 'react';
export interface MenuDropdownPortalProps {
    anchorRef: React.RefObject<HTMLElement | null>;
    open: boolean;
    label: string;
    options: MenuDropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    onDismiss?: () => void;
    className?: string;
    headerRight?: React.ReactNode;
    renderOption?: (option: MenuDropdownOption, state: MenuDropdownRenderState) => React.ReactNode;
    side?: 'top' | 'bottom';
    align?: 'start' | 'end';
    sideOffset?: number;
    autoFlip?: boolean;
}
export declare const MenuDropdownPortal: React.FC<MenuDropdownPortalProps>;
