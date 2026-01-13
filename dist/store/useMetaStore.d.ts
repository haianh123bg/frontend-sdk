import { ColumnType, TableType } from '../types/meta';

interface MetaState {
    meta: TableType | null;
    columns: ColumnType[];
    isLoading: boolean;
    setMeta: (meta: TableType) => void;
    setColumns: (columns: ColumnType[]) => void;
    updateColumn: (columnId: string, updates: Partial<ColumnType>) => void;
}
export declare const useMetaStore: import('zustand').UseBoundStore<import('zustand').StoreApi<MetaState>>;
export {};
