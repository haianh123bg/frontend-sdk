export interface ColumnType {
    id?: string;
    title: string;
    uidt: string; // User Interface Data Type
    colOptions?: any;
    order?: number;
    width?: number;
    pk?: boolean;
}

export interface TableType {
    id: string;
    title: string;
    columns?: ColumnType[];
    views?: any[];
}
