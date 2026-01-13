import { default as React } from 'react';

interface CheckboxCellProps {
    value: boolean;
    rowId: any;
    columnTitle: string;
    readOnly?: boolean;
}
declare const CheckboxCell: React.FC<CheckboxCellProps>;
export default CheckboxCell;
