import * as React from 'react';
export interface DashboardLayoutProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    header?: React.ReactNode;
    className?: string;
}
export declare const DashboardLayout: ({ children, sidebar, header, className, }: DashboardLayoutProps) => import("react/jsx-runtime").JSX.Element;
