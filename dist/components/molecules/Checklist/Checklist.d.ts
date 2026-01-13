import * as React from 'react';
export interface ChecklistItem {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    completed?: boolean;
    disabled?: boolean;
}
export interface ChecklistProps extends React.HTMLAttributes<HTMLUListElement> {
    items: ChecklistItem[];
    onItemToggle?: (id: string, completed: boolean) => void;
    showProgress?: boolean;
    dense?: boolean;
}
export declare const Checklist: React.ForwardRefExoticComponent<ChecklistProps & React.RefAttributes<HTMLUListElement>>;
