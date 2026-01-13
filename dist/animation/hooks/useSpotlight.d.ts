import * as React from 'react';
export declare const useSpotlight: () => {
    gradient: import('framer-motion').MotionValue<string>;
    handlePointerMove: React.PointerEventHandler<HTMLDivElement>;
    handlePointerLeave: (target?: HTMLElement | null) => void;
};
