import { create } from 'zustand';

interface DataState {
    rows: any[];
    isLoading: boolean;
    setRows: (rows: any[]) => void;
    setLoading: (isLoading: boolean) => void;
    updateRow: (rowId: any, updates: any) => void;
    addRow: (row?: any) => void;
    deleteRow: (rowId: any) => void;
}

export const useDataStore = create<DataState>((set) => ({
    rows: [],
    isLoading: true,
    setRows: (rows) => set({ rows, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
    updateRow: (rowId, updates) => set((state) => ({
        rows: state.rows.map(r => r.id === rowId ? { ...r, ...updates, row: { ...(r.row || {}), ...updates } } : r)
    })),
    addRow: (newRow) => set((state) => {
        const id = Math.random().toString(36).substr(2, 9); // Simple ID gen
        const row = { id, row: newRow || {} };
        return { rows: [...state.rows, row] };
    }),
    deleteRow: (rowId) => set((state) => ({
        rows: state.rows.filter(r => r.id !== rowId)
    }))
}));
