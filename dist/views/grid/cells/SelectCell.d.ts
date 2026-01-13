import { default as React } from 'react';

interface SelectCellProps {
    value: string;
    options?: any;
    className?: string;
    readOnly?: boolean;
}
declare const SelectCell: React.FC<SelectCellProps>;
export default SelectCell;
