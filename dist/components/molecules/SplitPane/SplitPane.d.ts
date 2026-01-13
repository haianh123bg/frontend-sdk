import * as React from 'react';
export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'horizontal' | 'vertical';
    initialRatio?: number;
    minPrimary?: number;
    minSecondary?: number;
    onResize?: (ratio: number) => void;
}
export declare const SplitPane: React.ForwardRefExoticComponent<SplitPaneProps & React.RefAttributes<HTMLDivElement>>;
