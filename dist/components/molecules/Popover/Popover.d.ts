import * as React from 'react';
interface PopoverContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export declare const usePopover: () => PopoverContextValue;
export interface PopoverProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const Popover: React.FC<PopoverProps>;
export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
}
export declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLDivElement>>;
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
export {};
