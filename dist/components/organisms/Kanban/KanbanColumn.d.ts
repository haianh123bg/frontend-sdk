import { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types';
import * as React from 'react';
export interface KanbanColumnProps {
    columnKey: string;
    title: string;
    items: KanbanItem[];
    schema: KanbanSchema;
    mappings: KanbanBoardProps['mappings'];
    onAddClick?: () => void;
    onCardClick?: (item: KanbanItem) => void;
    renderCard?: KanbanBoardProps['renderCard'];
    virtualized?: boolean;
    virtualRowHeight?: number;
    virtualOverscan?: number;
    visibleFields?: string[];
}
export declare const KanbanColumn: React.FC<KanbanColumnProps>;
