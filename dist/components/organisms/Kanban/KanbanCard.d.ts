import { KanbanBoardProps, KanbanItem, KanbanSchema } from '../../../kanban/types';
import * as React from 'react';
export interface KanbanCardProps {
    item: KanbanItem;
    schema: KanbanSchema;
    mappings: KanbanBoardProps['mappings'];
    onClick?: () => void;
    renderCard?: KanbanBoardProps['renderCard'];
    /**
     * Danh sách các field name cần hiển thị trong phần body của card.
     * Nếu không truyền, sẽ sử dụng mappings.cardMeta.
     */
    visibleFields?: string[];
}
export declare const KanbanCard: React.FC<KanbanCardProps>;
