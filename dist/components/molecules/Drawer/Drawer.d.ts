import * as React from 'react';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    side?: 'left' | 'right';
    width?: number | string;
    children: React.ReactNode;
    className?: string;
}
export declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>>;
