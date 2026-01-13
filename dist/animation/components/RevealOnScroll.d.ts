import { HTMLMotionProps } from 'framer-motion';
import { motionDurations } from '../tokens';
import * as React from 'react';
export interface RevealOnScrollProps extends HTMLMotionProps<'div'> {
    once?: boolean;
    amount?: 'some' | 'all' | number;
    offsetY?: number;
    delay?: number;
    duration?: keyof typeof motionDurations;
}
export declare const RevealOnScroll: React.ForwardRefExoticComponent<Omit<RevealOnScrollProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
