import React from 'react';
import { clsx } from 'clsx';
import { useDataStore } from '../../../store/useDataStore';

interface CheckboxCellProps {
    value: boolean;
    rowId: any;
    columnTitle: string;
    readOnly?: boolean;
}

const CheckboxCell: React.FC<CheckboxCellProps> = ({ value, rowId, columnTitle, readOnly }) => {
    const { updateRow } = useDataStore();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent selection/edit mode trigger on container
        if (readOnly) return;
        updateRow(rowId, { [columnTitle]: !value });
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <input
                type="checkbox"
                checked={!!value}
                onChange={() => { }} // Handled by div click for bigger hit area
                onClick={handleClick}
                className={clsx(
                    "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer",
                    readOnly && "opacity-50 cursor-not-allowed"
                )}
                disabled={readOnly}
            />
        </div>
    );
};

export default CheckboxCell;
