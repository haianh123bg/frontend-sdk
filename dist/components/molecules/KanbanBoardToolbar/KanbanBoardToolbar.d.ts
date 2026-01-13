import * as React from 'react';
export interface KanbanBoardToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: React.ReactNode;
    locale?: string;
    count?: number;
    extra?: React.ReactNode;
    actions?: React.ReactNode;
}
export declare const KanbanBoardToolbar: React.ForwardRefExoticComponent<KanbanBoardToolbarProps & React.RefAttributes<HTMLDivElement>>;
