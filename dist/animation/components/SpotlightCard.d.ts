import { HTMLMotionProps } from 'framer-motion';
import * as React from 'react';
export interface SpotlightCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children?: React.ReactNode;
}
export declare const SpotlightCard: React.ForwardRefExoticComponent<Omit<SpotlightCardProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
