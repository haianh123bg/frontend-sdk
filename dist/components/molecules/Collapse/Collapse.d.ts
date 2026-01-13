import * as React from 'react';
export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
    title?: React.ReactNode;
    defaultOpen?: boolean;
    onToggle?: (open: boolean) => void;
}
export declare const Collapse: React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLDivElement>>;
