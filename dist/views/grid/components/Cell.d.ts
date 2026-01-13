import { default as React } from 'react';
import { ColumnType } from '../../../types/meta';

interface CellProps {
    row: any;
    rowIndex: number;
    column: ColumnType;
    readOnly?: boolean;
}
declare const Cell: React.FC<CellProps>;
export default Cell;
