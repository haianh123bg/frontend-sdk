import { ColumnType } from '../../../types/meta';

export type SortDirection = 'asc' | 'desc' | null;
interface SortConfig {
    columnId: string;
    direction: SortDirection;
}
export declare const useSort: (data: any[], columns: ColumnType[]) => {
    sortedData: any[];
    sortConfig: SortConfig | null;
    toggleSort: (columnId: string) => void;
};
export {};
