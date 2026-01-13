import { SortingState } from '@tanstack/react-table';

export interface UseTableAiControlOptions {
    instanceId: string;
    setSorting?: (sorting: SortingState) => void;
}
export declare const useTableAiControl: (options: UseTableAiControlOptions) => void;
