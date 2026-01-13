import { AgentThinkingState, ChatMessage, SendMessageInput } from '../Chat/types';
import { ChatKitActionEvent, ChatKitActivity, ChatKitState } from './contracts';
import { UIComponent } from './types';
import { ChatTransport } from './transport';
import * as React from 'react';
export type ChatRuntimeStatus = 'idle' | 'sending' | 'error';
export type ChatRuntimeState = {
    conversationId: string;
    messages: ChatMessage[];
    widgets: UIComponent[];
    state?: ChatKitState;
    activities: ChatKitActivity[];
    status: ChatRuntimeStatus;
    agentThinking?: AgentThinkingState | null;
    typingText?: string;
    error?: unknown;
    traceId?: string;
    hasMoreOlder?: boolean;
    isLoadingOlder?: boolean;
};
export type ChatRuntimeActions = {
    sendMessage: (input: SendMessageInput) => Promise<void>;
    emitAction: (event: ChatKitActionEvent) => Promise<void>;
    loadOlder: (params?: {
        beforeId?: string;
        limit?: number;
    }) => Promise<void>;
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    setWidgets: React.Dispatch<React.SetStateAction<UIComponent[]>>;
    setState: React.Dispatch<React.SetStateAction<ChatKitState | undefined>>;
    setActivities: React.Dispatch<React.SetStateAction<ChatKitActivity[]>>;
};
export type ChatRuntimeApi = ChatRuntimeState & ChatRuntimeActions;
export interface ChatRuntimeProviderProps {
    conversationId: string;
    transport: ChatTransport;
    currentUserId: string;
    currentUserName?: string;
    currentUserAvatarUrl?: string;
    initialMessages?: ChatMessage[];
    initialWidgets?: UIComponent[];
    initialState?: ChatKitState;
    initialActivities?: ChatKitActivity[];
    enableOptimistic?: boolean;
    children: React.ReactNode;
}
export declare const ChatRuntimeProvider: React.FC<ChatRuntimeProviderProps>;
export declare function useChatRuntime(): ChatRuntimeApi;
