import * as React from 'react';
export interface AuroraPatternBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    duration?: number | string;
    rotate?: number | string;
    inset?: number | string;
    background?: string;
    animate?: boolean;
}
export declare const AuroraPatternBackground: React.ForwardRefExoticComponent<AuroraPatternBackgroundProps & React.RefAttributes<HTMLDivElement>>;
