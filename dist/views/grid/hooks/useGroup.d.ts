import { ColumnType } from '../../../types/meta';

export interface GroupRow {
    isGroup: true;
    groupKey: string;
    groupValue: any;
    depth: number;
    count: number;
    path: string[];
    columnId: string;
}
export declare const useGroup: (data: any[], columns: ColumnType[]) => {
    groupedData: any[];
};
