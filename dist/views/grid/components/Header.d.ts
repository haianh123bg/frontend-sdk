import { default as React } from 'react';
import { ColumnType } from '../../../types/meta';
import { SortDirection } from '../hooks/useSort';

interface HeaderProps {
    column: ColumnType;
    sortDirection?: SortDirection | null;
    onSort?: () => void;
    stickyLeft?: number;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
