import { MotionValue } from 'framer-motion';
import * as React from 'react';
export interface UseParallaxOptions {
    offset?: [number, number];
}
export declare const useParallax: (ref: React.RefObject<HTMLElement>, { offset }?: UseParallaxOptions) => {
    translateY: MotionValue<number>;
};
