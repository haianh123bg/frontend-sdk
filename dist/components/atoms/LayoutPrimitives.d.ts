import * as React from 'react';
export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    gap?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
}
export declare const Box: React.FC<LayoutProps>;
export declare const Row: React.FC<LayoutProps>;
export declare const Col: React.FC<LayoutProps>;
export declare const Spacer: React.FC<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
}>;
export declare const Divider: React.FC<{
    className?: string;
}>;
export declare const Layout: React.FC<LayoutProps>;
export declare const Content: React.FC<LayoutProps>;
