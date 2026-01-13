import React from 'react';

interface TextCellProps {
    value: any;
    className?: string;
    readOnly?: boolean;
}

const TextCell: React.FC<TextCellProps> = ({ value, className }) => {
    return (
        <div className={`w-full h-full flex items-center px-1 truncate ${className ?? ''}`}>
            <span className="truncate text-sm text-gray-900">
                {value === null || value === undefined ? '' : String(value)}
            </span>
        </div>
    );
};

export default TextCell;
