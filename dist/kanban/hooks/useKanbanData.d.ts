import { KanbanBoardState, KanbanColumnConfig, KanbanFieldMappings, KanbanItem, KanbanSchema, MoveLocation } from '../types';

export interface UseKanbanDataOptions {
    schema: KanbanSchema;
    mappings?: KanbanFieldMappings;
    items: Record<string, any>[];
    columns?: KanbanColumnConfig[];
    pageSize?: number;
}
export interface UseKanbanDataResult {
    state: KanbanBoardState;
    columnKeyField: string;
    idField: string;
    columnConfigs: KanbanColumnConfig[];
    getItemById: (id: string) => KanbanItem | undefined;
    moveItemLocal: (id: string, from: MoveLocation, to: MoveLocation, position: number) => void;
    updateItemLocal: (id: string, patch: any) => void;
    addItemLocal: (item: Record<string, any>) => void;
    removeItemLocal: (id: string) => void;
    replaceState: (next: KanbanBoardState) => void;
}
export declare const useKanbanData: (options: UseKanbanDataOptions) => UseKanbanDataResult;
