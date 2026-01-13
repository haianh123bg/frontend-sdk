import * as React from 'react';
export type RoadmapItemStatus = 'completed' | 'in-progress' | 'todo' | 'optional';
export interface RoadmapItem {
    id: string;
    label: string;
    description?: string;
    href?: string;
    status?: RoadmapItemStatus;
    tag?: string;
}
export interface RoadmapGroup {
    id: string;
    title: string;
    items: RoadmapItem[];
}
export interface RoadmapColumn {
    id: string;
    title: string;
    groups: RoadmapGroup[];
}
export interface RoadmapDto {
    title?: string;
    description?: string;
    columns: RoadmapColumn[];
}
export interface RoadmapProps extends React.HTMLAttributes<HTMLDivElement> {
    config: RoadmapDto;
    orientation?: 'horizontal' | 'vertical';
    onItemClick?: (item: RoadmapItem) => void;
}
export declare const Roadmap: React.FC<RoadmapProps>;
