import * as React from 'react';
export interface ViewToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    onFilterClick?: () => void;
    onSortClick?: () => void;
    onSettingsClick?: () => void;
    onSearch?: (term: string) => void;
    filterActive?: boolean;
    sortActive?: boolean;
    settingsActive?: boolean;
    extraActions?: React.ReactNode;
}
export declare const ViewToolbar: React.ForwardRefExoticComponent<ViewToolbarProps & React.RefAttributes<HTMLDivElement>>;
