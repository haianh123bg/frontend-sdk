import * as React from 'react';
export interface MasonryItem {
    id?: string;
    content: React.ReactNode;
}
export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: {
        base: number;
        md?: number;
        lg?: number;
    };
    gap?: 'sm' | 'md' | 'lg';
    items: MasonryItem[];
}
export declare const Masonry: React.ForwardRefExoticComponent<MasonryProps & React.RefAttributes<HTMLDivElement>>;
