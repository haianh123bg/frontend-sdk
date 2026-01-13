import { useSpring } from 'framer-motion';
import * as React from 'react';
export interface MagneticHoverOptions {
    strength?: number;
    spring?: Parameters<typeof useSpring>[1];
}
export declare const useMagneticHover: ({ strength, spring }?: MagneticHoverOptions) => {
    springX: import('framer-motion').MotionValue<number>;
    springY: import('framer-motion').MotionValue<number>;
    eventHandlers: {
        readonly onPointerMove: React.PointerEventHandler<HTMLDivElement>;
        readonly onPointerLeave: () => void;
    };
};
