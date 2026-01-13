import { ChatKitActionEvent, ChatKitState } from './contracts';
import { ComponentRegistry, UIComponent } from './types';
import * as React from 'react';
export interface ChatKitViewPanelProps {
    title?: React.ReactNode;
    widgets?: UIComponent[];
    state?: ChatKitState;
    widgetRegistry?: ComponentRegistry;
    conversationId?: string;
    onAction?: (event: ChatKitActionEvent) => void;
    className?: string;
    contentClassName?: string;
    emptyState?: React.ReactNode;
}
export declare const ChatKitViewPanel: React.FC<ChatKitViewPanelProps>;
