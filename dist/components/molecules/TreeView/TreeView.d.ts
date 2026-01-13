import * as React from 'react';
export type TreeNodeType = 'folder' | 'file';
export interface TreeNode {
    id: string;
    label: React.ReactNode;
    children?: TreeNode[];
    type?: TreeNodeType;
    icon?: React.ReactNode;
    disabled?: boolean;
    actions?: React.ReactNode;
}
export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    items: TreeNode[];
    indent?: number;
    selectedId?: string;
    defaultSelectedId?: string;
    onSelectedIdChange?: (id: string | undefined, node?: TreeNode) => void;
    expandedIds?: string[];
    defaultExpandedIds?: string[];
    onExpandedIdsChange?: (ids: string[]) => void;
    onNodeToggle?: (node: TreeNode, expanded: boolean) => void;
    renderLabel?: (node: TreeNode) => React.ReactNode;
    renderActions?: (node: TreeNode) => React.ReactNode;
}
export declare const TreeView: React.ForwardRefExoticComponent<TreeViewProps & React.RefAttributes<HTMLDivElement>>;
