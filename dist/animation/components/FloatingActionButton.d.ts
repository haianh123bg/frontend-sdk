import { HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
export interface FloatingActionButtonProps extends HTMLMotionProps<'button'> {
    icon: LucideIcon;
    label?: string;
    variant?: 'primary' | 'danger';
}
export declare const FloatingActionButton: React.ForwardRefExoticComponent<Omit<FloatingActionButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
