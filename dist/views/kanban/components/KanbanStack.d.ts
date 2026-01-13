import { default as React } from 'react';
import { ColumnType } from '../../../types/meta';

interface KanbanStackProps {
    id: string;
    title: string;
    items: any[];
    titleColumn: ColumnType;
    color?: string;
}
declare const KanbanStack: React.FC<KanbanStackProps>;
export default KanbanStack;
