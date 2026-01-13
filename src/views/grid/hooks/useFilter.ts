import { useMemo } from 'react';
import { useViewStore } from '../../../store/useViewStore';
import { ColumnType } from '../../../types/meta';

export const useFilter = (data: any[], columns: ColumnType[]) => {
    const { filters } = useViewStore();

    const filteredData = useMemo(() => {
        if (filters.length === 0) return data;

        return data.filter(item => {
            // Simplified logic: treat all as AND for now
            return filters.every(filter => {
                const column = columns.find(c => c.id === filter.columnId);
                if (!column) return true;

                const cellValue = item.row?.[column.title] ?? item[column.title];

                switch (filter.operator) {
                    case 'contains':
                        return String(cellValue || '').toLowerCase().includes(String(filter.value).toLowerCase());
                    case 'eq':
                        return String(cellValue) === String(filter.value);
                    case 'neq':
                        return String(cellValue) !== String(filter.value);
                    case 'isEmpty':
                        return cellValue === null || cellValue === undefined || cellValue === '';
                    case 'isNotEmpty':
                        return cellValue !== null && cellValue !== undefined && cellValue !== '';
                    default:
                        return true;
                }
            });
        });
    }, [data, filters, columns]);

    return { filteredData };
};
