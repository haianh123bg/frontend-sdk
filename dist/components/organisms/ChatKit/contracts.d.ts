import { ChatMessage } from '../Chat/types';
import { UIComponent } from './types';

export type UISchemaVersion = 1;
export type UISchemaDocument = {
    version: UISchemaVersion;
    nodes: UIComponent[];
    meta?: Record<string, any>;
};
export type ChatKitState = Record<string, any>;
export type JsonPatchOperation = {
    op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
    path: string;
    value?: any;
    from?: string;
};
export type ChatKitActivity = {
    id: string;
    activityType: string;
    content: Record<string, any>;
    createdAt?: string | number;
    updatedAt?: string | number;
};
export type ChatKitActionEvent = {
    type: string;
    conversationId: string;
    payload?: any;
    messageId?: string;
    nodeId?: string;
    traceId?: string;
    meta?: Record<string, any>;
};
export type ChatKitActionResponse = {
    ok: boolean;
    error?: {
        code: string;
        message?: string;
        details?: any;
    };
    patch?: {
        ui?: UISchemaDocument | null;
        messages?: ChatMessage[];
    };
};
export type ChatResponse = {
    conversationId: string;
    messages: ChatMessage[];
    ui?: UISchemaDocument;
    state?: ChatKitState;
    activities?: ChatKitActivity[];
    meta?: {
        traceId?: string;
    };
};
export type StreamingEvent = {
    type: 'typing';
    conversationId: string;
    isTyping: boolean;
    text?: string;
} | {
    type: 'message.delta';
    conversationId: string;
    messageId?: string;
    text: string;
} | {
    type: 'message.final';
    conversationId: string;
    message: ChatMessage;
} | {
    type: 'ui.patch';
    conversationId: string;
    ui: UISchemaDocument | null;
} | {
    type: 'state.snapshot';
    conversationId: string;
    snapshot: ChatKitState;
} | {
    type: 'state.delta';
    conversationId: string;
    delta: JsonPatchOperation[];
} | {
    type: 'activity.snapshot';
    conversationId: string;
    activity: ChatKitActivity;
    replace?: boolean;
} | {
    type: 'activity.delta';
    conversationId: string;
    activityId: string;
    patch: JsonPatchOperation[];
};
export type SendMessageRequest = {
    conversationId: string;
    clientId: string;
    text?: string;
    markdown?: string;
    replyToId?: string;
    attachments?: Array<{
        name: string;
        mimeType?: string;
        size?: number;
        url?: string;
    }>;
    meta?: Record<string, any>;
};
