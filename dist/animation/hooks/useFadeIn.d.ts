import { MotionProps } from 'framer-motion';
import { motionDurations } from '../tokens';

export interface FadeInOptions {
    offsetY?: number;
    delay?: number;
    duration?: keyof typeof motionDurations;
}
export declare const useFadeIn: ({ offsetY, delay, duration }?: FadeInOptions) => MotionProps;
