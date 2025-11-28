import * as React from 'react';
export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    gap?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
}
export declare const Box: ({ className, padding, ...props }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
export declare const Row: ({ className, gap, ...props }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
export declare const Col: ({ className, gap, ...props }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
export declare const Spacer: ({ size }: {
    size?: "sm" | "md" | "lg" | "xl";
}) => import("react/jsx-runtime").JSX.Element;
export declare const Divider: ({ className }: {
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const Layout: ({ className, padding, ...props }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
export declare const Content: ({ className, padding, ...props }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
