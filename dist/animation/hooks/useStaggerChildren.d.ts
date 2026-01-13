import { Variants } from 'framer-motion';
import { motionDurations } from '../tokens';

export interface StaggerOptions {
    stagger?: number;
    delayChildren?: number;
    duration?: keyof typeof motionDurations;
}
export declare const useStaggerChildren: ({ stagger, delayChildren, duration, }?: StaggerOptions) => {
    container: Variants;
    item: Variants;
};
