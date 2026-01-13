import React, { useMemo, useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useMetaStore } from '../../store/useMetaStore';
import { useDataStore } from '../../store/useDataStore';
import KanbanStack from './components/KanbanStack';
import KanbanCard from './components/KanbanCard';
import { createPortal } from 'react-dom';

const Kanban: React.FC = () => {
    const { columns } = useMetaStore();
    const { rows, updateRow } = useDataStore();

    // 1. Identify Grouping Column (Default: First SingleSelect)
    // In real app, this should be selectable from View Config
    const groupColumn = useMemo(() => columns.find(c => c.uidt === 'SingleSelect'), [columns]);
    const titleColumn = useMemo(() => columns.find(c => c.pk) || columns[0], [columns]);

    // 2. Prepare Stacks
    const stacks = useMemo(() => {
        if (!groupColumn || !groupColumn.colOptions?.options) return [];

        // Initialize stacks from options to ensure order
        const options = groupColumn.colOptions.options as { label: string, value: string, color?: string }[];
        const stackMap = new Map(options.map(opt => [opt.value, { ...opt, items: [] as any[] }]));

        // Add an 'Uncategorized' stack if needed? For now just stick to defined options.

        // Distribute rows
        rows.forEach(row => {
            const val = row[groupColumn.title] || row.row?.[groupColumn.title];
            if (stackMap.has(val)) {
                stackMap.get(val)!.items.push(row);
            } else {
                // Handle uncategorized if necessary, or put in first stack?
            }
        });

        return Array.from(stackMap.values());
    }, [rows, groupColumn]);

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const [activeId, setActiveId] = useState<string | null>(null);

    // DnD Handlers
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragOver = (_event: DragOverEvent) => {
        // Optional: Real-time reordering visual feedback could go here
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        // Find source and diff
        const activeRow = rows.find(r => String(r.id) === activeId);
        if (!activeRow || !groupColumn) return;

        // Check if dropped on a Stack Container (which has ID = Group Value)
        // OR dropped on another Card (which needs lookup of that card's group)

        // Simplification: In KanbanStack, we used droppable ID = Stack Value.
        // If overId matches a stack value, we move it there.

        // However, if we drop ON A CARD, overId is that card's ID.
        // We need to find which stack that card belongs to.

        let targetGroupValue: string | undefined;

        // Is overId a stack?
        const isStack = stacks.some(s => s.value === overId);
        if (isStack) {
            targetGroupValue = overId;
        } else {
            // Is overId a card? Find its group
            const overRow = rows.find(r => String(r.id) === overId);
            if (overRow) {
                targetGroupValue = overRow[groupColumn.title] || overRow.row?.[groupColumn.title];
            }
        }

        if (targetGroupValue) {
            // Update the row's group value
            const currentGroupValue = activeRow[groupColumn.title] || activeRow.row?.[groupColumn.title];

            if (currentGroupValue !== targetGroupValue) {
                updateRow(activeRow.id, { [groupColumn.title]: targetGroupValue });
            }
        }

        setActiveId(null);
    };

    if (!groupColumn) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                No 'SingleSelect' column found to group by. Please add one to use Kanban.
            </div>
        );
    }

    const activeRow = activeId ? rows.find(r => String(r.id) === activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-full overflow-x-auto p-4 bg-white/50 items-start">
                {stacks.map(stack => (
                    <KanbanStack
                        key={stack.value}
                        id={stack.value}
                        title={stack.label}
                        items={stack.items}
                        titleColumn={titleColumn}
                        color={stack.color || 'bg-blue-500'}
                    />
                ))}
            </div>

            {createPortal(
                <DragOverlay>
                    {activeRow ? (
                        <div className="transform rotate-3 cursor-grabbing w-72">
                            <KanbanCard
                                id={String(activeRow.id)}
                                row={activeRow}
                                titleColumn={titleColumn}
                            />
                        </div>
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};

export default Kanban;
