import { create } from 'zustand';
import { ColumnType, TableType } from '../types/meta';

interface MetaState {
    meta: TableType | null;
    columns: ColumnType[];
    isLoading: boolean;
    setMeta: (meta: TableType) => void;
    setColumns: (columns: ColumnType[]) => void;
    updateColumn: (columnId: string, updates: Partial<ColumnType>) => void;
}

export const useMetaStore = create<MetaState>((set) => ({
    meta: null,
    columns: [],
    isLoading: false,
    setMeta: (meta) => set({ meta, columns: meta.columns || [] }),
    setColumns: (columns) => set({ columns }),
    updateColumn: (columnId, updates) =>
        set((state) => ({
            columns: state.columns.map((col) =>
                col.id === columnId ? { ...col, ...updates } : col
            ),
        })),
}));
