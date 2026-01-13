import * as React from 'react';
export interface ColorPickerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (color: string) => void;
    colors?: string[];
    allowCustom?: boolean;
    showPresets?: boolean;
    showCustom?: boolean;
    className?: string;
}
export declare const ColorPicker: React.FC<ColorPickerProps>;
