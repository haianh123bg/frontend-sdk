export type FormulaErrorCode = '#DIV/0!' | '#REF!' | '#NAME?' | '#VALUE!' | '#CYCLE!' | '#ERROR!';
export type FormulaError = {
    code: FormulaErrorCode;
};
export type FormulaPrimitive = number | string | boolean | null;
export type FormulaValue = FormulaPrimitive | FormulaError;
export declare const isFormulaError: (v: FormulaValue) => v is FormulaError;
export type CellAddress = {
    row: number;
    col: number;
};
export declare const parseCellRef: (ref: string) => CellAddress | FormulaError;
export type FormulaRuntime = {
    evaluateCell: (row: number, col: number) => FormulaValue;
    evaluateFormula: (formulaText: string) => FormulaValue;
};
export declare const createFormulaRuntime: (params: {
    rowCount: number;
    colCount: number;
    getCellRaw: (row: number, col: number) => unknown;
}) => FormulaRuntime;
