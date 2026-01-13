import React, { useEffect, useRef } from 'react';
import { ColumnType } from '../../../types/meta';

interface SelectEditorProps {
    value: any;
    column: ColumnType;
    onChange: (value: any) => void;
    onCommit: () => void;
    onCancel: () => void;
    autoFocus?: boolean;
}

const SelectEditor: React.FC<SelectEditorProps> = ({ value, column, onChange, onCommit, onCancel, autoFocus = true }) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    // Extract options from column definition (colOptions)
    // Format assumption: colOptions: { options: [{ label: 'A', value: 'A' }] }
    // Or just use a hardcoded set for demo if missing
    const options = column.colOptions?.options || [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
        { label: 'Option 3', value: 'Option 3' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
        { label: 'Done', value: 'Done' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'To Do', value: 'To Do' },
    ];

    useEffect(() => {
        if (autoFocus && selectRef.current) {
            selectRef.current.focus();
            // Native select doesn't support 'open' programmatically easily across browsers without custom UI
        }
    }, [autoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        onCommit(); // Commit immediately on selection
    };

    const handleBlur = () => {
        onCommit();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onCancel();
        if (e.key === 'Enter') onCommit();
    };

    return (
        <select
            ref={selectRef}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full px-2 outline-none border-2 border-blue-500 bg-white shadow-sm z-50 text-sm"
        >
            <option value="">Select...</option>
            {options.map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export default SelectEditor;
