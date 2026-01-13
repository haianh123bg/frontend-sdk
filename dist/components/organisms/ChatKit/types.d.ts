import { ChatKitActionEvent } from './contracts';
import type * as React from 'react';
export type UIComponent = {
    type: string;
    props?: Record<string, any>;
    children?: UIComponent[];
    key?: string;
    id?: string;
};
export type ChatKitNodeAction = {
    type: string;
    payload?: any;
    conversationId?: string;
};
export type SchemaComponentProps = {
    node: UIComponent;
    renderChildren: () => React.ReactNode;
    onAction?: (event: ChatKitActionEvent) => void;
    conversationId?: string;
    path: string[];
};
export type SchemaComponent = React.ComponentType<SchemaComponentProps>;
export type ComponentRegistry = Record<string, SchemaComponent>;
