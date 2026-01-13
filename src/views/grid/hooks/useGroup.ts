import { useMemo } from 'react';
import { useViewStore } from '../../../store/useViewStore';
import { ColumnType } from '../../../types/meta';

export interface GroupRow {
    isGroup: true;
    groupKey: string;
    groupValue: any;
    depth: number;
    count: number;
    path: string[]; // For expanded state matching
    columnId: string;
}

export const useGroup = (data: any[], columns: ColumnType[]) => {
    const { groupBy, expandedGroups } = useViewStore();

    const groupedData = useMemo(() => {
        if (groupBy.length === 0) return data;

        const result: any[] = [];

        // Recursive grouping function
        const groupRecursive = (rows: any[], depth: number, parentPath: string[]) => {
            if (depth >= groupBy.length) {
                result.push(...rows); // Push leaf rows
                return;
            }

            const columnId = groupBy[depth];
            const column = columns.find(c => c.id === columnId);
            if (!column) {
                // Should not happen if data consistent
                result.push(...rows);
                return;
            }

            // Group rows by current column value
            const groups = new Map<string, any[]>();

            rows.forEach(row => {
                const val = row.row?.[column.title] ?? row[column.title];
                const key = String(val); // Transform value to key
                if (!groups.has(key)) {
                    groups.set(key, []);
                }
                groups.get(key)!.push(row);
            });

            // Iterate groups
            for (const [key, groupRows] of groups) {
                const currentPath = [...parentPath, key];
                const pathKey = currentPath.join('::');

                // Push Group Header Row
                const groupRow: GroupRow = {
                    isGroup: true,
                    groupKey: pathKey,
                    groupValue: key,
                    depth: depth,
                    count: groupRows.length,
                    path: currentPath,
                    columnId
                };
                result.push(groupRow);

                // If expanded, recurse
                if (expandedGroups.has(pathKey)) {
                    groupRecursive(groupRows, depth + 1, currentPath);
                }
            }
        };

        groupRecursive(data, 0, []);
        return result;

    }, [data, groupBy, columns, expandedGroups]);

    return { groupedData };
};
