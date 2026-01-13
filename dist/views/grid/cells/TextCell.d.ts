import { default as React } from 'react';

interface TextCellProps {
    value: any;
    className?: string;
    readOnly?: boolean;
}
declare const TextCell: React.FC<TextCellProps>;
export default TextCell;
