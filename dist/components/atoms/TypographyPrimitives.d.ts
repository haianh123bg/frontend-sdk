import * as React from 'react';
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
    className?: string;
}
export declare const Typography: ({ as: Component, className, ...props }: TextProps) => import("react/jsx-runtime").JSX.Element;
export declare const Title: ({ className, ...props }: TextProps) => import("react/jsx-runtime").JSX.Element;
export declare const Text: ({ className, ...props }: TextProps) => import("react/jsx-runtime").JSX.Element;
export declare const Caption: ({ className, ...props }: TextProps) => import("react/jsx-runtime").JSX.Element;
export declare const Label: ({ className, ...props }: TextProps) => import("react/jsx-runtime").JSX.Element;
