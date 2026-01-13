import * as React from 'react';
export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type ResponsiveSpan = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: Partial<Record<ResponsiveBreakpoint, ResponsiveCols>>;
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
export declare const ResponsiveGrid: React.ForwardRefExoticComponent<ResponsiveGridProps & React.RefAttributes<HTMLDivElement>>;
export interface ResponsiveGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: Partial<Record<ResponsiveBreakpoint, ResponsiveSpan>>;
}
export declare const ResponsiveGridItem: React.ForwardRefExoticComponent<ResponsiveGridItemProps & React.RefAttributes<HTMLDivElement>>;
