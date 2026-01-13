import React from 'react';
import { clsx } from 'clsx';

interface SelectCellProps {
    value: string;
    options?: any; // To look up colors later
    className?: string;
    readOnly?: boolean;
}

// Simple color hash or predefined colors based on value string length
const getBadgeColor = (text: string) => {
    const colors = [
        'bg-red-100 text-red-800',
        'bg-yellow-100 text-yellow-800',
        'bg-green-100 text-green-800',
        'bg-blue-100 text-blue-800',
        'bg-indigo-100 text-indigo-800',
        'bg-purple-100 text-purple-800',
        'bg-pink-100 text-pink-800',
    ];
    if (!text) return 'bg-gray-100 text-gray-800';
    const index = text.length % colors.length;
    return colors[index];
};

const SelectCell: React.FC<SelectCellProps> = ({ value, className }) => {
    if (!value) return null;

    return (
        <div className={clsx("w-full h-full flex items-center px-2", className)}>
            <span className={clsx(
                "px-2 py-0.5 rounded-full text-xs font-medium border border-transparent truncate",
                getBadgeColor(String(value))
            )}>
                {value}
            </span>
        </div>
    );
};

export default SelectCell;
