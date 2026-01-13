import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { clsx } from 'clsx';
import KanbanCard from './KanbanCard';
import { ColumnType } from '../../../types/meta';

interface KanbanStackProps {
    id: string; // Stack Group Value (e.g. "To Do")
    title: string;
    items: any[]; // Rows in this stack
    titleColumn: ColumnType;
    color?: string; // Badge color
}

const KanbanStack: React.FC<KanbanStackProps> = ({ id, title, items, titleColumn, color }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="flex-shrink-0 w-72 flex flex-col h-full bg-gray-100/50 rounded-lg mx-2 max-h-full">
            {/* Header */}
            <div className="p-3 flex items-center justify-between font-medium text-sm text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    {color && <div className={clsx("w-3 h-3 rounded-full", color)}></div>}
                    <span>{title}</span>
                    <span className="text-gray-400 text-xs">({items.length})</span>
                </div>
                <button className="hover:bg-gray-200 p-1 rounded">+</button>
            </div>

            {/* Cards Container */}
            <div ref={setNodeRef} className="flex-1 overflow-y-auto p-2 min-h-0">
                <SortableContext
                    id={id}
                    items={items.map(item => String(item.id))}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(item => (
                        <KanbanCard
                            key={item.id}
                            id={String(item.id)}
                            row={item}
                            titleColumn={titleColumn}
                        />
                    ))}
                </SortableContext>
                {items.length === 0 && (
                    <div className="h-full flex items-center justify-center text-gray-400 text-xs italic opacity-50">
                        Empty
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanStack;
