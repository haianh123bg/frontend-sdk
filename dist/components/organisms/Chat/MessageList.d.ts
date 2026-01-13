import { AgentThinkingState, ChatMessage } from './types';
import { MessageItemProps } from './MessageItem';
import * as React from 'react';
export interface MessageListProps extends Pick<MessageItemProps, 'currentUserId' | 'showSenderName' | 'showOutgoingAvatar' | 'incomingMessageStyle' | 'onCopy' | 'onDelete' | 'onRecall' | 'onReply' | 'onReact' | 'onRetrySend'> {
    messages: ChatMessage[];
    agentThinking?: AgentThinkingState | null;
    agentName?: string;
    virtualized?: boolean;
    estimateRowHeight?: number;
    overscan?: number;
    onLoadOlder?: () => void;
    hasMoreOlder?: boolean;
    isLoadingOlder?: boolean;
    typingText?: string;
}
export declare const MessageList: React.FC<MessageListProps>;
