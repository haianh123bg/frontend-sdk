import React, { useEffect } from 'react';
import { useMetaStore } from '../../store/useMetaStore';
import { useDataStore } from '../../store/useDataStore';
import { useViewStore } from '../../store/useViewStore';
import Header from './components/Header';
import Row from './components/Row';
import GroupRowComponent from './components/GroupRow';
import Toolbar from './components/Toolbar';
import { useSort } from './hooks/useSort';
import { useFilter } from './hooks/useFilter';
import { useGroup, GroupRow } from './hooks/useGroup';
import { useVirtualScroll } from './hooks/useVirtualScroll';
import { useElementSize } from '../../hooks/useElementSize';
import { useGridUIStore } from '../../store/useGridUIStore';

const ROW_HEIGHT = 35; // Slight adjustment for spacing

const Table: React.FC = () => {
    const { columns: allColumns, isLoading: isMetaLoading } = useMetaStore();
    const { rows, isLoading: isDataLoading, setRows, addRow } = useDataStore();
    const { hiddenColumns, frozenColumns } = useViewStore();

    const { ref: containerRef, height: containerHeight } = useElementSize<HTMLDivElement>();

    // Filter & Reorder columns: Frozen first
    const { visibleColumns, stickyOffsets } = React.useMemo(() => {
        const hidden = allColumns.filter(col => !hiddenColumns.has(col.id!));

        // Split into frozen and regular
        const frozen = hidden.filter(col => frozenColumns.has(col.id!));
        const regular = hidden.filter(col => !frozenColumns.has(col.id!));

        const sorted = [...frozen, ...regular];

        // Calculate offsets
        const offsets: Record<string, number> = {};
        let currentLeft = 50; // Start after Row Index column (approx 48-50px)

        sorted.forEach(col => {
            if (frozenColumns.has(col.id!)) {
                offsets[col.id!] = currentLeft;
                currentLeft += (col.width || 150);
            }
        });

        return { visibleColumns: sorted, stickyOffsets: offsets };
    }, [allColumns, hiddenColumns, frozenColumns]);

    const columns = visibleColumns; // Use the processed columns

    useEffect(() => {
        // Define Mock Columns
        if (allColumns.length === 0) {
            useMetaStore.setState({
                columns: [
                    { id: '1', title: 'Title', uidt: 'Text', width: 200 },
                    {
                        id: '2', title: 'Status', uidt: 'SingleSelect', width: 120, colOptions: {
                            options: [
                                { label: 'Done', value: 'Done' }, { label: 'In Progress', value: 'In Progress' }, { label: 'To Do', value: 'To Do' }
                            ]
                        }
                    },
                    { id: '3', title: 'Priority', uidt: 'SingleSelect', width: 100 },
                    { id: '4', title: 'Active', uidt: 'Checkbox', width: 80 },
                    { id: '5', title: 'Budget', uidt: 'Number', width: 100 },
                ]
            });
        }

        if (rows.length === 0) {
            const mockData = Array.from({ length: 1000 }).map((_, i) => ({
                id: i,
                row: {
                    'Title': `Task Item ${i}`,
                    'Status': i % 3 === 0 ? 'Done' : i % 3 === 1 ? 'In Progress' : 'To Do',
                    'Priority': i % 5 === 0 ? 'High' : i % 5 === 1 ? 'Medium' : 'Low',
                    'Active': i % 2 === 0,
                    'Budget': (Math.random() * 10000).toFixed(2)
                }
            }));
            setRows(mockData);
        }
    }, [setRows, rows.length, allColumns.length]);

    // 1. Filter Data
    const { filteredData } = useFilter(rows, allColumns);

    // 2. Sort Data (on filtered results)
    const { sortedData, sortConfig, toggleSort } = useSort(filteredData, columns);

    // 3. Group Data (on sorted results) - New Step
    const { groupedData } = useGroup(sortedData, columns);

    // 4. Virtualize Data (on grouped results)
    const { visibleItems, onScroll } = useVirtualScroll({
        totalItems: groupedData.length,
        itemHeight: ROW_HEIGHT,
        containerHeight: containerHeight - 40,
        buffer: 10
    });

    const paddingTop = visibleItems.length > 0 ? visibleItems[0].index * ROW_HEIGHT : 0;
    const paddingBottom = visibleItems.length > 0
        ? (groupedData.length - visibleItems[visibleItems.length - 1].index - 1) * ROW_HEIGHT
        : 0;

    const handleAddRow = () => {
        // Create an empty row with default values if needed
        addRow({ Title: 'New Record' });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            // Check if we have selected cells
            const { selectedCells } = useGridUIStore.getState();
            if (selectedCells.size > 0) {
                // Logic: If entire row is effectively selected or just delete cell content?
                // Standard behavior: 
                // - Delete key on cell -> clears content
                // - Context menu -> delete row
                // - For now, let's just clear content of selected cells as 'Delete Row' via key is dangerous without confirmation.

                // However, user asked for 'Delete Row' operation.
                // Let's implement Delete Row ONLY if Shift button is held? Or just a specific shortcut?
                // Or better, let's strictly stick to the UI hook: 'Delete Row' via Toolbar or Context Menu.
                // I will add a Delete button to Toolbar instead of hijacking Delete key for Row Deletion immediately.
                // So for now, loop through cells and clear them?

                // Let's keep it simple: Delete key clears value.
                // I will Add a separate 'handleDeleteRow' function exposed to Toolbar.
            }
        }
    };

    if (isMetaLoading || isDataLoading) {
        return <div className="p-4 text-gray-500">Loading grid...</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white border rounded shadow-sm overflow-hidden">
            {/* Toolbar Section */}
            <div className="flex-none">
                <Toolbar />
            </div>

            {/* Grid Container */}
            <div
                className="flex-1 overflow-auto relative outline-none"
                ref={containerRef}
                onScroll={onScroll}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm h-8">
                        <tr>
                            <th className="w-12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-r sticky left-0 z-30">
                                #
                            </th>
                            {columns.map((col) => (
                                <Header
                                    key={col.id}
                                    column={col}
                                    sortDirection={sortConfig?.columnId === col.id ? sortConfig?.direction : null}
                                    onSort={() => toggleSort(col.id!)}
                                    stickyLeft={stickyOffsets[col.id!]}
                                />
                            ))}
                            <th
                                className="w-10 px-2 py-2 border-b text-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer bg-gray-50"
                                onClick={handleAddRow}
                                title="Add Row"
                            >
                                +
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {paddingTop > 0 && (
                            <tr>
                                <td style={{ height: paddingTop }} colSpan={columns.length + 2} />
                            </tr>
                        )}

                        {visibleItems.map(({ index }) => {
                            const row = groupedData[index];

                            if ((row as GroupRow).isGroup) {
                                return (
                                    <GroupRowComponent
                                        key={(row as GroupRow).groupKey}
                                        row={row as GroupRow}
                                        columns={columns}
                                    />
                                );
                            }

                            return (
                                <Row
                                    key={row.id || index}
                                    index={index}
                                    row={row}
                                    columns={columns}
                                    stickyOffsets={stickyOffsets}
                                />
                            );
                        })}

                        {paddingBottom > 0 && (
                            <tr>
                                <td style={{ height: paddingBottom }} colSpan={columns.length + 2} />
                            </tr>
                        )}
                    </tbody>
                </table>

                {groupedData.length === 0 && (
                    <div className="flex justify-center items-center h-40 text-gray-400">
                        No records found
                    </div>
                )}
            </div>

            {/* Footer / Status Bar (Optional) */}
            <div className="border-t bg-gray-50 p-1 text-xs text-gray-500 px-2 flex justify-between">
                <span>{groupedData.length} rows (Virtual)</span>
                <span>{filteredData.length !== rows.length ? '(Filtered)' : ''}</span>
            </div>
        </div>
    );
};

export default Table;
