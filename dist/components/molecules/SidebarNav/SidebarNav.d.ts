import * as React from 'react';
export interface SidebarNavItem {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
    badge?: React.ReactNode;
}
export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: SidebarNavItem[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
}
export declare const SidebarNav: React.ForwardRefExoticComponent<SidebarNavProps & React.RefAttributes<HTMLElement>>;
