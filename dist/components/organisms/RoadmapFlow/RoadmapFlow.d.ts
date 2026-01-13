import * as React from 'react';
export type RoadmapFlowNodeStatus = 'completed' | 'in-progress' | 'todo' | 'optional';
export interface RoadmapFlowNode {
    id: string;
    label: string;
    description?: string;
    status?: RoadmapFlowNodeStatus;
    href?: string;
    column: number;
    row: number;
}
export interface RoadmapFlowEdge {
    from: string;
    to: string;
    dashed?: boolean;
}
export interface RoadmapFlowDto {
    title?: string;
    description?: string;
    nodes: RoadmapFlowNode[];
    edges: RoadmapFlowEdge[];
}
export interface RoadmapFlowProps extends React.HTMLAttributes<HTMLDivElement> {
    config: RoadmapFlowDto;
    onNodeClick?: (node: RoadmapFlowNode) => void;
}
export interface RoadmapFlowNodeData extends RoadmapFlowNode {
    statusClasses: ReturnType<typeof getStatusClasses>;
    onClick?: (node: RoadmapFlowNode) => void;
}
declare const getStatusClasses: (status: RoadmapFlowNodeStatus | undefined) => {
    border: string;
    bg: string;
    dot: string;
};
export declare const RoadmapFlow: React.FC<RoadmapFlowProps>;
export {};
