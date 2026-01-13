import * as React from 'react';
export type SlideDirection = 'left' | 'right' | 'top' | 'bottom';
export interface SlideInPanelProps {
    open: boolean;
    direction?: SlideDirection;
    width?: number | string;
    height?: number | string;
    overlayOpacity?: number;
    onClose?: () => void;
    children?: React.ReactNode;
    className?: string;
}
export declare const SlideInPanel: React.FC<SlideInPanelProps>;
