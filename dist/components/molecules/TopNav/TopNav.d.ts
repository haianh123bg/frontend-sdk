import * as React from 'react';
export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
    sticky?: boolean;
    bordered?: boolean;
}
export declare const TopNav: React.ForwardRefExoticComponent<TopNavProps & React.RefAttributes<HTMLElement>>;
