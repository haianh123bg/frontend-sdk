import { create } from 'zustand';
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

    // Grouping
    groupBy: string[]; // Column IDs
    setGroupBy: (columnIds: string[]) => void;
    expandedGroups: Set<string>; // Group keys that are expanded
    toggleGroup: (groupKey: string) => void;

    toggleHiddenColumn: (columnId: string) => void;

    // Frozen Columns
    frozenColumns: Set<string>; // ID of columns that are frozen
    toggleFrozenColumn: (columnId: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
    viewId: null,
    filters: [],
    sorts: [],
    hiddenColumns: new Set(),
    groupBy: [],
    expandedGroups: new Set(),
    frozenColumns: new Set(),

    setFilters: (filters) => set({ filters }),
    addFilter: (filter) => set((state) => ({ filters: [...state.filters, filter] })),
    removeFilter: (filterId) => set((state) => ({
        filters: state.filters.filter(f => f.id !== filterId)
    })),

    setSorts: (sorts) => set({ sorts }),

    setGroupBy: (groupBy) => set({ groupBy }),
    toggleGroup: (groupKey) => set((state) => {
        const newExpanded = new Set(state.expandedGroups);
        if (newExpanded.has(groupKey)) {
            newExpanded.delete(groupKey);
        } else {
            newExpanded.add(groupKey);
        }
        return { expandedGroups: newExpanded };
    }),

    toggleHiddenColumn: (columnId) => set((state) => {
        const newHidden = new Set(state.hiddenColumns);
        if (newHidden.has(columnId)) {
            newHidden.delete(columnId);
        } else {
            newHidden.add(columnId);
        }
        return { hiddenColumns: newHidden };
    }),

    toggleFrozenColumn: (columnId) => set((state) => {
        const newFrozen = new Set(state.frozenColumns);
        if (newFrozen.has(columnId)) {
            newFrozen.delete(columnId);
        } else {
            newFrozen.add(columnId);
        }
        return { frozenColumns: newFrozen };
    })
}));
