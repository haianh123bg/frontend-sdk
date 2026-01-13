import * as React from 'react';
export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    sidebar?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: 'full' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    padded?: boolean;
}
export declare const PageLayout: React.ForwardRefExoticComponent<PageLayoutProps & React.RefAttributes<HTMLDivElement>>;
