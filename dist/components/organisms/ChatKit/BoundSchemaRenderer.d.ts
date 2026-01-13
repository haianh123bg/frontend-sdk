import { ChatKitState, ChatKitActionEvent } from './contracts';
import { ComponentRegistry, UIComponent } from './types';
import { SchemaRendererProps } from './SchemaRenderer';
import * as React from 'react';
export interface BoundSchemaRendererProps {
    node?: UIComponent | null;
    nodes?: UIComponent[] | null;
    registry?: ComponentRegistry;
    conversationId?: string;
    onAction?: (event: ChatKitActionEvent) => void;
    className?: string;
    fallback?: React.ReactNode;
    unknownFallback?: SchemaRendererProps['unknownFallback'];
    invalidFallback?: SchemaRendererProps['invalidFallback'];
    maxDepth?: number;
    state?: ChatKitState;
}
export declare const BoundSchemaRenderer: React.FC<BoundSchemaRendererProps>;
