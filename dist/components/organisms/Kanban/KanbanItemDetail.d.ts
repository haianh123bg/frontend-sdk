import { KanbanItem, KanbanSchema, KanbanFieldSchema } from '../../../kanban/types';
import * as React from 'react';
export interface KanbanItemDetailProps {
    mode?: 'create' | 'edit';
    item: KanbanItem;
    schema: KanbanSchema;
    onPatch?: (id: string, patch: Record<string, any>) => void;
    onSubmit?: (values: Record<string, any>) => Promise<any> | any;
    onCancel?: () => void;
    onAddProperty?: () => void;
    onFieldClick?: (field: KanbanFieldSchema) => void;
    onReorder?: (oldIndex: number, newIndex: number) => void;
    className?: string;
}
export declare const KanbanItemDetail: React.FC<KanbanItemDetailProps>;
