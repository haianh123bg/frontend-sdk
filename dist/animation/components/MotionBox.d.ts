import { HTMLMotionProps } from 'framer-motion';
import * as React from 'react';
export type MotionBoxProps = HTMLMotionProps<'div'>;
export declare const MotionBox: React.ForwardRefExoticComponent<Omit<MotionBoxProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
