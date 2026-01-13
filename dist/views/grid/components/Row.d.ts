import { default as React } from 'react';
import { ColumnType } from '../../../types/meta';

interface RowProps {
    index: number;
    row: any;
    columns: ColumnType[];
    stickyOffsets?: Record<string, number>;
}
declare const Row: React.FC<RowProps>;
export default Row;
