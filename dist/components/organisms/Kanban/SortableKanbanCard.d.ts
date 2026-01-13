import { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types';
import * as React from 'react';
export interface SortableKanbanCardProps {
    item: KanbanItem;
    schema: KanbanSchema;
    mappings: KanbanBoardProps['mappings'];
    renderCard?: KanbanBoardProps['renderCard'];
    onCardClick?: (item: KanbanItem) => void;
    visibleFields?: string[];
}
export declare const SortableKanbanCard: React.FC<SortableKanbanCardProps>;
