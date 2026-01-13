import React from 'react';
import { ColumnType } from '../../../types/meta';
import TextCell from '../cells/TextCell';
import CheckboxCell from '../cells/CheckboxCell';
import SelectCell from '../cells/SelectCell';
import { useGridUIStore } from '../../../store/useGridUIStore';
import { useDataStore } from '../../../store/useDataStore';
import { clsx } from 'clsx';
import TextEditor from '../editors/TextEditor';
import SelectEditor from '../editors/SelectEditor';

interface CellProps {
    row: any;
    rowIndex: number;
    column: ColumnType;
    readOnly?: boolean;
}

const Cell: React.FC<CellProps> = ({ row, rowIndex, column, readOnly }) => {
    const value = row[column.title] || row.row?.[column.title];
    const { selectCell, selectedCells, activeCell, editingCell, setEditingCell } = useGridUIStore();
    const { updateRow } = useDataStore();

    const cellKey = `${rowIndex}:${column.id}`;
    const isSelected = selectedCells.has(cellKey);
    const isActive = activeCell?.rowIndex === rowIndex && activeCell?.columnId === column.id;
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id;

    const handleClick = (e: React.MouseEvent) => {
        selectCell({ rowIndex, columnId: column.id! }, e.shiftKey || e.ctrlKey);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Checkbox toggles on single click, doesn't need edit mode
        if (column.uidt === 'Checkbox') return;

        if (!readOnly) {
            setEditingCell({ rowIndex, columnId: column.id! });
        }
    };

    const handleCommit = (newValue: any) => {
        updateRow(row.id, { [column.title]: newValue });
        setEditingCell(null);
    };

    const Component = () => {
        if (isEditing) {
            if (column.uidt === 'SingleSelect') {
                return (
                    <SelectEditor
                        value={value}
                        column={column}
                        onChange={handleCommit}
                        onCommit={() => setEditingCell(null)}
                        onCancel={() => setEditingCell(null)}
                    />
                );
            }

            return (
                <TextEditor
                    value={value}
                    onChange={handleCommit}
                    onCommit={() => setEditingCell(null)}
                    onCancel={() => setEditingCell(null)}
                />
            );
        }

        switch (column.uidt) {
            case 'Checkbox':
                return <CheckboxCell value={value} rowId={row.id} columnTitle={column.title} readOnly={readOnly} />;
            case 'SingleSelect':
                return <SelectCell value={value} readOnly={readOnly} />;
            case 'Number':
                return <TextCell value={value} className="text-right font-mono text-xs" readOnly={readOnly} />;
            case 'Text':
            case 'LongText':
            default:
                return <TextCell value={value} readOnly={readOnly} />;
        }
    };

    return (
        <div
            className={clsx(
                "w-full h-full border border-transparent",
                isSelected && "bg-blue-50",
                isActive && "ring-2 ring-blue-500 z-10 border-blue-500"
            )}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <Component />
        </div>
    );
};

export default Cell;
