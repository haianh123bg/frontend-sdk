import React from 'react';
import { ColumnType } from '../../../types/meta';
import { SortDirection } from '../hooks/useSort';
import { useColumnResize } from '../hooks/useColumnResize';
import { clsx } from 'clsx';

interface HeaderProps {
    column: ColumnType;
    sortDirection?: SortDirection | null;
    onSort?: () => void;
    stickyLeft?: number;
}

const Header: React.FC<HeaderProps> = ({ column, sortDirection, onSort, stickyLeft }) => {
    const { width, isResizing, handleMouseDown } = useColumnResize(column.id!, column.width);

    const isSticky = stickyLeft !== undefined;

    return (
        <th
            scope="col"
            className={clsx(
                "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r relative group select-none bg-gray-50",
                isSticky && "sticky z-30 border-r-2 border-r-gray-300", // Higher z-index for frozen headers
                isResizing && "bg-gray-100"
            )}
            style={{
                width,
                minWidth: width,
                maxWidth: width,
                left: stickyLeft,
                zIndex: isSticky ? 30 : undefined
            }}
            onClick={onSort}
        >
            <div className="flex items-center justify-between overflow-hidden">
                <div className="flex items-center gap-1 truncate">
                    <span className="truncate">{column.title}</span>
                    {sortDirection === 'asc' && <span className="text-blue-500">↑</span>}
                    {sortDirection === 'desc' && <span className="text-blue-500">↓</span>}
                </div>

                {/* Placeholder for menu trigger */}
                <span className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200" onClick={(e) => e.stopPropagation()}>
                    ⋮
                </span>
            </div>
            {/* Resize Handle */}
            <div
                className={clsx(
                    "absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-400 z-10",
                    isResizing && "bg-blue-400"
                )}
                onMouseDown={handleMouseDown}
                onClick={(e) => e.stopPropagation()}
            />
        </th>
    );
};

export default Header;
