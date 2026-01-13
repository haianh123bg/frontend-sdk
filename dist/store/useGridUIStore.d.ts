interface CellPosition {
    rowIndex: number;
    columnId: string;
}
interface GridUIState {
    activeCell: CellPosition | null;
    selectedCells: Set<string>;
    editingCell: CellPosition | null;
    setActiveCell: (pos: CellPosition | null) => void;
    selectCell: (pos: CellPosition, multi: boolean) => void;
    clearSelection: () => void;
    setEditingCell: (pos: CellPosition | null) => void;
}
export declare const useGridUIStore: import('zustand').UseBoundStore<import('zustand').StoreApi<GridUIState>>;
export {};
