import * as React from 'react';
export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
    hoverEffect?: 'underline' | 'none';
    emphasizeLast?: boolean;
}
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
