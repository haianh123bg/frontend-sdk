import { BoxChatProps } from '../Chat/BoxChat';
import { ChatMessage } from '../Chat/types';
import { ChatKitActivity, ChatKitState } from './contracts';
import { ComponentRegistry, UIComponent } from './types';
import { ChatTransport } from './transport';
import { ActivityRegistry } from './ActivityRenderer';
import * as React from 'react';
export interface ChatKitBoxChatProps extends Omit<BoxChatProps, 'messages' | 'onSend' | 'widgets' | 'onWidgetAction' | 'agentThinking' | 'typingText' | 'onLoadOlder' | 'hasMoreOlder' | 'isLoadingOlder' | 'enableOptimistic' | 'view'> {
    transport: ChatTransport;
    initialMessages?: ChatMessage[];
    initialWidgets?: UIComponent[];
    initialState?: ChatKitState;
    initialActivities?: ChatKitActivity[];
    runtimeEnableOptimistic?: boolean;
    renderWidgetsInChat?: boolean;
    view?: React.ReactNode;
    viewTitle?: React.ReactNode;
    activityRegistry?: ActivityRegistry;
    viewWidgetRegistry?: ComponentRegistry;
}
export declare const ChatKitBoxChat: React.FC<ChatKitBoxChatProps>;
