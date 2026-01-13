import { default as React } from 'react';
import { GroupRow } from '../hooks/useGroup';
import { ColumnType } from '../../../types/meta';

interface GroupRowProps {
    row: GroupRow;
    columns: ColumnType[];
}
declare const GroupRowComponent: React.FC<GroupRowProps>;
export default GroupRowComponent;
