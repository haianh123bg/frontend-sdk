import { SortDirection } from '../views/grid/hooks/useSort';

export interface FilterCondition {
    id: string;
    columnId: string;
    operator: string;
    value: any;
    logicalOperator?: 'AND' | 'OR';
}
export interface SortConfig {
    columnId: string;
    direction: SortDirection;
}
interface ViewState {
    viewId: string | null;
    filters: FilterCondition[];
    sorts: SortConfig[];
    hiddenColumns: Set<string>;
    setFilters: (filters: FilterCondition[]) => void;
    addFilter: (filter: FilterCondition) => void;
    removeFilter: (filterId: string) => void;
    setSorts: (sorts: SortConfig[]) => void;
    groupBy: string[];
    setGroupBy: (columnIds: string[]) => void;
    expandedGroups: Set<string>;
    toggleGroup: (groupKey: string) => void;
    toggleHiddenColumn: (columnId: string) => void;
    frozenColumns: Set<string>;
    toggleFrozenColumn: (columnId: string) => void;
}
export declare const useViewStore: import('zustand').UseBoundStore<import('zustand').StoreApi<ViewState>>;
export {};
