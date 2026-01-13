import { ChatHeaderProps } from './ChatHeader';
import { ChatInputProps } from './ChatInput';
import { MessageListProps } from './MessageList';
import { AgentThinkingState, ChatAgentInfo, ChatMessage, SendMessageInput } from './types';
import { ComponentRegistry, ChatKitActionEvent, UIComponent } from '../ChatKit';
import * as React from 'react';
export interface ChatPanelProps extends Pick<MessageListProps, 'showSenderName' | 'showOutgoingAvatar' | 'incomingMessageStyle' | 'onCopy' | 'onDelete' | 'onRecall' | 'onReply' | 'onReact'>, Pick<ChatHeaderProps, 'onCallAgent' | 'onOpenConversations' | 'onOpenTasks' | 'onCreateConversation' | 'onClose'>, Pick<ChatInputProps, 'allowAttachments' | 'maxAttachments' | 'placeholder' | 'mentionContexts' | 'onOpenSettings' | 'onVoiceToText'> {
    agent: ChatAgentInfo;
    messages: ChatMessage[];
    agentThinking?: AgentThinkingState | null;
    typingText?: string;
    conversationId: string;
    currentUserId: string;
    currentUserName?: string;
    currentUserAvatarUrl?: string;
    widgets?: UIComponent[];
    widgetRegistry?: ComponentRegistry;
    onWidgetAction?: (event: ChatKitActionEvent) => void;
    virtualized?: boolean;
    estimateRowHeight?: number;
    overscan?: number;
    onLoadOlder?: () => void;
    hasMoreOlder?: boolean;
    isLoadingOlder?: boolean;
    onSend?: (input: SendMessageInput) => void | Promise<void>;
    enableOptimistic?: boolean;
    className?: string;
}
export declare const ChatPanel: React.FC<ChatPanelProps>;
