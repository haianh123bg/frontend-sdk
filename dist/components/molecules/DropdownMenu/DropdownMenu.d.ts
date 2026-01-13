import * as React from 'react';
interface DropdownContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export declare const useDropdown: () => DropdownContextValue;
export interface DropdownMenuProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
export interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
}
export declare const DropdownTrigger: React.ForwardRefExoticComponent<DropdownTriggerProps & React.RefAttributes<HTMLDivElement>>;
export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'left' | 'right';
}
export declare const DropdownContent: React.ForwardRefExoticComponent<DropdownContentProps & React.RefAttributes<HTMLDivElement>>;
export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    danger?: boolean;
}
export declare const DropdownItem: React.ForwardRefExoticComponent<DropdownItemProps & React.RefAttributes<HTMLDivElement>>;
export {};
