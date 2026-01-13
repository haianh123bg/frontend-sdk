import * as React from 'react';
export interface FieldConfig {
    name: string;
    type: string;
    label: string;
    enumValues?: string[];
}
export interface PropertyBuilderPanelProps {
    open: boolean;
    onClose: () => void;
    onAdd: (field: FieldConfig) => void;
    editField?: FieldConfig | null;
    onUpdate?: (field: FieldConfig) => void;
}
export declare const PropertyBuilderPanel: React.FC<PropertyBuilderPanelProps>;
