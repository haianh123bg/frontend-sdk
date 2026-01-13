import React from 'react';
import { useViewStore } from '../../../store/useViewStore';
import { useMetaStore } from '../../../store/useMetaStore';
import { useGridUIStore } from '../../../store/useGridUIStore';
import { useDataStore } from '../../../store/useDataStore';

const Toolbar: React.FC = () => {
    const { filters, addFilter, hiddenColumns, toggleHiddenColumn, groupBy, setGroupBy, frozenColumns, toggleFrozenColumn } = useViewStore();
    const { columns } = useMetaStore();

    // Mock adding a filter for demo
    const handleAddMockFilter = () => {
        if (columns.length === 0) return;
        addFilter({
            id: Math.random().toString(),
            columnId: columns[0].id!,
            operator: 'contains',
            value: 'Done',
            logicalOperator: 'AND'
        });
    };

    return (
        <div className="flex items-center gap-2 p-2 border-b bg-gray-50/50">
            {/* Search Bar - Placeholder */}
            <div className="relative group">
                <input
                    type="text"
                    placeholder="Find..."
                    className="pl-8 pr-2 py-1 text-sm border rounded hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 transition-all"
                />
                <span className="absolute left-2 top-1.5 text-gray-400 text-xs">🔍</span>
            </div>

            <div className="h-4 w-px bg-gray-300 mx-1" />

            {/* Filter Button */}
            <button
                onClick={handleAddMockFilter}
                className={`flex items-center px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors ${filters.length > 0 ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
            >
                <span className="mr-1">🌪</span>
                Filter
                {filters.length > 0 && <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1 rounded-full">{filters.length}</span>}
            </button>

            {/* Sort Button */}
            <button className="flex items-center px-2 py-1 text-sm text-gray-600 rounded hover:bg-gray-200 transition-colors">
                <span className="mr-1">⇅</span>
                Sort
            </button>

            {/* Group Button */}
            <div className="relative group">
                <button className={`flex items-center px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors ${groupBy.length > 0 ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}>
                    <span className="mr-1">⚏</span>
                    Group
                    {groupBy.length > 0 && <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1 rounded-full">{groupBy.length}</span>}
                </button>
                {/* Simple Dropdown for Group By Demo */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded shadow-lg hidden group-hover:block z-50 p-1">
                    <div className="text-xs font-semibold text-gray-500 px-2 py-1">Group by...</div>
                    {columns.map(col => (
                        <div
                            key={col.id}
                            className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => {
                                const newGroupBy = groupBy.includes(col.id!)
                                    ? groupBy.filter(g => g !== col.id)
                                    : [...groupBy, col.id!];
                                setGroupBy(newGroupBy);
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={groupBy.includes(col.id!)}
                                readOnly
                                className="mr-2"
                            />
                            {col.title}
                        </div>
                    ))}
                </div>
            </div>

            {/* Columns Button (Manage Fields & Freeze) */}
            <div className="relative group">
                <button className="flex items-center px-2 py-1 text-sm text-gray-600 rounded hover:bg-gray-200 transition-colors">
                    <span className="mr-1">👁</span>
                    Columns
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded shadow-lg hidden group-hover:block z-50 p-2">
                    <div className="text-xs font-semibold text-gray-500 mb-2">Column Settings</div>
                    <div className="max-h-60 overflow-y-auto">
                        {columns.map(col => (
                            <div
                                key={col.id}
                                className="flex items-center justify-between px-2 py-1.5 hover:bg-gray-100 rounded text-sm group/item"
                            >
                                {/* Visibility Toggle */}
                                <div
                                    className="flex items-center cursor-pointer flex-1"
                                    onClick={() => toggleHiddenColumn(col.id!)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={!hiddenColumns.has(col.id!)}
                                        readOnly
                                        className="mr-2"
                                    />
                                    <span className="truncate" title={col.title}>{col.title}</span>
                                </div>

                                {/* Freeze Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFrozenColumn(col.id!);
                                    }}
                                    className={`ml-2 p-1 rounded hover:bg-gray-300 ${frozenColumns.has(col.id!) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 opacity-0 group-hover/item:opacity-100'}`}
                                    title="Freeze Column"
                                >
                                    ❄
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-4 w-px bg-gray-300 mx-1" />

            {/* Row Height Actions */}
            <button className="p-1 rounded hover:bg-gray-200 text-gray-500">
                Row Height
            </button>

            {/* Delete Row Button - Visible only when selection exists? Or just generic */}
            <button
                className="flex items-center px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors ml-2"
                onClick={() => {
                    const { activeCell } = useGridUIStore.getState();
                    const { deleteRow, rows } = useDataStore.getState();

                    // Naive logic: Delete row of active cell
                    if (activeCell) {
                        const rowToDelete = rows[activeCell.rowIndex];
                        if (rowToDelete && confirm('Delete this row?')) {
                            deleteRow(rowToDelete.id);
                            useGridUIStore.getState().clearSelection();
                        }
                    } else {
                        alert('Select a cell to delete its row');
                    }
                }}
            >
                <span className="mr-1">🗑</span>
                Delete Row
            </button>

            <div className="flex-1" />

            {/* Right Actions */}
            <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors shadow-sm">
                Share
            </button>
        </div>
    );
};

export default Toolbar;
