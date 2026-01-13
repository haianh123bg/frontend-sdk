import { Row, CellRange, CanvasGridProps, NavigateDir } from '../types';

export declare function useCanvasGrid(props: CanvasGridProps): {
    canvasRef: import('react').RefObject<HTMLCanvasElement>;
    containerRef: import('react').RefObject<HTMLDivElement>;
    offscreenCanvasRef: import('react').MutableRefObject<HTMLCanvasElement | null>;
    ctxRef: import('react').MutableRefObject<CanvasRenderingContext2D | null>;
    dimensions: {
        width: number;
        height: number;
    };
    scrollPosition: {
        left: number;
        top: number;
    };
    hoveredCell: {
        rowIndex: number;
        colIndex: number;
    } | null;
    selectedCell: {
        rowIndex: number;
        colIndex: number;
    } | null;
    selectedRange: CellRange | null;
    editingCell: {
        rowIndex: number;
        colIndex: number;
        value: any;
    } | null;
    isDragging: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;
    columns: import('..').ColumnType[];
    rowHeight: number;
    gridWidth: number;
    gridHeight: number;
    visibleRange: {
        startRowIndex: number;
        endRowIndex: number;
        startColIndex: number;
        endColIndex: number;
    };
    handleMouseMove: (e: import('react').MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
    handleMouseLeave: () => void;
    handleClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    handleDoubleClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    handleScroll: (e: import('react').UIEvent<HTMLDivElement, UIEvent>) => void;
    handleAddRow: () => void;
    handleDeleteRow: (rowIndex: number) => Promise<void>;
    handleExpandForm: (row: Row) => void;
    startEditingCell: () => void;
    saveEditingCell: () => Promise<void>;
    cancelEditingCell: () => void;
    navigateCell: (direction: NavigateDir) => void;
};
