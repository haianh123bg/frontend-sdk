import * as React from 'react';
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    label?: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    dashed?: boolean;
}
export declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLDivElement>>;
