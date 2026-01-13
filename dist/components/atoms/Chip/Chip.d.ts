import * as React from 'react';
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
export type ChipSize = 'sm' | 'md' | 'lg';
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: ChipVariant;
    size?: ChipSize;
    label?: React.ReactNode;
    /** Icon nằm bên trái nội dung. */
    startIcon?: React.ReactNode;
    /** Icon nằm bên phải nội dung (trước nút xoá). */
    endIcon?: React.ReactNode;
    /** Sự kiện xoá chip. */
    onDelete?: (e: React.MouseEvent) => void;
    disabled?: boolean;
}
export declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLSpanElement>>;
