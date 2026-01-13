import { HTMLMotionProps } from 'framer-motion';
import * as React from 'react';
export interface MagneticCardProps extends HTMLMotionProps<'div'> {
    children?: React.ReactNode;
    strength?: number;
}
export declare const MagneticCard: React.ForwardRefExoticComponent<Omit<MagneticCardProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
