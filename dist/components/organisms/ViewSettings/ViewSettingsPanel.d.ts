import * as React from 'react';
export interface ViewSettingsMenuItem {
    id: string;
    label: string;
    type?: 'group' | 'item';
    icon?: React.ReactNode;
    description?: string;
    children?: ViewSettingsMenuItem[];
    onClick?: () => void;
}
export interface ViewSettingsPanelProps {
    items: ViewSettingsMenuItem[];
    open: boolean;
    onClose?: () => void;
}
export declare const ViewSettingsPanel: React.FC<ViewSettingsPanelProps>;
