import React from 'react';
import { GroupRow } from '../hooks/useGroup';
import { useViewStore } from '../../../store/useViewStore';
import { ColumnType } from '../../../types/meta';

interface GroupRowProps {
    row: GroupRow;
    columns: ColumnType[];
}

const GroupRowComponent: React.FC<GroupRowProps> = ({ row, columns }) => {
    const { toggleGroup, expandedGroups } = useViewStore();
    const isExpanded = expandedGroups.has(row.groupKey);

    const columnTitle = columns.find(c => c.id === row.columnId)?.title || 'Unknown';

    return (
        <tr
            className="bg-gray-100/80 hover:bg-gray-200 cursor-pointer font-medium text-sm transition-colors"
            onClick={() => toggleGroup(row.groupKey)}
        >
            <td
                colSpan={columns.length + 1}
                className="px-3 py-2 border-b border-gray-200 text-gray-700 select-none"
                style={{ paddingLeft: `${row.depth * 20 + 12}px` }}
            >
                <span className="inline-block mr-2 transform transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    ▶
                </span>
                <span className="text-gray-500 mr-1">{columnTitle}:</span>
                <span className="text-gray-900 font-semibold">{row.groupValue}</span>
                <span className="ml-2 text-gray-400 text-xs text-pill bg-white px-2 py-0.5 rounded-full border">
                    {row.count} records
                </span>
            </td>
            {/* Empty cell for Add Column if needed, or colSpan covers it */}
            {/* To match grid layout, usually Group Header spans full width */}
            <td className="border-b border-gray-200 bg-gray-100/80"></td>
        </tr>
    );
};

export default GroupRowComponent;
