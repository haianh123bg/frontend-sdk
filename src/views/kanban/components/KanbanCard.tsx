import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import { ColumnType } from '../../../types/meta';

interface KanbanCardProps {
    id: string; // Unique ID for DnD
    row: any;   // The data object
    titleColumn: ColumnType; // Which column to show as title
}

const KanbanCard: React.FC<KanbanCardProps> = ({ id, row, titleColumn }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const title = row[titleColumn.title] || row.row?.[titleColumn.title] || 'Untitled';

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={clsx(
                "bg-white p-3 rounded shadow-sm border border-gray-200 cursor-grab hover:shadow-md mb-2 select-none",
                isDragging && "opacity-50 ring-2 ring-blue-400 z-50"
            )}
        >
            <div className="text-sm font-medium text-gray-800 line-clamp-2">
                {title}
            </div>
            {/* Placeholder for other fields or tags */}
            <div className="mt-2 text-xs text-gray-400 flex items-center justify-between">
                <span>#{id}</span>
            </div>
        </div>
    );
};

export default KanbanCard;
