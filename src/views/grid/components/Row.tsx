import React from 'react';
import { ColumnType } from '../../../types/meta';
import Cell from './Cell';
import { clsx } from 'clsx';

interface RowProps {
    index: number;
    row: any;
    columns: ColumnType[];
    stickyOffsets?: Record<string, number>;
}

const Row: React.FC<RowProps> = ({ index, row, columns, stickyOffsets }) => {
    return (
        <tr className="hover:bg-gray-50 group">
            {/* Row Index Cell */}
            <td className="px-3 py-2 whitespace-nowrap text-xs text-center text-gray-400 border-r bg-gray-50/50 sticky left-0 z-10">
                {index + 1}
            </td>

            {columns.map((col) => {
                const stickyLeft = stickyOffsets?.[col.id!];
                const isSticky = stickyLeft !== undefined;

                return (
                    <td
                        key={col.id}
                        className={clsx(
                            "whitespace-nowrap border-r border-transparent group-hover:border-gray-200 cursor-cell relative focus-within:ring-2 focus-within:ring-blue-500 focus-within:z-10 p-0",
                            isSticky && "sticky z-10 bg-white border-r-2 border-r-gray-200" // Sticky cells need bg-white to cover scrolling content
                        )}
                        style={{
                            maxWidth: col.width,
                            width: col.width,
                            left: stickyLeft
                        }}
                    >
                        <div className="w-full h-full min-h-[32px]">
                            <Cell row={row} rowIndex={index} column={col} />
                        </div>
                    </td>
                );
            })}
        </tr>
    );
};

export default Row;
