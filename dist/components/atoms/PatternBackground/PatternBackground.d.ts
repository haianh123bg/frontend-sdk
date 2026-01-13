import * as React from 'react';
export type PatternBackgroundVariant = 'checker' | 'dots' | 'grid' | 'diagonal-stripes' | 'crosshatch' | 'conic' | 'rings' | 'image' | 'image-scroll' | 'image-follow-scroll';
export interface PatternBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: PatternBackgroundVariant;
    color1?: string;
    color2?: string;
    size?: number | string;
    offset?: number | string;
    dotSize?: number | string;
    lineSize?: number | string;
    stripeSize?: number | string;
    conicStep?: number | string;
    image?: string;
    imageUrl?: string;
    imageSize?: number | string;
    imageRepeat?: React.CSSProperties['backgroundRepeat'];
    imagePosition?: React.CSSProperties['backgroundPosition'];
    scrollDuration?: number | string;
    scrollX?: number | string;
    scrollY?: number | string;
    animate?: boolean;
    scrollContainerRef?: React.RefObject<HTMLElement | null>;
    followFactor?: number;
    followFactorX?: number;
    followFactorY?: number;
}
export declare const PatternBackground: React.ForwardRefExoticComponent<PatternBackgroundProps & React.RefAttributes<HTMLDivElement>>;
