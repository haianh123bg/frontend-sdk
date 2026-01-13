import { AgentThinkingState, ChatMessage } from './types';
import * as React from 'react';
export interface MessageItemProps {
    message: ChatMessage;
    currentUserId: string;
    showSenderName?: boolean;
    showOutgoingAvatar?: boolean;
    incomingMessageStyle?: 'default' | 'flat';
    replyToMessage?: ChatMessage;
    highlighted?: boolean;
    onJumpToMessage?: (messageId: string) => void;
    onCopy?: (message: ChatMessage) => void;
    onDelete?: (message: ChatMessage) => void;
    onRecall?: (message: ChatMessage) => void;
    onReply?: (message: ChatMessage) => void;
    onReact?: (message: ChatMessage, reaction: string) => void;
    onRetrySend?: (message: ChatMessage) => void;
}
export declare const MessageItem: React.FC<MessageItemProps>;
export interface AgentThinkingMessageProps {
    state: AgentThinkingState;
    agentName?: string;
}
export declare const AgentThinkingMessage: React.FC<AgentThinkingMessageProps>;
