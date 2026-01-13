import * as React from 'react';
export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type GridSizeValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridSizeConfig = GridSizeValue | Partial<Record<GridBreakpoint, GridSizeValue>>;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    spacing?: 0 | 1 | 2 | 3 | 4;
    size?: GridSizeConfig;
}
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
