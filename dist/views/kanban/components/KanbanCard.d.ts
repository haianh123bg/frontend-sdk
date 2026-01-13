import { default as React } from 'react';
import { ColumnType } from '../../../types/meta';

interface KanbanCardProps {
    id: string;
    row: any;
    titleColumn: ColumnType;
}
declare const KanbanCard: React.FC<KanbanCardProps>;
export default KanbanCard;
