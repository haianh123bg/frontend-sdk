import { ChatKitActionEvent } from './contracts';
import { ComponentRegistry, UIComponent } from './types';
import * as React from 'react';
export interface SchemaRendererProps {
    node?: UIComponent | null;
    nodes?: UIComponent[] | null;
    registry?: ComponentRegistry;
    conversationId?: string;
    onAction?: (event: ChatKitActionEvent) => void;
    className?: string;
    fallback?: React.ReactNode;
    unknownFallback?: (node: UIComponent, path: string[]) => React.ReactNode;
    invalidFallback?: (value: unknown, path: string[]) => React.ReactNode;
    maxDepth?: number;
}
export declare const SchemaRenderer: React.FC<SchemaRendererProps>;
