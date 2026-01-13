import { UITypes, ColumnType, Row } from '../types';

/**
 * Clear text measurement cache
 */
export declare function clearTextCache(): void;
/**
 * Get canvas 2D context with default settings
 */
export declare function getDefaultCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
/**
 * Measure text width
 */
export declare function measureTextWidth(text: string, ctx: CanvasRenderingContext2D, maxWidth?: number): number;
/**
 * Render single line text with truncation
 */
export declare function renderSingleLineText(ctx: CanvasRenderingContext2D, props: {
    text: string;
    x: number;
    y: number;
    maxWidth?: number;
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    underline?: boolean;
    strikethrough?: boolean;
}): {
    text: string;
    width: number;
    isTruncated: boolean;
};
/**
 * Truncate text to fit max width
 */
export declare function truncateText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, suffix?: string): string;
/**
 * Render rectangle with border
 */
export declare function renderRectangle(ctx: CanvasRenderingContext2D, props: {
    x: number;
    y: number;
    width: number;
    height: number;
    fillStyle?: string | CanvasGradient | CanvasPattern;
    borderColor?: string;
    borderWidth?: number;
    radius?: number;
}): void;
/**
 * Check if point is inside box
 */
export declare function isPointInBox(x: number, y: number, boxX: number, boxY: number, boxWidth: number, boxHeight: number): boolean;
/**
 * Get cell at position
 */
export declare function getCellAtPosition(x: number, y: number, columns: ColumnType[], rowHeight: number, columnHeaderHeight: number, rowMetaWidth: number): {
    rowIndex: number;
    colIndex: number;
} | null;
/**
 * Parse cell value to display text
 */
export declare function getCellDisplayValue(column: ColumnType, value: any): string;
/**
 * Check if column is editable
 */
export declare function isColumnEditable(column: ColumnType): boolean;
/**
 * Check if column is virtual
 */
export declare function isVirtualColumn(column: ColumnType): boolean;
/**
 * Get default value for column type
 */
export declare function getDefaultValueForColumn(column: ColumnType): any;
/**
 * Format row meta cell content
 */
export declare function formatRowMetaCell(row: Row): string;
/**
 * Debounce function
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Get default column width for UI type
 */
export declare function getDefaultColumnWidth(uidt: UITypes): number;
/**
 * Get cell type icon
 */
export declare function getCellTypeIcon(uidt: UITypes): string;
