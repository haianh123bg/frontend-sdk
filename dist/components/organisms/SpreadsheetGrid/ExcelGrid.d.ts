import * as React from 'react';
export type ExcelGridCellValue = string | number | boolean | null;
export type ExcelGridCells = Record<string, ExcelGridCellValue>;
export type ExcelGridCellAddress = {
    row: number;
    col: number;
};
export type ExcelGridRange = {
    start: ExcelGridCellAddress;
    end: ExcelGridCellAddress;
};
export interface ExcelGridProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'defaultChecked' | 'value' | 'onChange'> {
    value?: ExcelGridCells;
    defaultValue?: ExcelGridCells;
    onValueChange?: (next: ExcelGridCells) => void;
    height?: number;
    initialRowCount?: number;
    initialColCount?: number;
    maxRow?: number;
    maxCol?: number;
    expandStepRow?: number;
    expandStepCol?: number;
    expandThresholdPx?: number;
    rowHeight?: number;
    colWidth?: number;
    headerHeight?: number;
    rowNumberWidth?: number;
    showRowNumbers?: boolean;
    showColumnLetters?: boolean;
    editable?: boolean;
    enableCopyPaste?: boolean;
    enableFormulas?: boolean;
    initialColWidths?: Record<number, number>;
    onColWidthChange?: (widths: Record<number, number>) => void;
}
export declare function ExcelGrid({ className, value, defaultValue, onValueChange, height, initialRowCount, initialColCount, maxRow, maxCol, expandStepRow, expandStepCol, expandThresholdPx, rowHeight, colWidth, headerHeight, rowNumberWidth, showRowNumbers, showColumnLetters, editable, enableCopyPaste, enableFormulas, initialColWidths, onColWidthChange, ...props }: ExcelGridProps): import("react/jsx-runtime").JSX.Element;
