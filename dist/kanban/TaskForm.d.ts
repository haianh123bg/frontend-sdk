import { KanbanSchema, KanbanMappings, Permissions } from './types';
import * as React from 'react';
export interface TaskFormProps {
    schema: KanbanSchema;
    mappings?: KanbanMappings;
    permissions?: Permissions;
    mode: 'create' | 'edit';
    initialValues?: Record<string, any>;
    onSubmit: (values: Record<string, any>) => Promise<any> | any;
    onCancel?: () => void;
    onAddProperty?: () => void;
    onFieldClick?: (field: any) => void;
    onReorder?: (oldIndex: number, newIndex: number) => void;
}
export declare const TaskForm: React.FC<TaskFormProps>;
