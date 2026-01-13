import * as React from 'react';
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    className?: string;
    variant?: 'default' | 'icon';
}
export declare const Pagination: React.FC<PaginationProps>;
