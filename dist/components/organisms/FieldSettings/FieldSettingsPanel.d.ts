import * as React from 'react';
export interface FieldSettingsPanelProps {
    open: boolean;
    field: {
        name: string;
        label: string;
        type: string;
    } | null;
    onClose: () => void;
    onRename: (name: string, newLabel: string) => void;
    onDelete: (name: string) => void;
    onDuplicate: (name: string) => void;
    onEditType: (name: string) => void;
}
export declare const FieldSettingsPanel: React.FC<FieldSettingsPanelProps>;
