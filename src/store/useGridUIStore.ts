import { create } from 'zustand';

interface CellPosition {
    rowIndex: number;
    columnId: string;
}

interface GridUIState {
    activeCell: CellPosition | null;
    selectedCells: Set<string>; // Format: "rowIndex:columnId"
    editingCell: CellPosition | null;

    setActiveCell: (pos: CellPosition | null) => void;
    selectCell: (pos: CellPosition, multi: boolean) => void;
    clearSelection: () => void;
    setEditingCell: (pos: CellPosition | null) => void;
}

export const useGridUIStore = create<GridUIState>((set) => ({
    activeCell: null,
    selectedCells: new Set<string>(),
    editingCell: null,

    setActiveCell: (pos) => set({ activeCell: pos }),
    selectCell: (pos, multi) =>
        set((state) => {
            const key = `${pos.rowIndex}:${pos.columnId}`;
            const newSelection = multi ? new Set<string>(state.selectedCells) : new Set<string>();
            newSelection.add(key);
            return {
                selectedCells: newSelection,
                activeCell: pos
            };
        }),
    clearSelection: () => set({ selectedCells: new Set<string>(), activeCell: null }),
    setEditingCell: (pos) => set({ editingCell: pos }),
}));
