interface DataState {
    rows: any[];
    isLoading: boolean;
    setRows: (rows: any[]) => void;
    setLoading: (isLoading: boolean) => void;
    updateRow: (rowId: any, updates: any) => void;
    addRow: (row?: any) => void;
    deleteRow: (rowId: any) => void;
}
export declare const useDataStore: import('zustand').UseBoundStore<import('zustand').StoreApi<DataState>>;
export {};
