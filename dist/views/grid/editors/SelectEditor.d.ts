import { default as React } from 'react';
import { ColumnType } from '../../../types/meta';

interface SelectEditorProps {
    value: any;
    column: ColumnType;
    onChange: (value: any) => void;
    onCommit: () => void;
    onCancel: () => void;
    autoFocus?: boolean;
}
declare const SelectEditor: React.FC<SelectEditorProps>;
export default SelectEditor;
