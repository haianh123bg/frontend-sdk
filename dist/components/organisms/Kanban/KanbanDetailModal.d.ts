import { KanbanItem, KanbanSchema, KanbanFieldSchema } from '../../../kanban/types';
import * as React from 'react';
export interface KanbanDetailModalProps {
    open: boolean;
    mode?: 'create' | 'edit';
    item: KanbanItem | null;
    schema: KanbanSchema;
    onClose: () => void;
    onPatch?: (id: string, patch: Record<string, any>) => void;
    onSubmit?: (values: Record<string, any>) => Promise<any> | any;
    onCancel?: () => void;
    onAddProperty?: () => void;
    onFieldClick?: (field: KanbanFieldSchema) => void;
    onReorder?: (oldIndex: number, newIndex: number) => void;
}
export declare const KanbanDetailModal: React.FC<KanbanDetailModalProps>;
