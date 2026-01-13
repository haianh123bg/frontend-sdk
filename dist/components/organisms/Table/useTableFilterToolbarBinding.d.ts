import { SortingState } from '@tanstack/react-table';
import { TableColumn } from './Table';
import { TableFilterFieldDefinition, TableFilterInstance } from './TableFilterToolbar';

type UseTableFilterToolbarBindingParams<T> = {
    columns: TableColumn<T>[];
    filterFields: TableFilterFieldDefinition[];
    filterInstances: TableFilterInstance[];
    onFilterInstancesChange: (next: TableFilterInstance[]) => void;
    sorting: SortingState;
    onSortingChange: (next: SortingState) => void;
    sortOperatorLabels?: {
        asc?: string;
        desc?: string;
    };
};
type UseTableFilterToolbarBindingResult = {
    fields: TableFilterFieldDefinition[];
    filters: TableFilterInstance[];
    onFiltersChange: (next: TableFilterInstance[]) => void;
};
export declare const useTableFilterToolbarBinding: <T>(params: UseTableFilterToolbarBindingParams<T>) => UseTableFilterToolbarBindingResult;
export {};
