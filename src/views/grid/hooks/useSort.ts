import { useState, useMemo } from 'react';
import { ColumnType } from '../../../types/meta';

export type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
    columnId: string;
    direction: SortDirection;
}

export const useSort = (data: any[], columns: ColumnType[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const sortedData = useMemo(() => {
        if (!sortConfig || !sortConfig.direction) {
            return data;
        }

        const column = columns.find(c => c.id === sortConfig.columnId);
        if (!column) return data;

        return [...data].sort((a, b) => {
            const valA = a.row?.[column.title] ?? a[column.title];
            const valB = b.row?.[column.title] ?? b[column.title];

            if (valA === valB) return 0;
            if (valA === null || valA === undefined) return 1;
            if (valB === null || valB === undefined) return -1;

            const compareResult = valA > valB ? 1 : -1;
            return sortConfig.direction === 'asc' ? compareResult : -compareResult;
        });
    }, [data, sortConfig, columns]);

    const toggleSort = (columnId: string) => {
        setSortConfig(current => {
            if (current?.columnId === columnId) {
                if (current.direction === 'asc') return { columnId, direction: 'desc' };
                if (current.direction === 'desc') return null;
            }
            return { columnId, direction: 'asc' };
        });
    };

    return { sortedData, sortConfig, toggleSort };
};
