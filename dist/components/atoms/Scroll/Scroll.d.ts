import * as React from 'react';
export interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Ẩn thanh scrollbar nhưng vẫn cho phép scroll.
     */
    autoHide?: boolean;
    /**
     * Hướng scroll chính.
     */
    direction?: 'vertical' | 'horizontal' | 'both';
}
export declare const Scroll: React.ForwardRefExoticComponent<ScrollProps & React.RefAttributes<HTMLDivElement>>;
